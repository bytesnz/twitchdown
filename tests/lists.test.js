import test from 'ava';
import twitchdown from '../index';

test('parses an unordered list with *', (t) => {
  t.deepEqual([ { type: 'ul', props: { key: 2 }, children: [
    { type: 'li', props: { key: 0 }, children: [ 'One' ] },
    { type: 'li', props: { key: 1 }, children: [ 'Two' ] }
  ] } ], twitchdown('* One\n* Two'));
});

test('parses an unordered list with -', (t) => {
  t.deepEqual([ { type: 'ul', props: { key: 2 }, children: [
    { type: 'li', props: { key: 0 }, children: [ 'One' ] },
    { type: 'li', props: { key: 1 }, children: [ 'Two' ] }
  ] } ], twitchdown('- One\n- Two'));
});

test('parses an unordered list with +', (t) => {
  t.deepEqual([ { type: 'ul', props: { key: 2 }, children: [
    { type: 'li', props: { key: 0 }, children: [ 'One' ] },
    { type: 'li', props: { key: 1 }, children: [ 'Two' ] }
  ] } ], twitchdown('+ One\n+ Two'));
});

test('parses an unordered list with mixed bullet point styles', (t) => {
  t.deepEqual([ { type: 'ul', props: { key: 3 }, children: [
    { type: 'li', props: { key: 0 }, children: [ 'One' ] },
    { type: 'li', props: { key: 1 }, children: [ 'Two' ] },
    { type: 'li', props: { key: 2 }, children: [ 'Three' ] }
  ] } ], twitchdown('+ One\n* Two\n- Three'));
});

test('parses an ordered list', (t) => {
  t.deepEqual([ { type: 'ol', props: { key: 3 }, children: [
    { type: 'li', props: { key: 0 }, children: [ 'Ordered' ] },
    { type: 'li', props: { key: 1 }, children: [ 'Lists' ] },
    { type: 'li', props: { key: 2 }, children: [ 'Numbers are ignored' ] }
  ] } ], twitchdown('1. Ordered\n2. Lists\n4. Numbers are ignored'));
});

test('parses an unordered list across multiple lines', (t) => {
  t.deepEqual([ { type: 'ul', props: { key: 3 }, children: [
    { type: 'li', props: { key: 0 }, children: [ 'One' ] },
    { type: 'li', props: { key: 1 }, children: [ 'Two two' ] },
    { type: 'li', props: { key: 2 }, children: [ 'Three' ] }
  ] } ], twitchdown('- One\n- Two\n  two\n- Three'));
});

