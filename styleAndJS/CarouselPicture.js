
var qrc_show = 0;
var imgArray = new Array("bg_1.png","bg_2.png","bg_3.png","bg_4.png","bg_5.png");
var imgIndex = 1;
var qrc = document.querySelector('.img_qrc'); 
document.addEventListener("click", function(e){
    	if(e.target.id!="img_wx"){
        	if(qrc_show==1){
        		document.getElementById("img_qrc").style.animation="fade-out 0.5s forwards";
        		qrc_show=0;
            	}
        	}
});

window.setInterval(changeImg, 10000);
function changeImg() {
	document.getElementById("img_bg").src="./images/"+imgArray[imgIndex];
	imgIndex++;
	if(imgIndex>=5){
		imgIndex=0;
	}
}

function clock(){
 var date = new Date();//获取当前时间
 //时(0-23) 分(0-59)秒(0-59)
 //计算转动角度
 var hourDeg = date.getHours();
 var minuteDeg = date.getMinutes();
 var secondDeg = date.getSeconds();
 //console.log(hourDeg, minuteDeg, secondDeg);
 document.getElementById("time_text").innerText =fix(hourDeg,2)+":"+fix(minuteDeg,2)+":"+fix(secondDeg,2);
}
//初始化执行一次
clock();
//设置定时器
setInterval(clock,1000);



//var Width = window.innerWidth;



	
	
function fix(num, length) {
	  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
	}
	
	
	
	
	
	