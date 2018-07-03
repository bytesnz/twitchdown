import test from 'ava';
import reactdown from '../';

const options = {
  removeTags: [ 'bad' ],
  stripTags: [ 'notsobad' ]
};

test('closes not closed tags', (t) => {
  t.deepEqual([ { type: 'em', props: null, children: [ 'stuff' ] } ], reactdown('<em>stuff'));
});

test('removes script tags by default', (t) => {
  t.deepEqual([ { type: 'good', props: null, children: [ 'stuff' ] } ], reactdown('<script>bad stuff</script><good>stuff</good>'));
  t.deepEqual([ { type: 'good', props: null, children: [ 'stuff' ] } ], reactdown('<good>stuff</good><script>bad stuff'), 'incomplete script tag');
});

test('removes tags given in removeTags', (t) => {
  t.deepEqual([ { type: 'good', props: null, children: [ 'stuff' ] } ], reactdown('<bad>bad stuff</bad><good>stuff</good>', options));
  t.deepEqual([ { type: 'good', props: null, children: [ 'stuff' ] } ], reactdown('<good>stuff</good><bad>bad stuff', options), 'incomplete bad tag');
});

test('strip tags but leaves content of tags given in stripTags', (t) => {
  t.deepEqual([ 'not so bad stuff', { type: 'good', props: null, children: [ 'stuff' ] } ], reactdown('<notsobad>not so bad stuff</notsobad><good>stuff</good>', options));
  t.deepEqual([ { type: 'good', props: null, children: [ 'stuff' ] }, 'not so bad stuff' ], reactdown('<good>stuff</good><notsobad>not so bad stuff', options), 'incomplete strip tag');
});
