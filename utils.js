var path = require('path');
var fs = require('fs');
/*
 *var ngParseModule = require('ng-parse-module');
 */

exports.MODULE_IMPORT_MARKER = '// INJECT IMPORT TO MODULE';
exports.MODULE_IMPORTS_MARKER = '// INJECT IMPORT IN MODULE ARRAY';
exports.MODULE_EXPORTS_MARKER = '// INJECT EXPORT IN MODULE ARRAY';
exports.INDEX_EXPORT_MARKER = '// INJECT EXPORT IN LIB INDEX';

exports.DEMO_IMPORT_MARKER = '// INJECT DEMO IMPORT';
exports.DEMO_ROUTE_MARKER = '// INJECT DEMO ROUTE';
exports.CZ_CONFIG_MARKER = '// INJECT COMPONENT SCOPE';

exports.addToFile = function (filename, lineToAdd, beforeMarker) {
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
