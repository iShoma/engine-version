import path from 'path';

export interface PackageJSON {
  engines?: {
    [key: string]: string;
  }
}

export const getParrentPackageJSON = (): Promise<PackageJSON> => import(path.resolve(process.cwd(), 'package.json'));
