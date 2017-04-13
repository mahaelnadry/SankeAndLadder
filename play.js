var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var Player_id=0;
var num_players=0;
var Game_id=0;
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
	res.sendFile( __dirname+'/index_play.html');
});


var Game_Object = {
		'Game_id': 0,
		'Player_id': 0, 
		'Current_position': 0,
		'Dice': 0,
		'Next_position': 0,
        'Final_position':0,
		'turn':false,
		'socket_id':0
	};
	
	var socket_array =[];
  var canvas_map = {};
  //var value_map;
// Add keys to the hashmap
canvas_map[0] = {value_map1:0};
canvas_map[01] = {value_map1:1};
canvas_map[02] = {value_map1:2};
canvas_map[03] = {value_map1:22};
canvas_map[04] = {value_map1:4};
canvas_map[05] = {value_map1:8};
canvas_map[06] = {value_map1:6};
canvas_map[07] = {value_map1:7};
canvas_map[08] = {value_map1:8};
canvas_map[09] = {value_map1:9};
canvas_map[10] = {value_map1:10};
canvas_map[11] = {value_map1:26};
canvas_map[12] = {value_map1:12};
canvas_map[13] = {value_map1:13};
canvas_map[14] = {value_map1:14};
canvas_map[15] = {value_map1:15};
canvas_map[16] = {value_map1:16};
canvas_map[17] = {value_map1:4};
canvas_map[18] = {value_map1:18};
canvas_map[19] = {value_map1:7};
canvas_map[20] = {value_map1:29};
canvas_map[21] = {value_map1:9};
canvas_map[22] = {value_map1:22};
canvas_map[23] = {value_map1:23};
canvas_map[24] = {value_map1:24};
canvas_map[25] = {value_map1:25};
canvas_map[26] = {value_map1:26};
canvas_map[27] = {value_map1:1};
canvas_map[28] = {value_map1:28};
canvas_map[29] = {value_map1:29};
canvas_map[30] = {value_map1:30};
//

 /*for (var x in canvas_map)
{
    console.log('Key current postion  ' + x + '\n');
    console.log('Values: ');
    var value = canvas_map[x];
 
    console.log('\n');
   var z =canvas_map[x].value;
                console.log("Next position is "+z+'/n');
    
    
}*/
 
io.on('connection', function (socket) {
		
        socket.on('chat message', function (msg) {
			if(msg)
			{
				Player_id++;
				num_players++;
				
			}
			console.log("Player_id: "+Player_id);
			//var name = require("./game.html");
			app.use(express.static(__dirname + '/'));
			app.get("/drag3.html", function(req, res){
				res.sendFile( __dirname+'/drag3.html');
			});
			//io.emit('chat', Player_id);
		});
		socket.on('send',function(msg){
        console.log("connected");
        io.emit('value of id',Player_id);
		if (Player_id==1)
			{
                Game_id++;  ///// asmaa ?? , is this ok ?
				io.emit('game_id',Game_id); 
					
				socket_array.push({ Player_id: '1', Game_id:Game_id ,socket_id:socket.id});
				console.log("Player_id:"+Player_id+"Game_id:"+Game_id +"socket_id:"+socket.id);
				console.log("Player_id:"+socket_array[0].Player_id +"socket_id:"+socket_array[0].socket_id);
				console.log("socket_array.length:"+socket_array.length);
				io.emit('wait',Game_id);
                
				
			}
		else if (Player_id==2)
			{
				//num_players=0;
				Player_id=0;
				io.emit('game_id',Game_id);
				Game_Object.Player_id=1;
				Game_Object.Game_id=Game_id;
				Game_Object.Current_position=Game_Object.Next_position=Game_Object.Final_position=0;
				io.emit('init',Game_Object);
				socket_array.push({ Player_id: '2', Game_id: Game_id ,socket_id:socket.id});
				console.log("Player_id:"+socket_array[1].Player_id +"socket_id:"+socket_array[1].socket_id);
				console.log("socket_array.length:"+socket_array.length);
			}
        });
		//var Obj;
		
		socket.on('send_value_Dice', function (msg) {
				
				Game_Object.Dice=msg;
				console.log("send_value_Dice :"+msg);
				//Game_Object.Player_id= ;
				//Game_Object.Game_id= ;
                });
		socket.on('click on dice', function (msg, Obj) {
			if (Obj)
			{
            
				console.log("Play"+msg.Player_id+"game"+msg.Game_id);
				//rand_value= Math.floor((Math.random() * 6) + 1);
				Game_Object.Player_id=msg.Player_id;
				Game_Object.Game_id=msg.Game_id;
				Game_Object.Dice=msg.Dice;
                console.log("dice of "+Game_Object.Player_id+" is------- "+Game_Object.Dice+'\n');
                console.log("current of "+Game_Object.Player_id+" is------ "+Game_Object.Current_position+'\n');
                //Game_Object.Current_position=Game_Object.Current_position+Game_Object.Dice;
                Game_Object.Current_position=msg.Current_position;
                Game_Object.Next_position=Game_Object.Current_position+Game_Object.Dice;
				Game_Object.Next_position=parseInt(Game_Object.Dice)+parseInt(Game_Object.Current_position);
				if (Game_Object.Next_position>30)
					Game_Object.Next_position=30;
				var yaRB=parseInt(Game_Object.Next_position);
                console.log("Game_Object.Next_position ="+Game_Object.Next_position);
				//console.log(canvas_map[yaRB].value_map1);
                Game_Object.Final_position=canvas_map[yaRB	].value_map1;
				
                console.log("next of "+Game_Object.Player_id+" is ------ "+Game_Object.Next_position+'\n');
                console.log("final of  "+Game_Object.Player_id+" is ------ "+Game_Object.Final_position+'\n');
				io.emit('value of dice',Game_Object);
				
			}
			console.log("dice send ");
            
            socket.on('check',function(msg){
                console.log("check is OK");
                });
                
            socket.on('send_position',function(msg,Xpos,Ypos){
            //Game_Object=msg;
			if (msg.Final_position==30)
					io.emit('end of game',msg);
            Game_Object.Player_id=2/msg.Player_id;
			Game_Object.Game_id=msg.Game_id;
            io.emit('update_position',Game_Object.Player_id,Game_Object.Game_id,Xpos,Ypos);
            console.log("seeeeeeeeeeeend");
            io.emit('changeTurns', Game_Object.Player_id);
        });
		});
		socket.on('end_turn', function (msg) {
			if (msg.turn)
			{
                //???
				Game_Object.Player_id=2/msg.Player_id;
				Game_Object.Game_id=msg.Game_id;
				Game_Object.turn=false;
				//Game_Object.Current_position=msg.Current_position;
				io.emit('run',Game_Object);
			}
			
		});
        socket.on('end_move', function (msg) {
			
                //if (msg.Player_id==Game_Object.Player_id && msg.Game_id==Game_Object.Game_id ){
				Game_Object=msg;
				Game_Object.Current_position=msg.Final_position;
				io.emit('new_position',Game_Object);
                //}
		});
        
        
      var disconnect=false;  
	  var exist= false;
        socket.on('disconnect', function (msg) 
		{
		console.log("Player disconnect ......");
		console.log(socket.id);
		console.log("socket_array.length:"+socket_array.length);
			for (var i = 0; i < socket_array.length; i++) 
			{
			console.log("Iam here ");
				if (socket_array[i].socket_id==socket.id)
				{
				console.log("Iam here 2");
					if(socket_array[i].Player_id=="1")
					{
						console.log("Iam here 3");
						for (var j = 0; j < socket_array.length; j++) 
						{
							if (socket_array[i].Game_id==socket_array[j].Game_id&&socket_array[i].Player_id!=socket_array[j].Player_id )
							{
							console.log("Iam here 4");
								exist=true;
								io.emit('Player 1 disconnect',socket_array[i].Game_id);
								console.log("emmmmmmit");
							}
						}
						if(!exist)
						{
						console.log("exissssst");
							Player_id=0;
							Game_id--;
						}
					}
					else if(socket_array[i].Player_id=="2")
					{
						for (var j = 0; j < socket_array.length; j++) 
						{
							if (socket_array[i].Game_id==socket_array[j].Game_id&&socket_array[i].Player_id!=socket_array[j].Player_id )
							{
								//exist=true;
								io.emit('Player 1 disconnect',socket_array[i].Game_id);
							}
						}
					}
				}
				// use array[i] here
			}
                
       disconnect=true;
    });
    
    if(disconnect){
socket.emit('server_disconnect',"server disconnected");
       socket.on('client_diconnected',function(msg){
            console.log("Player_id:"+msg.Player_id +"   Game_id:"+msg.Game_id);
       });

           }
     
    
    }); //end of connection

http.listen(3000, function(){
	console.log('listening on *:3000');
});