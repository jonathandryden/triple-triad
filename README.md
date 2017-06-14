# Triple Triad

# Configuration
Loggly is an optional configuration, not having it in the config file won't
break logging.

**./server/config.js**
```
module.exports = {
  loggly: {
    token: TOKEN,
    subdomain: SUBDOMAIN,
    tags: [TAGS],
    json:true
  },
  mongo: {
    url: CONNECTION_URL,
    GameCollection: COLLECTION_FOR_LIVE_GAMES,
    GameHistoryCollection: COLLECTION_FOR_COMPLETED_GAMES,
    ExpirationTimeInDays: 1
  }
}
```

# How to run
```npm install```

```node ./server/app.js```
