import { JSONStringifyPipe } from './jsonstringify.pipe';

describe('JSONStringifyPipe', () => {
  it('create an instance', () => {
    const pipe = new JSONStringifyPipe();
    expect(pipe).toBeTruthy();
  });
});
