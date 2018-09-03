var game = (function () {

    var initialNumberOfPieces = 4,
        currentNumberOfPieces,
        level = 1,
        guessAttemptsInOneLevel = [],
        guessAttemptsOverall = [],
        nextLevel = false;

    var startGame = function (newLevel) {
        guessAttemptsInOneLevel = [];
        nextLevel = false;
        if (newLevel === undefined) {
            level = 1;
            currentNumberOfPieces = initialNumberOfPieces
        } else {
            level = newLevel;
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
            guessed;


        for (i = 0; i < currentNumberOfPieces; i++) {
                pieces.push({});
                pieces[i].toGuess = false;
                pieces[i].id = i;
                pieces[i].guessed = false;
            }

        for (j = 0; j < level; j++) {
            let indexToSetTrue = Math.floor(Math.random() * pieces.length);
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
            guessAttemptsOverall.push(piece);
            guessAttemptsInOneLevel.push(piece);
            return piece;
        }
        if (piece.toGuess === true && piece.guessed === false) {
            piece.guessed = true;
            guessAttemptsOverall.push(piece);
            guessAttemptsInOneLevel.push(piece);
            if (getSuccessfulAttemptsInOneLevel().length === level) {
                level++;
                nextLevel = true;
                return piece;
            }
            return piece;
        }
    };

    var getFailedAttemptsInOneLevel = function () {
        var failedAttemptsInOneLevel = [];
        for (let i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === false) {
                failedAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return failedAttemptsInOneLevel;
    };

    var getSuccessfulAttemptsInOneLevel = function () {
        var successfulAttemptsInOneLevel = [];
        for (let i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === true) {
                successfulAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return successfulAttemptsInOneLevel;
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

    var findPieceById = function (pieceId, pieces) {
        var i;
        for (i = 0; i < pieces.length; i++) {
            if (pieces[i].id === parseInt(pieceId,10)) {
                return pieces[i];
            }
        }
    };
    getLevel = function () {
        return level;
    };

    getNextLevel = function () {
        return nextLevel;
    }

    return {
        'getNextLevel': getNextLevel,
        'getPiecesGuessedPercentage': getPiecesGuessedPercentage,
        'startGame': startGame,
        'getPieces': getPieces,
        'getLevel': getLevel,
        'getFailedAttemptsInOneLevel': getFailedAttemptsInOneLevel,
        'getSuccessfulAttemptsInOneLevel': getSuccessfulAttemptsInOneLevel,
        'checkIfPieceWasGuessed': checkIfPieceWasGuessed,
    }
})
();
