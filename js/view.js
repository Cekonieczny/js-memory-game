var view = (function () {
    var level = 1;


    //public methods
    var startGame = function () {
        controller.startGame(level);
    };

    var renderPieces = function (pieces) {
        removePieces();
        const divs = document.getElementById('pieces');
        for (let i = 0; i < pieces.length; i++) {
            let toGuess = pieces[i].toGuess;
            let div = document.createElement('div');
            let pieceId = getPieceIdByArrayIndex(i);
            div.className = "square";
            div.id = pieceId;
            div.addEventListener('click', function () {
                controller.checkIfClickedCorrectly(pieceId, toGuess);
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

    var addNewPiece = function () {
        if (level < 500) {
            level++;
        }
        updateLevelInDocument();
        controller.startGame(level);
    };

    var changeLevel = function () {
        var levelInDocument = document.getElementById("level");
        if (levelInDocument.value >= 500) {
            levelInDocument.value = 500;
        }
        if (levelInDocument.value <= 0) {
            levelInDocument.value = 1;
        }
        level = levelInDocument.value;
        controller.startGame(level);
    };

    var changeHighlightTime = function () {
        var highlightTimeInDocument = document.getElementById("highlightTime");
        if (highlightTimeInDocument.value > 20) {
            highlightTimeInDocument.value = "20";
        }
        if (highlightTimeInDocument.value < 0.1) {
            highlightTimeInDocument.value = "0.1";
        }
        controller.startGame(level);
    };

    var changeAllowedFailedAttempts = function () {
        var allowedFailedAttempts = document.getElementById("allowedFailedAttempts");
        if (allowedFailedAttempts.value > level) {
            allowedFailedAttempts.value = level;
        }
        if (allowedFailedAttempts.value < 0) {
            allowedFailedAttempts.value = "0";
        }
        controller.startGame(level);
    }

    var setLevel = function (newLevel) {
        level = newLevel;
        updateLevelInDocument();
    };

    var getHighlightTime = function () {
        return document.getElementById("highlightTime").value * 1000;
    }

    var getAllowedFailedAttempts = function () {
        return document.getElementById("allowedFailedAttempts").value
    }

    var updatePiecesGuessedPercentage = function () {
        document.getElementById("piecesGuessedPercentage").textContent = controller.getPiecesGuessedPercentage().toFixed(2) + " %"
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

    var getPieceIdByArrayIndex = function (index) {
        return "piece" + index.toString();
    };

    var flashAllPiecesBlue = function (timeInMs) {
        toggleHighlightAllSquaresBlue();
        setTimeout(toggleHighlightAllSquaresBlue, timeInMs);
    };

    var flashAllPiecesWhite = function (timeInMs) {
        toggleHighlightAllSquaresWhite();
        setTimeout(toggleHighlightAllSquaresWhite, timeInMs);
    };

    var flashOnePieceRed = function (timeInMs, pieceId) {
        toggleHighlightRed(pieceId);
        setTimeout(toggleHighlightRed, timeInMs, pieceId);
    };

    var toggleHighlightAllSquaresWhite = function () {
        document.getElementById("pieces").classList.toggle("whiteSquares")
    };

    var toggleHighlightGreen = function (pieceId) {
        document.getElementById(pieceId).classList.toggle("highlightGreen");
    };

    var toggleHighlightBlue = function (pieceId) {
        document.getElementById(pieceId).classList.toggle("highlightBlue");
    };

    var toggleHighlightRed = function (pieceId) {
        document.getElementById(pieceId).classList.toggle("highlightRed");
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
        'flashAllPiecesWhite':flashAllPiecesWhite,
        'updatePiecesGuessedPercentage': updatePiecesGuessedPercentage,
        'getHighlightTime': getHighlightTime,
        'getAllowedFailedAttempts': getAllowedFailedAttempts,
        'disableOnClickListenersForSquares': disableOnClickListenersForSquares,
        'enableOnClickListenersForSquares': enableOnClickListenersForSquares,
        'disableOnClickListenersForButtons': disableOnClickListenersForButtons,
        'enableOnClickListenersForButtons': enableOnClickListenersForButtons,
        'toggleHighlightGreen': toggleHighlightGreen,
        'flashAllPiecesBlue': flashAllPiecesBlue,
        'flashOnePieceRed': flashOnePieceRed,
        'changeAllowedFailedAttempts': changeAllowedFailedAttempts,
        'changeHighlightTime': changeHighlightTime,
        'changeLevel': changeLevel,
        'renderToGuessPieces': renderToGuessPieces,
        'renderPieces': renderPieces,
        'startGame': startGame,
        'setLevel': setLevel,
        'addNewPiece': addNewPiece
    }
})();
