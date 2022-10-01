import React from 'react'
import * as Tone from "tone";
import Sketch from "react-p5";

const synth1 = new Tone.Synth().toDestination();
const synth2 = new Tone.Synth().toDestination();

let kickBaseURL = "/drumSamples/kickSamples"

// let kickBaseURL = "https://github.com/miguellacorte/rythm_sequencer_resources/blob/082ab1d80861a2154cee9d77dd09ab74171d8963/drumSamples/kickSamples/"

const kickPlayer = new Tone.Players({
  kick1: kickBaseURL + "808_kick.mp3",
  kick2: kickBaseURL + "Ouija_Kick.mp3"

}).toDestination();

const now = Tone.now()

Tone.Transport.bpm.value = 120

const loopA = new Tone.Loop(time => {
	Tone.loaded().then(() => {
    kickPlayer.player('kick1').start();
  });
}, "4n").start(0);

Tone.Transport.start()

const play = () => {
  console.log('play')
  Tone.start();
};

export default function DrumSequencer() {

   console.log('hello')

  return (
    <div>
    <h1>drum sequencer!!</h1>

    <button 
      onClick={play} 
      className="playBtn"
    >▶</button>
  

    </div>
  )
}
