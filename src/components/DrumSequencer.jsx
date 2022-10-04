import React from "react";
import * as Tone from "tone";
import Sketch from "react-p5";

const synth1 = new Tone.Synth().toDestination();
const synth2 = new Tone.Synth().toDestination();

let kickBaseURL = "sounds/";

const kickPlayer = new Tone.Players({
  kick1: kickBaseURL + "kick1.mp3",
  kick2: kickBaseURL + "kick2.mp3",
}).toDestination();

const now = Tone.now();

Tone.Transport.bpm.value = 120;

const drumLoopA = new Tone.Loop((time) => {
  Tone.loaded().then(() => {
    kickPlayer.player("kick2").start(time);
  });
}, "8n").start(0.05); 

const drumLoopB = new Tone.Loop((time) => {
  Tone.loaded().then(() => {
    kickPlayer.player("kick1").start(time);
  });
}, "2n").start(0.05);

Tone.Transport.start();

const play = () => {
  console.log("play");
  Tone.start();
};

export default function DrumSequencer() {
  console.log(Tone.context.currentTime);

  return (
    <div>
      <h1>drum sequencer!!</h1>

      <button onClick={play} className="playBtn">
        ▶
      </button>
    </div>
  );
}
