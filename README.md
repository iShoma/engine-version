[![build](https://github.com/iShoma/engine-version/workflows/build/badge.svg)](https://github.com/iShoma/engine-version/actions?query=workflow%3Abuild)
[![publish](https://github.com/iShoma/engine-version/workflows/publish/badge.svg)](https://github.com/iShoma/engine-version/actions?query=workflow%3Apublish)
[![codecov](https://codecov.io/gh/iShoma/engine-version/branch/main/graph/badge.svg?token=QSVL1MS0WV)](https://codecov.io/gh/iShoma/engine-version)
[![dependencies Status](https://david-dm.org/ishoma/engine-version.svg)](https://david-dm.org/ishoma/engine-version)
[![devDependencies Status](https://david-dm.org/ishoma/engine-version/dev-status.svg)](https://david-dm.org/ishoma/engine-version?type=dev)

# Engine-Version
Check and require specific installed versions of instruments for developing

## Usage
* Install:
```
npm i -D engine-version
```
* Set in your `package.json` the [required versions](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#engines):
```
{
  "engines": {
    "node": ">=10 <10.2.0",
    "npm": "~7",
    "git": "*",
    "pm2": "*",
    "mysql": "*",
    "mongo": "*"
  }
}
```
All programs version of which will be checked must contain the `--version` option
* Create ['pre' or 'post' scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts#pre--post-scripts) in your `package.json`:
```
{
  "scripts": {
    "postinstall": "engine-version",
    "prestart": "engine-version",
    "prebuild": "engine-version"
  }
}
```
