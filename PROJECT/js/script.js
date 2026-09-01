```javascript
/* =========================================================
   CHILL & STAY
   ADVANCED JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   01. GLOBAL SELECTORS
   ========================================================= */

const body = document.body;

const header = document.querySelector(".header");

const menuButton = document.querySelector(".menu-button");

const nav = document.querySelector(".nav");

const backToTop = document.querySelector(".back-to-top");

const revealElements = document.querySelectorAll(".reveal");

const roomCards = document.querySelectorAll(".room-card");

const roomFilters = document.querySelectorAll(".filter-btn");

const galleryItems = document.querySelectorAll(".gallery-item");

const galleryFilters = document.querySelectorAll(".gallery-filter");

const faqItems = document.querySelectorAll(".faq-item");

const bookingForm = document.querySelector(".booking-form");

const lightbox = document.querySelector(".lightbox");

const lightboxClose = document.querySelector(".lightbox-close");

const lightboxNext = document.querySelector(".lightbox-next");

const lightboxPrev = document.querySelector(".lightbox-prev");

const toast = document.querySelector(".toast");


/* =========================================================
   02. MOBILE NAVIGATION
   ========================================================= */

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("open");

        const isOpen = nav.classList.contains("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        if (isOpen) {

            menuButton.innerHTML =
                '<i class="fas fa-times"></i>';

        } else {

            menuButton.innerHTML =
                '<i class="fas fa-bars"></i>';
        }
    });


    /* Close menu when clicking a navigation link */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.innerHTML =
                '<i class="fas fa-bars"></i>';
        });
    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            !nav.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            nav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.innerHTML =
                '<i class="fas fa-bars"></i>';
        }
    });
}


/* =========================================================
   03. HEADER SCROLL EFFECT
   ========================================================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   04. BACK TO TOP
   ========================================================= */

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");
    }
}

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
   05. SCROLL REVEAL ANIMATION
   ========================================================= */

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");
    });
}


/* =========================================================
   06. ROOM FILTERING
   ========================================================= */

if (roomFilters.length && roomCards.length) {

    roomFilters.forEach(button => {

        button.addEventListener("click", () => {

            roomFilters.forEach(btn => {

                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category =
                button.dataset.filter || "all";


            roomCards.forEach(card => {

                const cardCategory =
                    card.dataset.category || "all";


                if (
                    category === "all" ||
                    cardCategory === category
                ) {

                    card.style.display = "block";

                    requestAnimationFrame(() => {

                        card.style.opacity = "1";

                        card.style.transform =
                            "translateY(0)";
                    });

                } else {

                    card.style.opacity = "0";

                    card.style.transform =
                        "translateY(15px)";

                    setTimeout(() => {

                        card.style.display = "none";

                    }, 300);
                }
            });
        });
    });
}


/* =========================================================
   07. GALLERY FILTERING
   ========================================================= */

if (
    galleryFilters.length &&
    galleryItems.length
) {

    galleryFilters.forEach(button => {

        button.addEventListener("click", () => {

            galleryFilters.forEach(btn => {

                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category =
                button.dataset.filter || "all";


            galleryItems.forEach(item => {

                const itemCategory =
                    item.dataset.category || "all";


                if (
                    category === "all" ||
                    itemCategory === category
                ) {

                    item.style.display = "block";

                    requestAnimationFrame(() => {

                        item.style.opacity = "1";

                        item.style.transform =
                            "scale(1)";
                    });

                } else {

                    item.style.opacity = "0";

                    item.style.transform =
                        "scale(0.95)";

                    setTimeout(() => {

                        item.style.display = "none";

                    }, 300);
                }
            });
        });
    });
}


/* =========================================================
   08. GALLERY LIGHTBOX
   ========================================================= */

let currentGalleryIndex = 0;

let visibleGalleryItems = [];


function getVisibleGalleryItems() {

    return Array.from(galleryItems)
        .filter(item => {

            return (
                item.style.display !== "none"
            );
        });
}


function openLightbox(index) {

    if (!lightbox) return;

    visibleGalleryItems =
        getVisibleGalleryItems();

    if (!visibleGalleryItems.length) return;

    currentGalleryIndex = index;

    lightbox.classList.add("active");

    body.classList.add("no-scroll");

    updateLightbox();

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    body.classList.remove("no-scroll");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );
}


function updateLightbox() {

    if (!lightbox) return;

    const item =
        visibleGalleryItems[currentGalleryIndex];

    if (!item) return;


    const placeholder =
        item.querySelector(
            ".gallery-placeholder"
        );

    const lightboxPlaceholder =
        lightbox.querySelector(
            ".lightbox-placeholder"
        );


    if (
        placeholder &&
        lightboxPlaceholder
    ) {

        lightboxPlaceholder.innerHTML =
            placeholder.innerHTML;
    }
}


function nextGalleryImage() {

    if (!visibleGalleryItems.length) return;

    currentGalleryIndex++;

    if (
        currentGalleryIndex >=
        visibleGalleryItems.length
    ) {

        currentGalleryIndex = 0;
    }

    updateLightbox();
}


function previousGalleryImage() {

    if (!visibleGalleryItems.length) return;

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex =
            visibleGalleryItems.length - 1;
    }

    updateLightbox();
}


galleryItems.forEach(item => {

    const viewButton =
        item.querySelector(".gallery-view");


    if (viewButton) {

        viewButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                visibleGalleryItems =
                    getVisibleGalleryItems();

                const index =
                    visibleGalleryItems.indexOf(
                        item
                    );

                openLightbox(
                    index >= 0 ? index : 0
                );
            }
        );
    }
});


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );
}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        nextGalleryImage
    );
}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        previousGalleryImage
    );
}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();
            }
        }
    );
}


/* =========================================================
   09. LIGHTBOX KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox ||
            !lightbox.classList.contains("active")
        ) {

            return;
        }


        if (event.key === "Escape") {

            closeLightbox();
        }


        if (event.key === "ArrowRight") {

            nextGalleryImage();
        }


        if (event.key === "ArrowLeft") {

            previousGalleryImage();
        }
    }
);


/* =========================================================
   10. FAQ ACCORDION
   ========================================================= */

if (faqItems.length) {

    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        if (!question || !answer) return;


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                /* Close all other FAQ items */

                faqItems.forEach(otherItem => {

                    if (otherItem !== item) {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherAnswer =
                            otherItem.querySelector(
                                ".faq-answer"
                            );

                        if (otherAnswer) {

                            otherAnswer.style.maxHeight =
                                null;
                        }
                    }
                });


                if (isActive) {

                    item.classList.remove(
                        "active"
                    );

                    answer.style.maxHeight =
                        null;

                } else {

                    item.classList.add(
                        "active"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";
                }
            }
        );
    });
}


/* =========================================================
   11. TOAST NOTIFICATION
   ========================================================= */

let toastTimer;


function showToast(
    message,
    icon = "fa-check-circle"
) {

    if (!toast) return;


    const toastIcon =
        toast.querySelector("i");

    const toastMessage =
        toast.querySelector("span");


    if (toastIcon) {

        toastIcon.className =
            `fas ${icon}`;
    }


    if (toastMessage) {

        toastMessage.textContent =
            message;
    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);
}


/* =========================================================
   12. FORM VALIDATION HELPERS
   ========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


function isValidPhone(phone) {

    const cleaned =
        phone.replace(/[^\d+]/g, "");

    return cleaned.length >= 10;
}


function setFieldError(
    input,
    message
) {

    if (!input) return;


    input.classList.add("error");


    let error =
        input.parentElement
            ?.querySelector(
                ".form-error"
            );


    if (!error) {

        error =
            document.createElement("small");

        error.className =
            "form-error";

        input.parentElement?.appendChild(
            error
        );
    }


    error.textContent = message;
}


function clearFieldError(input) {

    if (!input) return;


    input.classList.remove("error");


    const error =
        input.parentElement
            ?.querySelector(
                ".form-error"
            );


    if (error) {

        error.remove();
    }
}


/* =========================================================
   13. BOOKING FORM
   ========================================================= */

if (bookingForm) {

    const checkIn =
        bookingForm.querySelector(
            '[name="checkin"], #checkin'
        );

    const checkOut =
        bookingForm.querySelector(
            '[name="checkout"], #checkout'
        );

    const email =
        bookingForm.querySelector(
            '[type="email"], [name="email"]'
        );

    const phone =
        bookingForm.querySelector(
            '[type="tel"], [name="phone"]'
        );

    const name =
        bookingForm.querySelector(
            '[name="name"], [name="fullname"]'
        );


    /* Prevent selecting a past check-in date */

    if (checkIn) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        checkIn.min = today;

        checkIn.addEventListener(
            "change",
            () => {

                clearFieldError(checkIn);

                if (checkOut) {

                    checkOut.min =
                        checkIn.value;
                }
            }
        );
    }


    if (checkOut) {

        checkOut.addEventListener(
            "change",
            () => {

                clearFieldError(checkOut);
            }
        );
    }


    bookingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let valid = true;


            /* Name */

            if (name) {

                if (
                    name.value.trim().length < 2
                ) {

                    setFieldError(
                        name,
                        "Please enter your name."
                    );

                    valid = false;

                } else {

                    clearFieldError(name);
                }
            }


            /* Email */

            if (email) {

                if (
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    setFieldError(
                        email,
                        "Please enter a valid email."
                    );

                    valid = false;

                } else {

                    clearFieldError(email);
                }
            }


            /* Phone */

            if (phone) {

                if (
                    !isValidPhone(
                        phone.value
                    )
                ) {

                    setFieldError(
                        phone,
                        "Please enter a valid phone number."
                    );

                    valid = false;

                } else {

                    clearFieldError(phone);
                }
            }


            /* Check-in */

            if (
                checkIn &&
                !checkIn.value
            ) {

                setFieldError(
                    checkIn,
                    "Please select your check-in date."
                );

                valid = false;
            }


            /* Check-out */

            if (
                checkOut &&
                !checkOut.value
            ) {

                setFieldError(
                    checkOut,
                    "Please select your check-out date."
                );

                valid = false;
            }


            /* Date comparison */

            if (
                checkIn &&
                checkOut &&
                checkIn.value &&
                checkOut.value
            ) {

                const start =
                    new Date(
                        checkIn.value
                    );

                const end =
                    new Date(
                        checkOut.value
                    );


                if (end <= start) {

                    setFieldError(
                        checkOut,
                        "Check-out must be after check-in."
                    );

                    valid = false;
                }
            }


            if (!valid) {

                showToast(
                    "Please check the form.",
                    "fa-exclamation-circle"
                );

                return;
            }


            /* Save booking locally */

            const bookingData = {

                name:
                    name?.value.trim() || "",

                email:
                    email?.value.trim() || "",

                phone:
                    phone?.value.trim() || "",

                checkIn:
                    checkIn?.value || "",

                checkOut:
                    checkOut?.value || "",

                createdAt:
                    new Date().toISOString()
            };


            localStorage.setItem(
                "chillStayBooking",
                JSON.stringify(
                    bookingData
                )
            );


            showToast(
                "Booking request received!",
                "fa-check-circle"
            );


            bookingForm.reset();


            if (checkIn) {

                const today =
                    new Date()
                        .toISOString()
                        .split("T")[0];

                checkIn.min = today;
            }
        }
    );
}


/* =========================================================
   14. PHONE NUMBER
   ========================================================= */

const phoneLinks =
    document.querySelectorAll(
        'a[href^="tel:"]'
    );


phoneLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            showToast(
                "Opening your phone app...",
                "fa-phone"
            );
        }
    );
});


/* =========================================================
   15. EMAIL LINKS
   ========================================================= */

const emailLinks =
    document.querySelectorAll(
        'a[href^="mailto:"]'
    );


emailLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            showToast(
                "Opening your email app...",
                "fa-envelope"
            );
        }
    );
});


/* =========================================================
   16. SMOOTH SCROLL
   ========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect()
                    .top +
                window.scrollY -
                headerHeight -
                15;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"
            });
        }
    );
});


/* =========================================================
   17. ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        '.nav a[href^="#"]'
    );


if (
    sections.length &&
    navigationLinks.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    const id =
                        entry.target.id;


                    navigationLinks.forEach(
                        link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );
                            }
                        }
                    );
                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(
            section
        );
    });
}


/* =========================================================
   18. BOOKING DATA RECOVERY
   ========================================================= */

function recoverBooking() {

    const saved =
        localStorage.getItem(
            "chillStayBooking"
        );


    if (!saved) return;


    try {

        const data =
            JSON.parse(saved);


        if (!bookingForm) return;


        const fields = {

            name:
                bookingForm.querySelector(
                    '[name="name"], [name="fullname"]'
                ),

            email:
                bookingForm.querySelector(
                    '[name="email"], [type="email"]'
                ),

            phone:
                bookingForm.querySelector(
                    '[name="phone"], [type="tel"]'
                ),

            checkIn:
                bookingForm.querySelector(
                    '[name="checkin"], #checkin'
                ),

            checkOut:
                bookingForm.querySelector(
                    '[name="checkout"], #checkout'
                )
        };


        if (fields.name && data.name)
            fields.name.value = data.name;


        if (fields.email && data.email)
            fields.email.value = data.email;


        if (fields.phone && data.phone)
            fields.phone.value = data.phone;


        if (
            fields.checkIn &&
            data.checkIn
        ) {

            fields.checkIn.value =
                data.checkIn;
        }


        if (
            fields.checkOut &&
            data.checkOut
        ) {

            fields.checkOut.value =
                data.checkOut;
        }

    } catch (error) {

        console.warn(
            "Could not recover booking data."
        );
    }
}

recoverBooking();


/* =========================================================
   19. IMAGE LAZY LOADING
   ========================================================= */

const images =
    document.querySelectorAll(
        "img"
    );


images.forEach(image => {

    image.loading = "lazy";

    image.decoding = "async";
});


/* =========================================================
   20. EXTERNAL LINKS
   ========================================================= */

const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );


externalLinks.forEach(link => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );
});


/* =========================================================
   21. ESCAPE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;
        }


        if (
            nav &&
            nav.classList.contains("open")
        ) {

            nav.classList.remove(
                "open"
            );


            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.innerHTML =
                    '<i class="fas fa-bars"></i>';
            }
        }
    }
);


/* =========================================================
   22. RESIZE HANDLER
   ========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(
            () => {

                /* Close mobile navigation
                   when returning to desktop */

                if (
                    window.innerWidth > 760 &&
                    nav
                ) {

                    nav.classList.remove(
                        "open"
                    );

                    if (menuButton) {

                        menuButton.innerHTML =
                            '<i class="fas fa-bars"></i>';

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                }


                /* Recalculate active FAQ height */

                faqItems.forEach(item => {

                    if (
                        !item.classList.contains(
                            "active"
                        )
                    ) {

                        return;
                    }


                    const answer =
                        item.querySelector(
                            ".faq-answer"
                        );


                    if (answer) {

                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";
                    }
                });

            },
            200
        );
    }
);


/* =========================================================
   23. PAGE LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );


        /* Small entrance effect */

        setTimeout(() => {

            document
                .querySelector(".hero-content")
                ?.classList.add("visible");

        }, 150);
    }
);


/* =========================================================
   24. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%c Chill & Stay ",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Luxury stays. Beautiful experiences."
);

console.log(
    "Website JavaScript loaded successfully."
);


/* =========================================================
   END
   ========================================================= */
```
