twitchdown
=============

Dead simple Markdown parser for react-like libraries

## Kudos
Kudos goes to [Jason Miller](https://github.com/developit) and the contributors
to [Snarkdown](https://github.com/developit) as this is based off their hard
work

## Features
- Still fast
- Still small
- Still simply - pass a Markdown string, get an array of components (created with the given `createElement` function)
- Use custom `{@ }` tags and handlers
- Add `<p>` tags around text
- Integrate with code highlighters like
  [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter)

## Example
For a more "real life" example with lazy loading, see the
[Markdown](https://bytes.nz/8jf749h) component of [MARSS](https://gitlab.com/bytesnz/marss)
````javascript
import twitchdown from 'twitchdown';
import React from 'react';
import ReactDOM from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highligher/styles/hljs';

const customTag = (attributes) => {
  return `First is '${attributes[0]}', the rest is '${attributes.splice(1).join(',')}`
};

const highlighter = (code, language) => {
  return React.createElement(SyntaxHighlighter, {
    showLineNumbers: true
    style: defaultStyle,
    language
  }, [ code ]);
}

const markdown = `#Test

<script> evilFunction() </script>

This is some <em>test</em> markdown
- good [me](me)
- one {@custom first second "third"}

\`\`\`javascript
function hello() {
  console.debug('hello');
}
\`\`\`
`;

ReactDOM.render(document.getElementById('app'), twitchdown(markdown, {
  // createElement function
  createElement: React.createElement,
  // Highlighter function for code blocks
  highlighter: highlighter,
  // These HTML tags and their contents will be completely removed (defaults to <script> tags)
  removeTags: [ 'script' ],
  // These HTML tags will be removed, but their contents will be kept
  stripTags: [ 'em' ],
  // Custom tag handlers
  customTags: {
    custom: customTag
  },
  // Reference links
  referenceLinks: {
    me: 'https://example.com/'
  },
  // Add id tags to any headings
  headingIds: true,
  // Wrap text in p tags
  paragraphs: true
}));
````
