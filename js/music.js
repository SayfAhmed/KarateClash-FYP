// Create an Audio object
let audio = new Audio();
let audioList = [  'https://vgmsite.com/soundtracks/kingdom-hearts-hd-1.5-2.5-remix-original-soundtrack-box-2014/eetmhzjfqa/7-11%20Darkness%20of%20the%20Unknown.mp3',  'https://vgmsite.com/soundtracks/kingdom-hearts-hd-2.5-remix/sgwlmegpgq/4-10%20A%20Fight%20to%20the%20Death.mp3',  'https://vgmsite.com/soundtracks/kingdom-hearts-hd-2.5-remix/xrsqqskfyq/4-08%20Courage.mp3', 'https://vgmsite.com/soundtracks/kingdom-hearts-hd-2.5-remix/gmloyzoubz/4-19%20Fate%20of%20the%20Unknown.mp3'];
let currentAudioIndex = 0;

function playMusic() {
  // Pause any currently playing audio
  audio.pause();
  // new Audio object with the specified source URL
  audio = new Audio(audioList[currentAudioIndex]);
  audio.volume = 0.1; // Set the volume to 10%
  audio.play();
}

function changeMusic() {
  // Pause current song
  audio.pause();
  // Update the index of the next audio file to play
  currentAudioIndex = (currentAudioIndex + 1) % audioList.length;
  // Set the source URL for the next song
  let newAudioSrc = audioList[currentAudioIndex];
  // new Audio object with the new source URL
  let newAudio = new Audio(newAudioSrc);
  newAudio.volume = 0.1; // Set the volume to 10%
  newAudio.play();
  audio = newAudio; // Update ref to new Audio object
}

function GameStartQuote(){
  var QuoteSelection = ['Sounds/StartBattleQs/SBQ1.ogg','Sounds/StartBattleQs/SBQ2.ogg','Sounds/StartBattleQs/SBQ3.ogg','Sounds/StartBattleQs/SBQ4.ogg','Sounds/StartBattleQs/SBQ5.ogg','Sounds/StartBattleQs/SBQ6.ogg','Sounds/StartBattleQs/SBQ7.ogg','Sounds/StartBattleQs/SBQ8.ogg'];
  var randomIndex = Math.floor(Math.random() * QuoteSelection.length);
  var random = QuoteSelection[randomIndex];
  var StartQuote = new Audio(random);
  StartQuote.volume = 0.1;
  StartQuote.play();
}