var controller = function () {
    var pieces,
        level = 1,
        previousStartGameTimeout,
        guessAttemptsInOneLevel = [],
        guessAttemptsOverall = [];

    var startGame = function (newLevel) {
        var highlightTime;

        level = newLevel;
        view.updatePiecesGuessedPercentage();
        clearTimeout(previousStartGameTimeout);
        guessAttemptsInOneLevel = [];

        highlightTime = view.getHighlightTime();

        game.startGame(level);

        pieces = game.getPieces();
        view.renderPieces(pieces);
        view.disableOnClickListenersForSquares();
        view.disableOnClickListenersForButtons();
        previousStartGameTimeout = flashPiecesToGuess(highlightTime);
        setTimeout(view.enableOnClickListenersForButtons, highlightTime);
        setTimeout(view.enableOnClickListenersForSquares, highlightTime);
    };

    var flashPiecesToGuess = function (highlightTime) {
        view.renderToGuessPieces(pieces);
        return setTimeout(view.renderToGuessPieces, highlightTime, pieces);
    };

    var checkIfClickedCorrectly = function (pieceId, toGuess) {
        var attempt = {
            guessed: false,
            attemptPieceId: pieceId,
        };
        if (toGuess === false || wasPieceGuessed(pieceId)) {
            attempt.guessed = false;
            guessAttemptsOverall.push(attempt);
            guessAttemptsInOneLevel.push(attempt);
            view.disableOnClickListenersForSquares();
            view.flashOnePieceRed(1000, pieceId);
            setTimeout(view.enableOnClickListenersForSquares, 1000);
            if (failedAttemptsInOneLevel().length > getAllowedFailedAttempts()) {
                view.disableOnClickListenersForSquares();
                view.disableOnClickListenersForButtons();
                setTimeout(view.flashAllPiecesBlue, 1000, 1000);
                setTimeout(startGame, 2000, level);
            }
        }
        if (toGuess === true && wasPieceGuessed(pieceId) === false && failedAttemptsInOneLevel().length <= view.getAllowedFailedAttempts()) {
            console.log(level);
            attempt.guessed = true;
            view.toggleHighlightGreen(pieceId);
            guessAttemptsOverall.push(attempt);
            guessAttemptsInOneLevel.push(attempt);
            if (successfulAttemptsInOneLevel().length === level) {
                view.disableOnClickListenersForSquares();
                incrementLevel();
                setTimeout(view.flashAllPiecesWhite,1000,1000);
                setTimeout(startGame, 2000, level);
            }
        }
    };

    var getPiecesGuessedPercentage = function () {
        var attemptsGuessed = [];
        if (guessAttemptsOverall.length === 0) {
            return 0;
        }
        for (let i = 0; i < guessAttemptsOverall.length; i++) {
            if (guessAttemptsOverall[i].guessed === true) {
                attemptsGuessed.push(guessAttemptsOverall[i])
            }
        }
        return (attemptsGuessed.length / guessAttemptsOverall.length) * 100;
    };

    var getAllowedFailedAttempts = function () {
        return document.getElementById("allowedFailedAttempts").value
    }

    var failedAttemptsInOneLevel = function () {
        var failedAttemptsInOneLevel = [];
        for (let i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === false) {
                failedAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return failedAttemptsInOneLevel;
    };

    var successfulAttemptsInOneLevel = function () {
        var successfulAttemptsInOneLevel = [];
        for (let i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === true) {
                successfulAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return successfulAttemptsInOneLevel;
    };

    var wasPieceGuessed = function (pieceId) {
        for (let i = 0; i < successfulAttemptsInOneLevel().length; i++) {
            if (successfulAttemptsInOneLevel()[i].attemptPieceId === pieceId) {
                return true;
            }
        }
        return false;
    };

    var incrementLevel = function () {
        level++;
        view.setLevel(level);
    }


    return {
        'getPiecesGuessedPercentage': getPiecesGuessedPercentage,
        'checkIfClickedCorrectly': checkIfClickedCorrectly,
        'flashPiecesToGuess': flashPiecesToGuess,
        'startGame': startGame,
    }
}();
