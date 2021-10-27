import ts from 'typescript';
import { STYLES, STYLE_URLS, TEMPLATE_URL, TEMPLATE, REQUIRE, COMPONENT } from '../constants';
const shouldTransform = (fileName) => !fileName.endsWith('.ngfactory.ts') && !fileName.endsWith('.ngstyle.ts');
export function replaceResources({ program }) {
    return (context) => {
        const typeChecker = program.getTypeChecker();
        const resourceImportDeclarations = [];
        const moduleKind = context.getCompilerOptions().module;
        const visitNode = (node) => {
            if (ts.isClassDeclaration(node)) {
                const decorators = ts.visitNodes(node.decorators, (node) => ts.isDecorator(node)
                    ? visitDecorator(context.factory, node, typeChecker, resourceImportDeclarations, moduleKind)
                    : node);
                return context.factory.updateClassDeclaration(node, decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, node.members);
            }
            return ts.visitEachChild(node, visitNode, context);
        };
        return (sourceFile) => {
            if (!shouldTransform(sourceFile.fileName)) {
                return sourceFile;
            }
            const updatedSourceFile = ts.visitNode(sourceFile, visitNode);
            if (resourceImportDeclarations.length) {
                return context.factory.updateSourceFile(updatedSourceFile, ts.setTextRange(context.factory.createNodeArray([...resourceImportDeclarations, ...updatedSourceFile.statements]), updatedSourceFile.statements));
            }
            return updatedSourceFile;
        };
    };
}
function visitDecorator(nodeFactory, node, typeChecker, resourceImportDeclarations, moduleKind) {
    if (!isComponentDecorator(node, typeChecker)) {
        return node;
    }
    if (!ts.isCallExpression(node.expression)) {
        return node;
    }
    const decoratorFactory = node.expression;
    const args = decoratorFactory.arguments;
    if (args.length !== 1 || !ts.isObjectLiteralExpression(args[0])) {
        return node;
    }
    const objectExpression = args[0];
    const styleReplacements = [];
    let properties = ts.visitNodes(objectExpression.properties, (node) => ts.isObjectLiteralElementLike(node)
        ? visitComponentMetadata(nodeFactory, node, resourceImportDeclarations, moduleKind)
        : node);
    if (styleReplacements.length) {
        const styleProperty = nodeFactory.createPropertyAssignment(nodeFactory.createIdentifier(STYLES), nodeFactory.createArrayLiteralExpression(styleReplacements));
        properties = nodeFactory.createNodeArray([...properties, styleProperty]);
    }
    return nodeFactory.updateDecorator(node, nodeFactory.updateCallExpression(decoratorFactory, decoratorFactory.expression, decoratorFactory.typeArguments, [
        nodeFactory.updateObjectLiteralExpression(objectExpression, properties),
    ]));
}
function visitComponentMetadata(nodeFactory, node, resourceImportDeclarations, moduleKind) {
    if (!ts.isPropertyAssignment(node) || ts.isComputedPropertyName(node.name)) {
        return node;
    }
    const name = node.name.text;
    switch (name) {
        case 'moduleId':
            return undefined;
        case TEMPLATE_URL:
            const url = getResourceUrl(node.initializer);
            if (!url) {
                return node;
            }
            const importName = createResourceImport(nodeFactory, url, resourceImportDeclarations, moduleKind);
            if (!importName) {
                return node;
            }
            return nodeFactory.updatePropertyAssignment(node, nodeFactory.createIdentifier(TEMPLATE), importName);
        case STYLES:
        case STYLE_URLS:
            if (!ts.isArrayLiteralExpression(node.initializer)) {
                return node;
            }
            return undefined;
        default:
            return node;
    }
}
function getResourceUrl(node) {
    if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
        return null;
    }
    return `${/^\.?\.\//.test(node.text) ? '' : './'}${node.text}`;
}
function isComponentDecorator(node, typeChecker) {
    if (!ts.isDecorator(node)) {
        return false;
    }
    const origin = getDecoratorOrigin(node, typeChecker);
    return !!(origin && origin.module === '@angular/core' && origin.name === COMPONENT);
}
function createResourceImport(nodeFactory, url, resourceImportDeclarations, moduleKind = ts.ModuleKind.ES2015) {
    const urlLiteral = nodeFactory.createStringLiteral(url);
    if (moduleKind < ts.ModuleKind.ES2015) {
        return nodeFactory.createCallExpression(nodeFactory.createIdentifier(REQUIRE), [], [urlLiteral]);
    }
    else {
        const importName = ts.createIdentifier(`__NG_CLI_RESOURCE__${resourceImportDeclarations.length}`);
        const importDeclaration = nodeFactory.createImportDeclaration(undefined, undefined, nodeFactory.createImportClause(false, importName, undefined), urlLiteral);
        resourceImportDeclarations.push(importDeclaration);
        return importName;
    }
}
function getDecoratorOrigin(decorator, typeChecker) {
    if (!ts.isCallExpression(decorator.expression)) {
        return null;
    }
    let identifier;
    let name = '';
    if (ts.isPropertyAccessExpression(decorator.expression.expression)) {
        identifier = decorator.expression.expression.expression;
        name = decorator.expression.expression.name.text;
    }
    else if (ts.isIdentifier(decorator.expression.expression)) {
        identifier = decorator.expression.expression;
    }
    else {
        return null;
    }
    const symbol = typeChecker.getSymbolAtLocation(identifier);
    if (symbol && symbol.declarations && symbol.declarations.length > 0) {
        const declaration = symbol.declarations[0];
        let module;
        if (ts.isImportSpecifier(declaration)) {
            name = (declaration.propertyName || declaration.name).text;
            module = declaration.parent.parent.parent.moduleSpecifier.text;
        }
        else if (ts.isNamespaceImport(declaration)) {
            module = declaration.parent.parent.moduleSpecifier.text;
        }
        else if (ts.isImportClause(declaration)) {
            name = declaration.name.text;
            module = declaration.parent.moduleSpecifier.text;
        }
        else {
            return null;
        }
        return { name, module };
    }
    return null;
}
