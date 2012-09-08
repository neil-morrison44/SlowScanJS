var audioElement;
var outputElement;
var audioContext;
var analyser;
var source;
var x = 0;
var y = 0;
var canvas;

var playback = 0.1;
var step = 8/(128*128)*100; //rough time in milliseconds for each pixel
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
	shade = shade*2;
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
	
var lasttime = 0;
var date = new Date();
var timediff = 'hi';
var time = date.getTime();
var res = 1;
function showFreq() {
	window.setTimeout('showFreq()',step);
	// New typed array for the raw frequency data
	audioElement.PlaybackRate  = 0.5;
	var freqData = new Uint8Array(analyser.frequencyBinCount);
	// Put the raw frequency into the newly created array
	//console.log('tested');
	analyser.getByteFrequencyData(freqData);
	// Clear the canvas
	outputElement.innerHTML = "";
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
	
	x += res;
	if (x >= 128){
		x = 0;
		y++;
		time = (new Date()).getTime()
		timediff = time - lasttime;
		lasttime = time;
		res = timediff/6;
	}
	if (y == 128 || imax < 60){
		y = 0;
		x = 0;
	}
	drawPixel(x,y,imax,res);
	outputElement.innerHTML = timediff;
	
}