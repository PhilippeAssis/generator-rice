'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option("controller")

    this.option("services")
  }

  init() {
    this.log(yosay(
      chalk.green('Welcome to rice!')
    ));

    this.argument('args', {
      type: Array,
      required: false
    });

    if (this.options && this.options.args) {
      return;
    }

    if (this.options.controller) {
      var prompts = [{
        type: 'input',
        name: 'controllername',
        message: 'Your controller name',
        default: this.appname
      }]
    }
    else if (this.options.services) {
      var prompts = [{
        type: 'input',
        name: 'servicesname',
        message: 'Your services name',
        default: this.appname
      }]
    }
    else {
      var prompts = [{
        type: 'input',
        name: 'appname',
        message: 'Your project name',
        default: this.appname
      }, {
        type: 'input',
        name: 'apppath',
        message: 'Project directory name',
        default: 'app'
      }, {
        type: 'input',
        name: 'publicpath',
        message: 'Public directory name',
        default: 'public'
      }];
    }

    return this.prompt(prompts).then(function(props) {
      this.props = props;
    }.bind(this));
  }

  writing() {
    if (this.options.controller) {
      this.fs.copyTpl(
        this.templatePath('controller.js'),
        this.destinationPath(`controllers/${this.props.controllername}Controller.js`), {
          "name": this.props.controllername
        }
      );
      return;
    }

    if (this.options.services) {
      this.fs.copyTpl(
        this.templatePath('service.js'),
        this.destinationPath(`services/${this.props.servicesname}Service.js`), {
          "name": this.props.servicesname
        }
      );
      return;
    }

    if (this.options && this.options.args) {
      var name = (this.options.args[1]) ? this.options.args[1] : this.options.name,
        filename = name + this.options.args[0].substr(0, 1).toUpperCase() + this.options.args[0].substr(1)

      this.fs.copyTpl(
        this.templatePath(`${this.options.args[0]}.js`),
        this.destinationPath(`${filename}.js`), {
          name: (this.options.args[1]) ? this.options.args[1] : this.options.name
        }
      );
      return;
    }

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        "appname": this.props.appname
      }
    );

    this.fs.copy(
      this.templatePath('default'),
      this.destinationPath(`./${this.props.apppath}`)
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        "apppath": this.props.apppath,
        "publicpath": this.props.publicpath
      }
    );

    this.fs.copyTpl(
      this.templatePath('gitignore.txt'),
      this.destinationPath('.gitignore'), {
        "publicpath": this.props.publicpath
      }
    );
  }

  install() {
    if (this.options.controller) {
      return;
    }

    this.npmInstall(['ricejs'], {
      'save': true
    });

    this.npmInstall(['gulp', 'gulp-autowatch',
      'gulp-clean', 'gulp-clean-css', 'gulp-concat',
      'gulp-less', 'gulp-stylus',
      'gulp-livereload', 'gulp-plumber', 'gulp-pug', 'gulp-sourcemaps',
      'gulp-babel', 'babel-preset-env', 'babel-cli', 'gulp-action-comment'
    ], {
      'save-dev': true
    });

    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });

    this.log("All set, good luck.")
  }
}
