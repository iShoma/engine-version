import findVersions from 'find-versions';
import childProcess from 'child_process';
import { getInstalledLibVersion } from '../getInstalledLibVersion';

jest.mock('find-versions');
jest.mock('child_process');

// @ts-ignore
childProcess.exec = jest.fn();

describe('installed libs versions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('lib not found', async () => {
    // @ts-ignore
    (childProcess.exec as jest.Mock).mockImplementation((_, cb) => {
      cb('error');
    });
    try {
      await getInstalledLibVersion('node');
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toBe('error');
    }
  });

  it('return version', async () => {
    // @ts-ignore
    (childProcess.exec as jest.Mock).mockImplementation((_, cb) => {
      cb(null, 'version');
    });
    (findVersions as jest.Mock).mockReturnValue(['version']);
    try {
      expect(await getInstalledLibVersion('node')).toBe('version');
    } catch (_) {
      expect(true).toBeFalsy();
    }
  });
});
