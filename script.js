/**
 * Created by Andres on 2/9/2017.
 */
$(document).ready(function () {

    //gameScreen allows cellphone and tablets to play
    gameScreen();

    var questionBank = {"list" : [
        {
            "word": "yeezy",
            "clue": "Kanye West & Adidas partnered to create this brand:"
        },
        {
            "word": "supreme",
            "clue": "Skateboard company famous for the box logo:"
        },
        {
            "word": "prada",
            "clue": "A brand mostly likely to be worn by The devil:"
        },
        {
            "word": "versace",
            "clue": "The fashion house known for the iconic Medusa head:"
        },
        {
            "word": "gucci",
            "clue": "Italian luxury brand with the recognizable Green/red:"
        }
    ]};
    var rand = Math.floor(Math.random()*questionBank.list.length);
    var storedQuestion = questionBank.list[rand].clue;
    var storedWord = questionBank.list[rand].word; /*[seven letters max]*/

    /*count the amount of letters and display blank on the board */
    var wordCount = storedWord.length;
    var good = document.getElementById('good');
    var bad = document.getElementById('bad');

    //setting up div#question
    $('#question').html(storedQuestion);

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
        if(event.keyCode==229){
            event.keyCode=$('#dummy').val().
            slice($('#dummy').val().length-1, $('#dummy').val().length)
                .toUpperCase().charCodeAt(0);
        }

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

    /**Determines if game is over:
     * 1. result is assigned count(hangman is completed) or word(word is guessed)
     * 2. switch case count: display lost, turns of keyboard, prints lost
     * 3. swutch case word: display won, turns off keyboard, prints won*/
    function isOver() {
        var greaterThanSix = (scoreCount >= 6);
        var result;

        if (wordComplete() || greaterThanSix){
            result = (greaterThanSix)? "count" : "word";
        }

        switch (result){
            case "count":
                $('#scoreboard>p').html("LOST");
                $(document).off("keyup", handleKeyUp);
                console.log(result);
                break;
            case "word":
                $('#scoreboard>p').html("WON!!");
                $(document).off("keyup", handleKeyUp);
                console.log(result);
                break;
            default:
        }

    }

    /**Determines if current word is equal to word to be guessed
     * 1. for loop: append current letters and stores in var current
     * 2. then fx compares current and storedWord, if equal return true
     *  or otherwise false*/
    function wordComplete() {
        var current = "";
        for(var i = 0; i <=storedWord.length; i++){
            current +=($('#t'+i).text());
        }
        return (current == storedWord) ? true : false;
    }

    function gameScreen() {
        $(document).on("click",function(){
            $('#dummy').focus();
        });
        $('#dummy').focus();
    }
});


