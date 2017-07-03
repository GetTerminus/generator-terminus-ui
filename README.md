# Terminus UI Component Generator

[![NPM version][npm-image]][npm-url] [![semantic-release][semantic-release-badge]][semantic-release] [![MIT License][license-image]][license-url]

> Generate new components for the Terminus UI library.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

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
    - `./src/lib/src/my-button/my-button.module.ts`
    - `./src/lib/src/my-button/my-button.component.ts`
    - `./src/lib/src/my-button/my-button.component.spec.ts`
    - `./src/lib/src/my-button/my-button.component.scss`
    - `./src/lib/src/my-button/my-button.component.html`
1. Import the `TsMyButtonModule` module inside `./src/lib/src/module.ts`
1. Add the `TsMyButtonModule` module to the imports array in `./src/lib/src/module.ts`
1. Add the `TsMyButtonModule` module to the exports array in `./src/lib/src/module.ts`
1. Export the `TsMyButtonModule` module from `./src/lib/index.ts`
1. Create the `MyButtonComponent` for development at `./src/demo/src/app/components/my-button.component.ts`
1. Add the `MyButtonComponent` component to the demo navigation array in `./src/demo/src/app/components/components.component.ts`


## TODO

- Directive generator
- Pipe generator
- Service generator
- SCSS helper generator


## License

MIT © [Terminus][license-url]


[npm-image]: https://badge.fury.io/js/generator-terminus-ui.svg
[npm-url]: https://npmjs.org/package/generator-terminus-ui
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release]: https://github.com/semantic-release/semantic-release
[terminus-ui]: https://github.com/GetTerminus/terminus-ui
[yeoman]: http://yeoman.io
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
