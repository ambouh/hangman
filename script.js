/**
 * Created by Andres on 2/9/2017.
 */

$(document).ready(function () {
    var storedWord = "allow";

    /*count the amount of letters and display blank on the board */
    var wordCount = storedWord.length;
    var ul = document.createElement('ul');
    var good = document.getElementById('good');
    var bad = document.getElementById('bad');

    good.appendChild(ul);
    bad.appendChild(ul);

    var goodUl = $('#good>ul');
    var badUl = $('#bad>ul');


    for (var i= 0; i < wordCount; i++) {
        goodUl.append('<li class="blank" id=t'+i+'></li>');
    }

    $(document).on("keyup", handleKeyUp);

    var wordArray = storedWord.split("");
    var scoreCount = 0;
    var badLetters = [];
    var usedLetters = [];


    function handleKeyUp(event) {
        if(event.keyCode>64 && event.keyCode<91){
            var input = String.fromCharCode(event.keyCode).toLowerCase();
            guess(input);
        }
    }

    /*checks if letter is part of 'wordArray'
    * 1. checks if isUsed()
    * 2. if (isUsed() == false), checks if 'letter' is part of 'wordArray'
    * - true, adds 'letter' to html
    * - false, adds 'letter' to badLetters,
    *
    */
    function guess(letter) {
        var used = isUsed(letter);
        var found = false;
        if(used == false) {
            for( var i = 0; i <= wordArray.length; i++) {
                if(letter == wordArray[i]){
                    found = true;
                    $('#t'+i).removeClass('blank').append(letter);
                }
            }

            if (found == false) {
                badLetters.push(letter);
                var liForBad = "<li>"+ letter +"</li>";
                badUl.append(liForBad);
                $('main').css('background-image', '#fff');
                scoreCount++;

            }
        }

    }

    /*checks if 'letter' is used:
    * if true, returns true
    * if false, pushes 'letter' in 'usedLetter' array and returns false*/
    function isUsed(letter) {
        var bool = false;
        for(var i = 0; i <= usedLetters.length; i++) {
            if(letter == usedLetters[i]) {
                bool = true;
            }
        }
        return bool;
    }
});


