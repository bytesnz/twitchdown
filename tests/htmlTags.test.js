import test from 'ava';
import reactdown from '../';

const options = {
  removeTags: [ 'bad' ],
  stripTags: [ 'notsobad' ]
};

test('closes not closed tags', (t) => {
  t.is('<em>stuff</em>', reactdown('<em>stuff'));
});

test('removes script tags by default', (t) => {
  t.is('<good>stuff</good>', reactdown('<script>bad stuff</script><good>stuff</good>'));
  t.is('<good>stuff</good>', reactdown('<good>stuff</good><script>bad stuff'), 'incomplete script tag');
});

test('removes tags given in removeTags', (t) => {
  t.is('<good>stuff</good>', reactdown('<bad>bad stuff</bad><good>stuff</good>', options));
  t.is('<good>stuff</good>', reactdown('<good>stuff</good><bad>bad stuff', options), 'incomplete bad tag');
});

test('strip tags but leaves content of tags given in stripTags', (t) => {
  t.is('not so bad stuff<good>stuff</good>', reactdown('<notsobad>not so bad stuff</notsobad><good>stuff</good>', options));
  t.is('<good>stuff</good>not so bad stuff', reactdown('<good>stuff</good><notsobad>not so bad stuff', options), 'incomplete strip tag');
});
