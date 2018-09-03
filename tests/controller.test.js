describe('Controller', function () {
    it('should have 4 pieces after game start', function () {
        var pieces;
        game.startGame();

        pieces = game.getPieces();

        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess;

        game.startGame();

        piecesToGuess = findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            level = 4;
        game.startGame(level);

        pieces = game.getPieces();

        expect(pieces.length).toBe(10);
    });

    it('configured number of pieces should be to guess after game start', function () {
        var piecesToGuess,
            level = 3;
        game.startGame(level);

        piecesToGuess = findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(3);
    });


    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        });
    }
});
