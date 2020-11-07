import semver, { SemVer } from 'semver';

export enum VersionMatchType {
  Any = '*',
  More = '>',
  MoreOrEqual = '>=',
  Less = '<',
  LessOrEqual = '<=',
  About = '~',
  Strict = '',
}

export interface ParsedVersion {
  version: string;
  matchType: VersionMatchType;
}

const versionWithMatchTypeRegex = /^(>|>=|<|<=|~)?(\d+\.)?(\d+\.)?(\*|\d+)(-.*)?$/;
const versionOnlyRegex = /(\d+\.)?(\d+\.)?(\*|\d+)/;
const versionWithouMatchPrefix = /(\d+\.)?(\d+\.)?(\*|\d+)(-.*)?$/;

export const parseEngineVersions = (versionsRaw: string): ParsedVersion[] => versionsRaw.split(' ')
  .reduce<ParsedVersion[]>((acc, versionRaw) => {
    if (versionRaw === '') {
      return acc;
    }

    if (versionRaw === '*') {
      acc.push({
        version: VersionMatchType.Any,
        matchType: VersionMatchType.Any,
      });

      return acc;
    }

    if (!versionRaw.match(versionWithMatchTypeRegex)) {
      throw new Error('');
    }

    let versionMathType: VersionMatchType;
    const versionStr = ((versionOnlyRegex.exec(versionRaw) as unknown) as VersionMatchType[])[0];
    const version = ((semver.coerce(versionStr) as unknown) as SemVer).version as string;
    const versionMatchPrefix = versionRaw.replace(versionWithouMatchPrefix, '');

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
      version,
      matchType: versionMathType,
    });

    return acc;
  }, []);
