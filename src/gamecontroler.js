class gameControler {
    constructor(player,cpu,gameview)
    {
        this.player=player
        this.cpu=cpu
        this.gameview = gameview
        this.shuffledCards=[]
        this.betMoney=0
        this.actualBet=0
        this.token=[]
        this.isCardDeal=false;
        this.tokenLocation={
        token10:[{left:'900px',top:'642px'},{left:'525px',top:'480px'}],
        token20:[{left:'970px',top:'642px'},{left:'600px',top:'480px'}],
        token50:[{left:'1040px',top:'642px'},{left:'550px',top:'520px'}],
        token100:[{left:'1110px',top:'642px'},{left:'625px',top:'520px'}]}
        this.tokenBetLocation={
        token10:[{left:'525px',top:'550px'},{left:'900px',top:'642px'}],
        token20:[{left:'600px',top:'550px'},{left:'970px',top:'642px'}],
        token50:[{left:'550px',top:'550px'},{left:'1040px',top:'642px'}],
        token100:[{left:'625px',top:'550px'},{left:'1110px',top:'642px'}]}
        this.gamestate=['YOU LOSE','YOU WIN','IT IS DRAW','OUT OF CREDITS']
        this.deck = ["2-PK", "3-PK", "4-PK", "5-PK", "6-PK", "7-PK", "8-PK", "9-PK", "10-PK", "J-PK", "Q-PK", "K-PK", "A-PK",
        "2-KA", "3-KA", "4-KA", "5-KA", "6-KA", "7-KA", "8-KA", "9-KA", "10-KA", "J-KA", "Q-KA", "K-KA", "A-KA",
        "2-TR", "3-TR", "4-TR", "5-TR", "6-TR", "7-TR", "8-TR", "9-TR", "10-TR", "J-TR", "Q-TR", "K-TR", "A-PK",
        "2-KR", "3-KR", "4-KR", "5-KR", "6-KR", "7-KR", "8-KR", "9-KR", "10-KR", "J-KR", "Q-KR", "K-KR", "A-KR"];
        this.gameview.bindHitButton(this.hitButton)
        this.gameview.bindDealButton(this.dealButton)
        this.gameview.bindStandButton(this.standButton)  
        this.gameview.bindStartButton(this.startButton) 
        this.gameview.bindAgainButton(this.againButton) 
        this.gameview.bind10Button(this.bet10);
        this.gameview.bind20Button(this.bet20);
        this.gameview.bind50Button(this.bet50);
        this.gameview.bind100Button(this.bet100);
        this.gameview.bindToken(this.undoBet);
      
    }

    /*--------------- game buttons ----------------------------*/
    hitButton = getPlayerCard =>
    {
        this.getCardFromDeck(this.player);
        if(this.player.currentScore > 21)
        {
            this.gameResult();
        }
        
    }

    dealButton = betMoney =>
    {
        this.getCardFromDeck(this.player,true);
        this.getCardFromDeck(this.cpu,true);
        this.getCardFromDeck(this.player,true);
        this.getCardFromDeck(this.cpu,false);
        this.cpu.calculateCards();
        this.gameview.showPlayersScore(this.cpu);
        this.gameview.buttonsVisability(false,true,true);
        this.gameview.scoreVisability(true);
        this.isCardDeal=true;
    }

    
    standButton = playerStand =>
    {
        this.cpu.cards[1].cardVisable = true;
        this.gameview.rotateCard("cpu_2");
        this.cpu.calculateCards();
        this.gameview.showPlayersScore(this.cpu);
        while(this.cpu.currentScore <= 16)
        {
            
            this.getCardFromDeck(this.cpu,true);
            this.cpu.calculateCards();
            this.gameview.showPlayersScore(this.cpu);
         
        }
        this.gameResult();
    }

    startButton = gameStart => 
    {  
        this.init('new');
    }

    againButton = playagain => 
    {
        this.init();
    }

    bet10= bet10=>
    {
        if(this.isCardDeal==false)
        {

            const id=this.getTokenLastID(this.token);
            this.gameview.createToken(id,"10");
            this.token.push(10);
            this.betUpdate(10);
            const location=this.tokenLocation.token10;
            this.gameview.betTokentAnimation(id,location);
            this.isBetPlaced()
            this.betTokenRemove();
        }
        
    }

    bet20= bet20=>
    {
        if(this.isCardDeal==false)
        {
        const id=this.getTokenLastID(this.token);
        this.gameview.createToken(id,"20");
        this.token.push(20);
        this.betUpdate(20);
        const location=this.tokenLocation.token20;
        this.gameview.betTokentAnimation(id,location,'forward');
        this.isBetPlaced()
        this.betTokenRemove();
        }
    }

    bet50= bet50=>
    {
        if(this.isCardDeal==false)
        {
        const id=this.getTokenLastID(this.token);
        this.gameview.createToken(id,"50");
        this.token.push(50);
        this.betUpdate(50);
        const location=this.tokenLocation.token50;
        this.gameview.betTokentAnimation(id,location,'forward');
        this.isBetPlaced()
        this.betTokenRemove();
        }
    }
    //add bets 
    bet100= bet100=>
    {
        if(this.isCardDeal==false)
        {

        const id=this.getTokenLastID(this.token);
        this.gameview.createToken(id,"100");
        this.token.push(100);
        this.betUpdate(100);
        const location=this.tokenLocation.token100;
        this.gameview.betTokentAnimation(id,location,'forward');
        this.isBetPlaced();
        this.betTokenRemove();
        }
    }
    //remove bets 
    undoBet=undoBet=>
    {

        if(this.gameState==false)
        {

     
        let token =String(event.target.classList);
        let elem =document.getElementById(event.target.id);
        token= token.substring(6, token.length);
        let location=[];
        switch(token)
        {
            case '10':
                location=this.tokenBetLocation.token10;
                this.removeBetUpdate(10);
                this.isBetPlaced()
                break;
            case '20':
                location=this.tokenBetLocation.token20;
                this.removeBetUpdate(20);
                this.isBetPlaced()
                break;
            case '50':
                location=this.tokenBetLocation.token50;
                this.removeBetUpdate(50);
                this.isBetPlaced()
                break;
            case '100':
                location=this.tokenBetLocation.token100;
                this.removeBetUpdate(100);
                this.isBetPlaced()
                break;
        }
            
        this.token.splice(event.target.id,1);
        this.gameview.betTokentAnimation(event.target.id,location,'backward');
        }   
        
    }

    /*--------------- game buttons ----------------------------*/


    /*--------------- game helper funcion ----------------------------*/
    shuffleDeck() {
        let n = this.deck.length;
        for (let i = 0; i < n; i++) {
            var r = Math.floor(Math.random() * n);
            this.shuffledCards.push(this.deck[r]);
            this.deck[r] = this.deck[n - 1];
            n--;
        }
    }
    betUpdate(value)
    {
        this.betMoney= this.betMoney - value;
        this.actualBet=this.actualBet + value;
        this.gameview.betMoneyUpdate(this.betMoney);
        this.gameview.betValueUpdate(this.actualBet);
    }

    removeBetUpdate(value)
    {
        this.betMoney= this.betMoney + value;
        this.actualBet=this.actualBet - value;
        this.gameview.betMoneyUpdate(this.betMoney);
        this.gameview.betValueUpdate(this.actualBet);
    }

    isBetPlaced()
    {
      
        if(this.actualBet == 0)
        {
             
             this.gameview.betValueVisiblility(false);
             this.gameview.gameMessageVisiblility(true,"Place your bets");
             this.gameview.buttonsVisability(false,false,false);
             this.gameview.scoreVisability(false);
        }
        else {
            this.gameview.betValueVisiblility(true);
            this.gameview.gameMessageVisiblility(false);
            this.gameview.buttonsVisability(true,false,false);
            
        }
    }
    //hide token on the game scene 
    betTokenRemove()
    {
        if(!((this.betMoney/100)>=1)|| this.betMoney<100)
        {
            this.gameview.hideToken('dol100');
        }
         if(!((this.betMoney/50)>=1) || this.betMoney<50)
        {
            this.gameview.hideToken('dol50');
        }
        if(!((this.betMoney/20)>=1)|| this.betMoney<20)
        {
            this.gameview.hideToken('dol20');
        }
        if(!((this.betMoney/10)>=1)|| this.betMoney<10)
        {
            this.gameview.hideToken('dol10');
        }
    }


    /* display game result */
    gameResult()
    {
        if(this.cpu.currentScore<=21 && this.player.currentScore<=21)
        {
            if(this.cpu.currentScore>this.player.currentScore)
            {
                //you lose
                
                (this.betMoney==0)?this.gameview.gameScreen(this.gamestate[3]):this.gameview.gameScreen(this.gamestate[0]);
                
            }
            if(this.cpu.currentScore===this.player.currentScore)
            {
                // is draw
                this.betMoney = this.betMoney + this.actualBet;
                this.gameview. betMoneyUpdate(this.betMoney);
                this.gameview.gameScreen(this.gamestate[2]);
                
            }

            if(this.cpu.currentScore<this.player.currentScore)
            {
                //You win 
                
                this.betMoney = this.betMoney + (this.actualBet * 2);
                this.gameview. betMoneyUpdate(this.betMoney);
                this.gameview.gameScreen(this.gamestate[1]);
               
               
            }
        }

        else {
            if(this.cpu.currentScore>21 )
            {
                    
                    this.betMoney = this.betMoney + this.actualBet * 2;
                    this.gameview. betMoneyUpdate(this.betMoney);
                    this.gameview.gameScreen(this.gamestate[1]);
            }
            if(this.player.currentScore>21 )
            {
                   (this.betMoney==0)?this.gameview.gameScreen(this.gamestate[3]):this.gameview.gameScreen(this.gamestate[0]);
                  
                    
            }
        }
        
        
        
    }
    // get last token id from provided array
    getTokenLastID(tokenArray)
    {
        const ID=tokenArray.length >0 ? tokenArray.length - 1 + 1 : 0;
        return ID;
    }
    /* get card from card array
       create card on ui 
       run card animation 
       update player score on the ui
    */
    getCardFromDeck(player,rotate)
    {
        let card = this.shuffledCards.shift();
        player.addCard(card,rotate);
        this.gameview.createDeckCard(this.getPlayerLastCardID(player),this.getPlayerLastCardImg(player));
        this.gameview.cardAnimation(this.getPlayerLastCardID(player),player.location,rotate);
        this.gameview.showPlayersScore(player);
        player.nextCardLocation(80);
    }
    // get last id of card added to player array 
    getPlayerLastCardID(player)
    {
        const id= player.cards[player.cards.length -1].cardID;
        return id;
    }
    // get last id of image added to player array 
    getPlayerLastCardImg(player){
        const img = player.cards[player.cards.length -1].cardText;
        return img;
    }
    //init game 
    init(state) {
        
        (state=='new')?this.betMoney=2500:this.betMoney= this.betMoney;
        this.gameview.betMoneyUpdate(this.betMoney);
        this.gameview. showToken();
        this.shuffleDeck()
        this.clearOldData();
        this.gameview.backCard();
        this.isBetPlaced();
        this.isCardDeal=false;

    }

    
    // game view reset 
    clearOldData()
    {
        this.gameview.clearCards();
        this.player.setLocation();
        this.cpu.setLocation();
        this.cpu.cards.splice(0,this.cpu.cards.length);
        this.player.cards.splice(0,this.player.cards.length);
        this.player.currentScore=0;
        this.cpu.currentScore=0;
        this.gameview.showPlayersScore(this.cpu);
        this.gameview.showPlayersScore(this.player);
        this.gameview.clearTokens();
        this.gameview.betValueUpdate(0);
        this.token.splice(0,this.token.length);
        this.actualBet = 0;

    }

   /*--------------- game helper funcion ----------------------------*/
}
const game = new gameControler(new Player(),new Cpu,new gameView())