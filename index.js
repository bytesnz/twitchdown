const TAGS = {
  '' : [null, 'em'],
  _ : [null, 'strong'],
  '~' : [null, 's'],
  '\n' : ['br', null],
  ' ' : ['br', null],
  '-': ['hr', null]
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
/**
 * Turn Markdown into react-like objects
 */
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

  let e;
  if (!options.createElement) {
    e = (type, props, children) => ({ type, props, children });
  } else {
    e = options.createElement;
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
      out = [],
      links = options.prevLinks || {},
      last = 0,
      tags = [],
      chunk, prev, token, inner, t;

  function tag(token) {
    var desc = TAGS[token.replace(/\*/g,'_')[1] || ''];

    if (desc[1] && tags.length && tags[tags.length - 1].tag === desc[1]
        && tags[tags.length - 1].token === token) {
      if (prev) {
        out.push(prev);
        prev = '';
      }
      const tag = tags.pop();
      tag.out.push(e(tag.tag, null, out));
      out = tag.out;
    } else {
      if (prev) {
        out.push(clean(prev));
        prev = '';
      }
      if (desc[0]) {
        if (options.paragraphs && desc[0] === 'br' && tags.length && tags[tags.length - 1].tag === 'p') {
          // Create a new paragraph
          flushTo('p');
          tags.push({
            tag: 'p',
            token,
            out
          });
          out = [];
        } else {
          out.push(e(desc[0]));
        }
      }

      if (desc[1]) {
        tags.push({
          tag: desc[1],
          token,
          out
        });
        out = [];
      }
    }
  }

  function flush() {
    let str = '';
    while (context.length) str += tag(context[context.length-1]);
    return str;
  }

  function flushTo(tag, justAbove) {
    var target = 0;

    if (!tags.length) {
      return;
    }

    if (tag) {
      for (target = tags.length - 1; target >= 0; target--) {
        if (tags[target].tag === tag) {
          break;
        }
      }

      if (justAbove) {
        target++;
      }

      if (target < 0 || target >= tags.length) {
        return tags.length;
      }
    }

    var i;
    for (i = tags.length - 1; i >= target; i--) {
      if (options.removeTags.indexOf(tags[i].tag.toLowerCase()) !== -1) {
        chunk = null;
      } else {
        if (prev) {
          out.push(prev)
        }

        if (options.stripTags.indexOf(tags[i].tag.toLowerCase()) !== -1) {
          chunk = null;
          tags[i].out = tags[i].out.concat(out);
        } else {
          tags[i].out.push(e(tags[i].tag, (tags[i].attributes || null), out));
        }
      }
      prev = null;
      chunk = null;
      out = tags[i].out;
    }

    chunk = null;

    if (target) {
      tags = tags.slice(0, target);
    } else {
      tags = [];
    }

    return tags.length
  }

  function clean(string) {
    return string.replace(/^\n/, '').replace('\n', ' ').replace(/\s+/, ' ');
  }

  function addPrev() {
    if (prev) {
      prev = clean(prev);
      if (options.paragraphs && !tags.length) {
        tags.push({
          tag: 'p',
          out
        });
        out = [];
      }
      out.push(clean(prev));
      prev = '';
    }
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
    else if (token[3]) {
      if (options.paragraphs) {
        flushTo('p');
      }
      if (options.highlight) {
        chunk = options.highlight(token[3], token[2])
      } else {
        chunk = e('pre', {
          className: 'code' + (token[2] && ' ' + token[2].toLowerCase())
        }, [ outdent(encodeAttr(token[3]).replace(/^\n+|\n+$/g, '')) ]);
      }
    }
    // Quote (Indent) blocks:
    else if (token[4]) {
      if (options.paragraphs) {
        flushTo('p');
      }
      chunk = e('pre', {
        className: 'code poetry'
      }, [ outdent(encodeAttr(token[4]).replace(/^\n+|\n+$/g, '')) ]);
    }
    // > Quotes, -* lists:
    else if (token[6]) {
      t = token[6];
      if (t.match(/\./)) {
        token[5] = token[5].replace(/^\d+/gm, '');
      }
      if (options.paragraphs) {
        addPrev();
        flushTo('p');
      }
      const parseOptions = Object.assign({}, options, { prevLinks: links, paragraphs: false });
      if (t === '>') {
        chunk = e('blockquote', null, parse(outdent(token[5].replace(/^>\s*/gm, '')),
            parseOptions));
      } else {
        t = t.match(/^\d+\./) ? 'ol' : 'ul';
        // const listSplitter = /^(.*)(\n|$)/gm;
        const listSplitter = /^[*+-.]\s(.*)/gm;
        const items = [];
        let item;
        while (item = listSplitter.exec(token[5])) {
          items.push(e('li', null, parse(item[1], parseOptions)));
        }
        chunk = e(t, null, items);
      }
    }
    // Images:
    else if (token[8]) {
      addPrev();
      if (options.paragraphs && !tags.length) {
        tags.push({
          tag: 'p',
          out
        });
        out = [];
      }
      chunk = e('img', {
        src: encodeAttr(token[8]),
        alt: encodeAttr(token[7])
      });
    }
    // Links:
    else if (token[10]) {
      flushTo('a', true);
      if (tags.length) {
        tags[tags.length - 1].attributes = {
          href: encodeAttr(token[11] || links[prev.toLowerCase().trim()])
        };
        chunk = flush();
      }
      flushTo('a');
    }
    else if (token[9]) {
      addPrev();
      if (options.paragraphs && !tags.length) {
        tags.push({
          tag: 'p',
          out
        });
        out = [];
      }
      // Start a tag for link
      tags.push({
        index: token.index,
        tag: 'a',
        out
      });
      out = [];
      chunk = '';
    }
    // Headings:
    else if (token[12] || token[14]) {
      t = 'h' + (token[14] ? token[14].length : (token[13][0]==='='?1:2));
      if (options.paragraphs) {
        addPrev();
        flushTo('p');
      }
      chunk = e(t, null, parse(token[12] || token[15],
        Object.assign({}, options, { prevLinks: links, paragraphs: false })));
    }
    // `code`:
    else if (token[16]) {
      chunk = e('code', null, [ encodeAttr(token[16]) ]);
    }
    // Inline formatting: *em*, **strong** & friends
    else if (token[17] || token[1]) {
      tag(token[17] || '--');
      chunk = null;
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
        chunk = null;
      }
    }
    // Capture HTML tags
    else if (token[21]) {
      chunk = '';
      if (token[20]) {
        // Closing tag
        if (tags.length) {
          flushTo(token[21]);
        }
      } else {
        // Create new tag
        addPrev();
        tags.push({
          index: token.index,
          tag: token[21],
          attributes: token[22],
          out
        });
        out = [];

        prev = '';
      }
    }

    addPrev();

    if (chunk) {
      out.push(chunk);
    }
  }

  prev = md.substring(last);
  addPrev();

  flushTo();

  return out;
}
