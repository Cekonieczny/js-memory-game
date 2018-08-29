describe('Game', function () {
   it('should have 5 pieces after game start', function () {
      var pieces;
      //zwracam 4
      game.startGame();

      pieces = game.getPieces();

      expect(pieces.length).toBe(5);
   });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess;
        game.startGame();

        piecesToGuess = findPiecesToGuess(game.getPieces());

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            config = {
               numberOfPieces: 6
            };
        game.startGame(config);

        pieces = game.getPieces();

        expect(pieces.length).toBe(6);
    });


    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
           return piece.toGuess;
        });
    }
});
