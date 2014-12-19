var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'title',
      message : 'The title of your project',
      default : 'My App'
    }, function (answers) {
      this.apptitle = answers.title;
      done();
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      { title: this.apptitle }
    );
    this.fs.copyTpl(
      this.templatePath('src/app.jsx'),
      this.destinationPath('src/app.jsx'),
      { title: this.apptitle}
    );
    [
      '.gitignore',
      'gulpfile.js',
      'package.json',
      'src/style/main.less',
      'src/style/README.md'
    ].forEach(function (filename) {
      this.fs.copy(
        this.templatePath(filename),
        this.destinationPath(filename)
      );
    }.bind(this));
  },

  install: function () {
    this.installDependencies({npm: true, bower: false});
  }
});