// Node dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Local dependencies
const scraper = require('./scraper');
const store = require('./storage/store');

// configuration
var app = express();
var storeObj = new store.Store();
var scrapeTarget = "Hamburg";
var scraperInstance = new scraper.ImmoscoutScraper(scrapeTarget, storeObj);

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// routes
app.get('/api/entries', function(req, res) {
  //get all entries
  data = storeObj.getEntries();
  res.json(data);
});

app.get('/api/entry/:entryId', function(req, res) {
  //get all entries
  data = storeObj.getEntry(req.params['entryId']);
  res.json(data);
});

// start server
var isInitialScrape = storeObj.getEntries().length == 0;
scraperInstance.start(isInitialScrape);
if (!isInitialScrape) {
  setInterval(function() { scraperInstance.start(); }, (60 * 1000) * 10) // restart every 10 minutes
}
app.listen(1236);
console.log("Scraper service running on http://localhost:1236");
