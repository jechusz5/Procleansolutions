document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const serviceBtns = document.querySelectorAll(".service-btn");
  const serviceInput = document.getElementById("service");

  // Rellenar el campo de servicio al hacer clic en "Solicitar"
  serviceBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceInput.value = btn.dataset.service;
      window.location.hash = "contact";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validaciones
    if (name.length < 3) {
      showError("⚠️ Please enter your full name.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showError("⚠️ Invalid email address.");
      return;
    }
    if (!/^[0-9+ ]{7,15}$/.test(phone)) {
      showError("⚠️ Invalid phone number.");
      return;
    }
    if (message.length < 10) {
      showError("⚠️ Message must be at least 10 characters.");
      return;
    }

    // Enviar con EmailJS
    emailjs.send("service_ggacurv", "template_1de8ct5", {
      name,
      email,
      phone,
      service,
      message
    }).then(() => {
      formMessage.textContent = "✅ Thank you! Your message has been sent.";
      formMessage.style.color = "green";
      form.reset();
    }).catch(() => {
      showError("❌ Error sending message. Please try again later.");
    });
  });

  function showError(msg) {
    formMessage.textContent = msg;
    formMessage.style.color = "red";
  }
});

// Full House Deep Cleaning forms
const deepCleanButtons = document.querySelectorAll(".select-service-btn");

deepCleanButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const serviceValue = button.dataset.service;
    const serviceInput = document.getElementById("service");
    serviceInput.value = serviceValue;

    // ✅ Solo scroll — NO envío de email
    const contactSection = document.getElementById("contact");
    if(contactSection){
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Weekly / Bi-Weekly forms
const weeklyForms = document.querySelectorAll(".weeklyForm");

weeklyForms.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selected = form.querySelector("input[name='weekly']").value;
    if (!selected) {
      alert("⚠️ Please select a package.");
      return;
    }

    const serviceInput = document.getElementById("service");
    serviceInput.value = selected;

    // ✅ Solo scroll — NO envío de email
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Booking Form en Home
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = bookingForm.name.value.trim();
    const email = bookingForm.email.value.trim();
    const phone = bookingForm.phone.value.trim();
    const service = bookingForm.service.value.trim();
    const date = bookingForm.date.value;
    const time = bookingForm.time.value;
    const message = bookingForm.message.value.trim();

    if (!name || !email || !phone || !service || !date || !time) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    emailjs.send("service_ggacurv", "template_1de8ct5", {
      from_name: name,
      from_email: email,
      phone: phone,
      service: service,
      date: date,
      time: time,
      message: message
    }).then(
      () => {
        document.getElementById("bookingMessage").innerText = "✅ Booking request sent successfully!";
        bookingForm.reset();
      },
      (error) => {
        document.getElementById("bookingMessage").innerText = "❌ Error sending booking: " + error.text;
      }
    );
  });
}

// ✅ Donation Form simplificado
const donationForm = document.getElementById("donationForm");
if (donationForm) {
  donationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const donationAmount = donationForm.donationAmount.value.trim();
    const paymentMethod = donationForm.paymentMethod.value;
    const donationMessage = document.getElementById("donationMessage");

    if (!donationAmount || donationAmount <= 0 || !paymentMethod) {
      donationMessage.textContent = "⚠️ Please enter an amount and select a payment method.";
      donationMessage.style.color = "red";
      return;
    }

    donationMessage.textContent = "Redirecting to payment gateway...";
    donationMessage.style.color = "blue";

    let redirectUrl = "";
    if (paymentMethod === "paypal") {
      redirectUrl = `https://www.paypal.com/donate?business=TU_CORREO_PAYPAL&amount=${donationAmount}&currency_code=EUR`;
    } else if (paymentMethod === "aib") {
      redirectUrl = `https://onlinebanking.aib.ie/inet/roi/login.htm`;
    } else if (paymentMethod === "boi") {
      redirectUrl = `https://www.365online.com/servlet/com.ibm.wps.portletbridgemvc.servlet.PortletBridgeServlet/login`;
    } else if (paymentMethod === "revolut") {
      redirectUrl = `https://revolut.me/TU_USUARIO/${donationAmount}`;
    }

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);
  });
}

/* -------------------------------
   ANIMACIONES DEL HERO (HOME)
---------------------------------*/
const hero = document.querySelector(".hero");
if (hero) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

    hero.querySelectorAll("h1, p, .btn").forEach((el, i) => {
      el.style.transform = `translateY(${scrollY * 0.2}px)`;
      el.style.opacity = Math.max(1 - scrollY / 400, 0);
    });
  });
}

// Additional Services dropdown - Enhanced
const additionalServiceBtn = document.getElementById("additionalServiceBtn");
if (additionalServiceBtn) {
  additionalServiceBtn.addEventListener("click", () => {
    const dropdown = document.getElementById("additionalServices");
    const selectedService = dropdown.value;

    if (!selectedService) {
      alert("⚠️ Please select an additional service.");
      return;
    }

    const serviceInput = document.getElementById("service");
    serviceInput.value = selectedService;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ✅ Gift Card Form
const giftCardForm = document.getElementById("bookingFormGift");

if (giftCardForm) {
  giftCardForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const recipientName = document.getElementById("giftName").value.trim();
    const recipientEmail = document.getElementById("giftEmail").value.trim();
    const giftPhone = document.getElementById("giftPhone").value.trim();
    const giftService = document.getElementById("giftService").value.trim();
    const giftDate = document.getElementById("giftDate").value;
    const giftMessage = document.getElementById("giftMessage").value.trim();
    const giftBookingMessage = document.getElementById("giftBookingMessage");

    if (!recipientName || !recipientEmail || !giftPhone || !giftService || !giftDate) {
      giftBookingMessage.textContent = "⚠️ Please complete all required fields.";
      giftBookingMessage.style.color = "red";
      return;
    }

    emailjs.send("service_ggacurv", "template_8r0hsnp", {
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      phone: giftPhone,
      service: giftService,
      date: giftDate,
      message: giftMessage
    })
    .then(() => {
      giftBookingMessage.textContent = `✅ ${recipientName}, we will respond as soon as possible to schedule your gift card service.`;
      giftBookingMessage.style.color = "green";
      giftCardForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      giftBookingMessage.textContent = "❌ Error sending gift card. Please try again later.";
      giftBookingMessage.style.color = "red";
    });
  });
}

// Seleccionar servicio desde tabla de Deep Cleaning
const deepTableBtns = document.querySelectorAll(".select-service-btn");
deepTableBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceInput = document.getElementById("service");
    serviceInput.value = btn.dataset.service;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});
