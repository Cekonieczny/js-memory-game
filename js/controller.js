var controller = function () {
    var pieces,
        level = 1,
        previousStartGameTimeout;

    var startGame = function (newLevel) {
        var highlightTime;

        level = newLevel;
        view.updatePiecesGuessedPercentage();
        clearTimeout(previousStartGameTimeout);

        highlightTime = view.getHighlightTime();

        game.startGame(newLevel);

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

    var checkIfClickedCorrectly = function (pieceId) {
        var piece = game.checkIfPieceWasGuessed(pieceId, pieces);
        if (piece.guessed === false) {
            view.disableOnClickListenersForSquares();
            view.flashOnePieceRed(pieceId, 1000);
            setTimeout(view.enableOnClickListenersForSquares, 1000);
            if (game.getFailedAttemptsInOneLevel().length > view.getAllowedFailedAttempts()) {
                view.disableOnClickListenersForSquares();
                view.disableOnClickListenersForButtons();
                setTimeout(view.flashAllPiecesBlue, 1000, 1000);
                setTimeout(startGame, 2000, level);
            }
        }
        if (piece.guessed === true) {
            view.toggleHighlightGreen(piece.id);
            if (game.getLevel() === level + 1) {
                incrementLevel();
                view.disableOnClickListenersForSquares();
                setTimeout(view.flashAllPiecesWhite, 1000, 1000);
                setTimeout(startGame, 2000, level);
            }
        }
    };

    var getPiecesGuessedPercentage = function () {
        return game.getPiecesGuessedPercentage();
    };

    var incrementLevel = function () {
        level++;
        view.setLevel(level);
    };


    return {
        'getPiecesGuessedPercentage': getPiecesGuessedPercentage,
        'checkIfClickedCorrectly': checkIfClickedCorrectly,
        'flashPiecesToGuess': flashPiecesToGuess,
        'startGame': startGame,
    }
}();
