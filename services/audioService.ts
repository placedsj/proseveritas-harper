let cachedVoices: SpeechSynthesisVoice[] = [];

const loadVoices = () => {
  if (!window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
};

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  // Ensure we update voices when they change (e.g. async load in Chrome)
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  
  // Cancel any currently playing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to use a system voice if available, otherwise default
  if (cachedVoices.length === 0) {
    loadVoices();
  }

  const voices = cachedVoices;
  // Prefer a generic English voice
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
};
