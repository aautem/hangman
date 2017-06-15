// hidden phrase stored in private variable
// to keep out of plain sight in console
// accessed with getHiddenPhrase method on game object
var _hiddenPhrase = null

var game = {
  initialize: function() {
    console.log('initializing...');
    // Cache jQuery selectors
    game.$hangman = $('.hangman');
    game.$letters = $('.letters');
    game.$guesses = $('.guesses');
    game.$buttons = $('.buttons');
    game.$modal = $('#modal');
    game.bodyParts = [$('<div id="head"></div>'),
                     $('<div id="torso"></div>'),
                     $('<div id="left-arm"></div>'),
                     $('<div id="right-arm"></div>'),
                     $('<div id="left-leg"></div>'),
                     $('<div id="right-leg"></div>')];

    game.$modal.dialog({
        autoOpen: false,
        show: {
          effect: 'fade',
          duration: 250
        },
        hide: {
          effect: 'fade',
          duration: 250
        },
        resizable: false,
        height: 'auto',
        width: 400,
        modal: true,
        buttons: {
          '1 Player': function() {
            $(this).dialog('close');
            game.hideRandomWord();
            game.renderEmptyBoxes(game.getHiddenPhrase());
            game.setLetterIndexes(game.getHiddenPhrase());
          },
          '2 Player': function() {
            $(this).dialog('close');
            game.setHiddenPhrase(prompt('What word will the hangman hide?', 'Type word or phrase here'));
            game.renderEmptyBoxes(game.getHiddenPhrase());
            game.setLetterIndexes(game.getHiddenPhrase());
          }
        }
      });

    // Add listeners
    game.$buttons.on('click', '.new-game', function() {
      game.resetGame();
      game.$modal.dialog('open');
      game.addButton('guess', 'guess letter');
    });

    game.$buttons.on('click', '.guess', function() {
      game.setCurrentGuess(prompt("What letter would you like to guess?", "Type letter here"));
      game.checkGuess(game.currentGuess);
    });
  },

  resetGame: function() {
    console.log('resetting game board...');
    // Remove old nodes and game data
    game.$hangman.children().remove();
    game.$letters.children().remove();
    game.$guesses.text('');
    _hiddenPhrase = null;
    game.letterIndexes = {};
    game.currentGuess = null;
    game.guesses = {};
    game.misses = 0;
    $('.guess').remove();
  },

  addButton: function(className, buttonText) {
    console.log('adding button...');
    var newButton = $('<button class=' + className + '>' + buttonText + '</button>');
    game.$buttons.append(newButton);
  },

  // CLOSURE
  getHiddenPhrase: function() {
    return _hiddenPhrase;
  },

  setHiddenPhrase: function(phrase) {
    console.log('setting hidden phrase...');
    phrase = phrase.toUpperCase();
    _hiddenPhrase = phrase;
  },

  hideRandomWord: function() {
    // TODO: Add more categories
    var categories = {
      animals: ['horse', 'skunk', 'kangaroo', 'dolphin', 'panda bear', 'tortoise', 'parrot', 'rabbit', 'elephant', 'donkey', 'alligator', 'lizard', 'hedgehog', 'dinosaur']
    };
    var index = Math.floor(Math.random() * categories.animals.length);
    _hiddenPhrase = categories.animals[index].toUpperCase();
  },

  renderEmptyBoxes: function(phrase) {
    console.log('rendering empty boxes...');
    for (var i = 0; i < phrase.length; i ++) {
      phrase[i] === ' ' ? game.$letters.append($('<div class="space"></div>')) : game.$letters.append($('<div class="letter"></div>'));
    }
    game.centerEmptyBoxes(phrase);
  },

  setLetterIndexes: function(phrase) {
    console.log('setting up letter indexes object...');
    for (var i = 0; i < phrase.length; i ++) {
      if (phrase[i] !== ' ') {
        if (game.letterIndexes[phrase[i]]) {
          game.letterIndexes[phrase[i]].push(i);
        } else {
          game.letterIndexes[phrase[i]] = [i];
        }
      }
    }
  },

  centerEmptyBoxes: function(phrase) {
    console.log('centering empty boxes...');
    if (phrase.length > 15) {
      game.$letters.css('width', '1000px');
    } else {
      game.$letters.css('width', '' + (64 * phrase.length + 2) + 'px');
    }
  },

  setCurrentGuess: function(guess) {
    console.log('setting current guess...');
    guess = guess.toUpperCase();
    if (game.guesses[guess]) {
      game.setCurrentGuess(prompt('You already guessed that letter. Guess again!', 'Type letter here'));
    } else if (guess.length > 1) {
      game.setCurrentGuess(prompt('One letter at a time, please. Guess again!', 'Type letter here'));
    } else {
      game.currentGuess = guess;
      game.guesses[guess] = true;
    }
  },

  checkGuess: function(guess) {
    console.log('checking guess...');
    if (game.letterIndexes[guess]) {
      game.renderCorrectGuess(guess);
    } else {
      game.renderIncorrectGuess(guess);
      game.renderHangmanBodyPart();
    }
  },

  renderCorrectGuess: function(guess) {
    console.log('rendering correct guess...');
    var indexes = game.letterIndexes[guess];
    indexes.forEach(function(index) {
      game.$letters.children().eq(index).text(guess);
    });
    delete game.letterIndexes[guess];
    if (Object.keys(game.letterIndexes).length === 0) {
      game.gameOver('win');
    }
  },

  renderIncorrectGuess: function(guess) {
    console.log('rendering incorrect guess...');
    var oldGuesses = game.$guesses.text();
    game.$guesses.text(oldGuesses + ' ' + guess);
  },

  renderHangmanBodyPart: function() {
    console.log('rendering hangman body part...');
    game.$hangman.append(game.bodyParts[game.misses]);
    game.misses = game.misses + 1;
    if (game.misses === 6) {
      game.gameOver('lose');
    }
  },

  gameOver: function(winOrLose) {
    console.log('game over...');
    game.$guesses.text('');
    if (winOrLose === 'win') {
      game.$guesses.append($('<span class="winner">WINNER WINNER!</span>'));
    } else {
      game.$guesses.append($('<span class="loser">YOU LOSE. TRY AGAIN!</span>'));
    }
    $('.guess').remove();
  }

};

game.initialize();
