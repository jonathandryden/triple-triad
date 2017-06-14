# Triple Triad

A game where 2 players take turns placing cards on a 3x3 field, each card 
numerically fighting the other, changing their color, until all positions are 
filled.

The player with the most cards wins.

# API

Payload should be sent as a JSON object.

## Emit

Events your socket.io client should emit.

### createGame

  This event should be called first to create a game.
  
  * **Payload**

  ```
  {
    "game": GAME_NAME=[string],
    "player": PLAYER_NAME=[string]
  }
  ```

### joinGame

  This event should be used to join/rejoin a game.
  
  * **Payload**

  ```
  {
    "game": GAME_NAME=[string],
    "player": PLAYER_NAME=[string]
  }
  ```

### playMove

  This event should be used to play a card on the field.
  
  * **Payload**

  ```
  {
    "gameName": GAME_NAME=[string],
    "player": PLAYER_INDEX=[integer],
    "cardId": CARD_INDEX=[integer],
    "position": {
      "x": X_DESTINATION_ON_BOARD=[integer],
      "y": Y_DESTINATION_ON_BOARD=[integer]
    }
  }
  ```

## Receive

Events your socket.io client will receive.

### updateGame

  This is the primary event, used to update the game board, score and player status.

  * **Payload**
  
  ```
  {
    "name": GAME_NAME=[string],
    "isGameOver": IF_GAME_IS_OVER=[boolean],
    "board": 3x3_2d_ARRAY_OF_CARDS=[card[]],
    "players": ARRAY_OF_PLAYER=[player[]],
    "score": ARRAY_OF_SCORE=[integer[]]
  }
  ```

      * Details

  ```
  "board": [
    [NULL || CARD_OBJECT, NULL || CARD_OBJECT, NULL || CARD_OBJECT],
    [NULL || CARD_OBJECT, NULL || CARD_OBJECT, NULL || CARD_OBJECT],
    [NULL || CARD_OBJECT, NULL || CARD_OBJECT, NULL || CARD_OBJECT]
  ]
  ```

  ```
  CARD_OBJECT: {
    "id": ID_IN_DB=[integer],
    "name": NAME_OF_CARD=[string],
    "color": RED_OR_BLUE=[boolean],
    "attr": NULL,
    "rank": ARRAY_UP_RIGHT_DOWN_LEFT_POWERS=[integer[]],
    "img": IMAGE_URL=[string]
  }
  ```

  ```
  "players": [
    [
      {
        "name": NAME=[string],
        "num": PLAYER_NUM_FROM_0=[integer],
        "cards": ARRAY_OF_CARDS=[card[]]
      }
    ],
    [
      {
        "name": NAME=[string],
        "num": PLAYER_NUM_FROM_0=[integer],
        "cards": ARRAY_OF_CARDS=[card[]]
      }
    ]
  ]
  ```


# How to run

Create and configure your `./server/config.js` file to include your instance of Mongo and desired port.
Logging is optional.

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

```npm install```

```node ./server/app.js```

Go to `IP_ADDRESS:PORT` for the web client or make your socket.io calls to `IP_ADDRESS:PORT`.

# Dependencies

* MongoDB