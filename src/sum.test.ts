import { sum } from './sum';

describe('sum tests', () => {
  it('1 + 1 = 2', () => {
    expect(sum(1, 1)).toBe(2);
  });

  it('random numbers sum', () => {
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);

    expect(sum(a, b)).toBe(sum(b, a));
  });
});
