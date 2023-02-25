# Changelog

All notable changes to this project will be documented in this file

## [0.0.5] - 2023-02-19

### Added

- Code sample for mapping posts on blog index

## [0.0.4] - 2023-02-19

### Changed

- Now catching siteMetadata from await in getStaticPaths
- Setting blogpostsperpage if no siteMetadata published

## [0.0.3] - 2023-02-19

### Added

- Try{} Catch{} to getStaticProps getStaticPaths for when content is not in Prismic

## [0.0.2] - 2023-02-18

### Added

- Code demo on index for the Heading component

## [0.0.1] - 2023-02-18

### Added

- All pages that are not blog related are hard coded
- Blog index will grab the number of posts as set in the siteMetadata BlogPostsPerPage
- Pagination for the blog example: /blog/page/2
