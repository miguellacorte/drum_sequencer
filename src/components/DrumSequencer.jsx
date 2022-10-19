import React from "react";
import * as Tone from "tone";
import Sketch from "react-p5";
import { useState, useEffect } from "react";

export default function DrumSequencer() {
  const [slider1val, setSlider1val] = useState(null);
  const [slider2val, setSlider2val] = useState(null);
  const [slider3val, setSlider3val] = useState(2);


  let setup = (p5, canvasParentRef) => {
    let canvas = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);
  };

  const now = Tone.now();

  console.log(now);

  let bpm = (Tone.Transport.bpm.value = 120);

  let rythmDiv = ["16n", "8n", "5n", "4n", "3n", "2n"];

  const synth1 = new Tone.Synth().toDestination();
  const synth2 = new Tone.Synth().toDestination();

  let kickBaseURL = "sounds/";

  const kick = new Tone.Players({
    kick1: kickBaseURL + "kick1.mp3",
    kick2: kickBaseURL + "kick2.mp3",
    kick3: kickBaseURL + "kick3.mp3",
    kick4: kickBaseURL + "kick4.mp3",
  }).toDestination();

  let draw = (p5) => {};

  let drumLoopA;

  Tone.Destination.volume.value = slider1val;

  const play = () => {
    console.log("play");
    Tone.start();
    Tone.Transport.start();
    drumLoopA.start();
  };

  const stopDrumLoop = () => {
    drumLoopA.cancel();
  };

 
  drumLoopA = new Tone.Loop(kickPlayer, rythmDiv[slider2val]);

  function kickPlayer(time) {
    Tone.loaded().then(() => {
      kick.player(`kick${slider3val}`).start(time);
    });
  }

  return (
    <div>
      <h1>drum sequencer!!</h1>

      <div>
        <button onClick={play} className="playBtn">
          ▶
        </button>
        <button onClick={stopDrumLoop}>STOP</button>
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
            onClick={(event) => 
            
            { if(drumState == true) {
              console.log(drumState)
              setDrumState(false)
            } else if (drumState == false) {
              setDrumState(true)
            }
            setSlider2val(event.target.value)}}
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
       
      </div>

      <div>
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
}
