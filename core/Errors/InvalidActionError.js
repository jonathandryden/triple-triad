class InvalidActionError extends GameError {
    constructor(message = "An invalid action was taken.") {
        super(message);
    }
}

module.exports = InvalidActionError;