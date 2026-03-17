// Mobile menu toggle
const toggleBtn = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");
toggleBtn.addEventListener("click", () => navMenu.classList.toggle("active"));

// Helper: build message from form data
function buildMessage() {
  const name = document.getElementById("name").value.trim();
  const groupSize = document.getElementById("groupSize").value.trim();
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value.trim();

  let msg = "Hello GoZanzibar! I'd like to inquire about a tour.\n\n";
  if (name) msg += `Name: ${name}\n`;
  if (groupSize) msg += `Group size: ${groupSize}\n`;
  if (date) msg += `Preferred date: ${date}\n`;
  if (description) msg += `Details: ${description}\n`;
  if (!name && !groupSize && !date && !description) {
    msg = "Hello GoZanzibar! I'm interested in booking a tour. Let's chat!";
  }
  return encodeURIComponent(msg);
}

// WhatsApp
const whatsappBtn = document.getElementById("whatsappBtn");
whatsappBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const message = buildMessage();
  const url = `https://wa.me/255652017794?text=${message}`;
  window.open(url, "_blank");
});

// Email
// const emailBtn = document.getElementById("emailBtn");
// emailBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const subject = "Tour Inquiry from GoZanzibar website";
//   const body = decodeURIComponent(buildMessage()); // readable in mail body
//   const mailtoUrl = `mailto:hello@gozanzibar.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   window.location.href = mailtoUrl;
// });

// SMS
const smsBtn = document.getElementById("smsBtn");
smsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const body = decodeURIComponent(buildMessage());
  const smsUrl = `sms:+255652017794?body=${encodeURIComponent(body)}`;
  window.open(smsUrl, "_blank");
});

// Call button already has href="tel:..."
