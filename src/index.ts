/* eslint-disable no-console */
import { verifyEngines } from './verifyEngines';

export const run = async () => {
  try {
    await verifyEngines();
  } catch (errors) {
    errors.forEach((err: string) => {
      console.error(err);
    });
    process.exit(1);
  }
};

run();
