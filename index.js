const TAGS = {
  '' : ['<em>','</em>'],
  _ : ['<strong>','</strong>'],
  '~' : ['<s>','</s>'],
  '\n' : ['<br />'],
  ' ' : ['<br />'],
  '-': ['<hr />']
};

/** Outdent a string based on the first indented line's leading whitespace
 *  @private
 */
function outdent(str) {
  return str.replace(RegExp('^'+(str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

/** Encode special attribute characters to HTML entities in a String.
 *  @private
 */
function encodeAttr(str) {
  return (str+'').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// export default function parse(md, prevLinks) {
module.exports = function parse(md, options) {
  if (!options) {
    options = {};
  }
  if (!options.removeTags) {
    options.removeTags = ['script'];
  }
  if (!options.stripTags) {
    options.stripTags = [];
  }

  // (!1!(?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|
  // (?:^``` *(!2!\w*)\n(!3![\s\S]*?)\n```$)|  - Code block
  // (!4!(?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)| - Code continue
  // (!5!(?:(?:^|\n)(!6![>*+-]|\d+\.)\s+.*)+)| - Quotes and lists
  // (?:\!\[(!7![^\]]*?)\]\((!8![^\)]+?)\))|  - Image
  // (!9!\[)|(!10!\](?:\((!11![^\)]+?)\))?)|  - Link
  // (?:(?:^|\n+)(!12![^\s].*)\n(!13!\-{3,}|={3,})(?:\n+|$))|    - Headings
  // (?:(?:^|\n+)(!14!#{1,6})\s*(!15!.+)(?:\n+|$))|  - Headings
  // (?:`(!16![^`].*?)`)|  - Inline code
  // (!17!  \n\n*|\n{2,}|__|\*\*|[_*]|~~)| - Formatters
  // (?:{@(!18!\w+)(!19!(?:\s+(?:"(?:\\"|[^"])*"|[^"\s}]*))*)})| - Special MD Tag
  // (?:<\s*(!20!\/)(!21!\w+)(!22! [^>]+)?>) - HTML Tag
  let tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)|(?:{@(\w+)((?:\s+(?:"(?:\\"|[^"])*"|[^"\s}]*))*)})|(?:<\s*(\/?)(\w+)( [^>]+)?>)/gm,
      context = [],
      out = '',
      links = options.prevLinks || {},
      last = 0,
      tags = [],
      chunk, prev, token, inner, t;

  function tag(token) {
    var desc = TAGS[token.replace(/\*/g,'_')[1] || ''],
      end = context[context.length-1]==token;
    if (!desc) return token;
    if (!desc[1]) return desc[0];
    context[end?'pop':'push'](token);
    return desc[end|0];
  }

  function flush() {
    let str = '';
    while (context.length) str += tag(context[context.length-1]);
    return str;
  }

  md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, (s, name, url) => {
    links[name.toLowerCase()] = url;
    return '';
  }).replace(/^\n+|\n+$/g, '');

  while ( (token=tokenizer.exec(md)) ) {
    prev = md.substring(last, token.index);
    last = tokenizer.lastIndex;
    chunk = token[0];

    if (prev.match(/[^\\](\\\\)*\\$/)) {
      // escaped
    }
    // Code/Indent blocks:
    else if (token[3] || token[4]) {
      chunk = '<pre class="code '+(token[4]?'poetry':token[2].toLowerCase())+'">'+outdent(encodeAttr(token[3] || token[4]).replace(/^\n+|\n+$/g, ''))+'</pre>';
    }
    // > Quotes, -* lists:
    else if (token[6]) {
      t = token[6];
      if (t.match(/\./)) {
        token[5] = token[5].replace(/^\d+/gm, '');
      }
      inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')),
        Object.assign({}, options, { prevLinks: links }));
      if (t==='>') t = 'blockquote';
      else {
        t = t.match(/\./) ? 'ol' : 'ul';
        inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
      }
      chunk = '<'+t+'>' + inner + '</'+t+'>';
    }
    // Images:
    else if (token[8]) {
      chunk = `<img src="${encodeAttr(token[8])}" alt="${encodeAttr(token[7])}">`;
    }
    // Links:
    else if (token[10]) {
      out = out.replace('<a>', `<a href="${encodeAttr(token[11] || links[prev.toLowerCase()])}">`);
      chunk = flush() + '</a>';
    }
    else if (token[9]) {
      chunk = '<a>';
    }
    // Headings:
    else if (token[12] || token[14]) {
      t = 'h' + (token[14] ? token[14].length : (token[13][0]==='='?1:2));
      chunk = '<'+t+'>' + parse(token[12] || token[15],
        Object.assign({}, options, { prevLinks: links })) + '</'+t+'>';
    }
    // `code`:
    else if (token[16]) {
      chunk = '<code>'+encodeAttr(token[16])+'</code>';
    }
    // Inline formatting: *em*, **strong** & friends
    else if (token[17] || token[1]) {
      chunk = tag(token[17] || '--');
    }
    // Tags:
    else if (token[18]) {
      if (options.customTags && options.customTags[token[18]]) {
        let tagTokenizer = /\s+(?:"((?:\\"|[^"])*)"|([^"\s}]+))/g,
            parameters = [],
            parameter;
        while ( (parameter = tagTokenizer.exec(token[19])) ) {
          parameters.push((parameter[1] && parameter[1].replace(/\\"/g, '"')) || parameter[2]);
        }
        if (parameters.length) {
          chunk = options.customTags[token[18]](parameters);
        } else {
          chunk = options.customTags[token[18]]();
        }
      } else {
        chunk = '';
      }
    }
    // Capture HTML tags
    else if (token[21]) {
      chunk = '';
      if (token[20]) {
        // Closing tag
        if (tags.length) {
          // Find closing tag
          let i;
          for (i = tags.length - 1; i >= 0; i--) {
            if (tags[i].tag === token[21]) {
              break;
            }
          }
          if (i >= 0) {
            let j;
            // Close all tags
            for (j = tags.length - 1; j >= i; j--) {
              if (options.removeTags.indexOf(tags[j].tag.toLowerCase()) !== -1) {
              } else if (options.stripTags.indexOf(tags[j].tag.toLowerCase()) !== -1) {
                chunk = out + prev + chunk;
              } else {
                chunk = '<' + tags[j].tag + (tags[j].attributes || '') + '>' + out + prev + chunk + '</' + tags[j].tag + '>';
              }
              prev = '';
              out = tags[j].out;
            }
            tags = tags.slice(0, i);
          }
        }
      } else {
        // Create new tag
        tags.push({
          tag: token[21],
          attributes: token[22],
          out: out + prev
        });

        prev = '';
        out = '';
      }
    }
    out += prev;
    out += chunk;
  }

  out = out + md.substring(last) + flush();

  // Close all open tags
  if (tags.length) {
    for (let i = tags.length - 1; i >= 0; i--) {
      if (options.removeTags.indexOf(tags[i].tag.toLowerCase()) !== -1) {
        out = '';
      } else if (options.stripTags.indexOf(tags[i].tag.toLowerCase()) !== -1) {
      } else {
        out = '<' + tags[i].tag + (tags[i].attributes || '') + '>' + out + '</' + tags[i].tag + '>';
      }
      out = tags[i].out + out;
    }
  }

  return out.trim();
}
