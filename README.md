reactdown
=============

Dead simple Markdown parser for react-like libraries

## Kudos
Kudos goes to [Jason Miller](https://github.com/developit) and the contributors
to [Snarkdown](https://github.com/developit) as this is based off their hard
work

## Features
- Still fast
- Still small
- Pass a Markdown string, get an array of react components
- Use custom `{@ }` tags and handlers
- Add `<p>` tags around text
- Integrate with code highlighters like
  [react-syntax-highlighter](https://github.com/conorhastings/react-syntax-highlighter)

## Example
```javascript
import reactdown from 'reactdown';
import React from 'react';
import ReactDOM from 'react-dom';

const customTag = (attributes) => {
  return `First is '${attributes[0]}', the rest is '${attributes.splice(1).join(',')}`
};

const markdown = `#Test

<script> evilFunction() </script>

This is some <em>test</em> markdown
- good [me](me)
- one {@custom first second "third"}
`;

ReactDOM.render(document.getElementById('app'), reactdown(markdown, {
  // createElement function
  createElement: React.createElement,
  // These HTML tags and their contents will be completely removed (defaults to <script> tags)
  removeTags: [ 'script' ],
  // These HTML tags will be removed, but their contents will be kept
  stripTags: [ 'em' ]
  // Custom tag handlers
  customTags: {
    custom: customTag
  },
  // Reference links
  referenceLinks: {
    me: 'https://me.com/'
  }
}));
```
