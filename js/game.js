var game = (function () {

    var initialNumberOfPieces = 4,
        currentNumberOfPieces,
        level = 1;
    var startGame = function (newLevel) {
        if (newLevel === undefined) {
            level = 1;
            currentNumberOfPieces = initialNumberOfPieces
        } else {
            level = newLevel;
            currentNumberOfPieces = 2 + (level * (initialNumberOfPieces / 2));
        }
    };

    var getPieces = function () {
        var pieces = [],
            i,
            j,
            toGuess;
        for (i = 0; i < currentNumberOfPieces; i++) {
            pieces.push({});
            pieces[i].toGuess = false;
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

    getLevel = function () {
        return level;
    }

    return {
        'startGame': startGame,
        'getPieces': getPieces
    }
})();
