/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.style.opacity = "0";

        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);

    }, 1200);

});


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= BOOKING MODAL ================= */

function openBooking(room = "") {

    document.getElementById("bookingModal")
        .classList.add("active");

    if (room) {

        const roomSelect =
            document.querySelector(
                '#bookingModal select'
            );

        roomSelect.value = room;

    }

}


function closeBooking() {

    document.getElementById("bookingModal")
        .classList.remove("active");

}


window.addEventListener("click", event => {

    const modal =
        document.getElementById("bookingModal");

    if (event.target === modal) {
        closeBooking();
    }

});


/* ================= ROOM SELECTION ================= */

function selectRoom(room) {

    openBooking(room);

}


/* ================= AVAILABILITY ================= */

function searchAvailability() {

    const checkin =
        document.getElementById("checkin").value;

    const checkout =
        document.getElementById("checkout").value;

    const guests =
        document.getElementById("guests").value;


    if (!checkin || !checkout) {

        showToast(
            "Please select your check-in and check-out dates."
        );

        return;

    }


    if (new Date(checkout) <= new Date(checkin)) {

        showToast(
            "Check-out must be after check-in."
        );

        return;

    }


    showToast(
        `Searching rooms for ${guests}...`
    );


    setTimeout(() => {

        openBooking();

        document.getElementById("bookingCheckin").value =
            checkin;

        document.getElementById("bookingCheckout").value =
            checkout;

    }, 900);

}


/* ================= BOOKING SUBMISSION ================= */

function submitBooking(event) {

    event.preventDefault();

    const name =
        document.getElementById("bookingName").value;


    closeBooking();


    showToast(
        `Thank you ${name}. Your reservation request has been received.`
    );


    event.target.reset();

}


/* ================= CONTACT ================= */

function sendMessage(event) {

    event.preventDefault();

    event.target.reset();

    showToast(
        "Your message has been sent successfully."
    );

}


/* ================= GALLERY ================= */

function openGallery(title) {

    document.getElementById("galleryTitle")
        .textContent = title;

    document.getElementById("galleryModal")
        .classList.add("active");

}


function closeGallery() {

    document.getElementById("galleryModal")
        .classList.remove("active");

}


document
    .getElementById("galleryModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeGallery();
        }

    });


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


/* ================= TESTIMONIALS ================= */

const reviews = [

    {
        text:
        "An extraordinary experience from beginning to end. The service, atmosphere and attention to detail were exceptional.",

        name:
        "Sophia Williams",

        location:
        "London, United Kingdom"
    },

    {
        text:
        "Beautiful rooms, incredible dining and truly exceptional hospitality. Every detail felt carefully considered.",

        name:
        "Daniel Anderson",

        location:
        "New York, United States"
    },

    {
        text:
        "The perfect destination for an unforgettable luxury escape. The staff made our stay incredibly special.",

        name:
        "Amelia Carter",

        location:
        "Dubai, UAE"
    }

];


let reviewIndex = 0;


function updateReview() {

    document.getElementById("testimonialText")
        .textContent =
        reviews[reviewIndex].text;

    document.getElementById("testimonialName")
        .textContent =
        reviews[reviewIndex].name;

    document.querySelector(
        ".testimonial-slider small"
    ).textContent =
        reviews[reviewIndex].location;

}


function nextReview() {

    reviewIndex++;

    if (reviewIndex >= reviews.length) {
        reviewIndex = 0;
    }

    updateReview();

}


function previousReview() {

    reviewIndex--;

    if (reviewIndex < 0) {
        reviewIndex = reviews.length - 1;
    }

    updateReview();

}


/* ================= AUTO REVIEWS ================= */

setInterval(() => {

    nextReview();

}, 7000);


/* ================= COUNTERS ================= */

const counters =
    document.querySelectorAll(
        "[data-target]"
    );


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    const section =
        document.querySelector(".intro-stats");

    const position =
        section.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 60));

            const timer =
                setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    counter.textContent =
                        current + (target === 5 ? "" : "+");

                }, 30);

        });

    }

}


window.addEventListener(
    "scroll",
    startCounters
);


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeBooking();
        closeGallery();

    }

});