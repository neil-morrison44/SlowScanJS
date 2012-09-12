function findCodex(){
	var codexBlips = [];
	var i = 0;
	while((TimeArray[i].t < 1.0) && (i < TimeArray.length - 1)){
		codexBlips.push(TimeArray[i]);
		i++;
		console.log('ran');
	}
	//console.log(codexBlips);
	findStarts();
}



var frameStarts = [];
function TestPrintFrame(){
	clearCanvas();
	var x = 0;
	var y = 0;
	//console.log('ftest');
	for (var i = 0; i < TimeArray.length -1 && y < 120; i++){
		//console.log('p');
		if(frameStarts[select.value] <= TimeArray[i].t){
			drawPixel(x,y,TimeArray[i].f,1);
			x++;
			if (x == 120){
				x = 0;
				y++;
			}
			//if we're not on the last fame and we've gone past the start of the next frame then stop somehow
			if((select.value != frameStarts.length - 1) && (frameStarts[parseInt(select.value) + 1] <= TimeArray[i].t)){
				y = 120;
			}
		}
	}
}

function cleanStarts(){
	var i = 0;
	while( i < frameStarts.length - 1){
		if(Math.ceil(frameStarts[i]) == Math.ceil(frameStarts[i+1])){
			frameStarts.splice(i,1);
		}
		else{
			i++;
		}
	}
}

function findStarts(){
	frameStarts = [];
	for (var i = 2;( i < TimeArray.length -1 && y < 120); i++){
		if((TimeArray[i-2].f < 60) && (TimeArray[i-1].f < 60) && (TimeArray[i].f < 60) && (TimeArray[i+1].f > 60)){
			frameStarts.push(TimeArray[i].t);}
	}
	cleanStarts();
	updateFrameSelect();
}
var select;
function updateFrameSelect(){
	select = document.getElementById("frameSelect");
	select.options.length = 0;
	for (i in frameStarts){
		console.log(frameStarts[i]);
		select.options[select.options.length]  = new Option("Frame "+select.options.length+"",i);
	}
}







