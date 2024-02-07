// Selecting elements from the DOM
const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector("img"),
    musicName = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar");
    menuBtn = wrapper.querySelector(".menuBtn");
// Array containing information about songs
    let allMusic = [
        {
            name: "Counting Stars",
            artist: "One Republic",
            img: "assets/images/Counting Stars.jpg",
            src: "assets/songs/Counting-Stars.mp3"
        },
        {
            name: "Arcade",
            artist: "Duncan Laurence",
            img: "assets/images/Arcade.jpg",
            src: "assets/songs/Arcade.mp3"
        },
        {
            name: "Ilahi",
            artist: "Arijit Singh",
            img: "assets/images/ilahi.webp",
            src: "assets/songs/ilhai.mp3"
        },
        {
            name: "Phir Se Ud Chala",
            artist: "Mohit Chauhan",
            img: "assets/images/phir se ud chala.jpg",
            src: "assets/songs/phir se ud chala.mp3"
        },
        {
            name: "Chidiya",
            artist: "Vilen",
            img: "assets/images/chidiya.jpg",
            src: "assets/songs/chidiya.mp3"
        }
    ];

// Randomly selecting the first song on page load
let musicIndex = Math.floor((Math.random() * allMusic.length));
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

// Function to load music details based on the provided index
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = allMusic[indexNumb - 1].img;
    mainAudio.src = allMusic[indexNumb - 1].src;
}

// Function to play music
function playMusic() {
    wrapper.classList.add("paused");
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = `<i class = "fi fi-sr-pause"></i>`;
    mainAudio.play();
}

// Function to pause music
function pauseMusic() {
    wrapper.classList.remove("paused");
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = `<i class = "fi fi-sr-play"></i>`;
    mainAudio.pause();
}

// Function to play the previous music
function prevMusic () {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic(); 
}

// Function to play the next music
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// Function to load music based on the provided source
function loadMusicFromSrc(songSrc) {
    const audioPlayer = document.getElementById("songMenu");
    audioPlayer.src = songSrc;
}

const menuButton = document.getElementById("menuBtn");
const songMenu = document.getElementById("songMenu");
const audioPlayer = document.getElementById("main-audio");


function playSong(event) {
    const songIndex = event.target.getAttribute("data-index");
    const selectedSong = allMusic[songIndex];

    // Update UI
    musicImg.src = selectedSong.img;
    musicName.innerText = selectedSong.name;
    musicArtist.innerText = selectedSong.artist;

    // Play the selected song
    audioPlayer.src = selectedSong.src;
    audioPlayer.play();

    // Update play/pause button
    playPauseBtn.innerHTML = '<i class="fi fi-sr-pause"></i>';

    // Close the menu
    songMenu.style.display = "none";
}

menuButton.addEventListener("click", () => {
    songMenu.style.display = songMenu.style.display === "none" ? "block" : "none";
});

const songs = document.querySelectorAll("#songMenu p");
songs.forEach((song, index) => {
    song.addEventListener("click", (event) => {
        event.target.setAttribute("data-index", index);
        playSong(event);
    });
});

// Event listeners for play/pause, previous, and next buttons
playPauseBtn.addEventListener("click", () => {
    const isMusicplay = wrapper.classList.contains("paused");
    isMusicplay ? pauseMusic() : playMusic();
});
prevBtn.addEventListener("click", () => {
    prevMusic();
});
nextBtn.addEventListener("click", () => {
    nextMusic();
});

// Event listener for updating progress bar based on the audio time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    
    let musicCurrentTime = wrapper.querySelector(".current-time");
    let musicDuration = wrapper.querySelector(".max-duration");

    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Event listener for updating audio progress based on user click on progress bar
progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickOffsetX / progressWidth) * songDuration;
    playMusic();
});

// Event listener for updating UI when audio has loaded
mainAudio.addEventListener("loadeddata", () => {
    let totalMin = Math.floor(mainAudio.duration / 60);
    let totalSec = Math.floor(mainAudio.duration % 60);
    if (totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
});

mainAudio.addEventListener("ended", () => {
    nextMusic();
});
