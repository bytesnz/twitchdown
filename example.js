const twitchdown = require('twitchdown');

const customTag = (attributes) => {
  return `First is '${attributes[0]}', the rest is '${attributes.splice(1).join(',')}`
};

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

twitchdown(markdown, {
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
    me: 'https://me.com/'
  },
  // Add id tags to any headings
  headingIds: true,
  // Wrap text in p tags
  paragraphs: true
});
