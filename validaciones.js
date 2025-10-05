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

    // Scroll al contacto
    const contactSection = document.getElementById("contact");
    if(contactSection){
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // Envía el email automáticamente con EmailJS
    const contactForm = document.getElementById("contactForm");
    if(contactForm){
      // Puedes usar valores por defecto para name/email si quieres autocompletar
      const name = contactForm.querySelector("#name").value || "Cliente ProClean";
      const email = contactForm.querySelector("#email").value || "cliente@example.com";
      const phone = contactForm.querySelector("#phone").value || "N/A";
      const message = `Selected Deep Cleaning Package: ${serviceValue}`;

      emailjs.send("service_ggacurv", "template_1de8ct5", {
        name,
        email,
        phone,
        service: serviceValue,
        message
      }).then(() => {
        alert("✅ Your selection was sent successfully!");
      }).catch((err) => {
        console.error("Error sending email:", err);
        alert("⚠️ There was an error sending your selection.");
      });
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

    // Scroll al contacto
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // Envía el email automáticamente con EmailJS
    const contactForm = document.getElementById("contactForm");
    if(contactForm){
      const name = contactForm.querySelector("#name").value || "Cliente ProClean";
      const email = contactForm.querySelector("#email").value || "cliente@example.com";
      const phone = contactForm.querySelector("#phone").value || "N/A";
      const message = `Selected Weekly/Bi-Weekly Package: ${selected}`;

      emailjs.send("service_ggacurv", "template_1de8ct5", {
        name,
        email,
        phone,
        service: selected,
        message
      }).then(() => {
        alert("✅ Your selection was sent successfully!");
      }).catch((err) => {
        console.error("Error sending email:", err);
        alert("⚠️ There was an error sending your selection.");
      });
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



// Donation Form 
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



// ✅ Gift Card Form
const giftCardForm = document.getElementById("bookingFormGift"); // corregido el ID

if (giftCardForm) {
  giftCardForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const recipientName = document.getElementById("giftName").value.trim();
    const recipientEmail = document.getElementById("giftEmail").value.trim();
    const giftPhone = document.getElementById("giftPhone").value.trim();
    const giftService = document.getElementById("giftService").value.trim();
    const giftDate = document.getElementById("giftDate").value;
    const giftMessage = document.getElementById("giftMessage").value.trim();
    const giftBookingMessage = document.getElementById("giftBookingMessage");

    // Validar campos obligatorios
    if (!recipientName || !recipientEmail || !giftPhone || !giftService || !giftDate) {
      giftBookingMessage.textContent = "⚠️ Please complete all required fields.";
      giftBookingMessage.style.color = "red";
      return;
    }

    // Enviar con EmailJS usando tu nuevo template
    emailjs.send("service_ggacurv", "template_8r0hsnp", {
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      phone: giftPhone,
      service: giftService,
      date: giftDate,
      message: giftMessage
    })
    .then(() => {
      giftBookingMessage.textContent = `✅ ${recipientName},  ¡We will respond as soon as possible to schedule your gift card for a service!.`;
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

    // Scroll al formulario de contacto
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const donationForm = document.getElementById("donationForm");
  const donationMessage = document.getElementById("donationMessage");

  donationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = donationForm.donorName.value.trim();
    const email = donationForm.donorEmail.value.trim();
    const amount = donationForm.donationAmount.value.trim();
    const method = donationForm.paymentMethod.value; // nuevo campo select

    if (!name || !email || !amount || amount <= 0 || !method) {
      donationMessage.textContent = "⚠️ Please complete all fields.";
      donationMessage.style.color = "red";
      return;
    }

    donationMessage.textContent = "Redirecting to payment gateway...";
    donationMessage.style.color = "blue";

    // Simulación de redirección según método
    let redirectUrl = "";

    if (method === "paypal") {
      redirectUrl = `https://www.paypal.com/donate?business=TU_CORREO_PAYPAL&amount=${amount}&currency_code=EUR`;
    } else if (method === "aib") {
      redirectUrl = `https://onlinebanking.aib.ie/inet/roi/login.htm`; // AIB login
    } else if (method === "boi") {
      redirectUrl = `https://www.365online.com/servlet/com.ibm.wps.portletbridgemvc.servlet.PortletBridgeServlet/login`; // Bank of Ireland login
    } else if (method === "revolut") {
      redirectUrl = `https://revolut.me/TU_USUARIO/${amount}`;
    }

    // Redirigir después de un pequeño delay
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);
  });
});
