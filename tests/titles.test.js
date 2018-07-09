import test from 'ava';
import reactdown from '../';

test('parses H1 titles', (t) => {
  t.deepEqual([ { type: 'h1', props: null, children: [ 'I like tiny libraries' ] } ], reactdown('# I like tiny libraries'));
});

test('parses underlined H1 titles', (t) => {
  t.deepEqual([ { type: 'h1', props: null, children: [ 'I like tiny libraries' ] } ], reactdown('I like tiny libraries\n==='));
});

test('parses H2 titles', (t) => {
  t.deepEqual([ { type: 'h2', props: null, children: ['I like tiny libraries'] } ], reactdown('## I like tiny libraries'));
});

test('parses H3 titles', (t) => {
  t.deepEqual([ { type: 'h3', props: null, children: ['I like tiny libraries'] } ], reactdown('### I like tiny libraries'));
});

test('parses titles with reference links', (t) => {
  t.deepEqual([ { type: 'h1', props: null, children: [ 'I like ', {
  type: 'a', props: { href: 'https://github.com/developit/reactdown' }, children: [ 'tiny libraries' ]
  } ] } ],
    reactdown('# I like [tiny libraries]\n\n[tiny libraries]: https://github.com/developit/reactdown')
  );
});

