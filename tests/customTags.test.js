import test from 'ava';
import reactdown from '../';

const options = {
  customTags: {
    test: (parameters) => parameters ? `CUSTOM(${parameters})` : 'CUSTOM_NO_TAGS'
  }
};

test('removes custom tags if no handler for them', (t) => {
  t.is('', reactdown('{@unknown}', options));
});

test('parses and calls handler for a custom tag with no parameters', (t) => {
  t.is('CUSTOM_NO_TAGS', reactdown('{@test}', options));
});

test('parses and calls handler for a custom tag with parameters', (t) => {
  t.is('CUSTOM(value,value 2)', reactdown('{@test value "value 2"}', options));
});

test('parses multiple custom tags correctly', (t) => {
  t.is('CUSTOM(value,value 2)CUSTOM(another "valu}e,again)', reactdown('{@test value "value 2"}{@test "another \\"valu}e" again}', options));
});
