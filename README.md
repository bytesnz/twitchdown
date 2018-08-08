twitchdown
=============

[![pipeline status](https://gitlab.com/bytesnz/twitchdown/badges/master/pipeline.svg)](https://gitlab.com/bytesnz/twitchdown/commits/master)
[![npm](https://bytes.nz/b/twitchdown/npm)](https://gitlab.com/bytesnz/twitchdown)

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
- Minified version included (`require('twitchdown/index.min')`)

## Example
For a more "real life" example with lazy loading, see the
[Markdown](https://bytes.nz/8jf749h) component of [MARSS](https://gitlab.com/bytesnz/marss)


```javascript
var twitchdown = require('twitchdown');
// var React = require('react');
// var SyntaxHighlighter = require('react-syntax-highlighter');
// var docco = require('react-syntax-highligher/styles/hljs').docco;

// Valid if options.parseArguments is falsey
var customTag = (attributes) => {
  return `First is '${attributes[0]}', the rest is '${attributes.splice(1).join(',')}`
};

// Valid if options.parseArguments is truthy
var superTag = (attributes) => {
  return `You are super '${attributes.name}' because ${attributes.arguments.join(',')}`
};

// var highlighter = (code, language) => {
//   return React.createElement(SyntaxHighlighter, {
//     showLineNumbers: true,
//     style: defaultStyle,
//     language
//   }, [ code ]);
// }

const markdown = `#Test

<script> evilFunction() </script>

This is some <em>test</em> markdown
- good [me](me)
- one {@custom first second "third"}

{@super name=bob twitch}

\`\`\`javascript
function hello() {
  console.debug('hello');
}
\`\`\`
`;

var elements = twitchdown(markdown, {
  // Function to use for creating elements
  // createElement: React.createElement,
  // Highlighter function for code blocks
  //highlighter: highlighter,
  // These HTML tags and their contents will be completely removed (defaults to <script> tags)
  removeTags: [ 'script' ],
  // These HTML tags will be removed, but their contents will be kept
  stripTags: [ 'em' ],
  // Custom tag handlers
  customTags: {
    custom: {
      handler: customTag,
      // If set, this will override the global `tagsInParagraph` option
      inParagraph: true,
      // If set, this will override the global `parseArguments` option
      parseArguments: false
    },
    super: superTag
  },
  // Whether or not to parse attributes passed to custom tags. Note that when
  // enabled ALL custom tag arguments will be parsed into an object, rather
  // than left as an array
  parseArguments: true,
  // If true and `paragraphs` is true , custom tags will be placed p tags
  tagsInParagraph: false,
  // Reference links
  referenceLinks: {
    me: 'https://example.com/'
  },
  // Add id tags to any headings
  headingIds: true,
  // Wrap text in p tags
  paragraphs: true
});

console.log(elements);

```


# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2018-08-08
### Added
- Add `parseArguments` option to parse custom tag attributes into an object
- Add `tagsInParagraph` option to set if custom tags should be placed in
  p tags
- Allow customTags to be given as Objects with their own values for the
  `parseArguments` and `tagsInParagraph` (as `inParagraph`)

### Changed
- Set main file as non-minified version

## [1.2.0] - 2018-07-24
### Added
- Added `title` attribute to images

### Changed
- Fix so attributes are passed to custom tag function as an array for
  custom tags inside of urls for links and images as they are for tags outside
  of urls

### Removed
- Empty `alt` attributes from images with no title

## [1.1.0] - 2018-07-16
### Added
- Allow custom tags in image and link urls
- Added headingIds option to add id attributes to heading based on the text
  of the heading (replacing spaces with `-` and removing all symbols etc
- Add tests to linting and ensure all development packages are up-to-date

### Changed
- Fix placement of components in p tags
- Set main file as minified version

## [1.0.1] - 2018-07-11
### Added
- Linting of code

### Changed
- Change code to ES3

## [1.0.0] - 2018-07-10
Initial Release
