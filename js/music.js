// Create an Audio object
let audio = new Audio();
let audioSrc = 'https://vgmsite.com/soundtracks/kingdom-hearts-hd-1.5-2.5-remix-original-soundtrack-box-2014/eetmhzjfqa/7-11%20Darkness%20of%20the%20Unknown.mp3';

function playMusic() {
  // Pause any currently playing audio
  audio.pause();
  // Create a new Audio object with the specified source URL
  audio = new Audio(audioSrc);
  audio.volume = 0.1; // Set the volume to 10%
  audio.play();
}

// new function that will change the currently playing song
function changeMusic() {
  // Pause current song
  audio.pause();
  // Set the source URL for the new song
  let newAudioSrc = 'https://vgmsite.com/soundtracks/kingdom-hearts-hd-2.5-remix/sgwlmegpgq/4-10%20A%20Fight%20to%20the%20Death.mp3';
  // new Audio object with the new source URL
  let newAudio = new Audio(newAudioSrc);
  newAudio.volume = 0.1; // Set the volume to 10%
  newAudio.play();
  audio = newAudio; // Update the reference to the new Audio object
}

