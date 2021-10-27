import { NgJestTransformer } from './ng-jest-transformer';
export default {
    createTransformer: () => new NgJestTransformer(),
};
