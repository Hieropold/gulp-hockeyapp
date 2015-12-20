[![npm version](https://badge.fury.io/js/gulp-hockeyapp.svg)](https://badge.fury.io/js/gulp-hockeyapp)

# gulp-hockeyapp

Gulp task for uploading builds to HockeyApp service. Only one HockeyApp API method is supported - [Upload Version](http://support.hockeyapp.net/kb/api/api-versions#upload-version), which enables user to upload and start distributing a new build for pre-configured application. 

## Install

```
npm install gulp-hockeyapp
```

## Usage

```js
var hockeyApp = require('gulp-hockeyapp-upload');

gulp.task('hockeyapp', function(done) {

    var options = {
        id: 'APPLICATION_ID',
        apiToken: 'API_TOKEN',
        inputFile: 'builds/myapp.apk',
        notify: 0,
        status: 2,
        teamList: [1234, 5678]
    };

    hockeyApp.upload(options).then(
        function(response) {
            // All is ok, build was uploaded
            done();
        },
        function(err) {
            // Something is wrong...
        }
    );
});
```

## Options

**options.id** - required application id, e.g. 174c943c7783430a9e1cb20bb372aea1.

**options.apiToken** - required API token issued on HockeyApp site.

**options.inputFile** - required path to input file.

**options.notify** - optional, whether to notify testers about new build or not. Possible values:

 * 0 - don't notify testers (default value)
 * 1 - notify all testers that can install the app
 * 2 - notify all
 
 This setting requires full-access token.

**options.status** - optional download status. Possible values:

 * 1 - don't allow users to download or install this version
 * 2 - available for download and installation (default value) 

**options.teamList** - optional array of teams ids which should be able to download the app.

## License

See LICENSE file.
