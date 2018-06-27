import test from 'ava';
import reactdown from '../';

test('parses links', (t) => {
  t.is('<a href="http://github.com/developit/reactdown">Snarkdown</a>', reactdown('[Snarkdown](http://github.com/developit/reactdown)'));
});

test('parses anchor links', (t) => {
  t.is('<a href="#example">Example</a>', reactdown('[Example](#example)'));
});

test('parses images', (t) => {
  t.is('<img src="foo.png" alt="title">', reactdown('![title](foo.png)'));
  t.is('<img src="foo.png" alt="">', reactdown('![](foo.png)'));
});

test('parses images within links', (t) => {
  t.is('<a href="#toc"><img src="toc.png" alt=""></a>', reactdown('[![](toc.png)](#toc)'));
  t.is('<a href="#a"><img src="a.png" alt="a"></a> <a href="#b"><img src="b.png" alt="b"></a>', reactdown('[![a](a.png)](#a) [![b](b.png)](#b)'));
});

test('parses reference links', (t) => {
  t.is('hello <a href="http://world.com">World</a>!', reactdown('\nhello [World]!\n[world]: http://world.com'));
});

test('parses reference links without creating excessive linebreaks', (t) => {
  t.is('hello <a href="http://world.com">World</a>!', reactdown('\nhello [World]!\n\n[world]: http://world.com'));
});

