// Lightweight Web Audio API synthesizer for playing real electronic beats
// Allows instantaneous, zero-asset audio playback for releases and tracks

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.currentTrackId = null;
    this.isPlaying = false;
    this.timerId = null;
    this.step = 0;
    this.listeners = new Set();
    this.bpm = 136;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        isPlaying: this.isPlaying,
        currentTrackId: this.currentTrackId
      });
    }
  }

  playKick(time) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.2);
  }

  playHat(time, open = false) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const gain = this.ctx.createGain();
    const dur = open ? 0.12 : 0.035;
    gain.gain.setValueAtTime(open ? 0.25 : 0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(time);
    whiteNoise.stop(time + dur);
  }

  playBass(time, freq = 55) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(120, time + 0.2);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.25);
  }

  playSynth(time, freq = 220) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.16);
  }

  scheduleNextNote() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const sixteenth = (60 / this.bpm) / 4;

    // 16-step sequencer pattern
    const s = this.step % 16;

    // Kick on 0, 4, 8, 12 (four-on-the-floor)
    if (s % 4 === 0) {
      this.playKick(now);
    }

    // Hi-hats
    if (s % 2 === 0) {
      this.playHat(now, s % 4 === 2);
    }

    // Bassline groove
    const bassNotes = [55, 55, 65, 55, 73, 55, 65, 82, 55, 55, 65, 55, 73, 82, 98, 55];
    if (s % 2 === 1) {
      this.playBass(now, bassNotes[s]);
    }

    // Arp lead
    const synthNotes = [220, 261, 329, 392, 440, 523, 659, 784];
    if (s % 4 === 2 || s % 4 === 3) {
      this.playSynth(now, synthNotes[s % synthNotes.length]);
    }

    this.step++;
    const nextTimeMs = sixteenth * 1000;
    this.timerId = setTimeout(() => this.scheduleNextNote(), nextTimeMs);
  }

  toggle(trackId, bpm = 136) {
    this.init();

    if (this.currentTrackId === trackId && this.isPlaying) {
      this.stop();
      return false;
    }

    if (this.isPlaying) {
      this.stop();
    }

    this.bpm = bpm || 136;
    this.currentTrackId = trackId;
    this.isPlaying = true;
    this.step = 0;
    this.scheduleNextNote();
    this.notify();
    return true;
  }

  stop() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.currentTrackId = null;
    this.notify();
  }
}

export const audioPlayer = new AudioEngine();
