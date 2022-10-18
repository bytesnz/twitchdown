twitchdown
=============

[![pipeline status](https://gitlab.com/bytesnz/twitchdown/badges/master/pipeline.svg)](https://gitlab.com/bytesnz/twitchdown/commits/master)
[![npm](https://bytes.nz/b/twitchdown/npm)](https://www.npmjs.com/package/twitchdown)
[![developtment time](https://bytes.nz/b/twitchdown/custom?color=yellow&name=development+time&value=~80+hours)](https://gitlab.com/bytesnz/twitchdown/blob/master/.tickings)

Dead simple Markdown parser for react-like libraries

## Kudos
Kudos goes to [Jason Miller](https://github.com/developit) and the contributors
to [Snarkdown](https://github.com/developit/snarkdown) as this is based off
their hard work.

## Features
- Still fast
- Still small (9.5kB, 3kB gzipped)
- Still simply - pass a Markdown string, get an array of components (created with the given `createElement` function)
- Option to use custom `{@ }` tags and handlers
- Option to add `<p>` tags around text
- Option to replace `--`, `---` and `...` with an endash, emdash and ellipsis
  respectively
- Integrate with code highlighters like
  [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter)
- Minified version included (`require('twitchdown/index.min')`)

## Limitations
As twitchdown uses regular expressions for parsing, it is limited in the
formatting that it can handle. Although most good practices should be handled
correctly, here are some formatting issues that aren't
- lists with paragraphs
  ```
  - item
  - item

    with a paragraph break
  - item
  ```
- items where line continuations aren't indented
  ```
  - item
  - item
  continued item
  - item
  ```
- items without spacing between the point and the text
  ```
  - item
  -item
  - item
  ```

## Example
For a more "real life" example with lazy loading, see the
[Markdown](https://bytes.nz/8jf749h) component of [MARSS](https://gitlab.com/bytesnz/marss)
