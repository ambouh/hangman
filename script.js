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


    for (var i= 0; i<wordCount; i++) {
        goodUl.append('<li class="blank" id=t'+i+'></li>');
    }
});


