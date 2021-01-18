function preload(){
  song = loadSound('./scam.mp3');
}

var mic,vol,fft;
var shapeMode = null;

function setup() {
	let cnv = createCanvas(windowWidth,windowHeight);
	mic = new p5.AudioIn();
	mic.start();
	
	fft = new p5.FFT(0.9, 128);

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw(){
	
	background(0);
	vol = mic.getLevel();
	
	if(shapeMode =='sphere'){
		sp();
		if(song.isPlaying())
			song.pause();
	}
	if(shapeMode =='fftCircle' || shapeMode =='fftBox'){
		if(!song.isPlaying())
			song.play();
		fftShape();
	}
	
}
function sp(){
	
	let green = color('#3cff00');
	let yellow = color('#eeff00');
	let red = color('#ff0000');
	var noise = vol*10;
	console.log(noise);
	if(noise>=0.6)
		fill(red);
	else if(noise <0.6 && noise >=0.2)
		fill(yellow);
	else
		fill(green);
	
	ellipse(windowWidth/2,windowHeight/2,windowWidth/1.5, vol*2000);
}
function fftShape(){
	
	let spectrum = fft.analyze();
	console.log(spectrum);
	
	noStroke();
	translate(width / 2, height / 2);
	
	
	if(shapeMode == 'fftCircle'){
		for (var i = 0; i < spectrum.length; i++) {
			var angle = map(i, 0, spectrum.length, 0, 360);
			var amp = spectrum[i];
			var r = map(amp, 0, 256, 20, 100);
			var x = r * cos(angle);
			var y = r * sin(angle);
			stroke(i, 255, 255);
			line(1, 1, x, y);
		}
	}else if(shapeMode == 'fftBox'){
		for (let i = 0; i< spectrum.length; i++){
			let x = map(i, 0, spectrum.length, 0, width);
			let h = -height + map(spectrum[i], 0, 255, height, 0);
			rect(x, height, width / spectrum.length, h );
	  }
	
	}
}
	
function mode(md){
	if(md=='sp')shapeMode = 'sphere';
	if(md=='fftCircle' || md=='fftBox')shapeMode = md;
}