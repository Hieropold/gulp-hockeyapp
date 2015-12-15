'use strict';

var fs = require('fs');
var request = require('request');

module.exports = {
  submit: function(options) {
    return new Promise(function(resolve, reject) {
      var postOpts = {
        url: 'https://rink.hockeyapp.net/api/2/apps/' + options.id + '/app_versions/upload',
        headers: {
          'X-HockeyAppToken': options.apiToken
        },
        formData: {
          ipa: fs.createReadStream(options.file),
          notify: 0,
          status: 2,
          teams: options.teamList
        }
      };

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