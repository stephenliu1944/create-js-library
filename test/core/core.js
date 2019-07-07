import { core } from '../../src/index';

it('core', function() {
    var info = core();
    expect(info).toMatchSnapshot();
});

