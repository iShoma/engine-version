"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.parseEngineVersions = exports.VersionMatchType = void 0;
var semver_1 = __importDefault(require("semver"));
var VersionMatchType;
(function (VersionMatchType) {
    VersionMatchType["Any"] = "*";
    VersionMatchType["More"] = ">";
    VersionMatchType["MoreOrEqual"] = ">=";
    VersionMatchType["Less"] = "<";
    VersionMatchType["LessOrEqual"] = "<=";
    VersionMatchType["About"] = "~";
    VersionMatchType["Strict"] = "";
})(VersionMatchType = exports.VersionMatchType || (exports.VersionMatchType = {}));
var versionWithMatchTypeRegex = /^(>|>=|<|<=|~)?(\d+\.)?(\d+\.)?(\*|\d+)(-.*)?$/;
var versionOnlyRegex = /(\d+\.)?(\d+\.)?(\*|\d+)/;
var versionWithouMatchPrefix = /(\d+\.)?(\d+\.)?(\*|\d+)(-.*)?$/;
exports.parseEngineVersions = function (versionsRaw) { return versionsRaw.split(' ')
    .reduce(function (acc, versionRaw) {
    if (versionRaw === '') {
        return acc;
    }
    if (versionRaw === '*') {
        acc.push({
            version: VersionMatchType.Any,
            matchType: VersionMatchType.Any
        });
        return acc;
    }
    if (!versionRaw.match(versionWithMatchTypeRegex)) {
        throw new Error('');
    }
    var versionMathType;
    var versionStr = versionOnlyRegex.exec(versionRaw)[0];
    var version = semver_1["default"].coerce(versionStr).version;
    var versionMatchPrefix = versionRaw.replace(versionWithouMatchPrefix, '');
    switch (versionMatchPrefix) {
        case VersionMatchType.About: {
            versionMathType = VersionMatchType.About;
            break;
        }
        case VersionMatchType.More: {
            versionMathType = VersionMatchType.More;
            break;
        }
        case VersionMatchType.MoreOrEqual: {
            versionMathType = VersionMatchType.MoreOrEqual;
            break;
        }
        case VersionMatchType.Less: {
            versionMathType = VersionMatchType.Less;
            break;
        }
        case VersionMatchType.LessOrEqual: {
            versionMathType = VersionMatchType.LessOrEqual;
            break;
        }
        default: {
            versionMathType = VersionMatchType.Strict;
            break;
        }
    }
    acc.push({
        version: version,
        matchType: versionMathType
    });
    return acc;
}, []); };
