/* eslint-disable no-console */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _startCase = require('lodash.startcase');
const mkdirp = require('mkdirp');
const utilities = require('./../utilities.js');

const LIB_PREFIX = 'Ts';
const COMPONENT_PREFIX = LIB_PREFIX.toLowerCase();
const COMPONENT_SUFFIX = 'Component';
const MODULE_SUFFIX = 'Module';
const MODULE_FILE = 'terminus-ui/src/module.ts';
const INDEX_PATH = 'terminus-ui/src/index.ts';
const DEMO_COMPONENT_PATH = `src/app/components/`;
const DEMO_COMPONENTS_FILE = `${DEMO_COMPONENT_PATH}/components.constant.ts`;
const DEMO_MODULE_FILE = `src/app/app.module.ts`;
const CS_CONFIG_FILE = `tooling/cz-config.js`;
const QA_PREFIX = 'qa';


/*
 * Full path for component:
 *
 * 1. Generate all files (module, component html|scss|spec|ts)
 * 2. Import file to terminus-ui/src/module.ts
 * 3. Add to imports array in terminus-ui/src/module.ts
 * 4. Add to exports array in terminus-ui/src/module.ts
 * 5. Export file from terminus-ui/src/index.ts
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
      required: true,
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
    // Lowercased first character component name: `myButton`
    this.options.camelCaseName = this.options.pascalName.charAt(0).toLowerCase() +
      this.options.pascalName.slice(1);
    // QA flag name: `qa-my-button`
    this.options.qaFlagName = `${QA_PREFIX}-${this.options.name}`;
  }

  /**
   * Create the new UI component
   */
  createComponentFiles() {
    this.log(yosay(
      `Generating ${chalk.red(this.options.name)} component.`
    ));

    this.log('Generating files.');

    const destinationDir = this.destinationPath(`terminus-ui/src/${this.options.name}/`);

    mkdirp(destinationDir, (err) => {
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
            componentName: this.options.componentName,
          }
        );

        // Create the component TS
        this.fs.copyTpl(
          this.templatePath('component.ts'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.ts`),
          {
            kebabName: this.options.name,
            componentName: this.options.componentName,
          }
        );

        // Create the component SCSS
        this.fs.copyTpl(
          this.templatePath('component.scss'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.scss`),
          {
            kebabName: this.options.name,
            prettyName: this.options.prettyName,
          }
        );

        // Create the component HTML
        this.fs.copyTpl(
          this.templatePath('component.html'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.html`),
          {
            pascalName: this.options.pascalName,
            qaFlagName: this.options.qaFlagName,
          }
        );

        // Create the component spec
        this.fs.copyTpl(
          this.templatePath('component.spec.ts'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.spec.ts`),
          {
            kebabName: this.options.name,
            componentName: this.options.componentName,
            camelCaseComponentName: this.options.camelCaseName,
          }
        );

        // Create the component MD
        this.fs.copyTpl(
          this.templatePath('component.md'),
          this.destinationPath(`${destinationDir}/${this.options.name}.component.md`),
          {
            kebabName: this.options.name,
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
    utilities.addToFile(
      MODULE_FILE,
      `import { ${this.options.moduleName} } from './${this.options.name}/${this.options.name}.module';`,
      utilities.MARKERS.importUiComponentToUiModule
    );

    // Add to imports array
    utilities.addToFile(
      MODULE_FILE,
      `${this.options.moduleName},`,
      utilities.MARKERS.addUiComponentToUiModuleImportArray
    );

    // Add to exports array
    utilities.addToFile(
      MODULE_FILE,
      `${this.options.moduleName},`,
      utilities.MARKERS.addUiComponentToUiModuleExports
    );

    // Export from the primary index file
    utilities.addToFile(
      INDEX_PATH,
      `export * from './src/${this.options.name}/${this.options.name}.module';`,
      utilities.MARKERS.addUiComponentIndexExport
    );
  }

  /**
   * Create the demo component
   */
  addDemoComponent() {
    this.log(
      `Creating the new ${chalk.red(this.options.prettyName)} component into the demo project.`
    );

    const destinationDir = this.destinationPath(`${DEMO_COMPONENT_PATH}/${this.options.name}`);

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
            selector: this.options.componentSelector,
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
    utilities.addToFile(
      DEMO_COMPONENTS_FILE,
      `import { ${this.options.pascalName}Component } from './${this.options.name}/${this.options.name}.component';`,
      utilities.MARKERS.addDemoComponentImportToConstants
    );

    // Add the demo route
    utilities.addToFile(
      DEMO_COMPONENTS_FILE,
      route,
      utilities.MARKERS.addRouteForDemoComponent
    );

    // Import the new UI component from the library
    utilities.addToFile(
      DEMO_MODULE_FILE,
      `${this.options.moduleName},`,
      utilities.MARKERS.addUiComponentToDemoImports
    );

    // Add the UI module to the demo module imports array
    utilities.addToFile(
      DEMO_MODULE_FILE,
      `${this.options.moduleName},`,
      utilities.MARKERS.addUiComponentToUiImports
    );

    // Import the demo component file
    utilities.addToFile(
      DEMO_MODULE_FILE,
      `import { ${this.options.pascalName}Component } from './components/${this.options.name}/${this.options.name}.component';`,
      utilities.MARKERS.importDemoComponentToDemoModule
    );

    // Add the demo component to the declarations array
    utilities.addToFile(
      DEMO_MODULE_FILE,
      `${this.options.pascalName}Component,`,
      utilities.MARKERS.addDemoComponentToDeclarations
    );

  }

  /**
   * Add the new component as an available scope in commitizen
   */
  addCommitizenScope() {
    this.log(
      `Adding a new commit scope for ${chalk.red(this.options.pascalName)}.`
    );

    utilities.addToFile(
      CS_CONFIG_FILE,
      `{name: '${this.options.pascalName}'},`,
      utilities.MARKERS.addUiComponentAsCommitizenScope
    );
  }
};



