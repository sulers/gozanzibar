// ---------- Mobile Menu Toggle ----------
const toggleBtn = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");
toggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

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
const slideElement = document.getElementById("carouselSlide");
const titleElement = document.getElementById("carouselTitle");
const dotsContainer = document.getElementById("carouselDots");
function updateCarousel() {
  slideElement.style.backgroundImage = `url('${slides[currentIndex].image}')`;
  titleElement.textContent = slides[currentIndex].title;
  document.querySelectorAll(".dot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
}
function createDots() {
  dotsContainer.innerHTML = "";
  slides.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (idx === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = idx;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}
document.getElementById("prevSlide").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});
document.getElementById("nextSlide").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});
createDots();
updateCarousel();

// ---------- Reviews Clickable Carousel (cards) ----------
const reviewTrack = document.getElementById("reviewTrack");
const reviewCards = Array.from(document.querySelectorAll(".review-card"));
const prevReviewBtn = document.getElementById("prevReview");
const nextReviewBtn = document.getElementById("nextReview");
let reviewIndex = 0;
const totalReviews = reviewCards.length;
function updateReviewCarousel() {
  const offset = -reviewIndex * 100;
  reviewTrack.style.transform = `translateX(${offset}%)`;
}
prevReviewBtn.addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + totalReviews) % totalReviews;
  updateReviewCarousel();
});
nextReviewBtn.addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % totalReviews;
  updateReviewCarousel();
});
// make each review card clickable (redirect to google reviews placeholder)
const googleReviewsUrl = "https://g.page/r/GoZanzibarReviewsPlaceholder"; // placeholder link
reviewCards.forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    window.open(googleReviewsUrl, "_blank");
  });
});
// Also the "See More Reviews" button uses same target
const seeMoreBtn = document.getElementById("seeMoreReviewsBtn");
if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(googleReviewsUrl, "_blank");
  });
}
// ensure any additional booking buttons work: they point to booking.html
// "Book Now" inside carousel and CTA button: handled by hrefs.
// But we need to make sure the "Book Now" inside hero carousel buttons are dynamic but we keep static links pointing to booking page.
// For smooth demo, all "Book Now" buttons have href="#booking", the main CTA points to booking.html
const mainBookBtn = document.getElementById("mainBookBtn");
if (mainBookBtn) mainBookBtn.setAttribute("href", "booking.html");
// For the carousel buttons:
const seeMoreBtns = document.querySelectorAll(".carousel-btn");
seeMoreBtns.forEach((btn) => {
  if (btn.innerText.includes("See More"))
    btn.setAttribute("href", "about.html");
  if (btn.innerText.includes("Book Now"))
    btn.setAttribute("href", "booking.html");
});
// optional: smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (
      targetId === "#" ||
      targetId === "about.html" ||
      targetId === "booking.html"
    ) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
