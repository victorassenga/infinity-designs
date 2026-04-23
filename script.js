

// NAV UNDERLINE (ACTIVE + HOVER)
const links = document.querySelectorAll(".nav a");
const underline = document.querySelector(".underline");
const nav = document.querySelector(".nav");

links.forEach(link => {
  link.addEventListener("mouseenter", (e) => {
    const rect = e.target.getBoundingClientRect();
    const parent = nav.getBoundingClientRect();

    underline.style.width = rect.width + "px";
    underline.style.left = rect.left - parent.left + "px";
  });
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav");

// CREATE OVERLAY (only once)
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

// TOGGLE MENU
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});


// CLOSE WHEN CLICK OUTSIDE
overlay.addEventListener("click", () => {
  closeMenu();
});

// CLOSE WHEN CLICKING LINKS
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// FUNCTION (cleaner structure)
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
}


// MAGNETIC BUTTON IMPROVED
const magnets = document.querySelectorAll(".magnetic");

magnets.forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});



const medias = document.querySelectorAll(".media");

let index = 0;

// directions cycle
const directions = ["left", "bottom", "right"];

function showNextMedia() {

  // remove active
  medias[index].classList.remove("active");

  index = (index + 1) % medias.length;

  const direction = directions[index % directions.length];

  const nextMedia = medias[index];

  // reset classes
  nextMedia.classList.remove("left", "right", "bottom");

  // apply direction
  nextMedia.classList.add(direction);

  // trigger animation
  setTimeout(() => {
    nextMedia.classList.add("active");
  }, 50);
}

// auto slide
setInterval(showNextMedia, 8000);




//FILTER ANIMATION

const buttons = document.querySelectorAll(".work-categories li");
const items = document.querySelectorAll(".work-item");

buttons.forEach(button => {
  button.addEventListener("click", () => {

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    // 👉 STEP 1: reset hidden items
    items.forEach(item => {
      item.classList.remove("hidden");
    });

    // 👉 STEP 2: FIRST positions
    const first = [];
    items.forEach(item => {
      first.push(item.getBoundingClientRect());
    });

    // 👉 STEP 3: apply hide (animation phase)
    items.forEach(item => {
      const category = item.dataset.category;

      if (filter !== "all" && filter !== category) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    });

    // 👉 STEP 4: animate movement (FLIP)
    requestAnimationFrame(() => {

      items.forEach((item, i) => {
        const last = item.getBoundingClientRect();

        const dx = first[i].left - last.left;
        const dy = first[i].top - last.top;

        if (dx || dy) {
          item.style.transform = `translate(${dx}px, ${dy}px)`;

          requestAnimationFrame(() => {
            item.style.transform = "translate(0, 0)";
          });
        }
      });

    });

    // 👉 STEP 5: AFTER animation, remove from layout
    setTimeout(() => {
      items.forEach(item => {
        if (item.classList.contains("hide")) {
          item.classList.add("hidden");
        }
      });
    }, 600);

  });
});


// TESTIMONIAL SCROLL

const slider = document.querySelector(".testimonial-track");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // speed
  slider.scrollLeft = scrollLeft - walk;
});

/* TOUCH SUPPORT */
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});