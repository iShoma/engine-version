import { VersionMatchType } from "./utils";

export const packageJsonNotFound = 'package.json not found!';
export const libNotInstalled = (libName: string): string => `${libName} not installed!`;
export const incorrectGivenVersion = (libName: string): string => `${libName} version not specified!`;
export const wrongVersion = (libName: string): string => `${libName} installed wrong version!`;
export const invalidVersionSpecified = (libName: string): string => ` invalid ${libName} version specified!`;
