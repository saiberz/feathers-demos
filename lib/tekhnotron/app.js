var express = require('express');
var app = express();
var request = require('request');
var handlebars = require('handlebars');
var _ = require('underscore');
var source = require('fs').readFileSync(__dirname + '/index.mustache').toString();
var template = handlebars.compile(source);

var cachedData;

handlebars.registerHelper('htmlize', function(text) {
	return text.replace('\n', '<br>');
});

function getGallery(album, count) {
	var byRatio = {};
	var bestAlbum = [];

	_.each(album.data, function(current) {
		var ratio = (current.height/current.width).toFixed(1);
		byRatio[ratio] = byRatio[ratio] || [];
		byRatio[ratio].push(current);
	});

	_.each(byRatio, function(currentAlbum) {
		if(currentAlbum.length > bestAlbum.length) {
			bestAlbum = currentAlbum;
		}
	});

	// Slice the best album to a multiple of three
	return bestAlbum.slice(0, Math.floor(bestAlbum.length/3.0) * 3);
}

function aggregateData(page, album, callback) {
	var pageUrl = 'https://graph.facebook.com/' + page;
	request(pageUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('Got data from ' + pageUrl);
			var albumUrl = 'https://graph.facebook.com/' + album + '/photos';
			var data = JSON.parse(body);
			return request(albumUrl, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log('Got data from ' + albumUrl);
					data.album = JSON.parse(body);
					data.gallery = getGallery(data.album);
					data.year = new Date().getFullYear()
					return callback(null, data);
				}
				callback(error || response);
			});
		}
		callback(error || response);
	});
}

function fetchData() {
	aggregateData('Tekhnotron.Music', '452759754134', function(error, data) {
		if(error) {
			return console.warn('Got error', error);
		}
		cachedData = data;
		setTimeout(fetchData, 3600000);
	});
}

function handler(req, res) {
	res.send(template(cachedData));
}

app.get('/', handler)
	.get('/index.html', handler)
	.get('/index.htm', handler)
	.use(express.static(__dirname + '/../../public'));

fetchData();

module.exports = app;
