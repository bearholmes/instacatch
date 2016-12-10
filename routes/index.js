var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'insta catch'});
});

router.post('/req', function(req, res, next) {
  var url = req.body.url;
  request.get({url: url}, function (err, response, html) {
     if (!err && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var img = $('meta[property="og:image"]').attr('content');
        var video = $('meta[property="og:video"]').attr('content');
        var result = [];
        result['img'] = img;
        result['video'] = video;

        res.render('post', {title: 'Express', result: result});
     }
  });
});

module.exports = router;
