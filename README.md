# Triple Triad

# Configuration
Logging config is optional

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
  logging: {
    file: {
      location: FILE_PATH
    },
    loggly: {
      token: LOGGLY_TOKEN,
      subdomain: LOGGLY_SUBDOMAIN,
      tags: [LOGGLY_TAGS],
      json:true
    }
  }
}
```

# How to run
```npm install```

```node ./server/app.js```
