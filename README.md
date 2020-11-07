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
    "git": "*",
    "pm2": "*",
    "mysql": "*"
  }
}
```
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
