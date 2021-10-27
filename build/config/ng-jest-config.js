import { ConfigSet } from 'ts-jest/dist/config/config-set';
export class NgJestConfig extends ConfigSet {
    _resolveTsConfig(compilerOptions, resolvedConfigFile) {
        const result = super._resolveTsConfig(compilerOptions, resolvedConfigFile);
        result.options.enableIvy = true;
        result.options.noEmitOnError = false;
        result.options.suppressOutputPathCheck = true;
        result.options.allowEmptyCodegenFiles = false;
        result.options.annotationsAs = 'decorators';
        result.options.enableResourceInlining = false;
        result.options.allowJs = true;
        return result;
    }
}
