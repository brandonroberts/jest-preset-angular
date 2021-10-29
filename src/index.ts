import { SyncTransformer, TransformOptions } from '@jest/transform';
import * as ts from 'typescript';

type CreateTransformer = SyncTransformer<TransformOptions>['createTransformer'];

const createTransformer: CreateTransformer = () => {
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

const transformer: SyncTransformer<TransformOptions> = {
  ...createTransformer(),
  // Assigned here so only the exported transformer has `createTransformer`,
  // instead of all created transformers by the function
  createTransformer,
};

export default transformer;
