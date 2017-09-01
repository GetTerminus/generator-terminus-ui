'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const commands = `
$ yo terminus-ui:component my-button
$ yo terminus-ui:directive foo-bar
$ ...more coming soon...
`;

module.exports = class extends Generator {
  informUsage() {
    const message = `
      Welcome to the ${chalk.magenta('Terminus UI')} generator!
\n
      Commands:
        ${commands}
    `;

    this.log(
      yosay(
        message,
        {
          maxLength: 60,
        }
      )
    );
  }
};
