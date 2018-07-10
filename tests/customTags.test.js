import test from 'ava';
import twitchdown from '../';

const options = {
  customTags: {
    test: (parameters) => parameters ? `CUSTOM(${parameters})` : 'CUSTOM_NO_TAGS'
  }
};

test('removes custom tags if no handler for them', (t) => {
  t.deepEqual([], twitchdown('{@unknown}', options));
});

test('parses and calls handler for a custom tag with no parameters', (t) => {
  t.deepEqual([ 'CUSTOM_NO_TAGS' ], twitchdown('{@test}', options));
});

test('parses and calls handler for a custom tag with parameters', (t) => {
  t.deepEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', options));
});

test('parses multiple custom tags correctly', (t) => {
  t.deepEqual([ 'CUSTOM(value,value 2)', 'CUSTOM(another "valu}e,again)' ], twitchdown('{@test value "value 2"}{@test "another \\"valu}e" again}', options));
});
