import findVersions from 'find-versions';
import childProcess from 'child_process';

export const getInstalledLibVersion = (libName: string): Promise<string> => new Promise(
  (res, rej) => {
    childProcess.exec(`${libName} --version`, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(findVersions(data)[0]);
      }
    });
  },
);
