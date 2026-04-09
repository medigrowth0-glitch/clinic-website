const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const treatmentSearch = document.querySelector("#treatmentSearch");
const treatmentCards = document.querySelectorAll(".treatment-card");
const searchEmpty = document.querySelector("#searchEmpty");
const appointmentForm = document.querySelector("#appointmentForm");
const formResult = document.querySelector("#formResult");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (treatmentSearch) {
  treatmentSearch.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    let visibleCount = 0;

    treatmentCards.forEach((card) => {
      const terms = `${card.dataset.name} ${card.textContent}`.toLowerCase();
      const isVisible = !query || terms.includes(query);
      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    searchEmpty.hidden = visibleCount !== 0;
  });
}

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const patientName = document.querySelector("#patientName").value.trim();
    const patientPhone = document.querySelector("#patientPhone").value.trim();
    const patientIssue = document.querySelector("#patientIssue").value.trim();
    const patientTiming = document.querySelector("#patientTiming").value.trim();
    const patientMessage = document.querySelector("#patientMessage").value.trim();

    if (!patientName || !patientPhone || !patientIssue) {
      formResult.textContent = "कृपया नाम, मोबाइल नंबर और समस्या जरूर भरें।";
      return;
    }

    const whatsappMessage = [
      "नमस्ते, मुझे समर आयुर्वेदिक क्लीनिक में अपॉइंटमेंट चाहिए।",
      `नाम: ${patientName}`,
      `मोबाइल: ${patientPhone}`,
      `समस्या: ${patientIssue}`,
      patientTiming ? `पसंदीदा समय: ${patientTiming}` : "",
      patientMessage ? `अतिरिक्त जानकारी: ${patientMessage}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    formResult.textContent = "अनुरोध तैयार हो गया है। व्हाट्सऐप विंडो खुल रही है।";
    window.open(`https://wa.me/919416715187?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener");
    appointmentForm.reset();
  });
}
