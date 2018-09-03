var game = (function () {

    var initialNumberOfPieces = 4,
        currentNumberOfPieces,
        level = 1,
        guessAttemptsInOneLevel = [],
        guessFailedAttemptsOverall = [],
        guessSuccessfulAttemptsOverall = [];

    var startGame = function (newLevel) {
        guessAttemptsInOneLevel = [];
        level = newLevel;
        if (level === 1) {
            currentNumberOfPieces = initialNumberOfPieces;
        } else {
            currentNumberOfPieces = 2 + (level * (initialNumberOfPieces / 2));
        }
    };

    var getPieces = function () {
        var
            i,
            j,
            pieces = [],
            toGuess,
            id,
            guessed,
            indexToSetTrue;


        for (i = 0; i < currentNumberOfPieces; i++) {
            pieces.push({});
            pieces[i].toGuess = false;
            pieces[i].id = i;
            pieces[i].guessed = false;
        }

        for (j = 0; j < level; j++) {
            indexToSetTrue = Math.floor(Math.random() * pieces.length);
            while (pieces[indexToSetTrue].toGuess === true) {
                indexToSetTrue = Math.floor(Math.random() * pieces.length);
            }
            pieces[indexToSetTrue].toGuess = true;
        }
        return pieces;
    };

    var checkIfPieceWasGuessed = function (pieceId, pieces) {
        var piece;

        piece = findPieceById(pieceId, pieces);

        if (piece.toGuess === false || piece.guessed) {
            piece.guessed = false;
            guessFailedAttemptsOverall.push(piece);
            guessAttemptsInOneLevel.push(piece);
            return piece;
        }
        if (piece.toGuess === true) {
            piece.guessed = true;
            guessSuccessfulAttemptsOverall.push(piece);
            guessAttemptsInOneLevel.push(piece);
            if (getSuccessfulAttemptsInOneLevel().length === level) {
                level++;
                return piece;
            }
        }
        return piece;
    };

    var getFailedAttemptsInOneLevel = function () {
        var failedAttemptsInOneLevel = [],
            i;
        for (i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === false) {
                failedAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return failedAttemptsInOneLevel;
    };

    var getSuccessfulAttemptsInOneLevel = function () {
        var successfulAttemptsInOneLevel = [],
            i;
        for (i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === true) {
                successfulAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return successfulAttemptsInOneLevel;
    };

    var getPiecesGuessedPercentage = function () {
        if (guessFailedAttemptsOverall.length === 0 && guessSuccessfulAttemptsOverall.length === 0) {
            return 0;
        }
        return (guessSuccessfulAttemptsOverall.length / (guessFailedAttemptsOverall.length + guessSuccessfulAttemptsOverall.length)) * 100;
    };

    var findPieceById = function (pieceId, pieces) {
        var i;
        for (i = 0; i < pieces.length; i++) {
            if (pieces[i].id === parseInt(pieceId, 10)) {
                return pieces[i];
            }
        }
    };
    var getLevel = function () {
        return level;
    };

    return {
        'getPiecesGuessedPercentage': getPiecesGuessedPercentage,
        'startGame': startGame,
        'getPieces': getPieces,
        'getLevel': getLevel,
        'getFailedAttemptsInOneLevel': getFailedAttemptsInOneLevel,
        'checkIfPieceWasGuessed': checkIfPieceWasGuessed,
    }
})
();
