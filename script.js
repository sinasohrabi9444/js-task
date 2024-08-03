//bmi calculation

const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const kg = document.getElementById("size-kg");
const cm = document.getElementById("height-cm");
const results = document.getElementById("results");
const defaultStatus = document.getElementById("status");

let bmiValue = (weightInput.value / (heightInput.value / 100) ** 2).toFixed(1);
//default value
kg.textContent = weightInput.value;
cm.textContent = heightInput.value;

//default bmi

results.textContent = bmiValue;

//default status

{
}
weightInput.addEventListener("input", (e) => {
  const { value } = e.target;
  bmiValue = (weightInput.value / (heightInput.value / 100) ** 2).toFixed(1);
  kg.textContent = value;
  results.textContent = bmiValue;
  if (bmiValue < 18.6) {
    defaultStatus.innerHTML = " Underweight";
    defaultStatus.style.color = "#d3f17a";
    results.style.color = "#d3f17a";
  } else if (bmiValue > 18.6 && bmiValue < 24.9) {
    defaultStatus.innerHTML = "Normal";
    defaultStatus.style.color = "green";
    results.style.color = "green";

    defaultStatus.style.borderBottomColor = "red";
  } else if (bmiValue > 24.9) {
    defaultStatus.innerHTML = " Overweight";
    defaultStatus.style.color = "red";
    results.style.color = "red";
  }
});
heightInput.addEventListener("input", (e) => {
  const { value } = e.target;
  bmiValue = (weightInput.value / (weightInput.value / 100) ** 2).toFixed(1);
  cm.textContent = value;
  results.textContent = bmiValue;
  if (bmiValue < 18.6) {
    defaultStatus.innerHTML = " Underweight";
    defaultStatus.style.color = "#d3f17a";
    results.style.color = "#d3f17a";
  } else if (bmiValue > 18.6 && bmiValue < 24.9) {
    defaultStatus.innerHTML = "Normal";
    defaultStatus.style.color = "green";
    results.style.color = "green";

    defaultStatus.style.borderBottomColor = "red";
  } else if (bmiValue > 24.9) {
    defaultStatus.innerHTML = " Overweight";
    defaultStatus.style.color = "red";
    results.style.color = "red";
  }
});
// end bmi calculation

// Start Coding Music Player

let trackArt = document.querySelector(".img-art");
let trackName = document.querySelector(".music-name");
let trackArtist = document.querySelector(".art-name");

let playPauseBtn = document.querySelector(" .play-music");
let nextBtn = document.querySelector("next-music");
let prevBtn = document.querySelector("prev-music");

let musicBar = document.querySelector(".musicBar");
let volumeBar = document.querySelector("volume-bar");
let currentTime = document.querySelector(".startMusic");
let endTime = document.querySelector(".endMusic");

let randomIcon = document.querySelector(".shuffle-music");
let currentTrack = document.createElement("audio");

//Default Date

let trackIndex = 0;
let IsPlaying = false;
let IsRandom = false;
let updateTimer;

// Music Lists

const musicLists = [
  {
    nameArtist: "RhythmicRain",
    musicName: "Approaching Dusk",
    img: "img/logo1.avif",
    music: "music/approaching-dusk.mp3",
  },
  {
    nameArtist: "Rhythmic",
    musicName: "Beau",
    img: "img/logo2.jpg",
    music: "music/beau.mp3",
  },
  {
    nameArtist: "EtherealEcho",
    musicName: "Emerald And Stone",
    img: "img/logo3.jpg",
    music: "music/emerald-and-stone.mp3",
  },
];

// Load Tract
LoadTract(trackIndex);
function LoadTract(trackIndex) {
  clearInterval(updateTimer);
  Reset();

  currentTrack.src = musicLists[trackIndex].music;
  currentTrack.load();

  // Set track Image

  trackArt.style.backgroundImage = "url(" + musicLists[trackIndex].img + ")";

  // Set Track Artict Name

  trackArtist.textContent = musicLists[trackIndex].nameArtist;

  // Set Track music Name

  trackName.textContent = musicLists[trackIndex].musicName;

  //update Timer

  updateTimer = setInterval(setUpdate, 1000);

  currentTrack.addEventListener("ended", nextTrack);
}

function Reset() {
  currentTime.textContent = "00:00";
  endTime.textContent = "00:00";
  musicBar.value = 0;
}

function RandomTrack() {
  IsRandom ? PauseRandom() : PlayRandom();
}

function PlayRandom() {
  IsRandom = true;
}

function PauseRandom() {
  IsRandom = false;
}

function RepeatTrack() {
  let current_Index = trackIndex;
  LoadTract(current_Index);
  PlayTrack();
}
function PlayPauseTrack() {
  IsPlaying ? PauseTrack() : PlayTrack();
}
function PlayTrack() {
  currentTrack.play();
  IsPlaying = true;
  playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
}

function PauseTrack() {
  currentTrack.pause();
  IsPlaying = false;
  playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
}

function nextTrack() {
  if (trackIndex < musicLists.length - 1 && IsRandom === false) {
    trackIndex += 1;
  } else if (trackIndex < musicLists.length - 1 && IsRandom === true) {
    let random_Index = Number.parseInt(Math.random() * musicLists.length);
    trackIndex = random_Index;
  } else {
    trackIndex = 0;
  }

  LoadTract(trackIndex);
  PlayTrack();
}

function PrevTrack() {
  if (trackIndex > 0) {
    trackIndex = 1;
  } else {
    trackIndex = musicLists.length - 1;
  }

  LoadTract(trackIndex);
  PlayTrack();
}

function SeekTo() {
  let SeekTo = currentTrack.duration * (musicBar.value / 100);

  currentTrack.currentTime = SeekTo;
}

function SetVolume() {
  currentTrack.volume = volumeBar.value / 100;
}

function setUpdate() {
  let seekPosition = 0;

  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    musicBar.value = seekPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);

    let currentSecounds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSecounds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );

    if (currentSecounds < 10) {
      currentSecounds = "0" + currentSecounds;
    }
    if (durationSecounds < 10) {
      durationSecounds = "0" + durationSecounds;
    }

    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTime.textContent = currentMinutes + ":" + currentSecounds;

    endTime.textContent = durationMinutes + ":" + durationSecounds;
  }
}

// End Coding Music Player

// Start coding timer

let countdownDate = localStorage.getItem("countdownDate");

if (!countdownDate) {
  countdownDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;
  localStorage.setItem("countdownDate", countdownDate);
} else {
  countdownDate = parseInt(countdownDate);
}

const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("secounds").innerHTML =
    seconds < 10 ? "0" + seconds : seconds;

  if (distance < 0) {
    clearInterval(x);
    localStorage.removeItem("countdownDate");
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("secounds").innerHTML = "00";
  }
}, 1000);

//End Timer coding

//start Form Validation
let myForm = document.getElementById("form");
let userNameMessager = document.getElementById("username-error");
let emailMessager = document.getElementById("email-error");
let passwordMessager = document.getElementById("password-error");
let confirmPasswordMessager = document.getElementById("confirm-password-error");

// Default Style Messagers
userNameMessager.style.display = "none";
emailMessager.style.display = "none";
passwordMessager.style.display = "none";
confirmPasswordMessager.style.display = "none";

const btn = document.getElementById("btn");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true; 

  // userName Validation
  let userName = document.getElementById("username").value;
  if (userName.length <= 3) {
    userNameMessager.classList.add("error");
    userNameMessager.style.display = "block";
    isValid = false; 
  } else {
    userNameMessager.style.display = "none";
  }

  // email validation
  let email = document.getElementById("email").value;
  if (email === "") {
    emailMessager.classList.add("error");
    emailMessager.style.display = "block";
    isValid = false; 
  } else {
    emailMessager.style.display = "none";
  }

  // password validation
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  if (password.length < 6) {
    passwordMessager.classList.add("error");
    passwordMessager.style.display = "block";
    isValid = false; 
  } else {
    passwordMessager.style.display = "none";
  }

  if (confirmPassword !== password) {
    confirmPasswordMessager.classList.add("error");
    confirmPasswordMessager.style.display = "block";
    isValid = false; 
  } else {
    confirmPasswordMessager.style.display = "none";
  }

  if (isValid) {
    myForm.reset(); 


    userNameMessager.style.display = "none";
    emailMessager.style.display = "none";
    passwordMessager.style.display = "none";
    confirmPasswordMessager.style.display = "none";

    alert('Form submitted successfully!'); 
  }
});
