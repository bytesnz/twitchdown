import test from 'ava';
import twitchdown from '../index';

const options = {
  removeTags: [ 'bad' ],
  stripTags: [ 'notsobad' ]
};

test('closes not closed tags', (t) => {
  t.deepEqual([ { type: 'em', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<em>stuff'));
});

test('removes script tags by default', (t) => {
  t.deepEqual([ { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<script>bad stuff</script><good>stuff</good>'));
  t.deepEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<good>stuff</good><script>bad stuff'), 'incomplete script tag');
});

test('removes tags given in removeTags', (t) => {
  t.deepEqual([ { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<bad>bad stuff</bad><good>stuff</good>', options));
  t.deepEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<good>stuff</good><bad>bad stuff', options), 'incomplete bad tag');
});

test('handles tags with attributes', (t) => {
  t.deepEqual([ { type: 'good', props: { key: 1, test: 'hello', disabled: true }, children: [ 'stuff' ] } ], twitchdown('<bad test="hello" disabled>bad stuff</bad><good test="hello" disabled>stuff</good>', options), 'with attributes');
  t.deepEqual([ { type: 'good', props: { key: 0, test: 'hello', disabled: true }, children: [ 'stuff' ] } ], twitchdown('<good test="hello" disabled>stuff</good><bad test="hello" disabled>bad stuff', options), 'incomplete bad tag with attributes');
});

test('strip tags but leaves content of tags given in stripTags', (t) => {
  t.deepEqual([ 'not so bad stuff', { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<notsobad>not so bad stuff</notsobad><good>stuff</good>', options));
  t.deepEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] }, 'not so bad stuff' ], twitchdown('<good>stuff</good><notsobad>not so bad stuff', options), 'incomplete strip tag');
});
