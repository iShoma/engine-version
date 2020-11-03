import { verify } from "crypto";

import { verifyEngines } from '../verifyEngines';
import { getParrentPackageJSON } from '../utils';
import { packageJsonNotFound } from '../errorsGenerators';

jest.mock('../utils');

describe('verify tests', () => {
  it('should return error if package.json not found', async () => {
    (getParrentPackageJSON as jest.Mock).mockRejectedValueOnce(packageJsonNotFound);
    verifyEngines()
      .then()
      .catch((errors) => {
        expect(JSON.stringify(errors)).toBe(JSON.stringify([packageJsonNotFound]));
      });
  });
});
