import { constructorParametersDownlevelTransform } from '@angular/compiler-cli';
import { TsCompiler } from 'ts-jest/dist/compiler/ts-compiler';
import { replaceResources } from '../transformers/replace-resources';
export class NgJestCompiler extends TsCompiler {
    constructor(configSet, jestCacheFS) {
        super(configSet, jestCacheFS);
        this.configSet = configSet;
        this.jestCacheFS = jestCacheFS;
        this._logger.debug('created NgJestCompiler');
    }
    _transpileOutput(fileContent, fileName) {
        const diagnostics = [];
        const compilerOptions = Object.assign({}, this._compilerOptions);
        const options = compilerOptions
            ?
                this._ts.fixupCompilerOptions(compilerOptions, diagnostics)
            : {};
        const defaultOptions = this._ts.getDefaultCompilerOptions();
        for (const key in defaultOptions) {
            if (this._ts.hasProperty(defaultOptions, key) && options[key] === undefined) {
                options[key] = defaultOptions[key];
            }
        }
        for (const option of this._ts.transpileOptionValueCompilerOptions) {
            options[option.name] = option.transpileOptionValue;
        }
        options.suppressOutputPathCheck = true;
        options.allowNonTsExtensions = true;
        const inputFileName = fileName || (compilerOptions && compilerOptions.jsx ? 'module.tsx' : 'module.ts');
        const sourceFile = this._ts.createSourceFile(inputFileName, fileContent, options.target);
        const newLine = this._ts.getNewLineCharacter(options);
        let outputText;
        let sourceMapText;
        const compilerHost = {
            getSourceFile: (fileName) => (fileName === this._ts.normalizePath(inputFileName) ? sourceFile : undefined),
            writeFile: (name, text) => {
                if (this._ts.fileExtensionIs(name, '.map')) {
                    this._ts.Debug.assertEqual(sourceMapText, undefined, 'Unexpected multiple source map outputs, file:', name);
                    sourceMapText = text;
                }
                else {
                    this._ts.Debug.assertEqual(outputText, undefined, 'Unexpected multiple outputs, file:', name);
                    outputText = text;
                }
            },
            getDefaultLibFileName: () => 'lib.d.ts',
            useCaseSensitiveFileNames: () => false,
            getCanonicalFileName: (fileName) => fileName,
            getCurrentDirectory: () => '',
            getNewLine: () => newLine,
            fileExists: (fileName) => fileName === inputFileName,
            readFile: () => '',
            directoryExists: () => true,
            getDirectories: () => [],
        };
        this.program = this._ts.createProgram([inputFileName], options, compilerHost);
        if (this.configSet.shouldReportDiagnostics(inputFileName)) {
            this._ts.addRange(diagnostics, this.program.getSyntacticDiagnostics(sourceFile));
            this._ts.addRange(diagnostics, this.program.getOptionsDiagnostics());
        }
        this.program.emit(undefined, undefined, undefined, undefined, this._makeTransformers(this.configSet.resolvedTransformers));
        if (outputText === undefined)
            return this._ts.Debug.fail('Output generation failed');
        return { outputText, diagnostics, sourceMapText };
    }
    _makeTransformers(customTransformers) {
        return Object.assign(Object.assign(Object.assign({}, super._makeTransformers(customTransformers).after), super._makeTransformers(customTransformers).afterDeclarations), { before: [
                ...customTransformers.before.map((beforeTransformer) => beforeTransformer.factory(this, beforeTransformer.options)),
                replaceResources(this),
                constructorParametersDownlevelTransform(this.program),
            ] });
    }
}
