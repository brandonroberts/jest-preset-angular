"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNamedVariableDeclaration = exports.isNamedFunctionDeclaration = exports.isNamedClassDeclaration = exports.reflectTypeEntityToDeclaration = exports.reflectObjectLiteral = exports.reflectNameOfDeclaration = exports.reflectIdentifierOfDeclaration = exports.filterToMembersWithDecorator = exports.TypeScriptReflectionHost = exports.typeNodeToValueExpr = void 0;
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./src/host"), exports);
var type_to_value_1 = require("./src/type_to_value");
Object.defineProperty(exports, "typeNodeToValueExpr", { enumerable: true, get: function () { return type_to_value_1.typeNodeToValueExpr; } });
var typescript_1 = require("./src/typescript");
Object.defineProperty(exports, "TypeScriptReflectionHost", { enumerable: true, get: function () { return typescript_1.TypeScriptReflectionHost; } });
Object.defineProperty(exports, "filterToMembersWithDecorator", { enumerable: true, get: function () { return typescript_1.filterToMembersWithDecorator; } });
Object.defineProperty(exports, "reflectIdentifierOfDeclaration", { enumerable: true, get: function () { return typescript_1.reflectIdentifierOfDeclaration; } });
Object.defineProperty(exports, "reflectNameOfDeclaration", { enumerable: true, get: function () { return typescript_1.reflectNameOfDeclaration; } });
Object.defineProperty(exports, "reflectObjectLiteral", { enumerable: true, get: function () { return typescript_1.reflectObjectLiteral; } });
Object.defineProperty(exports, "reflectTypeEntityToDeclaration", { enumerable: true, get: function () { return typescript_1.reflectTypeEntityToDeclaration; } });
var util_1 = require("./src/util");
Object.defineProperty(exports, "isNamedClassDeclaration", { enumerable: true, get: function () { return util_1.isNamedClassDeclaration; } });
Object.defineProperty(exports, "isNamedFunctionDeclaration", { enumerable: true, get: function () { return util_1.isNamedFunctionDeclaration; } });
Object.defineProperty(exports, "isNamedVariableDeclaration", { enumerable: true, get: function () { return util_1.isNamedVariableDeclaration; } });
