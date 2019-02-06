const analyzer = require("./analyzer");
let test = "jouer moi l'album Randow Acces Memory";
console.log(analyzer.requestAnalyzer(test));
transcriber("./resources/elsa-mono.wav", res => {
  //console.log(analyzer.requestAnalyzer(res));
});

function transcriber(audioFile, callback) {
  const fs = require("fs");
  const speech = require("@google-cloud/speech");

  const client = new speech.SpeechClient();
  const fileName = audioFile;
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

  client
    .recognize(request)
    .then(data => {
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      callback(transcription);
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
}
