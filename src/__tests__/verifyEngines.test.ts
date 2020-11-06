import { verifyEngines } from '../verifyEngines';
import {
  getParrentPackageJSON,
  getInstalledLibVersion,
  versionCheck,
  parseEngineVersions,
} from '../utils';
import {
  packageJsonNotFound,
  libNotInstalled,
  invalidVersionSpecified,
  wrongVersion,
} from '../errorsGenerators';

jest.mock('../utils');

describe('verify tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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
    (getInstalledLibVersion as jest.Mock).mockResolvedValue('*');
    (versionCheck as jest.Mock).mockReturnValue(true);
    try {
      await verifyEngines();
    } catch (_) {
      expect(true).toBeFalsy();
    }
  });

  it('invalid version specified', async () => {
    (getParrentPackageJSON as jest.Mock).mockResolvedValue({
      engines: {
        node: 'abc',
      },
    });
    (parseEngineVersions as jest.Mock).mockImplementation(
      () => { throw new Error('e'); },
    );
    (getInstalledLibVersion as jest.Mock).mockResolvedValue('*');
    (versionCheck as jest.Mock).mockReturnValue(true);
    try {
      await verifyEngines();
    } catch (errors) {
      expect(JSON.stringify(errors)).toBe(JSON.stringify([invalidVersionSpecified('node')]));
    }
  });

  it('check error', async () => {
    (getParrentPackageJSON as jest.Mock).mockResolvedValue({
      engines: {
        node: '*',
      },
    });
    (versionCheck as jest.Mock).mockReturnValue(false);
    (getInstalledLibVersion as jest.Mock).mockResolvedValue('*');
    try {
      await verifyEngines();
    } catch (errors) {
      expect(JSON.stringify(errors)).toBe(JSON.stringify([wrongVersion('node')]));
    }
  });
});
