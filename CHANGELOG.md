# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.2] - 2020-08-02

### Added
- Added `voidTags` (an array of HTML element tags that don't have a closing
  tag)

### Fixed
- Fix example around highlighter

## [1.4.1] - 2020-06-14

### Fixed
- Adding of spaces after non-block elements such as links if they are directly
  after block elements

## [1.4.0] - 2020-02-18

### Added
- `openExternalInNewWindow` option to open external links in a new window

### Fixed
- Handling of sub-lists and multi-line items in lists

## [1.3.3] - 2020-02-15

### Changed
- Fixed handling of p tags when using paragraphs option

## [1.3.2] - 2019-05-14

### Changed
- Fixed handling of void HTML elements
- Updated dependencies

## [1.3.1] - 2019-02-22
### Added
- `key` values to each element as required by React
- Render tests for both React and Preact
- Reference links to CHANGELOG

### Changed
- Fix paragraph and inline formatting issue that caused inline formatted text
  to be left outside of a paragraph
- Fixed parsing of attributes in html tags

### Removed
- `href` attribute if href not given and not reference link available

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

## 1.0.0 - 2018-07-10
Initial Release

[unreleased]: https://gitlab.com/bytesnz/twitchdown/compare/v1.4.0...dev
[1.4.0]: https://gitlab.com/bytesnz/twitchdown/compare/v1.3.3...v1.4.0
[1.3.3]: https://gitlab.com/bytesnz/twitchdown/compare/v1.3.2...v1.3.3
[1.3.2]: https://gitlab.com/bytesnz/twitchdown/compare/v1.3.1...v1.3.2
[1.3.1]: https://gitlab.com/bytesnz/twitchdown/compare/v1.3.0...v1.3.1
[1.3.0]: https://gitlab.com/bytesnz/twitchdown/compare/v1.2.0...v1.3.0
[1.2.0]: https://gitlab.com/bytesnz/twitchdown/compare/v1.1.0...v1.2.0
[1.1.0]: https://gitlab.com/bytesnz/twitchdown/compare/v1.0.1...v1.1.0
[1.0.1]: https://gitlab.com/bytesnz/twitchdown/compare/v1.0.0...v1.0.1
