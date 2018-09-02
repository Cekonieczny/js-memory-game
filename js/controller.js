var controller = function () {
    var pieces;
    var startGame = function () {
        var level = view.getLevel();

        game.startGame(level);

        pieces = game.getPieces();
        view.renderPieces(pieces);
    };

    /*var getToGuessPieces = function () {
        var piecesToGuess = [];
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].toGuess === true) {
                piecesToGuess.push(pieces[i]);
            }
        }
    }*/

    var flashPiecesToGuess = function (highlightTime) {
        view.renderToGuessPieces(pieces);
        return setTimeout(view.renderToGuessPieces, highlightTime, pieces);
    };

    return {
        'flashPiecesToGuess': flashPiecesToGuess,
        'startGame': startGame,
    }
}();
