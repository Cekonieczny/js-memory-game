var controller = function () {
    var startGame = function () {
        var initialNumberOfPieces = view.getInitialNumberOfPieces();

        game.startGame({
            numberOfPieces: initialNumberOfPieces
        });

        view.renderPieces(game.getPieces());

    };

    return {
        'startGame': startGame
    }
}();
