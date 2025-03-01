let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speech Synthesis Function
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB"; // Hindi-English accent
  window.speechSynthesis.speak(text_speak);
}

// Greeting Function
function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

// Check for Speech Recognition API
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.continuous = false; // Stops after one phrase
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.lang = "en-US"; // Recognize English

// Start Listening on Click
btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  btn.style.display = "none";
  console.log("🎤 Listening...");
});

// Speech Recognition Event
recognition.onresult = (event) => {
  let transcript = event.results[0][0].transcript.toLowerCase();
  console.log("✅ Recognized:", transcript);
  content.innerText = transcript;
  takeCommand(transcript);
};

// Handling Speech Recognition Errors
recognition.onerror = (event) => {
  console.error("❌ Speech Recognition Error:", event.error);
  speak("Sorry, I couldn't hear you. Please try again.");
  voice.style.display = "none";
  btn.style.display = "flex";
};

// Stopping Event
recognition.onend = () => {
  console.log("🛑 Voice recognition ended.");
  voice.style.display = "none";
  btn.style.display = "flex";
};

// Command Handling Function
function takeCommand(message) {
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello Sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am Zia, created by AbhiTech.");
  } else if (message.includes("when will my friend get married")) {
    speak("Never, woh bokachoda single maregaa");
  } else if (message.includes("what is my girlfriend name")) {
    speak("khushi, I love u");
  } else if (message.includes("how do i look")) {
    speak("ekdum bekar");
  } else if (message.includes("which is the best word in world")) {
    speak(
      "Jai Shree Ram jai shree mahakaal bolo hara hara mahadev om lakshmi narayana namah"
    );
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://google.com/", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://facebook.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://instagram.com/", "_blank");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString();
    speak("The current time is " + time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleDateString();
    speak("Today's date is " + date);
  } else {
    let searchQuery = message.replace("shifra", "").trim();
    let finalText =
      "This is what I found on the internet regarding " + searchQuery;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
  }
}
