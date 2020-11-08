import { VersionMatchType } from '../parseEngineVersions';
import { versionCheck } from '../versionCheck';

describe('version check tests', () => {
  it('*', () => {
    expect(versionCheck([{ version: '*', matchType: VersionMatchType.Any }], '1.0.0')).toBeTruthy();
  });

  it('About 1', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.About }], '1.1.0')).toBeTruthy();
  });

  it('About 2', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.About }], '1.1.1')).toBeTruthy();
  });

  it('About 3', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.About }], '1.2.0')).toBeFalsy();
  });

  it('About 4', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.About }], '0.1.0')).toBeFalsy();
  });

  it('Strict 1', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.Strict }], '1.1.1')).toBeTruthy();
  });

  it('Strict 2', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.Strict }], '1.1.0')).toBeFalsy();
  });

  it('More 1', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.More }], '1.1.0')).toBeFalsy();
  });

  it('More 2', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.More }], '1.1.1')).toBeFalsy();
  });

  it('More 3', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.More }], '1.1.2')).toBeTruthy();
  });

  it('MoreOrEqual 1', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.MoreOrEqual }], '1.1.0')).toBeFalsy();
  });

  it('MoreOrEqual 2', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.MoreOrEqual }], '1.1.1')).toBeTruthy();
  });

  it('MoreOrEqual 3', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.MoreOrEqual }], '1.1.2')).toBeTruthy();
  });

  it('Less 1', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.Less }], '1.1.0')).toBeTruthy();
  });

  it('Less 2', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.Less }], '1.1.1')).toBeFalsy();
  });

  it('Less 3', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.Less }], '1.1.2')).toBeFalsy();
  });

  it('LessOrEqual 1', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.LessOrEqual }], '1.1.0')).toBeTruthy();
  });

  it('LessOrEqual 2', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.LessOrEqual }], '1.1.1')).toBeTruthy();
  });

  it('LessOrEqual 3', () => {
    expect(versionCheck([{ version: '1.1.1', matchType: VersionMatchType.LessOrEqual }], '1.1.2')).toBeFalsy();
  });
});
