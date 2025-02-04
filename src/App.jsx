import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import './index.css';

const notes = [
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
  'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
  'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6'
];

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const reverb = new Tone.Reverb().toDestination();
const feedbackDelay = new Tone.FeedbackDelay().toDestination();
const chorus = new Tone.Chorus().toDestination();
const distortion = new Tone.Distortion().toDestination();
const bitCrusher = new Tone.BitCrusher().toDestination();
const phaser = new Tone.Phaser().toDestination();
const tremolo = new Tone.Tremolo().toDestination();

const effects = {
  reverb,
  feedbackDelay,
  chorus,
  distortion,
  bitCrusher,
  phaser,
  tremolo,
};

const keyMapping = {
  'w': 'C4', 's': 'C#4', 'x': 'D4', 'd': 'D#4', 'c': 'E4', 'v': 'F4', 'g': 'F#4', 'b': 'G4', 'h': 'G#4', 'n': 'A4', 'j': 'A#4', 'm': 'B4',
  'z': 'C5', 'S': 'C#5', 'e': 'D5', 'D': 'D#5', 'r': 'E5', 'f': 'F5', 'G': 'F#5', 'y': 'G5', 'H': 'G#5', 'u': 'A5', 'J': 'A#5', 'i': 'B5',
  't': 'C6', 'Y': 'C#6', 'q': 'D6', 'Q': 'D#6', 's': 'E6', 'w': 'F6', 'W': 'F#6', 'x': 'G6'
};

const App = () => {
  const [sound, setSound] = useState('sine');
  const [activeKeys, setActiveKeys] = useState({});
  const [effect, setEffect] = useState('none');

  const playNote = (note) => {
    synth.triggerAttack(note);
    setActiveKeys((prev) => ({ ...prev, [note]: true }));
  };

  const releaseNote = (note) => {
    synth.triggerRelease(note);
    setActiveKeys((prev) => {
      const { [note]: _, ...rest } = prev;
      return rest;
    });
  };

  const changeSound = (event) => {
    setSound(event.target.value);
    synth.set({ oscillator: { type: event.target.value } });
  };

  const changeEffect = (event) => {
    setEffect(event.target.value);
    synth.disconnect();
    if (event.target.value === 'none') {
      synth.toDestination();
    } else {
      synth.connect(effects[event.target.value]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const note = keyMapping[event.key];
      if (note && !activeKeys[note]) {
        playNote(note);
      }
    };

    const handleKeyUp = (event) => {
      const note = keyMapping[event.key];
      if (note && activeKeys[note]) {
        releaseNote(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys]);

  return (
    <div>
      <div id="controls">
        <div>
          <label className="gray-title">Son</label>
          <select value={sound} onChange={changeSound}>
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="pulse">Pulse</option>
            <option value="fmsine">FM Sine</option>
            <option value="fmsquare">FM Square</option>
            <option value="fmtriangle">FM Triangle</option>
            <option value="fmsawtooth">FM Sawtooth</option>
            <option value="amsine">AM Sine</option>
            <option value="amsquare">AM Square</option>
            <option value="amtriangle">AM Triangle</option>
            <option value="amsawtooth">AM Sawtooth</option>
          </select>
        </div>
        <div>
          <label className="gray-title">Effet</label>
          <select value={effect} onChange={changeEffect}>
            <option value="none">None</option>
            <option value="reverb">Reverb</option>
            <option value="feedbackDelay">Feedback Delay</option>
            <option value="chorus">Chorus</option>
            <option value="distortion">Distortion</option>
            <option value="bitCrusher">BitCrusher</option>
            <option value="phaser">Phaser</option>
            <option value="tremolo">Tremolo</option>
          </select>
        </div>
      </div>
      <div id="keyboard">
        {notes.map((note, index) => (
          <div
            key={index}
            className={`key ${note.includes('#') ? 'black' : ''} ${activeKeys[note] ? 'active' : ''}`}
            onMouseDown={() => playNote(note)}
            onMouseUp={() => releaseNote(note)}
            onMouseLeave={() => releaseNote(note)}
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
