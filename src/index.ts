/* eslint-disable no-console */
import { verifyEngines } from './verifyEngines';

verifyEngines()
  .then()
  .catch((errors: string[]) => {
    errors.forEach((err) => {
      console.error(err);
    });
  });
