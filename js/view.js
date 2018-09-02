var view = (function () {
    var level = 1,
        previousStartGameTimeout,
        guessAttemptsInOneLevel = [],
        guessAttemptsOverall = [];

    //public methods
    var startGame = function () {
        clearTimeout(previousStartGameTimeout);
        guessAttemptsInOneLevel = [];
        updatePiecesGuessedPercentage();
        var highlightTime = document.getElementById("highlightTime").value * 1000;

        controller.startGame(level);

        disableOnClickListenersForSquares();
        disableOnClickListenersForButtons();
        previousStartGameTimeout = controller.flashPiecesToGuess(highlightTime);
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
        var attempt = {
            guessed: false,
            attemptPieceId: pieceId,
        };
        if (toGuess === false || wasPieceGuessed(pieceId)) {
            attempt.guessed = false;
            guessAttemptsOverall.push(attempt);
            guessAttemptsInOneLevel.push(attempt);
            disableOnClickListenersForSquares();
            flashOnePieceRed(1000, pieceId);
            setTimeout(enableOnClickListenersForSquares,1000);
            if (failedAttemptsInOneLevel().length > getAllowedFailedAttempts()) {
                disableOnClickListenersForSquares();
                disableOnClickListenersForButtons();
                setTimeout(flashAllPiecesBlue, 1000, 1000);
                setTimeout(startGame, 2000, level);
            }
        }
        if (toGuess === true && wasPieceGuessed(pieceId) === false && failedAttemptsInOneLevel().length <= getAllowedFailedAttempts()) {
            console.log(level);
            attempt.guessed = true;
            toggleHighlightGreen(pieceId);
            guessAttemptsOverall.push(attempt);
            guessAttemptsInOneLevel.push(attempt);
            if (successfulAttemptsInOneLevel().length === level) {
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
        startGame()
    };

    var changeLevel = function () {
        var levelInDocument = document.getElementById("level");
        if (levelInDocument.value >= 500) {
            level = 500;
            updateLevelInDocument();
        }
        if (levelInDocument.value <= 0) {
            level = 1;
            updateLevelInDocument();
        }
        level = levelInDocument.value;
        startGame();
    };

    var changeHighlightTime = function () {
        var highlightTimeInDocument = document.getElementById("highlightTime");
        if (highlightTimeInDocument.value > 20) {
            highlightTimeInDocument.value = "20";
        }
        if (highlightTimeInDocument.value < 0.1) {
            highlightTimeInDocument.value = "0.1";
        }
        startGame()
    };

    var changeAllowedFailedAttempts = function () {
        var allowedFailedAttempts = document.getElementById("allowedFailedAttempts");
        if (allowedFailedAttempts.value > level) {
            allowedFailedAttempts.value = level;
        }
        if (allowedFailedAttempts.value < 0) {
            allowedFailedAttempts.value = "0";
        }
    }

    var getLevel = function () {
        return level;
    };


    //private methods
    var getAllowedFailedAttempts = function () {
        return document.getElementById("allowedFailedAttempts").value
    }

    var updatePiecesGuessedPercentage = function () {
        var attemptsGuessed = [],
            piecesGuessedPercentage;
        if (guessAttemptsOverall.length === 0) {
            document.getElementById("piecesGuessedPercentage").textContent = "0 %"
            return;
        }
        for (let i = 0; i < guessAttemptsOverall.length; i++) {
            if (guessAttemptsOverall[i].guessed === true) {
                attemptsGuessed.push(guessAttemptsOverall[i])
            }
        }
        piecesGuessedPercentage = (attemptsGuessed.length / guessAttemptsOverall.length) * 100;
        document.getElementById("piecesGuessedPercentage").textContent = piecesGuessedPercentage.toFixed(2) + " %"
    };

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
    };

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
    };

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

    var enableOnClickListenersForButtons = function () {
        var buttons = document.getElementsByTagName("BUTTON"),
            button;
        for (let i = 0; i < buttons.length; i++) {
            button = buttons[i];
            if (button.classList.contains("avoid-clicks")) {
                button.classList.remove("avoid-clicks");
            }
            button.classList.add("enable-clicks")
        }
    };

    var failedAttemptsInOneLevel = function () {
        var failedAttemptsInOneLevel = [];
        for (let i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === false) {
                failedAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return failedAttemptsInOneLevel;
    };

    var successfulAttemptsInOneLevel = function () {
        var successfulAttemptsInOneLevel = [];
        for (let i = 0; i < guessAttemptsInOneLevel.length; i++) {
            if (guessAttemptsInOneLevel[i].guessed === true) {
                successfulAttemptsInOneLevel.push(guessAttemptsInOneLevel[i])
            }
        }
        return successfulAttemptsInOneLevel;
    };

    var wasPieceGuessed = function (pieceId) {
        for (let i = 0; i < successfulAttemptsInOneLevel().length; i++) {
            if (successfulAttemptsInOneLevel()[i].attemptPieceId === pieceId) {
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
        setTimeout(toggleHighlightRed, timeInMs,pieceId);
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
        'changeAllowedFailedAttempts': changeAllowedFailedAttempts,
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
