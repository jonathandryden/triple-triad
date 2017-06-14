# Triple Triad

# Configuration
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
