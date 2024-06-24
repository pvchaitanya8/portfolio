document.addEventListener("DOMContentLoaded", function (event) {
  const loading = document.getElementById("loading");
  const sections = document.querySelectorAll(".section-container");

  setTimeout(() => {
      loading.style.display = "none";
  });

  sections.forEach((section, index) => {
      section.style.opacity = 0;
      section.style.transform = "translateY(20px)";
      setTimeout(() => {
          section.style.opacity = 1;
          section.style.transform = "translateY(0)";
      }, 300 * (index + 1));
  });

  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach((scrollLink) => {
      scrollLink.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = scrollLink.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector("header").offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
              window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
              });
          }
      });
  });

  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      header.style.backgroundPositionY = -scrollPosition * 0.5 + "px";
  });

  const headerTitle = document.querySelector("header h1");
  headerTitle.classList.add("typing");

  headerTitle.addEventListener("animationend", function () {
      headerTitle.classList.remove("typing");
  });

  // Function to toggle the Side Panel
  function toggleSidePanel() {
      const sidePanel = document.getElementById("sidePanel");
      sidePanel.classList.toggle("open");
  }

  // Attach toggleSidePanel function to menu icon click event
  const menuIcon = document.querySelector(".menu-icon");
  menuIcon.addEventListener("click", toggleSidePanel);
});
