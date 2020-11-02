import { getParrentPackageJSON } from './utils';

export const verify = async () => {
  const packageJSON = await getParrentPackageJSON();
  console.log(packageJSON.engines);
};
