class Cpu extends Player {
    constructor()
    {
        super()
        this.name="cpu"
        this.location = []
    }
    //add cards to player array 
    addCard(cardDesc,visable)
    {
        
        const ID=this.cards.length >0 ? this.cards[this.cards.length - 1].id + 1 : 1;
        const card = {
            id: ID,
            cardText: cardDesc,
            cardID:this.name +"_" +ID,
            cardVisable:visable
            }
        this.cards.push(card);
    }
    // calculete score and update playerscore 
    calculateCards()
    {
        this.currentScore=0;
        for(let i=0;i<this.cards.length;i++) 
        { 
            
            if(this.cards[i].cardVisable===true)
            {
            this.getCardValue(this.cards[i].cardText.split('-')[0]);
            }
        }
        
            
    }
    
    // default card location 
    setLocation()
    {
        this.location=[{left:'900px',top:'50px'},{left:'60px',top:'10px'},{left:'70px',top:'55px'}];
    }
}