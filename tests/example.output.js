module.exports =
[
  { type: "h2", props: { key: 0 , id: "test" }, children: [ "Test" ] },
  { type: "p", props: { key: 2 }, children: [ "This is some ", "test", " markdown" ] },
  { type: "ul", props: { key: 7 }, children: [
    { type: "li", props: { key: 4 }, children: [
      "good ",
      { type: "a", props: { key: 0 , href: "me" }, children: [ "me" ] }
    ] },
    { type: "li", props: { key: 5 }, children: [
      "one ", "&mdash;", " ",
      "First is 'first', the rest is 'second,third"
    ] },
    { type: "li", props: { key: 6 }, children: [
      "list item over multiple lines",
      { type: "ul", props: { key: 2 }, children: [
        { type: "li", props: { key: 0 }, children: [
          "sub list over multiple lines"
        ] },
        { type: "li", props: { key: 1 }, children: [
          "woot"
        ] }
      ] }
    ] }
  ] },
  "You are super 'bob' because twitch",
  { type: "pre", props: { key: 8 , className: "code javascript" }, children: [
    "function hello() {\n  console.debug('hello');\n}"
  ] }
];
