"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = (0, tslib_1.__importStar)(require("typescript"));
const createTransformer = () => {
    return {
        canInstrument: true,
        process(sourceText, sourcePath) {
            const compiledOutput = ts.transpileModule(sourceText, {
                compilerOptions: {
                    module: ts.ModuleKind.CommonJS,
                    target: ts.ScriptTarget.ES2015,
                    sourceMap: true,
                    inlineSourceMap: true,
                    inlineSources: true,
                },
                fileName: sourcePath,
            });
            return {
                code: compiledOutput.outputText,
                map: compiledOutput.sourceMapText,
            };
        },
    };
};
const transformer = Object.assign(Object.assign({}, createTransformer()), { createTransformer });
exports.default = transformer;
