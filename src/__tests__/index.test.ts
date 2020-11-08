import { run } from '../index';
import { verifyEngines } from '../verifyEngines';

jest.mock('../verifyEngines');
const logSpy = jest.spyOn(global.console, 'error').mockImplementation();
const processSpy = jest.spyOn(global.process, 'exit').mockImplementation();

describe('index test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('all ok', async () => {
    await run();
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  it('on 1 error', async () => {
    (verifyEngines as jest.Mock).mockRejectedValue(['error']);
    await run();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(processSpy).toHaveBeenCalledWith(1);
  });

  it('on 2 errors', async () => {
    (verifyEngines as jest.Mock).mockRejectedValue(['error', 'error']);
    await run();
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(processSpy).toHaveBeenCalledWith(1);
  });
});
