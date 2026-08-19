/**
 * Web Audio API synthesizer for Diegetic Horror Sound Design
 * Simulates MetaSounds, Radio Static, Geiger clicks, Proximity Attenuation, and Entity Mimicry.
 */

class HorrorAudioEngine {
  private ctx: AudioContext | null = null;
  private heartbeatInterval: number | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. Play Walkie-Talkie Radio Click & Noise Burst
  playRadioClick(mode: 'open' | 'close' | 'crackle') {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Burst noise
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Bandpass filter for Walkie-Talkie (300Hz - 3000Hz)
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1600, now);
      bandpass.Q.setValueAtTime(3.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      // Short tone burst (squelch code)
      const osc = this.ctx.createOscillator();
      osc.type = mode === 'open' ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(mode === 'open' ? 1200 : 800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.15, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      whiteNoise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      osc.start(now);
      whiteNoise.stop(now + 0.12);
      osc.stop(now + 0.06);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // 2. Geiger Counter Clicks / RF Detector
  playGeigerBurst(intensity: number) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const clicks = Math.max(1, Math.floor(intensity * 12));
      for (let c = 0; c < clicks; c++) {
        const delay = Math.random() * 0.4;
        const now = this.ctx.currentTime + delay;

        const osc = this.ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(2800 + Math.random() * 1200, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.15 * Math.min(intensity, 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.01);
      }
    } catch {
      // Ignore
    }
  }

  // 3. Heartbeat Pulse
  playHeartbeat(bpm: number) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.12;

      // First 'lub'
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(75, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + duration);

      const gain1 = this.ctx.createGain();
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + duration);

      // Second 'dub' 120ms later
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(65, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.12 + duration);

      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.28, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12 + duration);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.12 + duration);
    } catch {
      // Ignore
    }
  }

  // 4. Entity Voice Mimicry / Spectral Distortion Sound
  playEntityMimicryVoice(phrase: string) {
    try {
      this.initContext();
      if (!this.ctx) return;

      // Play synthesized eerie drone + modulated speech formant synthesis
      const now = this.ctx.currentTime;

      // Sub-bass dread drone
      const subOsc = this.ctx.createOscillator();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(45, now);
      subOsc.frequency.linearRampToValueAtTime(32, now + 2.5);

      const subFilter = this.ctx.createBiquadFilter();
      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(110, now);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.25, now + 0.5);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      subOsc.connect(subFilter);
      subFilter.connect(subGain);
      subGain.connect(this.ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 2.9);

      // Metallic Ring Modulator tone (The Mimic's vocal cord anomaly)
      const carrier = this.ctx.createOscillator();
      carrier.type = 'triangle';
      carrier.frequency.setValueAtTime(180, now);
      carrier.frequency.linearRampToValueAtTime(140, now + 1.8);

      const modulator = this.ctx.createOscillator();
      modulator.type = 'sine';
      modulator.frequency.setValueAtTime(37, now);

      const modGain = this.ctx.createGain();
      modGain.gain.setValueAtTime(40, now);

      modulator.connect(modGain);
      modGain.connect(carrier.frequency);

      const ringGain = this.ctx.createGain();
      ringGain.gain.setValueAtTime(0.01, now);
      ringGain.gain.linearRampToValueAtTime(0.18, now + 0.4);
      ringGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      carrier.connect(ringGain);
      ringGain.connect(this.ctx.destination);

      carrier.start(now);
      modulator.start(now);
      carrier.stop(now + 2.5);
      modulator.stop(now + 2.5);

      // Speak using SpeechSynthesis with eerie parameters if supported
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.pitch = 0.4;
        utterance.rate = 0.75;
        utterance.volume = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Ignore
    }
  }

  // 5. Breathing / Gasmask Stridor
  playBreathSound(intensity: number) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 1.2 - intensity * 0.5;

      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400 + intensity * 300, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.2 * intensity, now + duration * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Ignore
    }
  }
}

export const horrorAudio = new HorrorAudioEngine();
