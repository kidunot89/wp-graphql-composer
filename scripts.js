var shell = require('shelljs');
var path = require('path');
var map = require('lodash').map;
var makeSymlinks = require('make-symlinks');
var delSymlinks = require('del-symlinks');

shell.config.verbose = true;

var templatesDir = path.join(path.resolve(__dirname), 'templates');
var templatePaths = {
  theme: path.join(templatesDir, 'theme'),
  plugin: path.join(templatesDir, 'plugin'),
};
var workingDir = path.resolve();

module.exports = {
  /**
   * 
   * @param {string} template 
   * @param {boolean|obj} test 
   */
  init: function(template, test) {
    var options = { force: true }; 
    var selectedPath = templatePaths[template];
    const patterns = [
      templatesDir + '/*',
      ...map(templatePaths, function(value, index) {
        return '!' + value;
      })
    ];

    /**
     * Link shared dependencies to desired template.
     */
    makeSymlinks(patterns, selectedPath, options)
    .then(symlinks => {
      symlinks.forEach(symlink => {
          console.log(`${symlink.path} → ${symlink.target}`);
      });

      /**
       * If a dry-run create a temporary folder
       */
      var outputDir = (test) ? shell.tempdir() : workingDir;
      var outputPath = path.join(outputDir, 'template');

      shell.mkdir(outputPath);
      shell.cp('-RLf', `${selectedPath}/*`, `${outputPath}/`);
      shell.exec(`cd ${outputPath} && ls -la`);
      
      /**
       * Delete temporary folder and links
       */
      if ( test ) shell.rm('-rf', outputPath);
      delSymlinks([`${selectedPath}/*`])
      .then(symlinks => {
        symlinks.forEach(symlink => {
          console.log(`${symlink.replace(`${selectedPath}/`, '')} removed from ${selectedPath}`);
        });
      });
    });

    
  },
  
  build: function(dir = 'build') {
    var inputPath = path.join(workingDir, 'template');
    var outputPath = path.join(workingDir, dir);
    shell.cp('-R', inputPath + '/*', outputPath);
  }
}
