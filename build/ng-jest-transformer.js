"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgJestTransformer = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const ts_jest_transformer_1 = require("ts-jest/dist/ts-jest-transformer");
const ng_jest_compiler_1 = require("./compiler/ng-jest-compiler");
const ng_jest_config_1 = require("./config/ng-jest-config");
class NgJestTransformer extends ts_jest_transformer_1.TsJestTransformer {
    _createConfigSet(config) {
        return new ng_jest_config_1.NgJestConfig(config);
    }
    _createCompiler(configSet, cacheFS) {
        this._compiler = new ng_jest_compiler_1.NgJestCompiler(configSet, cacheFS);
    }
    process(fileContent, filePath, transformOptions) {
        const configSet = this._createConfigSet(transformOptions.config);
        if (path_1.default.extname(filePath) === '.mjs') {
            const compilerOptions = configSet.parsedTsConfig.options;
            const compilerModule = configSet.compilerModule;
            const { outputText, sourceMapText, diagnostics } = compilerModule.transpileModule(fileContent, {
                compilerOptions: Object.assign(Object.assign({}, compilerOptions), { module: transformOptions.supportsStaticESM && configSet.useESM
                        ? compilerModule.ModuleKind.ES2020
                        : compilerModule.ModuleKind.CommonJS }),
                fileName: filePath,
                reportDiagnostics: configSet.shouldReportDiagnostics(filePath),
            });
            if (diagnostics === null || diagnostics === void 0 ? void 0 : diagnostics.length) {
                configSet.raiseDiagnostics(diagnostics, filePath);
            }
            return {
                code: outputText,
                map: sourceMapText,
            };
        }
        else {
            return super.process(fileContent, filePath, transformOptions);
        }
    }
}
exports.NgJestTransformer = NgJestTransformer;
