import test from 'ava';
import twitchdown from '../index';

test('parses an unordered list with *', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] }
  ] } ], twitchdown('* One\n* Two'));
});

test('parses an unordered list with -', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] }
  ] } ], twitchdown('- One\n- Two'));
});

test('parses an unordered list with +', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] }
  ] } ], twitchdown('+ One\n+ Two'));
});

test('parses an unordered list with mixed bullet point styles', (t) => {
  t.deepEqual([ { type: 'ul', props: null, children: [
    { type: 'li', props: null, children: [ 'One' ] },
    { type: 'li', props: null, children: [ 'Two' ] },
    { type: 'li', props: null, children: [ 'Three' ] }
  ] } ], twitchdown('+ One\n* Two\n- Three'));
});

test('parses an ordered list', (t) => {
  t.deepEqual([ { type: 'ol', props: null, children: [
    { type: 'li', props: null, children: [ 'Ordered' ] },
    { type: 'li', props: null, children: [ 'Lists' ] },
    { type: 'li', props: null, children: [ 'Numbers are ignored' ] }
  ] } ], twitchdown('1. Ordered\n2. Lists\n4. Numbers are ignored'));
});

