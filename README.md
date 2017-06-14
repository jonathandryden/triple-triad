# Triple Triad

# Configuration
Logging config is optional

**./server/config.js**
```
module.exports = {
  server: {
    port: PORT_NUMBER
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

# API

Payload should be sent as a JSON object.

## Emit

Events your socket.io client should emit.

### createGame

  This event should be called first to create a game.
  
  * **Payload**

  ```
  {
    "game": GAME_NAME,
    "player": PLAYER_NAME
  }
  ```

### joinGame

  This event should be used to join/rejoin a game.
  
  * **Payload**

  ```
  {
    "game": GAME_NAME,
    "player": PLAYER_NAME
  }
  ```

### playMove

  This event should be used to play a card on the field.
  
  * **Payload**

  ```
  {
    "gameName": GAME_NAME,
    "player": PLAYER_INDEX,
    "cardId": CARD_INDEX,
    "position": {
      "x": X_COORD,
      "y": Y_COORD
    }
  }
  ```

## Receive

Events your socket.io client will receive.

### updateGame

  This is the primary event, used to update the game board, score and player status.

  * **Payload**


# How to run

Configure your `./server/config.js` file to include your instance of Mongo and desired port.

```npm install```

```node ./server/app.js```

Go to `IP_ADDRESS:PORT` for the web client or make your socket.io calls to `IP_ADDRESS:PORT`.

# Dependencies

* MongoDB