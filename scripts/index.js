window.onload=function(){
	var row=17;
	var len=35;
	var zhezhao=document.getElementById('zhezhao');
	var el=document.getElementById('wai');
	el.style.width=row*(len+1)+'px';
	el.style.height=row*(len+1)+'px';
	for(var i=0;i<row;i++){
		for(var j=0;j<row;j++){
			var xiao=document.createElement('div');
			xiao.setAttribute('class','block');
			xiao.setAttribute('id',i+'_'+j);
			xiao.style.width=len+'px';
			xiao.style.height=len+'px';
			wai.appendChild(xiao);
					
		}
	};

	var 
	kaiguan=true,time=1000,kaiguan1=true,t, 
	scoret,scores=0,scorekaiguan,
	snake=[ {x:0,y:0},  {x:0,y:1},  {x:0,y:2}  ],
	MAXSNAKE = row*row,RIGHT=39,LEFT=37,UP=38,DOWN=40,
	// SNAKECOLOR='#FAAE35',DEFAULTCOLOR = '#FFCC99',
	ROW=10,
	direction=RIGHT,//默认方向

	random=function(){
		return Math.floor(Math.random()*ROW);
	},
	$=function(id){
		return document.getElementById(id);
	},
	join=function(f,s){
		return f + '_' + s;
	},
//食物是否在蛇身上
	isInSnake=function(x,y){
		for(var i=0;i<snake.length;i++){
			if(snake[i].x==x && snake[i].y==y){
				return true;
			}
		}
		return false;
	},

//放食物 
	dropFood=function(){
		var x=random();
		var y=random();
		if(snake.length==MAXSNAKE){
			alert('牛人...');
			return;
		}
		//当放的食物在蛇的身上则重新放食物 当蛇的数据占满整个页面的时候会陷入死循环
		while(isInSnake(x,y)){
			x=random();
			y=random();
		}
		$(join(x,y)).setAttribute('class','block foodcolor');
		return {foodx:x,foody:y};//食物的坐标
	},
	food=dropFood(),//把返回的食物坐标存在food中

	headbody=function(){
      // 数组snake的最后一个(最后一个即蛇头 为蛇头的图片),其他为蛇身
		$(join(snake[snake.length-1].x,snake[snake.length-1].y)).setAttribute('class','block snakehead');
		for (var i = 0; i < snake.length-1; i++) {			
			$(join(snake[i].x,snake[i].y)).setAttribute('class','block snakecolor');
		};	
	},
	changedir=function(){
	  // 改变方向转动蛇身
		if(direction==DOWN || direction==UP){
			$(join(snake[snake.length-1].x,snake[snake.length-1].y)).setAttribute('class','block snakeheadshu');
			var k=snake.length-2;
			var bushu=setInterval(function(){		
				$(join(snake[k].x,snake[k].y)).setAttribute('class','block snakecolorshu');
				k--;
				if(k==-1){
					clearInterval(bushu);
				}
			},time);
		}

	},	
	
	dead=function(){
		clearInterval(t);
		clearInterval(kuait);
		console.log(scoret);
		clearInterval(scoret);
		chengji.innerHTML='您的分数为: '+fenshu.innerHTML;
		var op=0.1;		
		var tt=setInterval(function(){
			zhezhao.style.display='block';	
			zhezhao.style.opacity=op;	
			op+=0.1;
			if(op>=1){
				console.log(1);
				clearInterval(tt);
			}
		},100);
		btn.onclick=function(){
			window.location.reload();
		}
	},

	zou=function(){
		// var obj={};
		// obj.x=snake[snake.length-1].x ;
		// obj.y=snake[snake.length-1].y+1;//与下面一样
		var last=snake[snake.length-1];
		var newHead;			
		if(direction==RIGHT){
			newHead={x:last.x,y:last.y+1};
		}
		if(direction==LEFT){
			newHead={x:last.x,y:last.y-1};
		}
		if(direction==DOWN){
			newHead={x:last.x+1,y:last.y};
		}
		if(direction==UP){
			newHead={x:last.x-1,y:last.y};
		}
		if(newHead.x>(row-1)||newHead.x<0||newHead.y>(row-1)||newHead.y<0){
			dead();
			return null; //作用:不再执行下面的代码  
		}
	// 撞到自己
		if(isInSnake(newHead.x,newHead.y)){
			dead();
			return null;
		}
	// 吃东西
		if(newHead.x==food.foodx && newHead.y==food.foody){
			// console.log(food,newHead);//Object {foodx: 1, foody: 0} Object {x: 1, y: 0}
			snake.push(newHead);//不能push food food属性和snake的不一样
		// 调用函数 将数组snake前几个设置为蛇身,最后一个设置为蛇头
			headbody();
			// 改变方向转动蛇身
			changedir();
			food=dropFood();//重新放食物
		   
		  //吃东西加 200
		  	var toumingdu=0.4;
		  	TOP=100;
		  	var addscorefn=function(){
		  		addscore.style.opacity=toumingdu;
		  		addscore.style.top=TOP+'px';
		  		toumingdu+=0.1;
		  		TOP-=10;
		  		if(toumingdu>=1 && TOP<=0){
		  			addscore.style.opacity=0;
		  			clearInterval(addt);
		  		}
		  	}
		  	clearInterval(addt);
		  	var addt=setInterval(addscorefn,100);
		  	setTimeout(function(){
				scores=Number(fenshu.innerHTML)+200;
				fenshu.innerHTML=scores;	  		
		  	},800);

			return null;
		}

  	// 扔尾巴
		snake.push(newHead);
		var weiba=snake.shift();
		// $(join(weiba.x,weiba.y)).setAttribute('class','block defaultcolor');		
		$(join(weiba.x,weiba.y)).setAttribute('class','block');
		// 调用函数 将数组snake前几个设置为蛇身,最后一个设置为蛇头
		headbody();
		changedir();
	};


// --------------------------------------------------------------------------
// 画蛇
	(function(){
		for(var i=0;i<snake.length-1;i++){
		    $(join(snake[i].x,snake[i].y)).setAttribute('class','block snakecolor');
    //可以写成document.getElementById(snake[i].x+'_'+snake[i].y).style.background='green';			
		}
		$(join(snake[2].x,snake[2].y)).setAttribute('class','block snakehead');

	})();

	var setoff=false;
	document.onkeydown=function(e){
		var d=e.keyCode;		
		if(d==LEFT||d==UP||d==RIGHT||d==DOWN){
			if(Math.abs(d-direction)!=2){
			//==2是此时方向的相反方向,若==2则不将当时方向赋给默认方向;即不能往回走
				direction=d;
			}
		}


		// 按下 下 右 蛇 走起来
		var kg=function(){
			if(kaiguan){
				if(d==RIGHT||d==DOWN){
				//设置蛇开始时只有按RIGHT/DOWN才走,不写的话的按啥键都走
					t=setInterval(zou,time);
					scorekaiguan=true,//按下 右下 开始计时
					kaiguan=false;	
					setoff=true;
					kaiguan1=true;//按了暂停后直接按左右开始,下次再按暂停的话应该让它停止				
				}
			}			
		}
		kg(); 

		// score
		var scorefn=function(){
			scores++;
			fenshu.innerHTML=scores;
		}
		if(scorekaiguan){//防止按下一次走一次  只在第一次按下
			scoret=setInterval(scorefn,500);
			scorekaiguan=false;
		}

		var zanting=function(){
			if(kaiguan1){
				if(d==32){
					clearInterval(t);
					clearInterval(scoret);
					kaiguan1=false;					
				}
			}else{// 第二次按 空格
				t=setInterval(zou,time);
				scores=fenshu.innerHTML;
				scoret=setInterval(scorefn,500);
				kaiguan1=true;
			}
		};
		zanting();

		
	};



	if(setoff){
		var kuai=function(){
			time-=10;
			console.log(time);
			clearInterval(t);
			t=setInterval(zou,time);
		};      
		var kuait=setInterval(kuai,10000);	
	}	















		// if(e.keyCode==38){
		// 	zou('up');
		// }
		// if(e.keyCode==40){
		// 	zou('down');
		// }
		// if(e.keyCode==37){
		// 	zou('left');
		// }
		// if(e.keyCode==39){
		// 	zou('right');
		// }

// var t=setInterval(aa,1000);
// clearInterval(t);


















// 在键盘上按啥键就返回该键的ASCII码
	// document.onkeydown=function(e){
	// 	alert(e.keyCode);
	// 	prompt('haha');
	// }



	// 点不到[2,0]这个位置
// ======================1=========================
	// var dianming=function(){
	// 	var x=Math.floor(Math.random()*5);
	// 	var y=Math.floor(Math.random()*10);
	// 	while(x==2&&y==0){
	// 		var x=Math.floor(Math.random()*5);
	// 		var y=Math.floor(Math.random()*10);
	// 	}
	// 	return {x:x,y:y};
	// }
	// console.log(dianming());

// ====================2=============================
	// var isKongzuowei=function(x,y){
	// 	if(x==2&&y==0){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// }
	// var dianming=function(){
	// 	var x=Math.floor(Math.random()*5);
	// 	var y=Math.floor(Math.random()*10);
	// 	while(isKongzuowei(x,y)){
	// 		var x=Math.floor(Math.random()*5);
	// 		var y=Math.floor(Math.random()*10);
	// 	}
	// 	return {x:x,y:y};
	// }
	// console.log(dianming());

// ==========================================================



// ---------如果有a:3,b:5---true,否则false
	// var dd=[{a:1,b:2},{a:3,b:5},{a:12,b:18}];
	// var aaa=function(x,y){
	// 	for (var i = 0; i < dd.length; i++) {
	// 		if(dd[i].a==x && dd[i].b==y){
	// 			return true;
	// 		}
	// 	};
	// 	return false;
	// }
	// console.log(aaa(35,0));


	// var arr=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	// var fn=function(){
	// 	var obj={};
	// 	arr.shift();			
	// 	obj.x=arr[arr.length-1].x ;
	// 	obj.y=arr[arr.length-1].y+1;
	// 	arr.push(obj);
	// 	return arr;
	// };
	// console.log(fn());//[{x:0,y:1},{x:0,y:2},{x:0,y:3}]




// 
// document.onclick=function(){
// 	var kaiguan=true;
// 	if(kaiguan){
// 		alert(1);
// 		kaiguan=false;
// 	}else{
// 		alert(2);
// 		kaiguan=true;
// 	}
// };


}