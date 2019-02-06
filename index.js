const fs = require("fs");

// Imports the Google Cloud client library
const speech = require("@google-cloud/speech");

// Creates a client
const client = new speech.SpeechClient();

// The name of the audio file to transcribe
const fileName = "./resources/elsa-mono.wav";

// Reads a local audio file and converts it to base64
// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: fs.readFileSync(fileName).toString("base64")
};
const config = {
  encoding: "LINEAR",
  sampleRateHertz: 16000,
  languageCode: "fr-FR"
};
const request = {
  audio: audio,
  config: config
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join("\n");
    console.log(`Transcription: \n${transcription}`);
  })
  .catch(err => {
    console.error("ERROR:", err);
  });
