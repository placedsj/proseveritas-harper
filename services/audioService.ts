export const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  
  // Cancel any currently playing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to use a system voice if available, otherwise default
  const voices = window.speechSynthesis.getVoices();
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