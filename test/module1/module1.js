import { module1 } from '../../src/index';

it('module1', function () {
    var info = module1();
    expect(info).toMatchSnapshot();
});

