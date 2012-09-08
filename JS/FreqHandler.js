var audioElement;
var outputElement;
var audioContext;
var analyser;
var source;
var x = 0;
var y = 0;
var canvas;

var playback = 0.1;
var step = 60/120/10; //rough time in milliseconds for each pixel
step = 0.001;
//var step = 10;
var shademin;
var shademax;
function drawPixel(x,y,shade,reso){
	/*if ( shademax == undefined || shade > shademax){
		shademax = shade;
	}
	if ( shademin == undefined || shade < shademin){
		shademin = shade;
	}
	shade -=shademin;
	shade = (shade/shademax)*256;*/
	shade -= 50.0;
	shade = shade*3;
	//shade = 256 -shade;
	canvas.fillStyle = 'rgb('+shade+','+shade+','+shade+')';
	canvas.fillRect(x,y,reso,1);
}
function showFreqAsWeGo(fileName){
	// The audio element
	audioElement = document.getElementById('audio');
	outputElement = document.getElementById('output');
	canvas = document.getElementById('canvas').getContext('2d');
	// Create new Audio Context and an audio analyzer
	audioContext = new webkitAudioContext();
	analyser = audioContext.createAnalyser();
	

	// Take input from audioElement
	source = audioContext.createMediaElementSource(audioElement);
	// Connect the stream to an analyzer
	source.connect(analyser);
	// Connect the analyzer to the speakers
	analyser.connect(audioContext.destination);
	// Start the animation
	//audioElement.play();
	//showFreq();
	audioElement.addEventListener('play',showFreq);
	console.log(audioElement.defaultPlaybackRate);
	}
	

var date = new Date();
var frametime = 8000;
var time = date.getTime();
var lasttime = time;
var res = 1;
var tr = 7;

function newLine(){
	if (x < 120){
		res++;
	}
	if (x > 120){
		res--;
	}
	x = 0;
	outputElement.innerHTML = "Resolution: " + res
	y++;

}
var liner;
function showFreq() {
	if (!audioElement.paused){
		window.setTimeout('showFreq()',step);}
	if (liner == undefined){
		liner = window.setInterval('newLine()', (frametime/120));}
	// New typed array for the raw frequency data
	audioElement.PlaybackRate  = 0.5;
	var freqData = new Uint8Array(analyser.frequencyBinCount);
	// Put the raw frequency into the newly created array
	//console.log('tested');
	analyser.getByteFrequencyData(freqData);
	var number = -1;
	var imax = 0;
	var max = 0;
	//console.log(freqData.length);
	for (var i = 0; i < freqData.length; i++){
		if (freqData[i] > max){
			max = freqData[i];
			imax = i;
		}
		}
	
	drawPixel(x,y,imax,res);
	//60 seems to indicate a freq lower than 1200Hz
	//though this'll be a problem if I ever catch a Horiz sync
	if (imax < 60){
		//frametime = (new Date()).getTime() - lasttime;
		//lasttime = frametime;
		//outputElement.innerHTML = frametime;
		y = 0;
		x = 0;
		window.clearInterval(liner);
		liner = window.setInterval('newLine()', (frametime/120))
	}
	
	x += res;
	//outputElement.innerHTML = timediff;
	
}