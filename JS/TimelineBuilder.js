var audioElement;
var outputElement;
var audioContext;
var analyser;
var source;
var x = 0;
var y = 0;
var canvas;
var canvasElement;

var playback = 0.1;
var step = 0; //just run as fast as we can
var TimeArray = [];
function buildPoint(freq,time){
	var point = {}
	point['f'] = freq;
	point['t'] = time;
	return point;
}
function sortArray(a,b){
	return a.t-b.t;
	
}

function init(){
	// The audio element
	audioElement = document.getElementById('audio');
	outputElement = document.getElementById('output');
	canvasElement = document.getElementById('canvas');
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
	
	audioElement.addEventListener('play',showFreq);
	console.log(audioElement.defaultPlaybackRate);
	}
	


var liner;
//var imax; var max;
var freqData;
var prevfreq;
function showFreq() {
	var pb = audioElement.playbackRate;
	if (!audioElement.paused){
		window.setTimeout('showFreq()',step);}
	else{
		TimeArray.sort(sortArray);
	}
	// New typed array for the raw frequency data
	if (freqData == undefined){
		freqData = new Uint8Array(analyser.frequencyBinCount);}
	// Put the raw frequency into the newly created array
	analyser.getByteFrequencyData(freqData);
	var time = audioElement.currentTime;
	var imax = 0;
	var max = 0;
	//seems to be a gain just going between 40 and 120 - but not much of a gain
	for (var i = 40; i < 120; i++){
		if (freqData[i] > max){
			max = freqData[i];
			imax = i;
		}
		}
	outputElement.innerHTML = TimeArray.length;
	if (imax != 0){
	TimeArray.push(buildPoint(imax,time));}
	
}