var view = (function () {
    var level = 1,
        piecesGuessedInOneLevel = [],
        guessAttemptsOverall = [];

    //public methods
    var startGame = function () {
        piecesGuessedInOneLevel = [];
        updatePiecesGuessedPercentage();
        var highlightTime = document.getElementById("highlightTime").value * 1000;

        controller.startGame(level);

        disableOnClickListenersForSquares();
        disableOnClickListenersForButtons();
        controller.flashPiecesToGuess(highlightTime);
        setTimeout(enableOnClickListenersForButtons, highlightTime);
        setTimeout(enableOnClickListenersForSquares, highlightTime);
    };


    var renderPieces = function (pieces) {
        removePieces();
        const divs = document.getElementById('pieces');
        for (let i = 0; i < pieces.length; i++) {
            let currentPieceToGuess = pieces[i].toGuess;
            let div = document.createElement('div');
            let pieceId = getPieceIdByArrayIndex(i);
            div.className = "square";
            div.id = pieceId;
            div.addEventListener('click', function () {
                checkIfClickedCorrectly(pieceId, currentPieceToGuess);
            });
            divs.appendChild(div);
        }
    };

    var renderToGuessPieces = function (pieces) {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].toGuess === true) {
                toggleHighlightBlue(getPieceIdByArrayIndex(i));
            }
        }
    };

    var checkIfClickedCorrectly = function (pieceId, toGuess) {
        let guessed;
        if (toGuess === false || wasPieceGuessed(pieceId)) {
            guessed = false;
            guessAttemptsOverall.push(guessed);
            disableOnClickListenersForSquares();
            disableOnClickListenersForButtons();
            flashOnePieceRed(1000, pieceId);
            setTimeout(flashAllPiecesBlue, 1000, 1000);
            setTimeout(startGame, 2000, level);
        }
        if (toGuess === true && wasPieceGuessed(pieceId) === false) {
            guessed = true;
            toggleHighlightGreen(pieceId);
            guessAttemptsOverall.push(guessed);
            piecesGuessedInOneLevel.push(pieceId);
            if (piecesGuessedInOneLevel.length === level) {
                disableOnClickListenersForSquares();
                level++;
                updateLevelInDocument();
                setTimeout(startGame, 1000);
            }
        }
    };

    var addNewPiece = function () {
        if (level < 500) {
            level++;
        }
        controller.startGame(level);
        updateLevelInDocument();
    };

    var changeLevel = function () {
        var levelInDocument = document.getElementById("level");
        if (levelInDocument.value >= 500) {
            level = 500;
        }
        if (levelInDocument.value <= 0) {
            level = 1;
        }
        updateLevelInDocument();
    };

    var changeHighlightTime = function () {
        var highlightTimeInDocument = document.getElementById("highlightTime");
        if (highlightTimeInDocument.value > 20) {
            highlightTimeInDocument.value = "20";
        }
        if (highlightTimeInDocument.value < 0.1) {
            highlightTimeInDocument.value = "0.1";
        }
    };

    var getLevel = function () {
        return level;
    };


    //private methods
    var updatePiecesGuessedPercentage = function () {
        var attemptsGuessed = [],
            piecesGuessedPercentage;
        if(guessAttemptsOverall === []){
            document.getElementById("piecesGuessedPercentage").textContent = "0 %"
            return;
        }
        for (let i = 0; i < guessAttemptsOverall.length; i++) {
            if(guessAttemptsOverall[i] === true){
                attemptsGuessed.push(guessAttemptsOverall[i])
            }
        }
        piecesGuessedPercentage = (attemptsGuessed.length/guessAttemptsOverall.length)*100;
        document.getElementById("piecesGuessedPercentage").textContent = piecesGuessedPercentage.toFixed(2)+" %"
    }

    var disableOnClickListenersForSquares = function () {
        var squares = document.getElementsByClassName("square"),
            square;
        for (let i = 0; i < squares.length; i++) {
            square = squares[i];
            if (square.classList.contains("enable-clicks")) {
                square.classList.remove("enable-clicks")
            }
            square.classList.add("avoid-clicks");
        }
    }

    var enableOnClickListenersForSquares = function () {
        var squares = document.getElementsByClassName("square"),
            square;
        for (let i = 0; i < squares.length; i++) {
            square = squares[i];
            if (square.classList.contains("avoid-clicks")) {
                square.classList.remove("avoid-clicks");
            }
            square.classList.add("enable-clicks")
        }
    }

    var disableOnClickListenersForButtons = function () {
        var buttons = document.getElementsByTagName("BUTTON"),
            button;
        for (let i = 0; i < buttons.length; i++) {
            button = buttons[i];
            if (button.classList.contains("enable-clicks")) {
                button.classList.remove("enable-clicks")
            }
            button.classList.add("avoid-clicks");
        }

    }

    function enableOnClickListenersForButtons() {
        var buttons = document.getElementsByTagName("BUTTON"),
            button;
        for (let i = 0; i < buttons.length; i++) {
            button = buttons[i];
            if (button.classList.contains("avoid-clicks")) {
                button.classList.remove("avoid-clicks");
            }
            button.classList.add("enable-clicks")
        }
    }

    var wasPieceGuessed = function (pieceId) {
        for (let i = 0; i < piecesGuessedInOneLevel.length; i++) {
            if (piecesGuessedInOneLevel[i] === pieceId) {
                return true;
            }
        }
        return false;
    };


    var getPieceIdByArrayIndex = function (index) {
        return "piece" + index.toString();
    };

    var flashAllPiecesBlue = function (timeInMs) {
        toggleHighlightAllSquaresBlue();
        setTimeout(toggleHighlightAllSquaresBlue, timeInMs);
    };

    var flashOnePieceRed = function (timeInMs, pieceId) {
        toggleHighlightRed(pieceId);
        setTimeout(toggleHighlightRed, timeInMs);
    };

    var toggleHighlightBlue = function (pieceId) {
        var square = document.getElementById(pieceId);
        square.classList.toggle("highlightBlue");
    };

    var toggleHighlightGreen = function (pieceId) {
        var square = document.getElementById(pieceId);
        square.classList.toggle("highlightGreen");
    };

    var toggleHighlightRed = function (pieceId) {
        var square = document.getElementById(pieceId);
        square.classList.toggle("highlightRed");
    };

    var toggleHighlightAllSquaresBlue = function () {
        document.getElementById("pieces").classList.toggle("blueSquares")
    };

    var updateLevelInDocument = function () {
        document.getElementById("level").value = level;
    };

    var removePieces = function () {
        document.getElementById("pieces").innerHTML = "";
    };


    return {
        'changeHighlightTime': changeHighlightTime,
        'checkIfClickedCorrectly': checkIfClickedCorrectly,
        'changeLevel': changeLevel,
        'renderToGuessPieces': renderToGuessPieces,
        'renderPieces': renderPieces,
        'startGame': startGame,
        'getLevel': getLevel,
        'addNewPiece': addNewPiece
    }
})();
