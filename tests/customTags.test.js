import test from 'ava';
import twitchdown from '../index';

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

test('parses custom tag inside of image urls and links', (t) => {
  t.deepEqual([ { type: 'img', props: { src: 'CUSTOM(id,again)', alt: 'title', title: 'title' }, children: undefined } ], twitchdown('![title]({@test id "again"})', options), 'image');

  t.deepEqual([ { type: 'a', props: { href: 'CUSTOM(id,again)' }, children: [ 'Snarkdown' ] } ], twitchdown('[Snarkdown]({@test id "again"})', options), 'link');

  t.deepEqual([ 'hello ', { type: 'a', props: { href: 'CUSTOM(id,again)' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!\n[world]: {@test id "again"}', options), 'reference link');

  t.deepEqual([ { type: 'a', props: { href: 'CUSTOM(link,again)' }, children: [
    { type: 'img', props: { src: 'CUSTOM(id,again)' }, children: undefined }
  ] } ], twitchdown('[![]({@test id "again"})]({@test link "again"})', options), 'image inside link');
});

test('parses attributes in an object if given parseArguments option', (t) => {
  t.deepEqual([ {
    arguments: [ 'one', 'double=two' ],
    test: 'string',
    another: 'quoted string'
  } ], twitchdown('{@test one test=string "double=two" another="quoted string"}', {
    customTags: {
      test: (parameters) => parameters
    },
    parseArguments: true
  }), 'global parseArguments set');
  t.deepEqual([ {
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
  t.deepEqual([ [ 'one', 'test=string', 'double=two', 'another="quoted string"' ] ],
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

test('allows customTag handlers as objects', (t) => {
  t.deepEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', {
    customTags: {
      test: {
        handler: options.customTags.test
      }
    }
  }));
});

test('puts tag in a paragraph if tagsInParagrah or inParagraph set', (t) => {
  t.deepEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', {
    ...options,
    tagsInParagraph: true
  }), 'does not without paragraphs set');
  t.deepEqual([ { type: 'p', props: null, children: [ 'CUSTOM(value,value 2)' ] } ], twitchdown('{@test value "value 2"}', {
    ...options,
    paragraphs: true,
    tagsInParagraph: true
  }), 'tagsInParagraph set');
  t.deepEqual([ 'CUSTOM(value)', { type: 'p', props: null, children: [ 'CUSTOM(value,value 2)' ] } ], twitchdown('{@test value}{@again value "value 2"}', {
    customTags: {
      test: options.customTags.test,
      again: {
        handler: options.customTags.test,
        inParagraph: true
      }
    },
    paragraphs: true
  }), 'tag inParagraph set');
  t.deepEqual([ 'CUSTOM(value,value 2)' ], twitchdown('{@test value "value 2"}', {
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
