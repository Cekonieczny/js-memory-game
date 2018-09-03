describe('Game', function () {

    it('should return 0% guessed percentage on first game start', function () {
        //given
        game.startGame(1);
        //when
        game.getPiecesGuessedPercentage();

        //then
        expect(game.getPiecesGuessedPercentage()).toBe(0);
    });

    it('should return 50% guessed percentage after choosing  wrong and right piece', function () {
        //given
        var pieces = [],
            toGuess,
            guessed,
            id,
            pieceIdWrong = "0",
            pieceIdRight = "1",
            pieceRight,
            pieceWrong;

        game.startGame(1);
        pieces.push({});
        pieces.push({});
        pieces[0].toGuess = false;
        pieces[0].id = 0;
        pieces[0].guessed = false;
        pieces[1].toGuess = true;
        pieces[1].id = 1;
        pieces[1].guessed = false;

        pieceRight = game.checkIfPieceWasGuessed(pieceIdRight, pieces);
        pieceWrong = game.checkIfPieceWasGuessed(pieceIdWrong, pieces);

        expect(pieceWrong.guessed).toBe(pieceWrong.guessed = false);
        expect(pieceRight.guessed).toBe(pieceRight.guessed = true);
        //when
        game.getPiecesGuessedPercentage();

        //then
        expect(game.getPiecesGuessedPercentage()).toBe(50);
    });
    
    it('should have 4 pieces after game start', function () {
        var pieces,
            level = 1;
        game.startGame(level);

        pieces = game.getPieces();

        expect(pieces.length).toBe(4);
    });

    it('one pieces should be to guess after game start', function () {
        var piecesToGuess,
            level = 1;

        game.startGame(level);

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

    it('should return piece not guessed after choosing not highlighted piece', function () {
        //given
        var pieces = [],
            toGuess,
            guessed,
            id,
            piece,
            pieceId = "0";

        game.startGame(1);
        pieces.push({});
        pieces.push({});
        pieces[0].toGuess = false;
        pieces[0].id = 0;
        pieces[0].guessed = false;
        pieces[1].toGuess = true;
        pieces[1].id = 1;
        pieces[1].guessed = false;

        //when
        piece = game.checkIfPieceWasGuessed(pieceId, pieces);

        //then
        expect(piece.guessed).toBe(piece.guessed = false);
    });

    it('should return piece  guessed after choosing  highlighted piece', function () {
        //given
        var pieces = [],
            toGuess,
            guessed,
            id,
            piece,
            pieceId = "1";

        game.startGame(1);
        pieces.push({});
        pieces.push({});
        pieces[0].toGuess = false;
        pieces[0].id = 0;
        pieces[0].guessed = false;
        pieces[1].toGuess = true;
        pieces[1].id = 1;
        pieces[1].guessed = false;

        //when
        piece = game.checkIfPieceWasGuessed(pieceId, pieces);

        //then
        expect(piece.guessed).toBe(piece.guessed = true);
    });

    it('should return piece not guessed after choosing previously guessed piece', function () {
        //given
        var pieces = [],
            toGuess,
            guessed,
            id,
            piece,
            pieceId = "0";

        game.startGame(1);
        pieces.push({});
        pieces.push({});
        pieces[0].toGuess = true;
        pieces[0].id = 0;
        pieces[0].guessed = true;
        pieces[1].toGuess = true;
        pieces[1].id = 1;
        pieces[1].guessed = false;

        //when
        piece = game.checkIfPieceWasGuessed(pieceId, pieces);

        //then
        expect(piece.guessed).toBe(piece.guessed = false);
    });

    it('should return failed attempt as a wrongly chosen piece after  failed attempt', function () {
        //given
        var pieces = [],
            toGuess,
            guessed,
            id,
            failedAttemptsInOneLevel;

        game.startGame(1);
        pieces.push({});
        pieces[0].toGuess = true;
        pieces[0].id = 0;
        pieces[0].guessed = true;
        game.checkIfPieceWasGuessed(0, pieces);

        //when
        failedAttemptsInOneLevel = game.getFailedAttemptsInOneLevel();

        //then
        expect(failedAttemptsInOneLevel[0]).toBe(pieces[0]);
    });




    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        });
    }


});
