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
	TestPrintFrame();
}

var frameStarts = [];
function TestPrintFrame(){
	var x = 0;
	var y = 0;
	//console.log('ftest');
	for (var i = 0; i < TimeArray.length -1 && y < 120; i++){
		//console.log('p');
		drawPixel(x,y,TimeArray[i].f,1);
		x++;
		if (x == 120){
			x = 0;
			y++;
		}
	}
}

function findStarts(){
	frameStarts = [];
	for (var i = 2;( i < TimeArray.length -1 && y < 120); i++){
		if((TimeArray[i-2].f < 60) && (TimeArray[i-1].f < 60) && (TimeArray[i].f < 60) && (TimeArray[i+1].f > 60)){
			frameStarts.push(TimeArray[i].t);}
	}
}
