class gameView {
    constructor()
    {
        this.cpuScore=document.getElementById('croupier_score');
        this.playerScore=document.getElementById('player_score');
        this.croupier=document.querySelector('.croupier');
        this.player=document.querySelector('.player');
        this.cardDeck=document.getElementById("deck");
        this.dealButton =document.getElementById('betBtn');
        this.hitButton =document.getElementById('htiBtn');
        this.standButton = document.getElementById('standBtn');
        this.startButton =document.getElementById('startBtn');
        this.againButton =document.getElementById('againBtn');
        this.gamescreen =document.getElementById('gamemenu');
        this.message =document.getElementById('message');
        this.betValue=document.getElementById('betValue');
        this.betMoney = document.getElementById('money');
        this.bet10Button=document.getElementById('dol10');
        this.bet20Button=document.getElementById('dol20');
        this.bet50Button=document.getElementById('dol50');
        this.bet100Button=document.getElementById('dol100');
        this.betContainer=document.querySelector('.bet');
        this.playerBet=document.getElementById('player_bet');
        this.betValue = document.getElementById('betValue');
        this.betToken = document.getElementById('betToken');
        this.gameMessage=document.querySelector('.gameMessage');
    }

    /* create token animation 
    parm tokenID - card id,
    parm framesArray - array of kayframes of animation 
    parm direction - animation direction specify direction

    
    */ 

    /* ----------game view animations --------------- BEGIN*/
    betTokentAnimation(tokenID,framesArray,direction='forward')
    {
        let element = document.getElementById(tokenID);
        let animation=element.animate(framesArray,{
            duration:500,
            fill:'forwards'
        }) 

        if(direction=='backward')
        {
            animation.onfinish = () =>
            {
                element.parentElement.removeChild(element);  
            }
            
        }
        
    }

    // create card animation 
    cardAnimation(cardID,framesArray,rotate=true) {
        let element = document.getElementById(cardID);
        let animation=element.animate(framesArray,{
            duration:1000,
            fill:'forwards'
        }) 
        if(rotate)
        {
            element.children[1].style.transform = "rotateY(180deg)";
        }
        
    }

    rotateCard(cardID)
    {
        let element = document.getElementById(cardID);
        element.children[1].style.transform = "rotateY(180deg)";
    }
     /* ----------game view animations --------------- END*/


    /* ----------- gameview html elements creation BEGIN----*/
     // create new token and add it to dom 
    createToken(tokenID,imgname)
    {
        let html,newHTML;
    
        html ='<img id="%id%" src="assets/token/%imgname%.png" class="ntoken%imgname%">';

        const tokenId = /%id%/gm;
        const tokenimage = /%imgname%/gm;
        newHTML = html.replace(tokenId,tokenID);
        newHTML = newHTML.replace(tokenimage,imgname);
    
        this.betToken.insertAdjacentHTML('beforeend',newHTML);
          
    }
    // create new card and add it to dom
    createDeckCard(cardID,imgname)
    {
            let html,newHTML;
    
            html ='<div id="%id%" class="card"><div class="front" ><img src="assets/cards/%imgname%.jpg"></div><div class="back" ><img src="assets/cards/BACK.jpg"></div></div>';
    
            const cardId = /%id%/gm;
            const image = /%imgname%/gm;
            newHTML = html.replace(cardId,cardID);
            newHTML = newHTML.replace(image,imgname);
        
            this.cardDeck.insertAdjacentHTML('beforeend',newHTML);
    }

    // create and add card back to dom 
    backCard(){
       
        let html ='<div  class="card"><div class="back" ><img src="assets/cards/BACK.jpg"></div></div>';
        this.cardDeck.insertAdjacentHTML('beforeend',html); 
    }

     /* ----------- gameview html elements creation END----*/


    
 
     /* ----------- gameview html elements setup BEGIN----
        functions setup value of html elements or clear them 
     */

    // display availabl bet money 
    betMoneyUpdate(value)
    {
        this.betMoney.innerHTML = value;
    }
    // display money used in bet
    betValueUpdate(value)
    {
        this.betValue.innerHTML = value;
    }
    // remove all cards from the screen 
    clearCards()
    {
        this.cardDeck.innerHTML ='';
    }

    clearTokens()
    {
        this.betToken.innerHTML ='';
    }

    /* ----------- gameview html elements setup END----*/


    /* ----------- gameview hidding and visibling function BEGIN----
        function hide or make elements visable 
    */
    
    betValueVisiblility(state)
    {
        (state==true) ? this.betValue.style.visibility = "visible":this.betValue.style.visibility = "hidden";
    }

    scoreVisability(state=false)
    {
        (state==true) ? this.cpuScore.style.visibility = "visible":this.cpuScore.style.visibility = "hidden";
        (state==true) ? this.playerScore.style.visibility = "visible":this.playerScore.style.visibility = "hidden";
    }

    
    gameMessageVisiblility(state,message)
    {
        if(state==false)
        {
            this.gameMessage.style.visibility =  "hidden";
        }
        else {
            this.gameMessage.innerHTML = message;
            this.gameMessage.style.visibility = "visible";
        }
    }

    buttonsVisability(deal=false,hit=false,stand=false)
    {
        (deal==false) ? this.dealButton.style.visibility =  "hidden":this.dealButton.style.visibility =  "visible";
        (hit==false) ? this.hitButton.style.visibility =  "hidden":this.hitButton.style.visibility =  "visible";
        (stand==false) ? this.standButton.style.visibility =  "hidden":this.standButton.style.visibility =  "visible";
    }

  
  
    // display player score 
    showPlayersScore(player){
        (player instanceof Cpu) ? this.cpuScore.innerHTML = player.currentScore: this.playerScore.innerHTML = player.currentScore;
    }

    // display game screen with game state 
    gameScreen(gamestate)
    {
        this.gamescreen.style.display ='flex';
        this.message.style.display = 'block';
        this.startButton.style.display = "none";
        this.againButton.style.display = "inline-block";
        this.message.innerHTML = gamestate;
        
    }

    gameScreenHide(){
        this.gamescreen.style.display ='none';
    }

    dealButtonVisable()
    {
        this.dealButton.style.visibility =  "hidden";
    }


    /* ----------- gameview hidding and visibling function END----*/

    /*-------------- binding view buttons to controller BEGIN--------*/ 
    
    bindHitButton(controler) {
        this.hitButton.addEventListener('click',event => {
            controler()
        });
    }

    bindStandButton(controler)
    {
        this.standButton.addEventListener('click',event => {
            controler()
        });
    }
    
    bindToken(controler)
    {
        this.betToken.addEventListener('click',event =>
        {
            if (event.target.tagName.toLowerCase() == "img"){
                controler()
            }
            
        });
    }

    bindDealButton(controler)
    {
        this.dealButton.addEventListener('click',event => {
            controler()
        });
    }

    bind10Button(controler)
    {
        this.bet10Button.addEventListener('click',event => {
            controler()
        });
    }

    bind20Button(controler)
    {
        this.bet20Button.addEventListener('click',event => {
            controler()
        });
    }

    bind50Button(controler)
    {
        this.bet50Button.addEventListener('click',event => {
            controler()
        });
    }

    bind100Button(controler)
    {
        this.bet100Button.addEventListener('click',event => {
            controler()
        });
    }

   

    bindStartButton(controler)
    {
        this.startButton.addEventListener('click',event => {
            this.gameScreenHide();
            controler()
        });
    }

    bindAgainButton(controler)
    {
        this.againButton.addEventListener('click',event => {
            this.gameScreenHide();
            controler()
        });
    }
/*-------------- binding view buttons to controller END--------*/ 
    
}