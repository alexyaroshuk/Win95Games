// Type declaration for vendor-prefixed AudioContext
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.3;

  private constructor() {
    // Load enabled state from localStorage
    const savedEnabled = localStorage.getItem('soundEnabled');
    if (savedEnabled !== null) {
      this.enabled = savedEnabled === 'true';
    }

    const savedVolume = localStorage.getItem('soundVolume');
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
    }
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  // Create simple beep/click sounds using Web Audio API
  private createBeep(frequency: number, duration: number, type: OscillatorType = 'square'): void {
    if (!this.enabled) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Create explosion sound
  private createExplosion(): void {
    if (!this.enabled) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContextClass();
      const whiteNoise = audioContext.createBufferSource();
      const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate white noise
      for (let i = 0; i < buffer.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      whiteNoise.buffer = buffer;

      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(this.volume * 0.5, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      whiteNoise.start();
    } catch (error) {
      console.error('Error playing explosion sound:', error);
    }
  }

  // Sound effect methods for different games
  playClick(): void {
    this.createBeep(800, 0.05);
  }

  playFlag(): void {
    this.createBeep(600, 0.1, 'sine');
  }

  playExplosion(): void {
    this.createExplosion();
  }

  playWin(): void {
    if (!this.enabled) return;
    setTimeout(() => this.createBeep(523, 0.1), 0);
    setTimeout(() => this.createBeep(659, 0.1), 100);
    setTimeout(() => this.createBeep(784, 0.1), 200);
    setTimeout(() => this.createBeep(1047, 0.2), 300);
  }

  playGameOver(): void {
    if (!this.enabled) return;
    setTimeout(() => this.createBeep(349, 0.2), 0);
    setTimeout(() => this.createBeep(329, 0.2), 200);
    setTimeout(() => this.createBeep(294, 0.2), 400);
    setTimeout(() => this.createBeep(262, 0.4), 600);
  }

  // Tetris sounds
  playRotate(): void {
    this.createBeep(700, 0.05, 'triangle');
  }

  playLineClear(): void {
    if (!this.enabled) return;
    this.createBeep(880, 0.1);
    setTimeout(() => this.createBeep(1100, 0.15), 50);
  }

  playTetrisDrop(): void {
    this.createBeep(200, 0.1, 'square');
  }

  // Snake sounds
  playEatFood(): void {
    this.createBeep(1000, 0.05);
    setTimeout(() => this.createBeep(1200, 0.05), 30);
  }

  // 2048 sounds
  playTileMerge(): void {
    this.createBeep(440, 0.1, 'sine');
  }

  playTileMove(): void {
    this.createBeep(300, 0.03, 'triangle');
  }

  // Arkanoid sounds
  playPaddleHit(): void {
    this.createBeep(500, 0.05);
  }

  playBrickBreak(): void {
    this.createBeep(1200, 0.08);
  }

  playBallLost(): void {
    this.createBeep(150, 0.3, 'sawtooth');
  }

  // Settings
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    localStorage.setItem('soundEnabled', enabled.toString());
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('soundVolume', this.volume.toString());
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getVolume(): number {
    return this.volume;
  }
}