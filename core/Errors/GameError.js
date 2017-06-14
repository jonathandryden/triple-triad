class GameError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, GameError);
    }
}

module.exports = GameError;