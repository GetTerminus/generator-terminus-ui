'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _startCase = require('lodash.startcase');
const mkdirp = require('mkdirp');
const utils = require('./../../utils.js');

const LIB_PREFIX = 'Ts';
const COMPONENT_PREFIX = LIB_PREFIX.toLowerCase();
const COMPONENT_SUFFIX = 'Component';
const MODULE_SUFFIX = 'Module';
const MODULE_FILE = 'src/lib/src/module.ts';
const INDEX_PATH = 'src/lib/index.ts';
const DEMO_COMPONENT_PATH = `src/demo/src/app/components/`;
const DEMO_COMPONENTS_FILE = `${DEMO_COMPONENT_PATH}/components.constant.ts`;
const CS_CONFIG_FILE = `tooling/cz-config.js`;

/*
 * Full path for component:
 *
 * 1. Generate all files (module, component html|scss|spec|ts)
 * 2. Import file to lib/src/module.ts
 * 3. Add to imports array in lib/src/module.ts
 * 4. Add to exports array in lib/src/module.ts
 * 5. Export file from lib/index.ts
 * 6. Create demo component
 * 7. Add component to components.ts components array
 * 7. Add component to demo module
 * 8. Add route for component
 * 9. Add new scope to `cz-config`
 */

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // Require a component name to be passed in
    this.argument('name', {
      type: String,
      desc: 'The name of the component (`button` or `my-button`)',
      required: true
    });

    // Name: `button`
    // Pretty: `My Button`
    this.options.prettyName = _startCase(this.options.name);
    // Pascal: `MyButton`
    this.options.pascalName = this.options.prettyName.replace(/ +/g, '');
    // Module name: `TsMyButtonModule`
    this.options.moduleName = `${LIB_PREFIX}${this.options.pascalName}${MODULE_SUFFIX}`;
    // Component name: `TsMyButtonComponent`
    this.options.componentName = `${LIB_PREFIX}${this.options.pascalName}${COMPONENT_SUFFIX}`;
    // Component selector: `ts-my-button`
    this.options.componentSelector = `${COMPONENT_PREFIX}-${this.options.name}`;
  }

  /**
   * Create the new UI component
   */
  createComponentFiles() {
    this.log(yosay(
      `Generating ${chalk.red(this.options.name)} component.`
    ));

    this.log('Generating files.');

    const destinationDir = this.destinationPath(`src/lib/src/${this.options.name}/`);

    mkdirp(destinationDir, err => {
      if (err) {
        console.error(err);
      } else {
        // Create the component module
        this.fs.copyTpl(
          this.templatePath('module.ts'),
          this.destinationPath(`${destinationDir}/${this.options.name}.module.ts`),
          {
            kebabName: this.options.name,
            moduleName: this.options.moduleName,
            componentName: this.options.componentName
          }
        );

        // Create the component TS
        this.fs.copyTpl(
          this.templatePath('component.ts'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.ts`),
          {
            kebabName: this.options.name,
            componentName: this.options.componentName
          }
        );

        // Create the component SCSS
        this.fs.copyTpl(
          this.templatePath('component.scss'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.scss`),
          {
            kebabName: this.options.name,
            prettyName: this.options.prettyName
          }
        );

        // Create the component HTML
        this.fs.copyTpl(
          this.templatePath('component.html'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.html`)
        );

        // Create the component spec
        this.fs.copyTpl(
          this.templatePath('component.spec.ts'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.spec.ts`),
          {
            kebabName: this.options.name,
            componentName: this.options.componentName
          }
        );
      }
    });
  }

  /**
   * Inject the new component into the UI module
   */
  injectComponentInLibrary() {
    this.log(
      `Injecting the new ${chalk.red(this.options.prettyName)} component to the UI library.`
    );

    // Import to the module file
    utils.addToFile(
      MODULE_FILE,
      `import { ${this.options.moduleName} } from './${this.options.name}/${this.options.name}.module';`,
      utils.MODULE_IMPORT_MARKER,
    );

    // Add to imports array
    utils.addToFile(
      MODULE_FILE,
      `${this.options.moduleName},`,
      utils.MODULE_IMPORTS_MARKER,
    );

    // Add to exports array
    utils.addToFile(
      MODULE_FILE,
      `${this.options.moduleName},`,
      utils.MODULE_EXPORTS_MARKER,
    );

    // Export from the primary index file
    utils.addToFile(
      INDEX_PATH,
      `export { ${this.options.moduleName} } from './src/${this.options.name}/${this.options.name}.module';`,
      utils.INDEX_EXPORT_MARKER,
    );
  }

  /**
   * Create the demo component
   */
  addDemoComponent() {
    this.log(
      `Creating the new ${chalk.red(this.options.prettyName)} component into the demo project.`
    );

    const destinationDir = this.destinationPath(DEMO_COMPONENT_PATH);

    mkdirp(destinationDir, err => {
      if (err) {
        console.error('Error adding demo files: ', err);
      } else {
        // Create the demo component
        this.fs.copyTpl(
          this.templatePath('demo.ts'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.ts`),
          {
            kebabName: this.options.name,
            pascalName: this.options.pascalName,
            selector: this.options.componentSelector
          }
        );
      }
    });
  }

  /**
   * Inject the demo component into the demo app
   */
  injectDemoComponent() {
    this.log(
      `Injecting the new ${chalk.red(this.options.prettyName)} component into the demo project.`
    );

    // NOTE: This indentation is 'off' by design. This will generate the correct indentation when
    // injected.
    const route = `{
    path: '${this.options.name}',
    component: ${this.options.pascalName}Component,
    data: {
      name: '${this.options.prettyName}',
    },
  },`;

    // Import the demo component
    utils.addToFile(
      DEMO_COMPONENTS_FILE,
      `import { ${this.options.pascalName}Component } from './${this.options.name}.component';`,
      utils.DEMO_IMPORT_MARKER,
    );

    // Inject the route to the new demo component
    utils.addToFile(
      DEMO_COMPONENTS_FILE,
      route,
      utils.DEMO_ROUTE_MARKER,
    );
  }

  /**
   * Add the new component as an available scope in commitizen
   */
  addCommitizenScope() {
    this.log(
      `Adding a new commit scope for ${chalk.red(this.options.pascalName)}.`
    );

    utils.addToFile(
      CS_CONFIG_FILE,
      `{name: '${this.options.pascalName}'},`,
      utils.CZ_CONFIG_MARKER
    );
  }
};
