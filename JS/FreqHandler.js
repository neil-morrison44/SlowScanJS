var audioElement;
var outputElement;
var audioContext;
var analyser;
var source;
function showFreqAsWeGo(fileName){
	// The audio element
	audioElement = document.getElementById('audio');
	outputElement = document.getElementById('output');
	
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
	}
function showFreq() {
	// New typed array for the raw frequency data
	var freqData = new Uint8Array(analyser.frequencyBinCount);
	// Put the raw frequency into the newly created array
	console.log('tested');
	analyser.getByteFrequencyData(freqData);
	// Clear the canvas
	outputElement.innerHTML = "";
	var number = -1;
	var imax = 0;
	var max = 0;
	console.log(freqData.length);
	for (var i = 0; i < freqData.length; i++){
		if (freqData[i] > max){
			max = freqData[i];
			imax = i;
		}
		}
	outputElement.innerHTML = imax;
	window.setTimeout('showFreq()',1000/120);
}