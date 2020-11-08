"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getInstalledLibVersion = void 0;
var find_versions_1 = __importDefault(require("find-versions"));
var child_process_1 = __importDefault(require("child_process"));
exports.getInstalledLibVersion = function (libName) { return new Promise(function (res, rej) {
    child_process_1["default"].exec(libName + " --version", function (err, data) {
        if (err) {
            rej(err);
        }
        else {
            res(find_versions_1["default"](data)[0]);
        }
    });
}); };
