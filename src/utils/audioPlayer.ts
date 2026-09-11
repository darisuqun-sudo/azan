import { AZAN_VOICES } from '../data/prayersData';
import { AzanVoiceItem } from '../types';

class SoundService {
  private ctx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private currentAzanVoiceId: string = 'alafasy';
  private volume: number = 1.0;

  constructor() {
    try {
      let savedVoice = localStorage.getItem('selected_azan_voice');
      if (savedVoice === 'makkah_mulla') {
        savedVoice = 'ali_mulla';
      }
      if (savedVoice && AZAN_VOICES.some(v => v.id === savedVoice)) {
        this.currentAzanVoiceId = savedVoice;
      } else {
        this.currentAzanVoiceId = AZAN_VOICES[0]?.id || 'alafasy';
      }
    } catch {
      this.currentAzanVoiceId = 'alafasy';
    }
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play digital Tasbih bead click sound
  playTasbihClick() {
    this.playClick();
  }

  playClick() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);

      if (navigator.vibrate) {
        navigator.vibrate(15);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  playBeep() {
    this.playClick();
  }

  // Play milestone completion chime (33, 99, 100)
  playChime() {
    try {
      const ctx = this.getContext();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.6);
      });

      if (navigator.vibrate) {
        navigator.vibrate([30, 50, 60]);
      }
    } catch {
      // fallback
    }
  }

  // Get current active Azan Voice info
  getCurrentAzanVoice(): AzanVoiceItem {
    const found = AZAN_VOICES.find(v => v.id === this.currentAzanVoiceId);
    return found || AZAN_VOICES[0];
  }

  // Set active Azan Voice
  setSelectedAzanVoice(voiceId: string) {
    if (AZAN_VOICES.some(v => v.id === voiceId)) {
      this.currentAzanVoiceId = voiceId;
      try {
        localStorage.setItem('selected_azan_voice', voiceId);
      } catch {
        // ignore
      }
    }
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  getCurrentAudio(): HTMLAudioElement | null {
    return this.currentAudio;
  }

  // Play real human-recited Azan with sequential fallback URLs
  playAzan(
    voiceId?: string,
    onEnded?: () => void,
    onError?: (error: unknown) => void,
    onTimeUpdate?: (currentTime: number, duration: number) => void
  ): HTMLAudioElement | null {
    this.stopAll();

    // Awaken Web Audio Context if suspended on user gesture
    try {
      this.getContext();
    } catch {
      // ignore
    }

    const targetVoice = voiceId 
      ? AZAN_VOICES.find(v => v.id === voiceId) || this.getCurrentAzanVoice()
      : this.getCurrentAzanVoice();

    const urls = [...targetVoice.audioUrls];
    let currentUrlIndex = 0;

    const tryPlayNextUrl = (): HTMLAudioElement | null => {
      if (currentUrlIndex >= urls.length) {
        console.warn('All Azan audio URLs exhausted for:', targetVoice.id);
        // Trigger fallback chime so user still hears an audible prayer alert
        this.playChime();
        if (onError) onError(new Error('Azan audio network stream unavailable'));
        return null;
      }

      const currentUrl = urls[currentUrlIndex];
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = currentUrl;
      audio.volume = this.volume;
      this.currentAudio = audio;

      let hasHandledFailure = false;
      const handleFailure = (reason: unknown) => {
        if (hasHandledFailure) return;
        hasHandledFailure = true;
        audio.onerror = null;
        audio.onended = null;
        audio.ontimeupdate = null;
        console.warn(`Azan stream failed for URL [${currentUrlIndex}]: ${currentUrl}`, reason);
        currentUrlIndex++;
        tryPlayNextUrl();
      };

      audio.ontimeupdate = () => {
        if (onTimeUpdate) {
          onTimeUpdate(audio.currentTime, audio.duration || 0);
        }
      };

      audio.onended = () => {
        if (onEnded) onEnded();
      };

      audio.onerror = (e) => {
        handleFailure(e);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          handleFailure(err);
        });
      }

      return audio;
    };

    return tryPlayNextUrl();
  }

  // Play Quran Ayah audio with error handling
  playAyahAudio(url: string, onEnded?: () => void, onError?: (err: unknown) => void): HTMLAudioElement {
    this.stopAll();
    const audio = new Audio(url);
    audio.volume = this.volume;
    this.currentAudio = audio;

    audio.onended = () => {
      if (onEnded) onEnded();
    };

    audio.onerror = (e) => {
      console.warn("Quran audio error on url:", url, e);
      if (onError) onError(e);
    };

    audio.play().catch(e => {
      console.warn("Audio play prevented or failed:", e);
      if (onError) onError(e);
    });

    return audio;
  }

  stopAll() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }
  }
}

export const soundService = new SoundService();

