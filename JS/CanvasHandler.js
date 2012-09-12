
function clearCanvas(){
	canvas.clearRect(0,0,canvasElement.width,canvasElement.height);
}

function resizeCanvas(width,height){
	canvasElement.width = width;
	canvasElement.height = height;
	canvasElement.style.width = width*3;
	canvasElement.style.height = height*3;
	
}

function drawPixel(x,y,shade,reso){
	shade -= 50.0;
	shade = shade*3;
	canvas.fillStyle = 'rgb('+shade+','+shade+','+shade+')';
	canvas.fillRect(x,y,reso,1);
}

function frameLength(){
	if (select.value == frameStarts.length - 1){
		//if we're on the last frame then give the length of the penultimate frame as an estimate
		return frameStarts[parseInt(select.value)] - frameStarts[parseInt(select.value) -1];
	}
	return frameStarts[parseInt(select.value) + 1] - frameStarts[parseInt(select.value)];
}

function PrintFrame(){
	clearCanvas();
	var linestep = frameLength()/120;
	var pixelstep = linestep/120;
	console.log(pixelstep);
	var x = 0;
	var y = 0;
	//console.log('ftest');
	var tstart = frameStarts[select.value];
	var tend = frameStarts[parseInt(select.value)+1] || audioElement.duration;
	var istart = 0;
	var iend = TimeArray.length -1;
	for (var i = 1;i < TimeArray.length; i++){
		if (TimeArray[i].t == tstart){
			istart = i;
			}
		if (TimeArray[i].t == tend){
			iend = i;
			}
			
		}
	console.log(istart,iend);
	var i = istart;
	var span = 0;
	var lineStartTime;
	var lineEndTime;
	var lineTime;
	var timeShould = tstart;
	while (y < 120 && i < iend){
		x = 0;
		while (x < 120 && i < iend){
			if(!(TimeArray[i].t > timeShould)){
				i++;
			}
			timeShould+=pixelstep;
			drawPixel(x,y,TimeArray[i].f,1);
			x++;
		}
		y++

	}
}