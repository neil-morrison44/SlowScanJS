
function clearCanvas(){
	canvas.clearRect(0,0,canvasElement.width,canvasElement.height);
}

function resizeCanvas(){
	
}

function drawPixel(x,y,shade,reso){
	shade -= 50.0;
	shade = shade*3;
	canvas.fillStyle = 'rgb('+shade+','+shade+','+shade+')';
	canvas.fillRect(x,y,reso,1);
}