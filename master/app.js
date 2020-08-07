/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variable for the essential objects of the game.
var scores, roundScore, activePlayer, gamePlaying;

newGame();

//dice roll button interactions and logic will be done here
document.querySelector('.btn-roll').addEventListener('click',function(){
    //instituting a dice roll


    if(gamePlaying){
        var dice=Math.floor(Math.random()*6)+1;

        //displaying a dice image on the game space
        var diceDOM=document.querySelector('.dice');
        diceDOM.style.display='block';
        diceDOM.src='dice-' + dice + '.png';
    
        //if the dice is greater than 1, we will add the score to the player's round score label
        if(dice!==1){
            //add the score to the label
            roundScore+=dice;
            document.getElementById('current-'+activePlayer).textContent= roundScore;
        }
        else{
            //go to the next player's turn and reset the round score
           nextPlayer();
    
    
        }
    }
    
   
});

//when the hold button is pressed, we will move the player's current score to their total score and move to the next player's turn.
//here it should also check for the win condition and finish the game if it is met.
document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if(gamePlaying){
        //add the current valid roundscore to the current player's turn
        scores[activePlayer]+=roundScore;

        //update the user interface to reflect score change
        document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];

        //check if player has won the game.
        if(scores[activePlayer]>=20){
            if(activePlayer==0){
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                document.getElementById('name-'+activePlayer).textContent='Player 1 Wins!';
                document.getElementById('name-'+(activePlayer+1)).textContent='Player 2 Loses';
                document.querySelector('.dice').style.display='none';
                gamePlaying=false;
            }
            else{
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                document.getElementById('name-'+activePlayer).textContent='Player 2 Wins!';
                document.getElementById('name-0').textContent='Player 1 Loses';
                document.querySelector('.dice').style.display='none';
                gamePlaying=false;
            }
        
        }
        else{
            //swap to the next player's turn
            nextPlayer();
        }
    
    }
    
  

});

//function called to swap active player on the game board
function nextPlayer(){
    activePlayer===0 ? activePlayer=1 : activePlayer=0;
    roundScore=0;

    //re-initialize the round scores
    document.getElementById('current-0').textContent= '0';
    document.getElementById('current-1').textContent= '0';

    //switch the current active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display='none';
};

//function initialized at the beginning of a play session and upon pressing the new game button.
function newGame(){
    scores=[0,0];
    activePlayer=0;
    roundScore=0;
    gamePlaying=true;

    document.querySelector('.dice').style.display='none';
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


};


//starts up a new game upon selection
document.querySelector('.btn-new').addEventListener('click',newGame);


