var expect = require('chai').expect;
var game = require('./../game.js');

describe('Hangman', function() {
  describe('game methods', function() {
    it('initialize should be a function', function() {
      expect(game.initialize).to.be.a('function');
    });
    it('resetGame should be a function', function() {
      expect(game.resetGame).to.be.a('function');
    });
    it('addButton should be a function', function() {
      expect(game.addButton).to.be.a('function');
    });
    it('setHiddenPhrase should be a function', function() {
      expect(game.setHiddenPhrase).to.be.a('function');
    });
    it('hideRandomWord should be a function', function() {
      expect(game.hideRandomWord).to.be.a('function');
    });
    it('renderEmptyBoxes should be a function', function() {
      expect(game.renderEmptyBoxes).to.be.a('function');
    });
    it('setLetterIndexes should be a function', function() {
      expect(game.setLetterIndexes).to.be.a('function');
    });
    it('centerEmptyBoxes should be a function', function() {
      expect(game.centerEmptyBoxes).to.be.a('function');
    });
    it('setCurrentGuess should be a function', function() {
      expect(game.setCurrentGuess).to.be.a('function');
    });
    it('checkGuess should be a function', function() {
      expect(game.checkGuess).to.be.a('function');
    });
    it('renderCorrectGuess should be a function', function() {
      expect(game.renderCorrectGuess).to.be.a('function');
    });
    it('renderIncorrectGuess should be a function', function() {
      expect(game.renderIncorrectGuess).to.be.a('function');
    });
    it('renderHangmanBodyPart should be a function', function() {
      expect(game.renderHangmanBodyPart).to.be.a('function');
    });
    it('gameOver should be a function', function() {
      expect(game.gameOver).to.be.a('function');
    });
  });
});
