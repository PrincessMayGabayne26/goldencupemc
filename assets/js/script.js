// Loading Screen Functionality
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // Hide loading screen and show main content after a short delay
  setTimeout(function () {
    if (loadingScreen) {
      loadingScreen.classList.add("hidden");
    }
    if (mainContent) {
      mainContent.classList.remove("main-content-hidden");
      mainContent.classList.add("main-content-visible");
    }
  }, 1000); // 1 second delay to show the loading animation
});

// Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".carousel-image");
  const dots = document.querySelectorAll(".dot");
  const prevArrow = document.querySelector(".carousel-arrow-left");
  const nextArrow = document.querySelector(".carousel-arrow-right");
  let currentIndex = 0;

  function showImage(index) {
    // Remove active class from all images and dots
    images.forEach((img) => img.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current image and dot
    images[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // Arrow navigation
  if (nextArrow) {
    nextArrow.addEventListener("click", nextImage);
  }
  if (prevArrow) {
    prevArrow.addEventListener("click", prevImage);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showImage(index);
    });
  });

  // Optional: Auto-play (uncomment if desired)
  // setInterval(nextImage, 5000);
});

// Navbar smooth scroll and active link highlighting
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section[id], footer[id]");
  let isNavigating = false; // Flag to prevent scroll-based updates during navigation

  // Smooth scroll with offset for sticky navbar
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Handle home link (scroll to top)
      if (href === "#" || href === "") {
        e.preventDefault();
        isNavigating = true;

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        // Update active link immediately
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        this.classList.add("active");

        // Re-enable scroll-based updates after scroll completes
        setTimeout(() => {
          isNavigating = false;
        }, 1000);
        return;
      }

      // Handle anchor links
      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          isNavigating = true;
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          // Update active link immediately to prevent other tabs from highlighting
          navLinks.forEach((navLink) => navLink.classList.remove("active"));
          this.classList.add("active");

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Re-enable scroll-based updates after scroll completes
          setTimeout(() => {
            isNavigating = false;
          }, 1000);
        }
      }
    });
  });

  // Update active link on scroll
  function updateActiveLink() {
    // Skip updates during programmatic navigation
    if (isNavigating) {
      // Still update navbar shadow
      if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
      } else {
        navbar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
      }
      return;
    }

    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Handle home link (when at top of page)
    if (window.scrollY < 100) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (
          link.getAttribute("href") === "#" ||
          link.getAttribute("href") === ""
        ) {
          link.classList.add("active");
        }
      });
    }

    // Add shadow to navbar when scrolled
    if (window.scrollY > 10) {
      navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    }
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Initial call
});

// Submit form without page refresh and display success/error message
document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault(); 

  const loadingScreen = document.getElementById('loading-screen');
  const formMessage   = document.getElementById('formMessage');

  loadingScreen.style.display = 'flex';
  formMessage.innerHTML       = '';

  const formData = new FormData(this);

  fetch('include/submit.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loadingScreen.style.display = 'none';

    if (data.status === 'success') {
      formMessage.innerHTML =
        '<div class="alert alert-success">Message sent successfully!</div>';
      document.getElementById('quoteForm').reset();
    } else {
      formMessage.innerHTML =
        '<div class="alert alert-danger">Failed to send message.</div>';
    }
  })
  .catch(error => {
    loadingScreen.style.display = 'none';
    formMessage.innerHTML =
      '<div class="alert alert-danger">Server error. Please try again.</div>';
  });
});