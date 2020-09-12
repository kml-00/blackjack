class Player {
    constructor() {
        this.name="player"
        this.cards = []
        this.currentScore=0
        this.location = []
    }

    
     /*
    function add player card to array and update player score 

     */
    addCard(cardDesc)
    {
        
        this.getCardValue(cardDesc.split('-')[0]);
        const ID=this.cards.length >0 ? this.cards[this.cards.length - 1].id + 1 : 1;
        const card = {
            id: ID,
            cardText: cardDesc,
            cardID:this.name +"_" +ID,
            
            }
        this.cards.push(card);
    }

    
    /*
    function is update player score by the card value point
     */
    getCardValue(currentCard)
    {
        
        switch (currentCard) {
            case 'J':
            case 'Q':
            case 'K':
                this.currentScore += 10;
                break;
            case 'A':
                this.currentScore >= 11 ? this.currentScore += 1 : this.currentScore += 11;
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '10':
                this.currentScore += parseInt(currentCard);
                break;
        } 
       
    }
    /* 
    change card location on the screen 
    shift card right from default location 
    parm moveRight-value of shift in px
    

     */
    nextCardLocation(moveRight)
    {
        this.location.forEach(function(item)
        {
            let re = "[0-9]*";
            item.left.match(re) == "900" ? item.left ="900px" : item.left=String(parseInt(item.left.match(re))+moveRight)+"px";
           
        });
    }
    // default card location
    setLocation()
    {
        this.location=[{left:'900px',top:'50px'},{left:'450px',top:'300px'},{left:'70px',top:'622px'}];
    }
    
    

}

