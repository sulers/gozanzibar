// Mobile Menu Toggle (keep as is)
const toggleBtn = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => navMenu.classList.toggle("active"));
}

// ---------- Hero Carousel Data ----------
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1518544376170-2b5ef84e9b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    title: "Stone Town Magic",
  },
  {
    image:
      "https://images.unsplash.com/photo-1603190287605-e6c8e2d5c75f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    title: "Spice Farms & Culture",
  },
  {
    image:
      "https://images.unsplash.com/photo-1547634378-1b098db19c7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    title: "Prison Island Giants",
  },
];
let currentIndex = 0;
let autoSlideInterval = null;
const slideElement = document.getElementById("carouselSlide");
const titleElement = document.getElementById("carouselTitle");
const dotsContainer = document.getElementById("carouselDots");

function updateCarousel() {
  if (slideElement && titleElement) {
    slideElement.style.backgroundImage = `url('${slides[currentIndex].image}')`;
    titleElement.textContent = slides[currentIndex].title;
  }
  if (dotsContainer) {
    document.querySelectorAll(".dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  }
}

function createDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  slides.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (idx === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = idx;
      updateCarousel();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 2500); // 2 seconds
}

function resetAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
}

// Previous & Next buttons
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
  });
}
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
    resetAutoSlide();
  });
}

// Initialise
createDots();
updateCarousel();
startAutoSlide();

// ---------- Reviews Clickable Carousel (unchanged from original) ----------
const reviewTrack = document.getElementById("reviewTrack");
const reviewCards = Array.from(document.querySelectorAll(".review-card"));
const prevReviewBtn = document.getElementById("prevReview");
const nextReviewBtn = document.getElementById("nextReview");
let reviewIndex = 0;
const totalReviews = reviewCards.length;

function updateReviewCarousel() {
  if (reviewTrack) {
    const offset = -reviewIndex * 100;
    reviewTrack.style.transform = `translateX(${offset}%)`;
  }
}

if (prevReviewBtn && nextReviewBtn) {
  prevReviewBtn.addEventListener("click", () => {
    reviewIndex = (reviewIndex - 1 + totalReviews) % totalReviews;
    updateReviewCarousel();
  });
  nextReviewBtn.addEventListener("click", () => {
    reviewIndex = (reviewIndex + 1) % totalReviews;
    updateReviewCarousel();
  });
}

// Make each review card clickable (redirect to Google reviews placeholder)
const googleReviewsUrl = "https://g.page/r/GoZanzibarReviewsPlaceholder";
reviewCards.forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(googleReviewsUrl, "_blank");
  });
});

const seeMoreBtn = document.getElementById("seeMoreReviewsBtn");
if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(googleReviewsUrl, "_blank");
  });
}

// Ensure hero carousel buttons have correct links
const heroSeeMore = document.querySelectorAll(".carousel-btn");
heroSeeMore.forEach((btn) => {
  if (btn.innerText.includes("See More"))
    btn.setAttribute("href", "#about-tours");
  if (btn.innerText.includes("Book Now"))
    btn.setAttribute("href", "booking.html");
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (
      targetId === "#" ||
      targetId === "#about-tours" ||
      targetId === "#booking"
    ) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
