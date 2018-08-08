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
