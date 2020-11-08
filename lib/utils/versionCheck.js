"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.versionCheck = void 0;
var semver_1 = __importDefault(require("semver"));
var parseEngineVersions_1 = require("./parseEngineVersions");
exports.versionCheck = function (engineVersions, installedVersion) { return engineVersions.every(function (engineVersion) {
    var matchType = engineVersion.matchType, version = engineVersion.version;
    switch (matchType) {
        case parseEngineVersions_1.VersionMatchType.Strict: {
            return semver_1["default"].eq(version, installedVersion);
        }
        case parseEngineVersions_1.VersionMatchType.About: {
            return semver_1["default"].major(installedVersion) === semver_1["default"].major(version)
                && semver_1["default"].minor(installedVersion) === semver_1["default"].minor(version);
        }
        case parseEngineVersions_1.VersionMatchType.More: {
            return semver_1["default"].gt(installedVersion, version);
        }
        case parseEngineVersions_1.VersionMatchType.MoreOrEqual: {
            return semver_1["default"].gte(installedVersion, version);
        }
        case parseEngineVersions_1.VersionMatchType.Less: {
            return semver_1["default"].lt(installedVersion, version);
        }
        case parseEngineVersions_1.VersionMatchType.LessOrEqual: {
            return semver_1["default"].lte(installedVersion, version);
        }
        default: {
            return true;
        }
    }
}); };
