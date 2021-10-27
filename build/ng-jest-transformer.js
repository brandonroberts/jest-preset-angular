import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';
export class NgJestTransformer extends TsJestTransformer {
    _createConfigSet(config) {
        return new NgJestConfig(config);
    }
    _createCompiler(configSet, cacheFS) {
        this._compiler = new NgJestCompiler(configSet, cacheFS);
    }
}
