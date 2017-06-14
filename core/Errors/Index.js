class GameError extends Error {
    constructor(message = "There was an error with the game logic.") {
        super(message);
        Error.captureStackTrace(this, GameError);
    }
}

class InvalidActionError extends GameError {
    constructor(message = "An invalid action was taken.") {
        super(message);
    }
}

module.exports = {
    Game : GameError,
    InvalidAction: InvalidActionError
}