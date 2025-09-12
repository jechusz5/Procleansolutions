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
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
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

// Deep Clean forms
const deepCleanForms = document.querySelectorAll(".deepCleanForm");
deepCleanForms.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selected = form.querySelector("input[name='deepClean']:checked");
    if (!selected) {
      alert("⚠️ Please select a deep cleaning package.");
      return;
    }
    const serviceInput = document.getElementById("service");
    serviceInput.value = selected.value;

    // Redirigir al contacto
    const contactSection = document.getElementById("contact");
    if (contactSection) {
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

    // Redirigir al contacto
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

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
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



// Donation Form con EmailJS
const donationForm = document.getElementById("donationForm");
if (donationForm) {
  donationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const donorName = donationForm.donorName.value.trim();
    const donorEmail = donationForm.donorEmail.value.trim();
    const donationAmount = donationForm.donationAmount.value.trim();
    const donationMessage = document.getElementById("donationMessage");

    if (!donorName || !donorEmail || !donationAmount) {
      donationMessage.textContent = "⚠️ Please complete all fields.";
      donationMessage.style.color = "red";
      return;
    }

    // Validación de email
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(donorEmail)) {
      donationMessage.textContent = "⚠️ Invalid email address.";
      donationMessage.style.color = "red";
      return;
    }

    // Enviar con EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      donor_name: donorName,
      donor_email: donorEmail,
      donation_amount: donationAmount
    }).then(() => {
      donationMessage.textContent = `✅ Thank you, ${donorName}! Your donation of €${donationAmount} has been registered.`;
      donationMessage.style.color = "green";
      donationForm.reset();
    }).catch(() => {
      donationMessage.textContent = "❌ Error sending donation. Please try again later.";
      donationMessage.style.color = "red";
    });
  });
}





/* -------------------------------
   ANIMACIONES DEL HERO (HOME)
---------------------------------*/
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero *");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Parallax en el fondo
  hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

  // Efecto fade y movimiento del contenido
  hero.querySelectorAll("h1, p, .btn").forEach((el, i) => {
    el.style.transform = `translateY(${scrollY * 0.2}px)`;
    el.style.opacity = Math.max(1 - scrollY / 400, 0);
  });
});


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

    // Insert selected service into contact form input
    const serviceInput = document.getElementById("service");
    serviceInput.value = selectedService;

    // Scroll smoothly to Contact section
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



// Gift Card Form
const giftCardForm = document.getElementById("giftCardForm");
if (giftCardForm) {
  giftCardForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const recipientName = giftCardForm.giftName.value.trim();
    const recipientEmail = giftCardForm.giftEmail.value.trim();
    const giftService = giftCardForm.giftService.value.trim();
    const giftMessage = giftCardForm.giftMessage.value.trim();
    const giftCardMessage = document.getElementById("giftCardMessage");

    if (!recipientName || !recipientEmail || !giftService) {
      giftCardMessage.textContent = "⚠️ Please complete all required fields.";
      giftCardMessage.style.color = "red";
      return;
    }

    // Enviar con EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      service: giftService,
      message: giftMessage
    }).then(() => {
      giftCardMessage.textContent = `✅ Gift card for ${giftService} sent successfully to ${recipientName}!`;
      giftCardMessage.style.color = "green";
      giftCardForm.reset();
    }).catch(() => {
      giftCardMessage.textContent = "❌ Error sending gift card. Please try again later.";
      giftCardMessage.style.color = "red";
    });
  });
}


// Seleccionar servicio desde tabla de Deep Cleaning
const deepTableBtns = document.querySelectorAll(".select-service-btn");
deepTableBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceInput = document.getElementById("service");
    serviceInput.value = btn.dataset.service;

    // Scroll al formulario de contacto
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});
