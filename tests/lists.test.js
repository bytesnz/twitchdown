import test from 'ava';
import reactdown from '../';

test('parses an unordered list with *', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] }
  ] } ], reactdown('* One\n* Two'));
});

test('parses an unordered list with -', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] }
  ] } ], reactdown('- One\n- Two'));
});

test('parses an unordered list with +', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] }
  ] } ], reactdown('+ One\n+ Two'));
});

test('parses an unordered list with mixed bullet point styles', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] },
    { type: 'li', props: null, children: [ 'Three' ] }
  ] } ], reactdown('+ One\n* Two\n- Three'));
});

test('parses an ordered list', (t) => {
  t.deepEqual([ { type: 'ol', props: null, children: [
    { type: 'li', props: null, children: [ 'Ordered' ] },
    { type: 'li', props: null, children: [ 'Lists' ] },
    { type: 'li', props: null, children: [ 'Numbers are ignored' ] }
  ] } ], reactdown('1. Ordered\n2. Lists\n4. Numbers are ignored'));
});

