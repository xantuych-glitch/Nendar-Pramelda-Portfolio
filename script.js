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
