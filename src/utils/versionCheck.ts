import { versions } from 'process';
import semver from 'semver';
import { ParsedVersion, VersionMatchType } from './parseEngineVersions';

export const versionCheck = (
  engineVersions: ParsedVersion[],
  installedVersion: string,
): boolean => engineVersions.every((engineVersion) => {
  const { matchType, version } = engineVersion;

  switch (matchType) {
    case VersionMatchType.Strict: {
      return semver.eq(version, installedVersion);
    }
    case VersionMatchType.About: {
      return semver.major(installedVersion) === semver.major(version)
        && semver.minor(installedVersion) === semver.minor(version);
    }
    case VersionMatchType.More: {
      return semver.gt(installedVersion, version);
    }
    case VersionMatchType.MoreOrEqual: {
      return semver.gte(installedVersion, version);
    }
    case VersionMatchType.Less: {
      return semver.lt(installedVersion, version);
    }
    case VersionMatchType.LessOrEqual: {
      return semver.lte(installedVersion, version);
    }
    default: {
      return true;
    }
  }
});
