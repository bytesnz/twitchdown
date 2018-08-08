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
