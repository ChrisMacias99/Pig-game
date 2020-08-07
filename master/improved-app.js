/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a set of dice as many times as he whishes. Each result will get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his TOTAL score. After that, it's the next player's turn
- The first player to reach the specified numeber of points given by the user wins the game

*/

// variable for the essential objects of the game.
var scores, roundScore, activePlayer, gamePlaying, lastRoll;

newGame();

//dice roll button interactions and logic will be done here
document.querySelector('.btn-roll').addEventListener('click',function(){
    //instituting a dice roll


    if(gamePlaying){
        var dice1=Math.floor(Math.random()*6)+1;
        var dice2=Math.floor(Math.random()*6)+1;

        //displaying a dice image on the game space
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';
        document.getElementById('dice-1').src='dice-' + dice1 + '.png';
        document.getElementById('dice-2').src='dice-' + dice2 + '.png';
        
        //UPDATE: new conditional check to see if two 6s were rolled in a row, indicating active player change and loss of round score
        //UPDATE 2: removed condition from game logic
        /*
        if(dice===6 && lastRoll===6){
            //remove the player score
            scores[activePlayer]=0;
            document.getElementById('score-'+activePlayer).textContent='0';
            nextPlayer();


        }
        */
        //if the dice is greater than 1, we will add the score to the player's round score label UPDATE: added another dice to the game.
        if(dice1!==1 && dice2!==1){
            //add the score to the label
            roundScore+=dice1+dice2;
            document.getElementById('current-'+activePlayer).textContent= roundScore;
        }
        else{
            //go to the next player's turn and reset the round score
           nextPlayer();
    
    
        }
        /*this is no longer part of the game conditional logic*/
        //lastRoll=dice;
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

        var input=document.querySelector('.required-score').value;

        if(input){
            var requiredScore=input;

        }
        else{
            requiredScore=100;
        }

        //check if player has won the game.
        if(scores[activePlayer]>=requiredScore){
            if(activePlayer==0){
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                document.querySelector('.player-'+(activePlayer+1)+'-panel').classList.add('loser');
                document.getElementById('name-'+activePlayer).textContent='Player 1 Wins!';
                document.getElementById('name-'+(activePlayer+1)).textContent='Player 2 Loses...';
                hideDice();
                gamePlaying=false;
            }
            else{
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                document.querySelector('.player-0-panel').classList.add('loser');
                document.getElementById('name-'+activePlayer).textContent='Player 2 Wins!';
                document.getElementById('name-0').textContent='Player 1 Loses...';
                hideDice();
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

    hideDice();
};

//function initialized at the beginning of a play session and upon pressing the new game button.
function newGame(){
    scores=[0,0];
    activePlayer=0;
    roundScore=0;
    gamePlaying=true;

    hideDice();
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('loser');
    document.querySelector('.player-1-panel').classList.remove('loser');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


};

//funtion to hide dice from the visible game space
function hideDice(){
    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
}


//starts up a new game upon selection
document.querySelector('.btn-new').addEventListener('click',newGame);


