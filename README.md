# Terminus UI Component Generator

[![NPM version][npm-image]][npm-url]
> Generate new components for the Terminus UI library.

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

MIT © [Terminus](LICENSE)


[npm-image]: https://badge.fury.io/js/generator-terminus-ui.svg
[npm-url]: https://npmjs.org/package/generator-terminus-ui

[terminus-ui]: https://github.com/GetTerminus/terminus-ui
[yeoman]: http://yeoman.io
