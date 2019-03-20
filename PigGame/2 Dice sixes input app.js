/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activeP,endGame, dice2; //removed lastRoll and replaced by dice2

//start of game:
newGame();


//Roll dice action:
// if (scores[activeP] < 25) { listner } why it doesn't stop even at both >25
//if( document.getElementById('name-0').textContent === 'PLAYER 1' && document.getElementById('name-1').textContent === 'PLAYER 2') {listner}

document.querySelector('.btn-roll').addEventListener('click', function(){
    var dice1 = Math.floor(Math.random() * 6 +1) ; //*2+5 for 5,6 only
    var dice2 = Math.floor(Math.random() * 6 +1) ; //*2+5 for 5,6 only
    var test;
   
    if (scores[activeP] < endGame) {
        
        document.getElementById('dice-1').style.display = "block";
        document.getElementById('dice-2').style.display = "block";
        document.getElementById('dice-1').src ="dice-" + dice1 +'.png';
        document.getElementById('dice-2').src ="dice-" + dice2 +'.png';


        // if dice 1 next player
        
        if (dice1 === 1 || dice2 === 1)  {
            nextP();   //next player here
         }                   

        //if dice not 1 check if six and lastRoll is 6 then clear scores for him and nextP
        else if (dice1 === 6 && dice2 === 6) {
            document.getElementById('score-'+ activeP).textContent = 0;
            scores[activeP]=0;
            nextP();
            
               // if no 6 && 6 then do add dice to roundscore, and store dice in lastRoll. 
        }else { 
            roundScore += dice1 + dice2;
            document.getElementById('current-'+ activeP).textContent = roundScore;


        }
    } 
});


//hold btn
document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activeP] += roundScore;
    roundScore = 0; 
    document.getElementById('score-' + activeP).textContent = scores[activeP];
    endGame = document.getElementById('winning-score').value; // challenge to make check in new winnig score
    if (endGame === "") endGame = 100;


    if (scores[activeP] >= endGame){ 
        document.getElementById('name-'+ activeP).textContent = 'Winner!!';
        document.querySelector('.player-' + activeP + '-panel').classList.add('winner');
        document.querySelector('.player-' + activeP + '-panel').classList.remove('active');


    } else{
        nextP();        //next player here
    }

    
})






// start new game:
document.querySelector('.btn-new').addEventListener('click', newGame);



//next player func

function nextP() {
    roundScore = 0; 
    document.getElementById('current-'+ activeP).textContent = roundScore;
    activeP === 0 ? activeP = 1 : activeP = 0;
    //document.querySelector('.dice').style.display = "none"; //I Don't like that for 1 will be hidden.
   // toggle active class
    document.querySelector('.player-0-panel').classList.toggle('active') ;
    document.querySelector('.player-1-panel').classList.toggle('active') ;

}

// new game
function newGame() {
    activeP = 0;
    scores = [0,0];
    roundScore = 0;
    // get value from input ID
    endGame = 100; 
    dice2 = 2; //removed lastRoll and replaced with dice2

    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    // document.querySelector('.dice').style.display = "none"; removed this and replaced with the 2 dice Id's:
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";
    //reset active & winner.
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
}