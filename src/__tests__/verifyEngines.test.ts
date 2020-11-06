import { verifyEngines } from '../verifyEngines';
import { getParrentPackageJSON, getInstalledLibVersion } from '../utils';
import { packageJsonNotFound, libNotInstalled } from '../errorsGenerators';

jest.mock('../utils');

describe('verify tests', () => {
  it('package.json not found', async () => {
    (getParrentPackageJSON as jest.Mock).mockRejectedValueOnce(packageJsonNotFound);
    try {
      await verifyEngines();
    } catch (errors) {
      expect(JSON.stringify(errors)).toBe(JSON.stringify([packageJsonNotFound]));
    }
  });

  it('engines not set', async () => {
    (getParrentPackageJSON as jest.Mock).mockResolvedValue({});
    try {
      await verifyEngines();
    } catch (_) {
      expect(true).toBeFalsy();
    }
  });

  it('engine lib not installed', async () => {
    (getParrentPackageJSON as jest.Mock).mockResolvedValue({
      engines: {
        node: 'version',
      },
    });
    (getInstalledLibVersion as jest.Mock).mockRejectedValue('lib not installed');
    try {
      await verifyEngines();
    } catch (errors) {
      expect(JSON.stringify(errors)).toBe(JSON.stringify([libNotInstalled('node')]));
    }
  });

  it('all ok', async () => {
    (getParrentPackageJSON as jest.Mock).mockResolvedValue({
      engines: {
        node: '*',
        npm: '*',
      },
    });
    (getInstalledLibVersion as jest.Mock).mockResolvedValue('version');
    try {
      await verifyEngines();
    } catch (_) {
      expect(true).toBeFalsy();
    }
  });
});
