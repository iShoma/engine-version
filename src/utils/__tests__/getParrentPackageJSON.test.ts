import path from 'path';

import { getParrentPackageJSON } from '../getParrentPackageJSON';

jest.mock('path');
path.resolve = jest.fn();

describe('get package json tests', () => {
  it('package.json not found', async () => {
    (path.resolve as jest.Mock).mockReturnValue('randomfile');
    try {
      await getParrentPackageJSON();
      expect(true).toBe(false);
    } catch (e) {
      expect(true).toBe(true);
    }
  });

  it('empty json', async () => {
    (path.resolve as jest.Mock).mockReturnValue('../../package.json');
    jest.mock('../../../package.json', () => ({}));
    expect(JSON.stringify(await getParrentPackageJSON())).toBe(JSON.stringify({ default: {} }));
  });
});
