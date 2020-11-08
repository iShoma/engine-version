"use strict";
exports.__esModule = true;
exports.invalidVersionSpecified = exports.wrongVersion = exports.incorrectGivenVersion = exports.libNotInstalled = exports.packageJsonNotFound = void 0;
exports.packageJsonNotFound = 'package.json not found!';
exports.libNotInstalled = function (libName) { return libName + " not installed!"; };
exports.incorrectGivenVersion = function (libName) { return libName + " version not specified!"; };
exports.wrongVersion = function (libName) { return libName + " installed wrong version!"; };
exports.invalidVersionSpecified = function (libName) { return "specidied invalid " + libName + " version!"; };
