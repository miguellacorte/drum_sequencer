let defaultVal, setRythmicDiv, button;

let setKick;

let kick, kick1, player;

let intervalsArr = [
  "2n",
  "3n",
  "4n",
  "5n",
  "6n",
  "7n",
  "8n",
  "9n",
  "15n",
  "16n",
  "32n",
];

function preload() {
  let kickBaseURL = "assets/";

  kick = new Tone.Players({
    kick1: kickBaseURL + "kick1.mp3",
    kick2: kickBaseURL + "kick2.mp3",
    kick3: kickBaseURL + "kick3.mp3",
    kick4: kickBaseURL + "kick4.mp3",
  }).toDestination();
}

function setup() {
  let cnv = createCanvas(1000, 1000);
  // cnv.mousePressed(canvasPressed);

  defaultVal = 5;
  
  setRythmicDiv = createSlider(0, 9, defaultVal);
  setRythmicDiv.position(100, 100);
  setRythmicDiv.style("width", "80px");

  setKick = createSlider(1, 4, 2);
  setKick.position(200, 100);
  setKick.style("width", "80px");

  button = createButton("on/off");
  button.position(10, 10);
  button.mousePressed(playSound);

  const now = Tone.now();

  console.log(now);

  let bpm = (Tone.Transport.bpm.value = 120);

  drumLoopA = new Tone.Loop((time) => {
    Tone.loaded().then(() => {
      kick.player("kick1").start(time);
    });
  }, intervalsArr[setRythmicDiv.value()]);

  setRythmicDiv.changed(() => {
    drumLoopA.interval = intervalsArr[setRythmicDiv.value()];
  });

  setKick.changed(() => {
    drumLoopA.stop();

    drumLoopA = new Tone.Loop((time) => {
      Tone.loaded().then(() => {
        kick.player(`kick${setKick.value()}`).start(time);
      });
    }, intervalsArr[setRythmicDiv.value()]);

    drumLoopA.start();
  });
}

function playSound() {
  console.log("play");
  Tone.start();
  Tone.Transport.start();
  drumLoopA.start();
}

function draw() {
  background(220);
}
