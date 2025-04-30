import { LightningElement, track } from 'lwc';
import getAgentResponse from '@salesforce/apex/AgentforceController.getAgentResponse';

export default class FloatingMicButton extends LightningElement {
  @track showTextarea = false;
  @track recognizedText = '';

  handleMicClick() {
    this.showTextarea = true;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      this.recognizedText = text;
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };
  }

  handleTextChange(event) {
    this.recognizedText = event.target.value;
  }

  handleSendButtonClick() {
    if (this.recognizedText && this.recognizedText.trim()) {
      this.sendToAgent(this.recognizedText);

      // Paste to agent chat UI input field
      setTimeout(() => {
        this.pasteTextToChatInput(this.recognizedText);
      }, 100);
    }

    // Clear and hide textarea
    this.recognizedText = '';
    this.showTextarea = false;
  }

  sendToAgent(userInput) {
    getAgentResponse({ userInput })
      .then((response) => {
        this.speakText(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  pasteTextToChatInput(text) {
    try {
      // You may need to update this selector based on actual DOM
      const inputElement = document.querySelector('.agentforce-chat-input textarea, .agentforce-chat-input input');

      if (inputElement) {
        inputElement.value = text;
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        console.warn('Agent chat input not found.');
      }
    } catch (err) {
      console.error('Error pasting text into chat input:', err);
    }
  }

  speakText(text) {
    const synth = window.speechSynthesis;
    if (synth) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      synth.speak(utter);
    }
  }
}