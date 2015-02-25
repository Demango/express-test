process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var https = require('https');
var fs = require('fs');

var parameters = JSON.parse(fs.readFileSync('./parameters.json', 'utf8'));

var cache = {};
var usercache = {};

exports.getMpGames = function(id, cb) {
    var url = 'https://www.osu.ppy.sh/api/get_match?k=' + parameters.api_key +'&mp=' + id;

    if (cache[url]) {
        console.log('serving request', url, 'from cache');
        if (cb) {
            cb(cache[url]);
        }
        return;
    }

    var callback = function(response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        console.log('request completed');
        console.log(str);
        var result = JSON.parse(str);
        cache[url] = result;
        if (cb) {
            cb(result);
        }
      });
    };

    console.log('starting request to', url);
    https.request(url, callback).end();
};

exports.getUser = function(id, cb) {
    var url = 'https://www.osu.ppy.sh/api/get_user?k=' + parameters.api_key +'&u=' + id;

    if (usercache[url]) {
        console.log('serving request', url, 'from cache');
        if (cb) {
            cb(usercache[url]);
        }
        return;
    }

    var callback = function(response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        console.log('request completed');
        var result = JSON.parse(str);
        result = result[0];
        usercache[url] = result;
        if (cb) {
            cb(result);
        }
      });
    };

    console.log('starting request to', url);
    https.request(url, callback).end();
};

setInterval(
  function() {
    cache = {};
  },
  600000
);