import React from "react";
import * as Tone from "tone";
import Sketch from "react-p5";
import { useState } from "react";

export default function DrumSequencer() {
  console.log(Tone.context.currentTime);

  const [slider1val, setSlider1val] = useState(null);
  const [slider2val, setSlider2val] = useState(null);
  const [slider3val, setSlider3val] = useState(2);
  const [slider4val, setSlider4val] = useState(null);
  const [slider5val, setSlider5val] = useState(null);

  let setup = (p5, canvasParentRef) => {
    let canvas = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);
  };

  const now = Tone.now();

  let bpm = (Tone.Transport.bpm.value = 120);

  let rythmDiv = ["16n", "8n", "5n", "4n", "3n", "2n"];
  console.log(slider2val);

  const synth1 = new Tone.Synth().toDestination();
  const synth2 = new Tone.Synth().toDestination();

  let kickBaseURL = "sounds/";

  const kickPlayer = new Tone.Players({
    kick1: kickBaseURL + "kick1.mp3",
    kick2: kickBaseURL + "kick2.mp3",
    kick3: kickBaseURL + "kick3.mp3",
    kick4: kickBaseURL + "kick4.mp3",
  }).toDestination();

  const snarePlayer = new Tone.Players({
    snare1: kickBaseURL + "snare1.mp3",
    snare2: kickBaseURL + "snare2.mp3",
    snare3: kickBaseURL + "snare3.mp3",
    snare4: kickBaseURL + "snare4.mp3",
    snare5: kickBaseURL + "snare5.mp3",
  }).toDestination();

  let draw = (p5) => {};

  const drumLoopA = new Tone.Loop((time) => {
    Tone.loaded().then(() => {
      kickPlayer.player(`kick${slider3val}`).start(time);
    });
  }, rythmDiv[slider2val]).start(0);

  const drumLoopB = new Tone.Loop((time) => {
    Tone.loaded().then(() => {
      snarePlayer.player(`snare${slider4val}`).start(time);
    });
  }, rythmDiv[slider5val]).start(0);

  
  Tone.Destination.volume.value = slider1val;

  const play = () => {
    console.log("play");
    Tone.start();
    Tone.Transport.start();
  };

  return (
    <div>
      <h1>drum sequencer!!</h1>

      <div>
        <button onClick={play} className="playBtn">
          ▶
        </button>

        <p>current tempo: {bpm}</p>

        <h4>volume: {slider1val}</h4>
        <input
          type="range"
          className="custom-range"
          min="-60"
          max="-18"
          onClick={(event) => setSlider1val(event.target.value)}
        />

        <div>
          <h4>Kick rythm division select: {slider2val}</h4>
          <input
            type="range"
            className="custom-range"
            min="0"
            max="5"
            onClick={(event) => setSlider2val(event.target.value)}
          />
        </div>

        <div>
          <h4>Kick select: {slider3val}</h4>
          <input
            type="range"
            className="custom-range"
            min="1"
            max="4"
            onClick={(event) => setSlider3val(event.target.value)}
          />
        </div>

        <div>
          <h4>Snare select: {slider4val}</h4>
          <input
            type="range"
            className="custom-range"
            min="1"
            max="4"
            onClick={(event) => setSlider4val(event.target.value)}
          />
        </div>

        <div>
          <h4>Snare rythm division select: {slider5val}</h4>
          <input
            type="range"
            className="custom-range"
            min="1"
            max="4"
            onClick={(event) => setSlider5val(event.target.value)}
          />
        </div>
      </div>

      <div>
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
}
