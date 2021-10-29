import path from 'path';

import { TransformedSource } from '@jest/transform';
import { Config } from '@jest/types';
import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import type { ProjectConfigTsJest, TransformOptionsTsJest } from 'ts-jest/dist/types';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

export class NgJestTransformer extends TsJestTransformer {
  protected _createConfigSet(config: ProjectConfigTsJest | undefined): ConfigSet {
    return new NgJestConfig(config);
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }

  process(
    fileContent: string,
    filePath: Config.Path,
    transformOptions: TransformOptionsTsJest,
  ): TransformedSource | string {
    const configSet = this._createConfigSet(transformOptions.config);
    if (path.extname(filePath) === '.mjs') {
      const compilerOptions = configSet.parsedTsConfig.options;
      const compiledOutput = configSet.compilerModule.transpileModule(fileContent, {
        compilerOptions,
        fileName: filePath,
        reportDiagnostics: compilerOptions.checkJs,
      });
      if (compiledOutput.diagnostics) {
        configSet.raiseDiagnostics(compiledOutput.diagnostics, filePath);
      }

      return compiledOutput.outputText;
    } else {
      return super.process(fileContent, filePath, transformOptions);
    }
  }
}
