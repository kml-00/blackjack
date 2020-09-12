class Player{constructor(){this.name="player",this.cards=[],this.currentScore=0,this.location=[]}addCard(t){this.getCardValue(t.split("-")[0]);const e=this.cards.length>0?this.cards[this.cards.length-1].id+1:1,i={id:e,cardText:t,cardID:this.name+"_"+e};this.cards.push(i)}getCardValue(t){switch(t){case"J":case"Q":case"K":this.currentScore+=10;break;case"A":this.currentScore>=11?this.currentScore+=1:this.currentScore+=11;break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"10":this.currentScore+=parseInt(t)}}nextCardLocation(t){this.location.forEach((function(e){"900"==e.left.match("[0-9]*")?e.left="900px":e.left=String(parseInt(e.left.match("[0-9]*"))+t)+"px"}))}setLocation(){this.location=[{left:"900px",top:"50px"},{left:"450px",top:"300px"},{left:"70px",top:"622px"}]}}class Cpu extends Player{constructor(){super(),this.name="cpu",this.location=[]}addCard(t,e){const i=this.cards.length>0?this.cards[this.cards.length-1].id+1:1,s={id:i,cardText:t,cardID:this.name+"_"+i,cardVisable:e};this.cards.push(s)}calculateCards(){this.currentScore=0;for(let t=0;t<this.cards.length;t++)!0===this.cards[t].cardVisable&&this.getCardValue(this.cards[t].cardText.split("-")[0])}setLocation(){this.location=[{left:"900px",top:"50px"},{left:"60px",top:"10px"},{left:"70px",top:"55px"}]}}class gameView{constructor(){this.cpuScore=document.getElementById("croupier_score"),this.playerScore=document.getElementById("player_score"),this.croupier=document.querySelector(".croupier"),this.player=document.querySelector(".player"),this.cardDeck=document.getElementById("deck"),this.dealButton=document.getElementById("betBtn"),this.hitButton=document.getElementById("htiBtn"),this.standButton=document.getElementById("standBtn"),this.startButton=document.getElementById("startBtn"),this.againButton=document.getElementById("againBtn"),this.gamescreen=document.getElementById("gamemenu"),this.message=document.getElementById("message"),this.betValue=document.getElementById("betValue"),this.betMoney=document.getElementById("money"),this.bet10Button=document.getElementById("dol10"),this.bet20Button=document.getElementById("dol20"),this.bet50Button=document.getElementById("dol50"),this.bet100Button=document.getElementById("dol100"),this.betContainer=document.querySelector(".bet"),this.playerBet=document.getElementById("player_bet"),this.betValue=document.getElementById("betValue"),this.betToken=document.getElementById("betToken"),this.gameMessage=document.querySelector(".gameMessage")}betTokentAnimation(t,e,i="forward"){let s=document.getElementById(t),a=s.animate(e,{duration:500,fill:"forwards"});"backward"==i&&(a.onfinish=()=>{s.parentElement.removeChild(s)})}cardAnimation(t,e,i=!0){let s=document.getElementById(t);s.animate(e,{duration:1e3,fill:"forwards"});i&&(s.children[1].style.transform="rotateY(180deg)")}rotateCard(t){document.getElementById(t).children[1].style.transform="rotateY(180deg)"}createToken(t,e){let i,s;i='<img id="%id%" src="assets/token/%imgname%.png" class="ntoken%imgname%">';s='<img id="%id%" src="assets/token/%imgname%.png" class="ntoken%imgname%">'.replace(/%id%/gm,t),s=s.replace(/%imgname%/gm,e),this.betToken.insertAdjacentHTML("beforeend",s)}createDeckCard(t,e){let i,s;i='<div id="%id%" class="card"><div class="front" ><img src="assets/cards/%imgname%.jpg"></div><div class="back" ><img src="assets/cards/BACK.jpg"></div></div>';s='<div id="%id%" class="card"><div class="front" ><img src="assets/cards/%imgname%.jpg"></div><div class="back" ><img src="assets/cards/BACK.jpg"></div></div>'.replace(/%id%/gm,t),s=s.replace(/%imgname%/gm,e),this.cardDeck.insertAdjacentHTML("beforeend",s)}backCard(){this.cardDeck.insertAdjacentHTML("beforeend",'<div  class="card"><div class="back" ><img src="assets/cards/BACK.jpg"></div></div>')}betMoneyUpdate(t){this.betMoney.innerHTML=t}betValueUpdate(t){this.betValue.innerHTML=t}clearCards(){this.cardDeck.innerHTML=""}clearTokens(){this.betToken.innerHTML=""}betValueVisiblility(t){this.betValue.style.visibility=1==t?"visible":"hidden"}scoreVisability(t=!1){this.cpuScore.style.visibility=1==t?"visible":"hidden",this.playerScore.style.visibility=1==t?"visible":"hidden"}gameMessageVisiblility(t,e){0==t?this.gameMessage.style.visibility="hidden":(this.gameMessage.innerHTML=e,this.gameMessage.style.visibility="visible")}buttonsVisability(t=!1,e=!1,i=!1){this.dealButton.style.visibility=0==t?"hidden":"visible",this.hitButton.style.visibility=0==e?"hidden":"visible",this.standButton.style.visibility=0==i?"hidden":"visible"}showPlayersScore(t){t instanceof Cpu?this.cpuScore.innerHTML=t.currentScore:this.playerScore.innerHTML=t.currentScore}gameScreen(t){this.gamescreen.style.display="flex",this.message.style.display="block","OUT OF CREDITS"===t?(this.startButton.style.display="inline-block",this.againButton.style.display="none"):(this.againButton.style.display="inline-block",this.startButton.style.display="none"),this.message.innerHTML=t}gameScreenHide(){this.gamescreen.style.display="none"}dealButtonVisable(){this.dealButton.style.visibility="hidden"}bindHitButton(t){this.hitButton.addEventListener("click",e=>{t()})}bindStandButton(t){this.standButton.addEventListener("click",e=>{t()})}bindToken(t){this.betToken.addEventListener("click",e=>{"img"==e.target.tagName.toLowerCase()&&t()})}bindDealButton(t){this.dealButton.addEventListener("click",e=>{t()})}bind10Button(t){this.bet10Button.addEventListener("click",e=>{t()})}bind20Button(t){this.bet20Button.addEventListener("click",e=>{t()})}bind50Button(t){this.bet50Button.addEventListener("click",e=>{t()})}bind100Button(t){this.bet100Button.addEventListener("click",e=>{t()})}bindStartButton(t){this.startButton.addEventListener("click",e=>{this.gameScreenHide(),t()})}bindAgainButton(t){this.againButton.addEventListener("click",e=>{this.gameScreenHide(),t()})}}class gameControler{constructor(t,e,i){this.player=t,this.cpu=e,this.gameview=i,this.shuffledCards=[],this.betMoney=0,this.actualBet=0,this.token=[],this.tokenLocation={token10:[{left:"900px",top:"642px"},{left:"525px",top:"400px"}],token20:[{left:"970px",top:"642px"},{left:"600px",top:"400px"}],token50:[{left:"1040px",top:"642px"},{left:"550px",top:"500px"}],token100:[{left:"1110px",top:"642px"},{left:"625px",top:"500px"}]},this.tokenBetLocation={token10:[{left:"525px",top:"400px"},{left:"900px",top:"642px"}],token20:[{left:"600px",top:"400px"},{left:"970px",top:"642px"}],token50:[{left:"550px",top:"500px"},{left:"1040px",top:"642px"}],token100:[{left:"625px",top:"500px"},{left:"1110px",top:"642px"}]},this.gamestate=["YOU LOSE","YOU WIN","IT IS DRAW","OUT OF CREDITS"],this.deck=["2-PK","3-PK","4-PK","5-PK","6-PK","7-PK","8-PK","9-PK","10-PK","J-PK","Q-PK","K-PK","A-PK","2-KA","3-KA","4-KA","5-KA","6-KA","7-KA","8-KA","9-KA","10-KA","J-KA","Q-KA","K-KA","A-KA","2-TR","3-TR","4-TR","5-TR","6-TR","7-TR","8-TR","9-TR","10-TR","J-TR","Q-TR","K-TR","A-PK","2-KR","3-KR","4-KR","5-KR","6-KR","7-KR","8-KR","9-KR","10-KR","J-KR","Q-KR","K-KR","A-KR"],this.gameview.bindHitButton(this.hitButton),this.gameview.bindDealButton(this.dealButton),this.gameview.bindStandButton(this.standButton),this.gameview.bindStartButton(this.startButton),this.gameview.bindAgainButton(this.againButton),this.gameview.bind10Button(this.bet10),this.gameview.bind20Button(this.bet20),this.gameview.bind50Button(this.bet50),this.gameview.bind100Button(this.bet100),this.gameview.bindToken(this.undoBet)}hitButton=t=>{this.getCardFromDeck(this.player),this.player.currentScore>21&&this.gameResult()};dealButton=t=>{this.getCardFromDeck(this.player,!0),this.getCardFromDeck(this.cpu,!0),this.getCardFromDeck(this.player,!0),this.getCardFromDeck(this.cpu,!1),this.cpu.calculateCards(),this.gameview.showPlayersScore(this.cpu),this.gameview.buttonsVisability(!1,!0,!0),this.gameview.scoreVisability(!0)};standButton=t=>{for(this.cpu.cards[1].cardVisable=!0,this.gameview.rotateCard("cpu_2"),this.cpu.calculateCards(),this.gameview.showPlayersScore(this.cpu);this.cpu.currentScore<=16;)this.getCardFromDeck(this.cpu,!0),this.cpu.calculateCards(),this.gameview.showPlayersScore(this.cpu);this.gameResult()};startButton=t=>{this.init("new")};againButton=t=>{this.init()};bet10=t=>{const e=this.getTokenLastID(this.token);this.gameview.createToken(e,"10"),this.token.push(10),this.betUpdate(10);const i=this.tokenLocation.token10;this.gameview.betTokentAnimation(e,i),this.isBetPlaced()};bet20=t=>{const e=this.getTokenLastID(this.token);this.gameview.createToken(e,"20"),this.token.push(20),this.betUpdate(20);const i=this.tokenLocation.token20;this.gameview.betTokentAnimation(e,i,"forward"),this.isBetPlaced()};bet50=t=>{const e=this.getTokenLastID(this.token);this.gameview.createToken(e,"50"),this.token.push(50),this.betUpdate(50);const i=this.tokenLocation.token50;this.gameview.betTokentAnimation(e,i,"forward"),this.isBetPlaced()};bet100=t=>{const e=this.getTokenLastID(this.token);this.gameview.createToken(e,"100"),this.token.push(100),this.betUpdate(100);const i=this.tokenLocation.token100;this.gameview.betTokentAnimation(e,i,"forward"),this.isBetPlaced()};undoBet=t=>{let e=String(event.target.classList);document.getElementById(event.target.id);e=e.substring(6,e.length);let i=[];switch(e){case"10":i=this.tokenBetLocation.token10,this.removeBetUpdate(10),this.isBetPlaced();break;case"20":i=this.tokenBetLocation.token20,this.removeBetUpdate(20),this.isBetPlaced();break;case"50":i=this.tokenBetLocation.token50,this.removeBetUpdate(50),this.isBetPlaced();break;case"100":i=this.tokenBetLocation.token100,this.removeBetUpdate(100),this.isBetPlaced()}this.token.splice(event.target.id,1),this.gameview.betTokentAnimation(event.target.id,i,"backward")};shuffleDeck(){let t=this.deck.length;for(let i=0;i<t;i++){var e=Math.floor(Math.random()*t);this.shuffledCards.push(this.deck[e]),this.deck[e]=this.deck[t-1],t--}}betUpdate(t){this.betMoney=this.betMoney-t,this.actualBet=this.actualBet+t,this.gameview.betMoneyUpdate(this.betMoney),this.gameview.betValueUpdate(this.actualBet)}removeBetUpdate(t){this.betMoney=this.betMoney+t,this.actualBet=this.actualBet-t,this.gameview.betMoneyUpdate(this.betMoney),this.gameview.betValueUpdate(this.actualBet)}isBetPlaced(){0==this.actualBet?(this.gameview.betValueVisiblility(!1),this.gameview.gameMessageVisiblility(!0,"Place your bets"),this.gameview.buttonsVisability(!1,!1,!1),this.gameview.scoreVisability(!1)):(this.gameview.betValueVisiblility(!0),this.gameview.gameMessageVisiblility(!1),this.gameview.buttonsVisability(!0,!1,!1))}gameResult(){this.cpu.currentScore<=21&&this.player.currentScore<=21?(this.cpu.currentScore>this.player.currentScore&&(0==this.betMoney?this.gameview.gameScreen(this.gamestate[3]):this.gameview.gameScreen(this.gamestate[0])),this.cpu.currentScore===this.player.currentScore&&(this.betMoney=this.betMoney+this.actualBet,this.gameview.betMoneyUpdate(this.betMoney),this.gameview.gameScreen(this.gamestate[2])),this.cpu.currentScore<this.player.currentScore&&(this.betMoney=this.betMoney+2*this.actualBet,this.gameview.betMoneyUpdate(this.betMoney),this.gameview.gameScreen(this.gamestate[1]))):(this.cpu.currentScore>21&&(this.betMoney=this.betMoney+2*this.actualBet,this.gameview.betMoneyUpdate(this.betMoney),this.gameview.gameScreen(this.gamestate[1])),this.player.currentScore>21&&(0==this.betMoney?this.gameview.gameScreen(this.gamestate[3]):this.gameview.gameScreen(this.gamestate[0])))}getTokenLastID(t){return t.length>0?t.length-1+1:0}getCardFromDeck(t,e){let i=this.shuffledCards.shift();t.addCard(i,e),this.gameview.createDeckCard(this.getPlayerLastCardID(t),this.getPlayerLastCardImg(t)),this.gameview.cardAnimation(this.getPlayerLastCardID(t),t.location,e),this.gameview.showPlayersScore(t),t.nextCardLocation(80)}getPlayerLastCardID(t){return t.cards[t.cards.length-1].cardID}getPlayerLastCardImg(t){return t.cards[t.cards.length-1].cardText}init(t){this.betMoney="new"==t?2500:this.betMoney,this.gameview.betMoneyUpdate(this.betMoney),this.shuffleDeck(),this.clearOldData(),this.gameview.backCard(),this.isBetPlaced()}clearOldData(){this.gameview.clearCards(),this.player.setLocation(),this.cpu.setLocation(),this.cpu.cards.splice(0,this.cpu.cards.length),this.player.cards.splice(0,this.player.cards.length),this.player.currentScore=0,this.cpu.currentScore=0,this.gameview.showPlayersScore(this.cpu),this.gameview.showPlayersScore(this.player),this.gameview.clearTokens(),this.gameview.betValueUpdate(0),this.token.splice(0,this.token.length),this.actualBet=0}}const game=new gameControler(new Player,new Cpu,new gameView);