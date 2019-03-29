var canvas = document.getElementById('canvas_1');
var context = canvas.getContext('2d');
var canvasH = canvas.offsetHeight;
var canvasW = canvas.offsetWidth;
canvas.width = canvasW;
canvas.height = canvasH;


var x =-100;
var y =-100;
var lastScrollY = 0;
var starts = new Array();

//计数
var count = 0;
//鼠标悬停时（定时器循环多少次后生成新的星星）
var countStatic = 5;
//鼠标移动时
var countMove = 1;
//鼠标悬停时生成星星个数
var createStatic =2;
//鼠标移动时生成星星个数
var createMove =2;
var isMove = false;
var timer = null;
//初始化5颗星星，小范围随机坐标
for(var i = 0;i<5;i++){
	starts[i] = createStart((x+randomNum(-5,5)),(y+randomNum(-30,-40)));
}


drawStarts();
//设置定时器，10毫秒一次
setInterval('drawStarts()',10);

//随机生成一颗星星的参数 大小、颜色、速度、角度
function createStart(centreX,centreY) {
	  var oneStart = new Object;
	  oneStart.centreX = centreX;
	  oneStart.centreY = centreY;
	  oneStart.size = randomNum(1,2);
	  oneStart.color = randomClolr();
	  oneStart.speed = randomNum(5,8);
	  oneStart.alpha = 1;
	  oneStart.angle = randomNum(180,360);
	  return oneStart;
	} 

function drawStarts(){
	//console.log("starts.length:"+starts.length);
	context.clearRect(0,0,canvasW,canvasH);
	for(var i = 0;i<starts.length;i++){
		drawStart(starts[i].centreX,starts[i].centreY,starts[i].size,starts[i].color,starts[i].alpha);
		starts[i].centreX = starts[i].centreX + Math.cos(starts[i].angle * Math.PI / 180)*starts[i].speed;
		starts[i].centreY = starts[i].centreY + Math.sin(starts[i].angle * Math.PI / 180)*starts[i].speed;
		 if(starts[i].speed<=3){
			starts[i].speed = starts[i].speed-randomNum(0.1,1);
			if(starts[i].speed<1){
				starts[i].speed = 1;
			}
			starts[i].angle =90;
			starts[i].alpha = starts[i].alpha-0.01;
			//starts[i].size = starts[i].size -0.01; 
		} else{
			starts[i].speed = starts[i].speed-randomNum(0.7,1);
			starts[i].size = starts[i].size +0.1; 
		}
		 
			if(starts[i].alpha<=0){
				starts.splice(i,1);
				i--;
			} 
		
	}
	count++;
	if(!isMove){
		if(count>countStatic){
			count=0;
			var l = starts.length;
			for(var i =0;i<createStatic;i++){
				starts[l+i] = createStart((x+randomNum(-10,10)),(y+randomNum(-30,-40)));
			}
		}
	}else{
		if(count>countMove){
			count=0;
			var l = starts.length;
			for(var i =0;i<createMove;i++){
				starts[l+i] = createStart((x+randomNum(-10,10)),(y+randomNum(-30,-40)));
			}
		}
	}
}
	
function drawStart(centreX,centreY,size,color,alpha) {
	context.globalAlpha = alpha;
	context.beginPath();
	context.lineWidth = 2;
	context.moveTo(centreX, centreY-5*size);
	context.quadraticCurveTo(centreX,centreY,centreX-5*size,centreY);
	context.quadraticCurveTo(centreX,centreY,centreX,centreY+5*size);
	context.quadraticCurveTo(centreX,centreY,centreX+5*size,centreY);
	context.quadraticCurveTo(centreX, centreY,centreX, centreY-5*size);
	context.fillStyle= color;
	context.fill();

	size = size/1.5;
	var color2 = 0XFFFFFF;
	var grd2 = context.createRadialGradient(centreX,centreY,0,centreX,centreY,size*4);
	grd2.addColorStop(0,  getRGBA(color2,1));
	grd2.addColorStop(1, getRGBA(color2,0));
	context.beginPath();
	context.lineWidth = 0.5;
	context.moveTo(centreX, centreY-5*size);
	context.quadraticCurveTo(centreX,centreY,centreX-5*size,centreY);
	context.quadraticCurveTo(centreX,centreY,centreX,centreY+5*size);
	context.quadraticCurveTo(centreX,centreY,centreX+5*size,centreY);
	context.quadraticCurveTo(centreX, centreY,centreX, centreY-5*size);
	context.fillStyle= grd2;
	context.fill();
}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

function randomClolr(){
    return '#'+Math.floor(Math.random()*0xffffff).toString(16);
}



function getRGBA(clolr,a) {
	return 'rgba('+((clolr & 0xff0000)>>16)+','+ ((clolr & 0xff00)>>8)+','+(clolr & 0xff)+','+a+')';
}



function mouseMove(event){
    isMove = true;
    x = event.x;
    y = event.y;
    clearTimeout(timer);
    timer = setTimeout(function(){
        isMove = false;
    },30);
}

window.onscroll=function(){
	//变量t是滚动条滚动时，到顶部的距离
	var t =document.documentElement.scrollTop||document.body.scrollTop;
	
	y = y + t - lastScrollY;
	lastScrollY = t;
	}

function mouseOut(){
	x=-100;
	y=-100;
}












