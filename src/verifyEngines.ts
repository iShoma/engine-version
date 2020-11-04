import { getParrentPackageJSON, PackageJSON, getInstalledLibVersion } from './utils';
import { packageJsonNotFound, libNotInstalled } from './errorsGenerators';

interface Engine {
  libName: string;
  libVersions: string;
  installedVersion: string | null;
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
    installedVersion: null,
  }));

  await Promise.all(engines.map(async (engine, i) => {
    const { libName } = engine;
    try {
      engines[i].installedVersion = await getInstalledLibVersion(libName);
    } catch (_) {
      errors.push(libNotInstalled(libName));
    }
  }));

  if (errors.length) {
    return Promise.reject(errors);
  }

  return Promise.resolve();
};
