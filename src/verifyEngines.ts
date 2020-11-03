import { getParrentPackageJSON, PackageJSON } from './utils';
import { packageJsonNotFound } from './errorsGenerators';

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

  if (errors.length) {
    return Promise.reject(errors);
  }

  return Promise.resolve();
};
