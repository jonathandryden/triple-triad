# Triple Triad

# Configuration
Loggly is an optional configuration, not having it in the config file won't
break logging.

**./server/config.js**
```
module.exports = {
  server: {
    port: 3000
  },
  mongo: {
    url: CONNECTION_URL,
    GameCollection: COLLECTION_FOR_LIVE_GAMES,
    GameHistoryCollection: COLLECTION_FOR_COMPLETED_GAMES,
    ExpirationTimeInDays: 1
  },
  loggly: {
    token: LOGGLY_TOKEN,
    subdomain: LOGGLY_SUBDOMAIN,
    tags: [LOGGLY_TAGS],
    json:true
  }
}
```

# How to run
```npm install```

```node ./server/app.js```
