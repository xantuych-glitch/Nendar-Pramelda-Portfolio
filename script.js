const posters = document.querySelectorAll(".poster-item");
const modal = document.getElementById("posterModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".poster-close");
const tracks = document.querySelectorAll(".marquee-track");

posters.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
  
      tracks.forEach(track => {
        track.style.animationPlayState = "paused";
      });
    });
  });  

  function resumeTracks() {
    tracks.forEach(track => {
      track.style.animationPlayState = "running";
    });
  }
  
  closeBtn.onclick = () => {
    modal.style.display = "none";
    resumeTracks();
  };
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      resumeTracks();
    }
  };
  

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const floats = document.querySelectorAll(".float");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  floats.forEach((el, i) => {
    const speed = (i + 1) * 0.03;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

const container = document.querySelector(".floating-random");

const images = [
  "assets/ilustrasi/komputer.png",
  "assets/ilustrasi/microphone.png",
  "assets/ilustrasi/mouse.png",
  "assets/ilustrasi/vs.png",
  "assets/ilustrasi/pad.png",
];

// jumlah objek melayang
for (let i = 0; i < 18; i++) {
  const img = document.createElement("img");
  img.src = images[Math.floor(Math.random() * images.length)];
  img.className = "float-item";

  // ukuran random
  const size = Math.random() * 120 + 60;
  img.style.width = size + "px";

  // posisi awal random
  img.style.left = Math.random() * 100 + "vw";
  img.style.top = Math.random() * 120 + "vh";

  // durasi gerak beda
  const duration = Math.random() * 20 + 25;
  img.style.animationDuration = duration + "s";

  // delay random
  img.style.animationDelay = Math.random() * 20 + "s";

  // rotasi awal random
  img.style.transform = `rotate(${Math.random() * 360}deg)`;

  container.appendChild(img);
}

document.addEventListener("DOMContentLoaded", function () {
  const playBtnMobile = document.getElementById("playBtnMobile");

if (playBtnMobile) {
  playBtnMobile.onclick = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };
}

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  const trackTitle = document.getElementById("trackTitle");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  const songs = [
    {
      title: "Birds of a Feather",
      src: "assets/music/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) - BillieEilishVEVO.mp3"
    },

    {
      title: "Saturn",
      src: "assets/music/SZA - Saturn - SZAVEVO.mp3"
    },

    {
      title: "Pretty Eyes",
      src: "assets/music/Pretty Eyes - zehdi.mp3"
    },

  ];

  let songIndex = 0;

  function loadSong(index) {
    audio.src = songs[index].src;
    trackTitle.textContent = songs[index].title;
  }

  loadSong(songIndex);

  // ▶️ PLAY / PAUSE
  playBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playIcon.src = "assets/icons/pause.png";
    } else {
      audio.pause();
      playIcon.src = "assets/icons/play.png";
    }
  });

  // ⏭ NEXT
  nextBtn.addEventListener("click", function () {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playIcon.src = "assets/icons/pause.png";
  });

  audio.addEventListener("ended", function () {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playIcon.src = "assets/icons/pause.png";
  });
  
  // ⏮ PREV
  prevBtn.addEventListener("click", function () {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
    playIcon.src = "assets/icons/pause.png";
  });

  // PROGRESS
  audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  });

  progressBar.addEventListener("input", function () {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });

  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

});


