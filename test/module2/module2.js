import { module2 } from '../../src/index';

describe('module2', function () {
    it('print', function () {
        var info = module2.print('hello world');
        expect(info).toMatchSnapshot();
    });
});