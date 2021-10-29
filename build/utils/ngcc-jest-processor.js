"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const path_1 = (0, tslib_1.__importStar)(require("path"));
const IGNORE_ARGS = ['--clearCache', '--help', '--init', '--listTests', '--showConfig'];
const ANGULAR_COMPILER_CLI_PKG_NAME = `@angular${path_1.sep}compiler-cli`;
const nodeModuleDirPath = findNodeModulesDirectory();
function findNodeModulesDirectory() {
    let nodeModulesPath = '';
    try {
        const angularCompilerCLIPath = require.resolve(ANGULAR_COMPILER_CLI_PKG_NAME);
        nodeModulesPath = angularCompilerCLIPath.substring(0, angularCompilerCLIPath.indexOf(ANGULAR_COMPILER_CLI_PKG_NAME));
    }
    catch (_a) { }
    return nodeModulesPath;
}
if (!process.argv.find((arg) => IGNORE_ARGS.includes(arg))) {
    if (nodeModuleDirPath) {
        process.stdout.write('ngcc-jest-processor: running ngcc\n');
        let ngccPath;
        try {
            ngccPath = require.resolve('@angular/compiler-cli/ngcc/main-ngcc.js');
        }
        catch (_b) {
            const compilerCliNgccPath = require.resolve('@angular/compiler-cli/ngcc');
            ngccPath = path_1.default.resolve(compilerCliNgccPath.substring(0, compilerCliNgccPath.lastIndexOf(path_1.default.sep)), 'main-ngcc.js');
        }
        const { status, error } = (0, child_process_1.spawnSync)(process.execPath, [
            ngccPath,
            '--source',
            nodeModuleDirPath,
            '--properties',
            ...['es2015', 'main'],
            '--first-only',
            'false',
            '--async',
        ], {
            stdio: ['inherit', process.stderr, process.stderr],
        });
        if (status !== 0) {
            const errorMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : '';
            throw new Error(`${errorMessage} NGCC failed ${errorMessage ? ', see above' : ''}.`);
        }
    }
    else {
        console.log(`Warning: Could not locate '@angular/compiler-cli' to run 'ngcc' automatically.` +
            `Please make sure you are running 'ngcc-jest-processor.js' from root level of your project.` +
            `'ngcc' must be run before running Jest`);
    }
}
