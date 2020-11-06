import {
  getParrentPackageJSON,
  PackageJSON,
  getInstalledLibVersion,
  versionCheck,
  parseEngineVersions,
} from './utils';
import {
  packageJsonNotFound,
  libNotInstalled,
  wrongVersion,
  invalidVersionSpecified,
} from './errorsGenerators';

interface Engine {
  libName: string;
  libVersions: string;
}

export const verifyEngines = async (): Promise<void> => {
  const errors: string[] = [];

  let packageJSON: PackageJSON | null = null;

  try {
    packageJSON = await getParrentPackageJSON();
  } catch (e) {
    errors.push(packageJsonNotFound);
  }

  if (!packageJSON) {
    return Promise.reject(errors);
  }

  if (!packageJSON.engines) {
    return Promise.resolve();
  }

  const engines: Engine[] = Object.entries(packageJSON.engines).map((engineTuple) => ({
    libName: engineTuple[0],
    libVersions: engineTuple[1],
  }));

  await Promise.all(engines.map(async (engine) => {
    const { libName, libVersions } = engine;
    let installedVersion;
    let parsedEngineVersions;

    try {
      installedVersion = await getInstalledLibVersion(libName);
    } catch (_) {
      errors.push(libNotInstalled(libName));
      return;
    }

    try {
      parsedEngineVersions = parseEngineVersions(libVersions);
    } catch (_) {
      errors.push(invalidVersionSpecified(libName));
      return;
    }
    if (!versionCheck(parsedEngineVersions, installedVersion)) {
      errors.push(wrongVersion(libName));
    }
  }));

  if (errors.length) {
    return Promise.reject(errors);
  }

  return Promise.resolve();
};
