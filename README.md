# Terminus UI Component Generator

[![CircleCI][circle-badge]][circle-link] [![NPM version][npm-image]][npm-url] [![semantic-release][semantic-release-badge]][semantic-release] [![MIT License][license-image]][license-url]

> Generate new components for the Terminus UI library.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
  - [Component](#component)
- [License](#license)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Installation

```bash
# Install yeoman
$ npm i -g yo

# Install this generator
$ npm i -g generator-terminus-ui
```

## Usage


### Component

```bash
# Generate a new component
$ yo terminus-ui:component my-button
```

The generator expects a dash-separated all-lowercase component name and will generate the correct
module and component names.

```bash
# Example names based off of the passed in name:
$ yo terminus-ui:component my-button

# Module name: TsMyButtonModule
# Component name: TsMyButtonComponent
# Demo component name: MyButtonComponent
```

This will stub in a new component in the UI library and demo app. The exact changes are listed
below:

1. Generate UI component files:
    - `./terminus-ui/src/my-button/my-button.module.ts`
    - `./terminus-ui/src/my-button/my-button.component.ts`
    - `./terminus-ui/src/my-button/my-button.component.spec.ts`
    - `./terminus-ui/src/my-button/my-button.component.scss`
    - `./terminus-ui/src/my-button/my-button.component.html`
1. Import the `TsMyButtonModule` module inside `./terminus-ui/src/module.ts`
1. Add the `TsMyButtonModule` module to the imports array in `./terminus-ui/src/module.ts`
1. Add the `TsMyButtonModule` module to the exports array in `./terminus-ui/src/module.ts`
1. Export the `TsMyButtonModule` module from `./terminus-ui/src/index.ts`
1. Create the `MyButtonComponent` for development at `./src/app/components/my-button.component.ts`
1. Add the `MyButtonComponent` component to the demo navigation array in `./src/app/components/components.component.ts`
1. Add the new component as a scope `MyButton`


## License

MIT © [Terminus][license-url]


## TODO

- Pipe generator
- Service generator
- SCSS helper generator


<!-- LINKS -->

[npm-image]: https://badge.fury.io/js/generator-terminus-ui.svg
[npm-url]: https://npmjs.org/package/generator-terminus-ui
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
[terminus-ui]: https://github.com/GetTerminus/terminus-ui
[yeoman]: http://yeoman.io
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
[circle-badge]: https://circleci.com/gh/GetTerminus/generator-terminus-ui/tree/master.svg?style=shield
[circle-link]: https://circleci.com/gh/GetTerminus/generator-terminus-ui/tree/master

