import React from "react";
import * as Tone from "tone";
import Sketch from "react-p5";
import { useState } from "react";

export default function DrumSequencer() {
  console.log(Tone.context.currentTime);

  const [rangeval, setRangeval] = useState(null);

  let setup = (p5, canvasParentRef) => {
    // slider = p5.createSlider(60, 240, 100);

    // slider.position(10, 10);
    // slider.style("width", "160px");

    let canvas = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);
  };

  const now = Tone.now();

  let bpm = (Tone.Transport.bpm.value = 120);

  const synth1 = new Tone.Synth().toDestination();
  const synth2 = new Tone.Synth().toDestination();

  let kickBaseURL = "sounds/";

  const kickPlayer = new Tone.Players({
    kick1: kickBaseURL + "kick1.mp3",
    kick2: kickBaseURL + "kick2.mp3",
  }).toDestination();

  let draw = (p5) => {};

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
  Tone.Destination.volume.value = rangeval;

  const play = () => {
    console.log("play");
    Tone.start();
  };

  return (
    <div>
      <h1>drum sequencer!!</h1>

      <button onClick={play} className="playBtn">
        ▶
      </button>
      <p>current tempo: {bpm}</p>
      <div>
        {" "}
        <Sketch setup={setup} draw={draw} />
      </div>

      <div>
        <input
          type="range"
          className="custom-range"
          min="-60"
          max="-15"
          onChange={(event) => setRangeval(event.target.value)}
        />
        <h4>The range value is {rangeval}</h4>
      </div>
    </div>
  );
}
