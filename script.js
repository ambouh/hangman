/**
 * Created by Andres on 2/9/2017.
 */
$(document).ready(function () {
    var storedWord = "allowed";

    /*count the amount of letters and display blank on the board */
    var wordCount = storedWord.length;
    var good = document.getElementById('good');
    var bad = document.getElementById('bad');

    //setting up div#good
    var ul = document.createElement('ul');
    good.appendChild(ul);
    var goodUl = $('#good>ul');

    //setting up div#bad
    ul = document.createElement('ul');
    bad.appendChild(ul);
    var badUl = $('#bad>ul');

    //loading blank spaces for 'storedWord'
    for (var i= 0; i<wordCount; i++) {
        goodUl.append('<li class="blank" id=t'+i+'></li>');
    }
    var wordArray = storedWord.split("");
    var scoreCount = 0;
    var badLetters = [];
    var usedLetters = [];

    $('#score').html(scoreCount);

    $(document).on("keyup", handleKeyUp);


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
                $('#score').html(++scoreCount);
                $('main').css('background', 'url(images/hang'+scoreCount+'.png) no-repeat');

            }
        }

        isOver();

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

        usedLetters.push(letter);
        return bool;
    }

    function isOver() {
        var greaterThan8 = (scoreCount >= 8);
        var result;
        if (wordComplete() || greaterThan8){
            result = (greaterThan8)? "count" : "word";
        }

        switch (result){
            case "count":
                $('#score').html("<p>LOST</p>");
                $(document).off("keyup", handleKeyUp);
                console.log(result);
                break;
            case "word":
                $('#score>p').html("<p>WON!</p>");
                $(document).off("keyup", handleKeyUp);
                 console.log(result);
                break;
            default:
        }
    }

    function wordComplete() {
        var current = "";
        for(var i = 0; i <=storedWord.length; i++){
            current +=($('#t'+i).text());
        }
        return (current == storedWord) ? true : false;
    }
});


