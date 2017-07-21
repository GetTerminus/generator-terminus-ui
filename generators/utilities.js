const path = require('path');
const fs = require('fs');

exports.MARKERS = {
  // Import the UI component module to the UI module file
  importUiComponentToUiModule: '// INJECT: UI component to UI module',

  // Add the UI component module to the UI module import array
  addUiComponentToUiModuleImportArray: '// INJECT: Add UI component module to imports',

  // Add the UI comonent module to the module exports array
  addUiComponentToUiModuleExports: '// INJECT: Add UI component to module exports',

  // Export the UI component inside the index.ts file
  addUiComponentIndexExport: '// INJECT: Export the UI component from the module index',

  // Import the demo component into the constants file
  addDemoComponentImportToConstants: '// INJECT: Import demo component to constants file',

  // Add a new route for the demo component - MISSING
  addRouteForDemoComponent: '// INJECT: Add route for demo component',

  // Import the new UI component from the lib into the demo app module
  addUiComponentToDemoImports: '// INJECT: Add new UI component to demo UI imports',

  // Add the new UI component in the demo imports array
  addUiComponentToUiImports: '// INJECT: Add new UI component to demo module imports array',

  // Import the demo component file to the demo module
  importDemoComponentToDemoModule: '// INJECT: Import demo component file',

  // Add demo component to the demo module declarations
  addDemoComponentToDeclarations: '// INJECT: Add demo component to declarations',

  // Add the new UI component as a commitizen scope
  addUiComponentAsCommitizenScope: '// INJECT: Add commitizen scope',
};




/**
 * Helper method to inject a line to a file
 *
 * @param {String} filename The name of the file to edit
 * @param {String} lineToAdd The content to add to the file
 * @param {String} beforeMarker The marker to inject the content above
 */
exports.addToFile = function(filename, lineToAdd, beforeMarker) {
  try {
    const fullPath = path.resolve(process.cwd(), filename);
    let fileSrc = fs.readFileSync(fullPath, 'utf8');
    const indexOf = fileSrc.indexOf(beforeMarker);
    const lineStart = fileSrc.substring(0, indexOf).lastIndexOf('\n') + 1;
    const indent = fileSrc.substring(lineStart, indexOf);
    fileSrc = fileSrc.substring(0, indexOf) + lineToAdd + '\n' + indent + fileSrc.substring(indexOf);

    fs.writeFileSync(fullPath, fileSrc);
  } catch (e) {
    throw e;
  }
};
