# Immobilienscout24 Scraper Service

This node service scrapes all available entries for a given city from http://immobilienscout24.de and stores them in a simple Json file store.

To make the scraped data available, the service exposes an API with 2 GET endpoints:
* `GET /api/entries` - All scraped entries
* `GET /api/entry/{entryId}` - An entry by its Immonet ID

By default this service starts its API on `localhost:1236`.

Props to [Federico Bertolini](https://github.com/fedebertolini) for writing [immobilienscout24-scraper](https://github.com/fedebertolini/immobilienscout24-scraper) :)
