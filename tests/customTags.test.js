const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

const options = {
  customTags: {
    test: (parameters) => parameters ? `CUSTOM(${parameters})` : 'CUSTOM_NO_TAGS'
  }
};

test('removes custom tags if no handler for them', () => {
  assert.deepStrictEqual([], twitchdown('{@unknown}', options));
});

test('parses and calls handler for a custom tag with no parameters', () => {
  assert.deepStrictEqual([ 'CUSTOM_NO_TAGS' ], twitchdown('{@test}', options));
});

test('parses and calls handler for a custom tag with parameters', () => {
  assert.deepStrictEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', options));
});

test('parses multiple custom tags correctly', () => {
  assert.deepStrictEqual([ 'CUSTOM(value,value 2)', 'CUSTOM(another "valu}e,again)' ], twitchdown('{@test value "value 2"}{@test "another \\"valu}e" again}', options));
});

test('parses custom tag inside of image urls and links', () => {
  assert.deepStrictEqual([ { type: 'img', props: { key: 0 , src: 'CUSTOM(id,again)', alt: 'title', title: 'title' } } ], twitchdown('![title]({@test id "again"})', options), 'image');

  assert.deepStrictEqual([ { type: 'a', props: { key: 0 , href: 'CUSTOM(id,again)' }, children: [ 'Snarkdown' ] } ], twitchdown('[Snarkdown]({@test id "again"})', options), 'link');

  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0 , href: 'CUSTOM(id,again)' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!\n[world]: {@test id "again"}', options), 'reference link');

  assert.deepStrictEqual([ { type: 'a', props: { key: 0 , href: 'CUSTOM(link,again)' }, children: [
    { type: 'img', props: { key: 1 , src: 'CUSTOM(id,again)' } }
  ] } ], twitchdown('[![]({@test id "again"})]({@test link "again"})', options), 'image inside link');
});

test('parses attributes in an object if given parseArguments option', () => {
  assert.deepStrictEqual([ {
    arguments: [ 'one', 'double=two' ],
    test: 'string',
    another: 'quoted string'
  } ], twitchdown('{@test one test=string "double=two" another="quoted string"}', {
    customTags: {
      test: (parameters) => parameters
    },
    parseArguments: true
  }), 'global parseArguments set');
  assert.deepStrictEqual([ {
    arguments: [ 'one', 'double=two' ],
    test: 'string',
    another: 'quoted string'
  } ], twitchdown('{@test one test=string "double=two" another="quoted string"}', {
    customTags: {
      test: {
        handler: (parameters) => parameters,
        parseArguments: true
      }
    }
  }), 'tag parseArguments set');
  assert.deepStrictEqual([ [ 'one', 'test=string', 'double=two', 'another="quoted string"' ] ],
      twitchdown('{@test one test=string "double=two" another="quoted string"}', {
    customTags: {
      test: {
        handler: (parameters) => parameters,
        parseArguments: false
      }
    },
    parseArguments: true
  }), 'tag parseArguments overriding global');
});

test('allows customTag handlers as objects', () => {
  assert.deepStrictEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', {
    customTags: {
      test: {
        handler: options.customTags.test
      }
    }
  }));
});

test('puts tag in a paragraph if tagsInParagrah or inParagraph set', () => {
  assert.deepStrictEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', {
    ...options,
    tagsInParagraph: true
  }), 'does not without paragraphs set');
  assert.deepStrictEqual([ { type: 'p', props: { key: 0 }, children: [ 'CUSTOM(value,value 2)' ] } ], twitchdown('{@test value "value 2"}', {
    ...options,
    paragraphs: true,
    tagsInParagraph: true
  }), 'tagsInParagraph set');
  assert.deepStrictEqual([ 'CUSTOM(value)', { type: 'p', props: { key: 0 }, children: [ 'CUSTOM(value,value 2)' ] } ], twitchdown('{@test value}{@again value "value 2"}', {
    customTags: {
      test: options.customTags.test,
      again: {
        handler: options.customTags.test,
        inParagraph: true
      }
    },
    paragraphs: true
  }), 'tag inParagraph set');
  assert.deepStrictEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', {
    customTags: {
      test: {
        handler: options.customTags.test,
        inParagraph: false
      }
    },
    tagsInParagraph: true,
    paragraphs: true
  }), 'tag inParagraph overrides global tagsInParagraph');
});
