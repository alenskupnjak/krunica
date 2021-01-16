var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = ['red', 'white', 'amen'];
let grammar =
  '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';
console.log(grammar);

let recognition;
// var recognition = new SpeechRecognition();
// var speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
// recognition.continuous = false;
// recognition.lang = 'en-US';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
const poruka = document.querySelector('.podjela');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML = '';
colors.forEach(function (v, i, a) {
  // console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
// hints.innerHTML =
//   'Tap/click then say a color to change the background color of the app. Try ' +
//   colorHTML +
//   '.';

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Ready to receive a color command.');
// }

document.body.onload = function () {
  initGovor();
  prepoznajRijec();
  console.log('Ready to receive a color command.');
};

function initGovor() {
  recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();
}

function prepoznajRijec() {
  recognition.onresult = function (event) {
    console.log(event);
    console.log('location.host=', location);
    console.log('location.host=', location.host);
    console.log('location.hostname=', location.hostname);
    console.log('location.href=', location.href);
    console.log('location.protocol=', location.protocol);
    console.log('location.pathname=', location.pathname);

    // let re;

    let pathname = location.pathname;
    let regexZnak1 = /\d/gi;
    console.log(regexZnak1.exec(pathname));

    let txt = location.pathname;
    let regexZnak2 = /[\d]-zrno.html/gi;
    console.log(regexZnak2.exec(txt));

    let txtxx = location.pathname;
    let regexZnak3 = /\//gi;
    console.log(regexZnak3.exec(txtxx));

    let txt0 = location.pathname;
    let regexZnak0 = /\/{1,}/gi;
    console.log(regexZnak0.exec(txt0));

    let txt1 = location.pathname;
    let regexZnak4 = /\/\d+-zrno.html/gi;
    console.log(regexZnak4.exec(txt1));

    let txt5 = location.pathname;
    let regexZnak5 = /\d+-zrno.html/gi;
    console.log(regexZnak5.exec(txt5));

    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at the last position.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    var rijec = event.results[0][0].transcript;
    console.log(rijec);

    const poruka = document.querySelector('.row');

    if (
      rijec === 'amen' ||
      rijec === 'Aman' ||
      rijec === 'anon' ||
      rijec === "I'm in"
    ) {
      rijec = 'yellow';
      let pathName = location.pathname;
      let regex = /\d+/gi;
      brojZrna = regex.exec(pathName);
      brojZrna = parseInt(brojZrna[0]);
      console.log(' Broj zrna integer', brojZrna);

      // staribrojZrna = brojZrna.toString();

      noviBrojZrna = (brojZrna + 1).toString();
      console.log(noviBrojZrna, noviBrojZrna, typeof noviBrojZrna);

      // const noviLink = location.href;
      // console.log('stariLink', noviLink);

      regex = new RegExp(brojZrna.toString(), 'i');
      console.log('regex amen=', regex);

      // xxx = noviLink.replace(regex, noviBrojZrna);
      // console.log('Novi link =', xxx);

      noviPath = pathName.replace(regex, noviBrojZrna);
      console.log('Novi noviPath =', noviPath);

      window.location.href = noviPath;
      // Nakon 3 sekunde prišem poruku
      // setTimeout(function () {
      //   document.querySelector('.upozorenje').remove();
      // }, 3000);
    } else {
      poruka.insertAdjacentHTML(
        'afterend',
        `<p class="upozorenje">Nisam prepoznao riječ ${rijec}</p>`
      );
      
      // document.querySelector('.upozorenje').remove();

      // Nakon 3 sekunde prišem poruku
      setTimeout(function () {
        document.querySelector('.upozorenje').remove();
      }, 3000);
    }

    // diagnostic.textContent = 'Result received: ' + rijec + '.';
    // bg.style.backgroundColor = rijec;
    console.log('Confidence: ' + event.results[0][0].confidence);
  };

  recognition.onspeechend = function () {
    recognition.stop();
    console.log('Kraj glasa');

    initGovor();
    prepoznajRijec();
  };

  recognition.onnomatch = function (event) {
    diagnostic.textContent = "I didn't recognise that color.";
  };

  recognition.onerror = function (event) {
    initGovor();
    prepoznajRijec();

    // diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  };
}
