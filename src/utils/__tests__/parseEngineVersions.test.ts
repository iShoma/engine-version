import { parseEngineVersions, VersionMatchType } from '../parseEngineVersions';

describe('parse engine version', () => {
  it('any regex', () => {
    expect(JSON.stringify(parseEngineVersions('*'))).toBe(JSON.stringify([{
      version: '*',
      matchType: VersionMatchType.Any,
    }]));
  });

  it('empty version settings', () => {
    expect(JSON.stringify(parseEngineVersions(''))).toBe(JSON.stringify([]));
  });

  it('version with error', () => {
    try {
      parseEngineVersions('abc');
      expect(true).toBeFalsy();
    } catch (_) {
      expect(true).toBeTruthy();
    }
  });

  it('version with error 2', () => {
    try {
      parseEngineVersions('1.1.1 abc');
      expect(true).toBeFalsy();
    } catch (_) {
      expect(true).toBeTruthy();
    }
  });

  it('version regex test', () => {
    const versions = [
      '1.1.1',
      '>=2.2.2',
      '>3.3.3',
      '<4.4.4',
      '<=5.5.5',
      '~6.6.6',
      '7',
      '8.8',
      '>9',
      '>10.10',
      '*',
    ].join(' ');

    expect(JSON.stringify(parseEngineVersions(versions)))
      .toBe(JSON.stringify([
        {
          version: '1.1.1',
          matchType: VersionMatchType.Strict,
        },
        {
          version: '2.2.2',
          matchType: VersionMatchType.MoreOrEqual,
        },
        {
          version: '3.3.3',
          matchType: VersionMatchType.More,
        },
        {
          version: '4.4.4',
          matchType: VersionMatchType.Less,
        },
        {
          version: '5.5.5',
          matchType: VersionMatchType.LessOrEqual,
        },
        {
          version: '6.6.6',
          matchType: VersionMatchType.About,
        },
        {
          version: '7',
          matchType: VersionMatchType.Strict,
        },
        {
          version: '8.8',
          matchType: VersionMatchType.Strict,
        },
        {
          version: '9',
          matchType: VersionMatchType.More,
        },
        {
          version: '10.10',
          matchType: VersionMatchType.More,
        },
        {
          version: '*',
          matchType: VersionMatchType.Any,
        },
      ]));
  });
});
