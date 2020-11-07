#!/usr/bin/env node

/* eslint-disable no-console */
import { verifyEngines } from './verifyEngines';

export const run = async (): Promise<void> => {
  try {
    await verifyEngines();
    console.log('\x1b[37m\x1b[42m', 'OK!', '\x1b[0m', 'ENGINE-VERSION check passed');
  } catch (errors) {
    errors.forEach((err: string) => {
      console.error('\x1b[37m\x1b[41m', 'ERROR!', '\x1b[0m', 'ENGINE-VERSION check failed:', err);
    });
    process.exit(1);
  }
};

run();
