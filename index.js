'use strict';

var fs = require('fs');
var request = require('request');

module.exports = {
  upload: function(options) {

    var postOpts = {
      url: 'https://rink.hockeyapp.net/api/2/apps/' + options.id + '/app_versions/upload',
      headers: {
        'X-HockeyAppToken': options.apiToken
      },
      formData: {
        ipa: fs.createReadStream(options.inputFile),
        notify: options.notify,
        status: options.status
      }
    };

    if (options.teamList && options.teamList.length) {
      postOpts.formData.teams = options.teamList.join(',');
    }

    return new Promise(function(resolve, reject) {

      request.post(postOpts, function(err, response) {
        if (err) {
          reject(err);
        }

        else if (response.statusCode != 201) {
          reject({
            status: response.statusCode,
            body: response.body
          });
        }

        resolve(response);
      });
    });
  }
};