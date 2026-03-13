// ── SCROLL REVEAL ─────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Không unobserve → chỉ chạy 1 lần mỗi phần tử
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12, // kích hoạt khi 12% phần tử xuất hiện trong viewport
  },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ── TYPED.JS ──────────────────────────────────────────
new Typed(".auto-type", {
  strings: ["Web Developer", "Java Developer", "Software Engineer"],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true,
  showCursor: false,
});

// ── HEADER: đổi màu nền khi scroll ───────────────────
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ── CONTACT FORM: xử lý submit ───────────────────────
function handleSubmit(btn) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate
  if (!name || !email || !subject || !message) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  // Giả lập gửi thành công
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    clearForm();
    showToast(
      "Message sent successfully! I'll get back to you soon.",
      "success",
    );
  }, 1500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearForm() {
  ["name", "email", "subject", "message"].forEach((id) => {
    document.getElementById(id).value = "";
  });
}

// ── TOAST NOTIFICATION ────────────────────────────────
function showToast(message, type = "success") {
  // Xóa toast cũ nếu có
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i>
    <span>${message}</span>
  `;

  // Style inline để không cần thêm CSS riêng
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.85rem 1.4rem",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#fff",
    background: type === "success" ? "#1b0e0e" : "#ee2448",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    zIndex: "9999",
    opacity: "0",
    transform: "translateY(12px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  // Animate out sau 3.5s
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── SMOOTH SCROLL ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = document.querySelector("header").offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top, behavior: "smooth" });
  });
});