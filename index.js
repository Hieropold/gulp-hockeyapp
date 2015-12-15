'use strict';

var fs = require('fs');
var request = require('request');

module.exports = {
  upload: function(options) {
    return new Promise(function(resolve, reject) {

      if (!options.id) {
        return reject('options.id is required');
      }

      if (!options.apiToken) {
        return reject('options.apiToken is required');
      }

      if (!options.inputFile) {
        return reject('options.inputFile is required');
      }

      var postOpts = {
        url: 'https://rink.hockeyapp.net/api/2/apps/' + options.id + '/app_versions/upload',
        headers: {
          'X-HockeyAppToken': options.apiToken
        },
        formData: {
          ipa: fs.createReadStream(options.inputFile),
          notify: 0,
          status: 2
        }
      };

      // Optional team list
      if (options.teamList && options.teamList.length) {
        postOpts.formData.teams = options.teamList.join(',');
      }

      // Optional notify
      if (options.notify) {
        postOpts.formData.notify = options.notify;
      }

      // Optional status
      if (options.status) {
        postOpts.formData.status = options.status;
      }

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