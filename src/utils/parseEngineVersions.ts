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
const versionOnlyRegex = /(\d+\.)?(\d+\.)?(\*|\d+)(-.*)?$/;

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
    const version = ((versionOnlyRegex.exec(versionRaw) as unknown) as VersionMatchType[])[0];
    const versionMatchPrefix = versionRaw.replace(versionOnlyRegex, '');

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
