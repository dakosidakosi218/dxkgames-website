// ============================================================
// DXK GAMES WEBSITE - JAVASCRIPT
// ============================================================

// ── Navigation ───────────────────────────────────────────────

const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page-section").forEach(page => {
    page.classList.remove("active");
  });

  // Show the selected page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
  }

  // Close mobile menu
  navLinks.classList.remove("active");

  // Scroll to top on page change
  window.scrollTo(0, 0);
}

// ── Character Counter (Beta Key Form) ────────────────────────
// FIX: Character counter implemented following peer review feedback
// from Damian, who noted users needed to know how much to write.

const reasonField = document.getElementById("reason");
const charCount   = document.getElementById("charCount");

if (reasonField && charCount) {
  reasonField.addEventListener("input", function () {
    const count = this.value.length;
    charCount.textContent = count;

    const charCountContainer = charCount.parentElement;
    if (count >= 280) {
      charCountContainer.classList.add("warning");
    } else {
      charCountContainer.classList.remove("warning");
    }
  });
}

// ── Form Validation (Beta Key Form) ──────────────────────────
// JavaScript client-side validation with immediate per-field error
// messages. Uses preventDefault to avoid page reload on submit.

const betaForm = document.getElementById("betaForm");
if (betaForm) {
  betaForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear all previous error messages
    document.querySelectorAll(".error-message").forEach(msg => {
      msg.classList.remove("show");
    });

    let isValid = true;

    // Validate: name must not be empty
    const name = document.getElementById("name").value.trim();
    if (!name) {
      document.getElementById("nameError").classList.add("show");
      isValid = false;
    }

    // Validate: email must match regex format
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById("emailError").classList.add("show");
      isValid = false;
    }

    // Validate: reason must be at least 50 characters
    const reason = document.getElementById("reason").value.trim();
    if (reason.length < 50) {
      document.getElementById("reasonError").classList.add("show");
      isValid = false;
    }

    // Validate: GDPR consent checkbox must be checked
    if (!document.getElementById("consent").checked) {
      document.getElementById("consentError").classList.add("show");
      isValid = false;
    }

    // If all validation passes, show success message
    if (isValid) {
      const form    = this;
      const success = document.getElementById("successMessage");

      success.classList.add("show");

      // Small delay before hiding form so success message renders first
      setTimeout(() => {
        form.style.display = "none";
      }, 100);
    }
  });
}

// ── Lightbox ─────────────────────────────────────────────────
// Opens an enlarged overlay when a gallery image is clicked on the
// City Runner page. Closes on close button click, outside click or Escape.

function openLightbox(imageId) {
  const imageElement = document.getElementById(imageId);
  if (imageElement) {
    document.getElementById("lightboxImage").src = imageElement.src;
    document.getElementById("lightboxImage").alt = imageElement.alt;
    document.getElementById("lightbox").classList.add("active");
  }
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

// Keyboard: close lightbox with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
