var socket = io();
	var Game_Object = {
		'Game_id': 0,
		'Player_id': 0, 
		'Current_position': 0,
		'Dice': 0,
		'Next_position': 0,
		'Final_position': 0,
		'turn':false,
		'Exit':false
	};
	var dice =false;
	var load_id= false;
	var game_id_send=true;
    var Gameinitialized = false ;
    var check =false;
    //*********************************************** jS Variable ********************************************
    function xyPosition (x , y ){
	this.x1 	= x;
	this.y1 	= y;
	this.dragok = false;
}
var newpos = new xyPosition(0,0);
var mypos  ;
var mypos2 ;

 
var canvas;
var ctx;
var player1_ID  = 1;
var player2_ID  = 2;



var x1Old = 65;
var y1Old = 540;

var CalcX;
var CalcY;
var WIDTH 		= 960;
var HEIGHT 		= 657;
var picHEIGHT   = 630;
var picWIDTH    = 770;
var state 		= 0;
var update 		= false;
var validMove	= false;
var drag1ok     = false;
var drag2ok     = false; 
var clearValid  = true;
// Snake box values
var boxHeight 	= picHEIGHT / 5;//126
var boxWidth  	= picWIDTH  / 6;//127.5
var PositionOld = 0; 
var player1Turn  ;
var player2Turn  ;

//_________________________________________This data will be set by the server ____________________________
// For testing set postion value
var Position     ; 					// Next position 
var curruntPosition   ;
var newPosition  ;					// if ladder or snacke existed 
var gameEnded    = false   ; 
var player_ID    ;					//ID = 1 if player1 or 2-> player2 

var boxHeightStart;
var boxHeightEnd  ;
var boxWidthStart ;
var boxWidthEnd   ;
var newX;
var newY;


//*************************************************************************************************************
 
			
			
	socket.on('connect',function(){
			console.log("connected");
			load_id= true;
			
			
			
			document.getElementById('diceform').style.visibility = 'hidden';
			socket.emit('send',load_id);
			
			
			socket.on('value of id', function (msg) {
				
				if(Game_Object.Player_id==0)
				{
					if (msg==0)
						console.log ("Please start the game from localhost:3000");
					console.log("Value of id : " + msg);
					Game_Object.Player_id=msg;
					// if input alert msg is written here , it will take player 2 name 
				}
				load_id= false;
			});
			
			
		socket.on('wait', function (msg) {
		if (Game_Object.Game_id==msg)    //asmaa ??
		{
	     	console.log(msg);
		
			var audio = new Audio('mp3/wait.mp3');
                 audio.play();
			swal({ title: "Waiting",text: "Please wait until another player joins the game ",imageUrl: "images/wait.png",confirmButtonColor: "#51B547",});
			}
		});
		
		socket.on('game_id', function (msg) {
		if(game_id_send)
		{
			game_id_send=false;
			Game_Object.Game_id=msg;
			console.log("Value offff game_id : "+msg);
			}
		});
	});
	socket.on('init', function (msg) {
		if (msg.Player_id==Game_Object.Player_id && msg.Game_id==Game_Object.Game_id )
		{
			var audio = new Audio('mp3/player2_joined.mp3');
            audio.play();
			swal({ title: "Player 2 joined",text: "Let's start the game ",imageUrl: "images/multiplayer.jpg",confirmButtonColor: "#51B547"});
			document.getElementById('diceform').style.visibility = 'visible';
			Game_Object=msg;
			document.getElementById("h1").innerHTML = "Your turn";
			document.getElementById("h3").innerHTML = "Your Object is dark";
			}
			else {
				document.getElementById("h1").innerHTML = "Other Player's turn";
				document.getElementById("h3").innerHTML = "Your Object is light";
			}
			
	});
	socket.on('run', function (msg) {
		if (msg.Player_id==Game_Object.Player_id && msg.Game_id==Game_Object.Game_id )
		{
			//document.getElementById('diceform').style.visibility = 'visible';
			
			console.log("id"+Game_Object.Player_id);
			console.log("game"+Game_Object.Game_id);
		}
			//else
			//document.getElementById('diceform').style.visibility = 'hidden';
	});

	socket.on ('changeTurns', function(playerid){
		if ((playerid == 1 && player1Turn == true) || (playerid == 2 && player2Turn == true)){
			document.getElementById("h1").innerHTML = "Your turn";
			document.getElementById('diceform').style.visibility = 'visible';
		}
		else {
			document.getElementById("h1").innerHTML = "Other Player's turn";
			document.getElementById('diceform').style.visibility = 'hidden';
		}
	});
	function reply_click(clicked_id)
	{
		dice = true;
		document.getElementById('diceform').style.visibility = 'hidden';
	}
	//var play1=true;
    $("#diceform").click(function(){
      var audio = new Audio('mp3/dice.wav');
                audio.play();
		document.getElementById('diceform').style.visibility = 'hidden';
		setTimeout(function(){
    //do what you need here

    dice = true;
    Game_Object.Dice= document.getElementById("userInput").value;
	 console.log("dice of "+Game_Object.Player_id+" is------- "+Game_Object.Dice+'\n');
     console.log("current of "+Game_Object.Player_id+" is------ "+Game_Object.Current_position+'\n');
	 console.log("next of "+Game_Object.Player_id+" is ------ "+Game_Object.Next_position+'\n');
     console.log("final of  "+Game_Object.Player_id+" is ------ "+Game_Object.Final_position+'\n');			
      socket.emit('click on dice',Game_Object, dice);
	  dice =false;
	  check =false;
      return false;
	  }, 1000);
    });
var output='';
	socket.on('value of dice', function (msg) {
	if (msg.Player_id==Game_Object.Player_id&& msg.Game_id==Game_Object.Game_id)
	{
		//console.log("Value of dice : " + msg.Dice);
		//Game_Object=msg;
		console.log("Value of dice : " + msg.Dice);
		Game_Object= msg;
		console.log("dice value in value of dice"+Game_Object.Dice+'/n');
console.log("current position in value of dice"+Game_Object.Current_position+'/n');
console.log("next position after dice in value of dice"+Game_Object.Next_position+'/n');
console.log("final position after dice in value of dice"+Game_Object.Final_position+'/n');	  
	  
		//Game_Object.Dice=msg.Dice;
		//Game_Object.Next_position=Game_Object.Current_position+Game_Object.Dice;
		//Game_Object.Next_position=msg.Next_position;  //???
		
		document.getElementById('diceform').style.visibility = 'hidden';

		}
		if(msg.Game_id==Game_Object.Game_id)
		{
		// output += "&#x268" + msg.Dice+ "; ";
		  //  document.getElementById('dice').innerHTML = output;
			}
		if (msg.Player_id!=Game_Object.Player_id && msg.Game_id==Game_Object.Game_id )
		{
			//document.getElementById('diceform').style.visibility = 'visible';
		}
			Game_Object.turn=true;
		//alert($(msg).val());
		$('#messages').append($('<li>').text(msg.Dice));
		socket.emit('end_turn', Game_Object);
		if (check)
        {
            socket.emit('check', "check");
            
        }
        console.log(check);
		
   


 
  
 
function ServerWork(){
 	  Position    		= Game_Object.Next_position; 	// Next position 
	  curruntPosition 	= Game_Object.Current_position;
	  newPosition 		= Game_Object.Final_position;		// if ladder or snacke existed 
 
	  player_ID 		= Game_Object.Player_id ;		//ID = 1 if player1 or 2-> player2 

 console.log("dice value in server work"+Game_Object.Dice+'/n');
	  console.log("current position before dice is"+curruntPosition+'/n');
	  console.log("current position after dice is"+Position+'/n');
	  console.log("final position after dice is"+newPosition+'/n');	  
	    
	 }
//______________________________ End of code which will be substituted by Asmaa and Maha :D ____________________




function CalcPostition (position  ){
	if (position >30){
		position =30;
	}

	//*************CalcY**************
	if (position <= 6 && position >= 1)
		{CalcY = 1;}
	if (position <= 12 && position >= 7)
		{CalcY = 2;}
	if (position <= 18 && position >= 13)
		{CalcY = 3;}
	if (position <= 24 && position >= 19)
		{CalcY = 4;}
	if (position <= 30 && position >= 25)
		{CalcY = 5;}

	//*************CalcX************** 
	if (position == 1 ||position == 12 ||position == 13 ||position ==  24 || position ==  25){
		CalcX = 6;
	}
	if (position == 2 ||position == 11 ||position == 14 ||position ==  23 || position ==  26){
		CalcX = 5;
	}
	if (position == 3 ||position == 10 ||position == 15 ||position ==  22 || position ==  27){
		CalcX = 4;
	}
	if (position == 4 ||position == 9 ||position == 16 ||position ==  21 || position ==  28){
		CalcX = 3;
	}
	if (position == 5 ||position == 8 ||position == 17 ||position ==  20 || position ==  29){
		CalcX = 2;
	}
	if (position == 6 ||position == 7 ||position == 18 ||position ==  19 || position ==  30){
		CalcX = 1;
	}

  boxHeightStart = HEIGHT - (CalcY    ) * (boxHeight);
  boxHeightEnd   = HEIGHT - (CalcY - 1) * (boxHeight);
  boxWidthStart  = WIDTH  - (CalcX    ) * (boxWidth );
  boxWidthEnd    = WIDTH  - (CalcX - 1) * (boxWidth );

newX = boxWidthStart + (boxWidthEnd - boxWidthStart )/2  - 30;
newY = boxHeightStart+ (boxHeightEnd- boxHeightStart)/2;
}



function CheckMyMove(e){
	if (e.pageX >= boxWidthStart  && e.pageX <= boxWidthEnd 
     && e.pageY >= boxHeightStart && e.pageY <= boxHeightEnd) {
		 validMove = true;
	}
}

function rect(x,y,w,h) {
 ctx.beginPath();
 ctx.rect(x,y,w,h);
 ctx.closePath();
 ctx.fill();
}
function circle (x, y , rad  ){
	ctx.beginPath();
    ctx.arc( x, y,  rad , 0, 2 * Math.PI, false);

    ctx.fill();
}

function clear() {
 ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
 canvas = document.getElementById("canvas");
 ctx = canvas.getContext("2d");






 if ( !Gameinitialized ){
        mypos  = new xyPosition(65,590);
        mypos2 = new xyPosition(65,540);
        Gameinitialized = true;
 }
 return setInterval(draw, 1);

}
//=====================================================================================================================
// ___________________________________________________ postServer ___________________________________________________
// =====================================================================================================================
	 function postServer(){
	 	// TODO: set the variables after each server call 
	 	//PositionOld	    = 1; 		// set by the server initially only , then it is recalculated in runtime
	 	if (player_ID == 1){
	 		player1Turn = true ;
	 		player2Turn = false;
	 	}else { // player_ID == 2
	 		player1Turn = false;
	 		player2Turn = true ;
	 	}
	 	console.log("post server");
	 }
//=====================================================================================================================
// ___________________________________________________ draw ___________________________________________________
// =====================================================================================================================
function draw() {
if (clearValid){
   clear();
   clearValid = false;
}
     ctx.fillStyle = "#444444";//f9b3b1
 circle( mypos.x1 - 15 , mypos.y1 - 15 , 25);
      ctx.fillStyle = "#777777";//66c9c4
 circle(  mypos2.x1 - 15   ,  mypos2.y1 - 15 , 25);
 if (update){
 	 xyPosition.prototype.updatepos();
 /*	if (player1Turn){
 		mypos.updatepos();
 	}else{
 		mypos2.updatepos();
 	}*/
 }

 // update other player position 
 socket.on('update_position',function(msg_Player_id,msg_Game_id,Xpos,Ypos){
          if ( msg_Game_id==Game_Object.Game_id )
            {// now I now that the message if for me , i.e.: if player2 changed 
             // and Iam player1 , this if will be true
             // TODO: update the other player position 
             //console.log("x:"+Xpos+"y:"+Ypos);

             if (msg_Player_id == 1 ){
                mypos2.x1 = Xpos;
                mypos2.y1 = Ypos;
                console.log("x::"+mypos2.x1+"y::"+mypos2.y1);
             }else{// player_id == 2 
                mypos.x1 = Xpos;
                mypos.y1 = Ypos;  
                console.log("x::"+mypos.x1+"y::"+mypos.y1);                
             }
                clearValid = true;
            }

        });

 
}
//=====================================================================================================================
// ___________________________________________________ myMove ___________________________________________________
// =====================================================================================================================
function myMove(e){
//	  canvas.onmousedown = CheckMyMove;
	clearValid = true ;
	 if (drag1ok){
	  mypos.x1 = e.pageX - canvas.offsetLeft;
	  mypos.y1 = e.pageY - canvas.offsetTop;
	  }
	 if (drag2ok){
	  mypos2.x1 = e.pageX - canvas.offsetLeft;
	  mypos2.y1 = e.pageY - canvas.offsetTop;
	  } 
    
}
//=====================================================================================================================
// ___________________________________________________ myDown ___________________________________________________
// =====================================================================================================================
function myDown(e){
  CalcPostition(Position);

  if (player1Turn){
	 if (e.pageX <= mypos.x1 + 15   && e.pageX >= mypos.x1 -15  && e.pageY <= mypos.y1 + 15  &&
	 e.pageY >= mypos.y1 -15  ){
	  // mypos.x1 = e.pageX - canvas.offsetLeft;
	  // mypos.y1 = e.pageY - canvas.offsetTop;
	  drag1ok = true;
	  canvas.onmousemove = myMove;
	 }
	}else if (player2Turn){
	  if (e.pageX <= mypos2.x1 + 15   && e.pageX >= mypos2.x1 - 15  && e.pageY <= mypos2.y1 + 15 &&
	 e.pageY >= mypos2.y1 -15 ){
	  mypos2.x1 = e.pageX - canvas.offsetLeft;
	  mypos2.y1 = e.pageY - canvas.offsetTop;
	  drag2ok = true;
	  canvas.onmousemove = myMove;
	 }
	}
} 
	 	 
 
//=====================================================================================================================
// ___________________________________________________ myUp ___________________________________________________
// =====================================================================================================================
function myUp(e){
//clear();
if (drag1ok){
 //canvas.onmouseup = CheckMyMove ;
 // if rect is in the correct position 
 	if (e.pageX >= boxWidthStart  && e.pageX <= boxWidthEnd 
     && e.pageY >= boxHeightStart && e.pageY <= boxHeightEnd) {
  	//state = mypos.states();
		mypos.validMove();
		console.log("Game_Object.Player_id "+Game_Object.Player_id);
		console.log("player1Turn "+ player1Turn);
	}else {

		mypos.unValidMove();
	}
 
    check = true;
    socket.emit('check',"seeeend");
    socket.emit('send_position',Game_Object,mypos.x1,mypos.y1) ;
    console.log("send_position is ok "+mypos.x1 +" .."+mypos.y1);
}

//mypos.x1 , mypos.y1
//update UI in player 2 if player 1 has played 

 
else if (drag2ok){
// 	same but for other rect 
 	if (e.pageX >= boxWidthStart  && e.pageX <= boxWidthEnd 
     && e.pageY >= boxHeightStart && e.pageY <= boxHeightEnd) {
 		state = mypos2.states();
		mypos2.validMove();
	}else {

		mypos2.unValidMove();
	}
     socket.emit('send_position',Game_Object,mypos2.x1,mypos2.y1) ;
     console.log("send_position is ok "+mypos2.x1 +" .."+mypos2.y1);
}
// mypos2.x1 , mypos2.y1
//update UI in player 1 if player 2 has played 
 
 drag1ok = false;
 drag2ok = false;
 canvas.onmousemove = null;
}
//=====================================================================================================================
// ___________________________________________________ unvalid Move ___________________________________________________
// =====================================================================================================================
xyPosition.prototype.unValidMove = function(){
		// return it to its previous position 
		// call yasmina's function 
		if(PositionOld != 0){
		CalcPostition(PositionOld);
		this.x1 = newX;
		this.y1 = newY;
	}else{// position == 0
			
		if (player1Turn){
			mypos.x1 =  65;
			mypos.y1 =  590;
		}else {// player2Turn
			mypos2.x1=  65;
			mypos2.y1=  540;
		}
	
	}
	// Clear to make sure everything look nice ^_^ 
	clearValid =true;
}
//=====================================================================================================================
// ___________________________________________________ valid Move ___________________________________________________
// =====================================================================================================================
xyPosition.prototype.validMove = function(){
 // set indexes mypos.x1 ,mypos.y1 to newX , newY  //  TO BE IN MIDDLE OF BOX 
		// new is now set to old  
 if (player1Turn){
		mypos.x1 = newX;
		mypos.y1 = newY;
		x1Old = mypos.x1;
		y1Old = mypos.y1;
	 }else {//player2Turm
	 	mypos2.x1 = newX;
		mypos2.y1 = newY;
		x2Old = mypos2.x1;
		y2Old = mypos2.y1;
	 }
		PositionOld = Position;
		// if snake or ladder exist 
		if (newPosition != Position)
		{
			CalcPostition(newPosition);
			console.log ("position in client is "+Position+"and new position in client is "+newPosition);
			
			if (newPosition > Position){   //ladder
                 var audio = new Audio('mp3/jump.mp3');
                 audio.play();
                 swal({ title: "Ladder :D",text: "",timer:1200,imageUrl: "images/ladder.png",showConfirmButton: false });
               }
			else  {
				 var audio = new Audio('mp3/snake2.mp3');
				 audio.play();
                 swal({ title: "Snake :(",text: "",timer:1200,imageUrl: "images/snake2.png",showConfirmButton: false });
			}
			
			

			/*while ((state == 1 &&(mypos.x1>newX || mypos.y1 >newY))
			||(state == 2 && (mypos.x1<newX || mypos.y1 >newY))
			||(state == 3 && (mypos.x1<newX || mypos.y1 <newY))
			||(state == 4 && (mypos.x1>newX || mypos.y1 <newY))){
		//	console.log("here");
	 		//setInterval(this.updatepos(), 10);
	 		update = true;

		}*/
		update = true;
	}
checkWinner();
 
}
 
//=====================================================================================================================
// ___________________________________________________ updatepos ___________________________________________________
// =====================================================================================================================
xyPosition.prototype.updatepos = function(){
clearValid =true;  
 
  
  if (player1Turn){
 	var new_x = newX-mypos.x1;
	var new_y = newY-mypos.y1;






	state = xyPosition.prototype.states();
	if ((  state == 1 && (mypos.x1>newX || mypos.y1 >newY))
		||(state == 2 && (mypos.x1<newX || mypos.y1 >newY))
		||(state == 3 && (mypos.x1<newX || mypos.y1 <newY))
		||(state == 4 && (mypos.x1>newX || mypos.y1 <newY))){
		if (new_x == 0){
			if (new_y <0 ){
				
				mypos.y1-=1;
			}
			else {
				mypos.y1+=1;
			}
		}
		else {
			m = new_y/new_x;
 
			if (state == 1 || state == 4){
				mypos.x1 -= 0.5;
				mypos.y1 -= m*0.5;
			}
			else {
				mypos.x1 += 0.5;
				mypos.y1 += m*0.5;
			}
	
		}
	}
	else{
	update = false;
	socket.emit('send_position',Game_Object,mypos.x1,mypos.y1) ;
	console.log ("update "+update);
}
		//mypos.x1 = newX;
		//mypos.y1 = newY;
		x1Old = mypos.x1;
		y1Old = mypos.y1;
}
 else{
  	var new_x = newX-mypos2.x1;
	var new_y = newY-mypos2.y1;

 
	state = xyPosition.prototype.states();
	if ((  state == 1 && (mypos2.x1>newX || mypos2.y1 >newY))
		||(state == 2 && (mypos2.x1<newX || mypos2.y1 >newY))
		||(state == 3 && (mypos2.x1<newX || mypos2.y1 <newY))
		||(state == 4 && (mypos2.x1>newX || mypos2.y1 <newY))){
		if (new_x == 0){
			if (new_y <0 ){
				
				mypos2.y1-=1;
			}
			else {
				mypos2.y1+=1;
			}
		}
		else {
			m = new_y/new_x;
 
			if (state == 1 || state == 4){
				mypos2.x1 -= 0.5;
				mypos2.y1 -= m*0.5;
			}
			else {
				mypos2.x1 += 0.5;
				mypos2.y1 += m*0.5;
			}
	
		}
	}
	else{
	update = false;
	socket.emit('check',"seeeend");
    socket.emit('send_position',Game_Object,mypos2.x1,mypos2.y1) ;
	console.log ("update "+update);
}
		//mypos2.x1 = newX;
		//mypos2.y1 = newY;
		x2Old = mypos2.x1;
		y2Old = mypos2.y1;
 }
	Position    = newPosition;
	PositionOld =    Position;
 
}
//=====================================================================================================================
// ___________________________________________________ checkWinner ___________________________________________________
// =====================================================================================================================
function checkWinner (){
	// DO: check if a player position is now in 30 
	// if true : popup a winning message and sound to the winner  
	//			 and   a losing  message and sount to the loser
	// REQ: the player_turn and the player final position which is saved in PositionOld

	if (player1Turn){
		if (PositionOld >= 30)
		{
			// call mahas function //emit 
			socket.emit('win',Game_Object);


			     var audio = new Audio('mp3/Cheering.mp3');
                 audio.play()
                 swal({ title: "Congratulations!!",text: "You are the winner",imageUrl: "images/winner.jpg",confirmButtonColor: "#51B554"});
                 socket.emit('end_game',Game_Object);
		}
	}else{// if player2Turn
		if (PositionOld >= 30)
		{
			// call mahas function "pop up"
			socket.emit('win',Game_Object);
			     var audio = new Audio('mp3/Cheering.mp3');
                 audio.play()
                 swal({ title: "Congratulations!!",text: "You are the winner",imageUrl: "images/winner.jpg",confirmButtonColor: "#51B554"});
            socket.emit('end_game',Game_Object);
		}
	}
	//  check if i lose 
		socket.on('check_winner', function (msg) {
		if (msg.Player_id != Game_Object.Player_id && msg.Game_id==Game_Object.Game_id )
			    var audio = new Audio('mp3/Boo.mp3');
                 audio.play()
                 swal({ title: "Hard Luck!!",text: "You lost",imageUrl: "images/lose.jpg",confirmButtonColor: "#51B554"});

			});
		// 
		socket.on('notify_end_game', function (msg) {
		if ( msg.Game_id==Game_Object.Game_id )
			    var audio = new Audio('mp3/Boo.mp3');
                 audio.play()
         swal({   title: "Game Ended",   text: "Do you want to play again ?",  
            showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, Play again!",
               cancelButtonText: "No, thank you!",   closeOnConfirm: false,   closeOnCancel: false },
          function(isConfirm){
            if (isConfirm) {
              // start new game 
                }
          else {
              // diable game
        gameEnded =true;			  
               } });

			});
  
}
//=====================================================================================================================
// ___________________________________________________ states ___________________________________________________
// =====================================================================================================================
xyPosition.prototype.states = function (){
	var currentstate;
	if (player1Turn){
	if (newX <= mypos.x1 && newY <=mypos.y1)
		currentstate=1;
	else if (newX >= mypos.x1 && newY<= mypos.y1)
		currentstate=2;
	else if (newX >= mypos.x1 && newY>= mypos.y1)
		currentstate=3;
	else if ( newX <= mypos.x1 && newY >= mypos.y1)
		currentstate=4;
	return currentstate;
}else{
		if (newX <= mypos2.x1 && newY <=mypos2.y1)
		currentstate=1;
	else if (newX >= mypos2.x1 && newY<= mypos2.y1)
		currentstate=2;
	else if (newX >= mypos2.x1 && newY>= mypos2.y1)
		currentstate=3;
	else if ( newX <= mypos2.x1 && newY >= mypos2.y1)
		currentstate=4;
	return currentstate;
}
}

init();
ServerWork();
postServer();
// check if this index is valid 

if (!gameEnded){
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
}
	socket.on('end of game',function(msg){
		if (msg.Player_id==Game_Object.Player_id && msg.Game_id==Game_Object.Game_id )
			swal({ title: "Congratulations!!",text: "You are the winner",imageUrl: "images/winner.jpg",confirmButtonColor: "#51B554"});
		else if (msg.Player_id!=Game_Object.Player_id && msg.Game_id==Game_Object.Game_id )
			swal({ title: "Hard Luck!!",text: "You lost",imageUrl: "images/lose.jpg",confirmButtonColor: "#51B554"});

	});
socket.emit('end_move',Game_Object);

	socket.on('new_position', function (msg) {
		if (msg.Player_id==Game_Object.Player_id && msg.Game_id==Game_Object.Game_id )
				Game_Object.Current_position=msg.Current_position;
			});
			
           socket.on('server_disconnect', function(msg) {
      console.log('server_disconnected '+msg);
           socket.emit('client_diconnected',Game_Object);
            
            });
            
            
  });     // end of click on dice.on 
	/////////////////////////////////
	
	socket.on ('Player 1 disconnect',function(msg){
			//onsole.log("Another player left this game");
				if (Game_Object.Game_id==msg){
					console.log("Another player left this game");
                     var audio = new Audio('mp3/sorry.mp3');
                        audio.play();
                    swal({ title: "Sorry",text: "other player left the game"});
                    }
			});


//<script type="text/javascript" src="drag.js">
//<script>
	