describe('Controller', function () {
    it('should call every method in start game except timeouts', function () {
        var dummyElement = document.createElement('div'),
            pieces = [];

        pieces.push({});
        pieces[0].toGuess=true;
        pieces[0].id = 0;
        pieces[0].guessed = false,

        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);


        spyOn(view,'updatePiecesGuessedPercentage');
        spyOn(controller,'getPiecesGuessedPercentage').and.returnValue(0);
        spyOn(view,'getHighlightTime').and.returnValue(2);
        spyOn(game,'getPieces').and.returnValue(pieces);
        spyOn(game,'startGame');
        spyOn(view,'renderPieces');
        spyOn(view,'disableOnClickListenersForSquares');
        spyOn(view,'disableOnClickListenersForButtons');
        //spyOn(controller,'flashPiecesToGuess');
        //spyOn(view,'enableOnClickListenersForSquares');
        //spyOn(view,'enableOnClickListenersForButtons');
        controller.startGame(1);





        expect(view.getHighlightTime).toHaveBeenCalledTimes(1);
        expect(game.startGame).toHaveBeenCalledTimes(1);
        expect(game.getPieces).toHaveBeenCalledTimes(1);
        expect(view.renderPieces).toHaveBeenCalledTimes(1);
        expect(view.disableOnClickListenersForSquares).toHaveBeenCalledTimes(1);
        expect(view.disableOnClickListenersForButtons).toHaveBeenCalledTimes(1);
        //expect(controller.flashPiecesToGuess).toHaveBeenCalledTimes(1);
    });

});
