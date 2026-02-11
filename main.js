document.addEventListener("DOMContentLoaded", () => {
  const loadedSections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const initUI = () => {
    // Handle Active Link on Scroll
    let activeSectionId = "";
    let scrollTicking = false;

    const handleActiveLink = () => {
      let current = "info"; // Default to info
      const scrollPos =
        (window.pageYOffset || document.documentElement.scrollTop) + 160;

      loadedSections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      if (current === activeSectionId) {
        return;
      }
      activeSectionId = current;

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const shouldBeActive = href === `#${current}`;
        link.classList.toggle("active", shouldBeActive);
      });
    };

    const onScroll = () => {
      if (scrollTicking) {
        return;
      }
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        handleActiveLink();
        scrollTicking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleActiveLink();

    // Smooth Scroll
    const smoothScroll = (links) => {
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href");
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            const targetTop =
              window.pageYOffset +
              targetSection.getBoundingClientRect().top -
              100;
            window.scrollTo({
              top: targetTop,
              behavior: "smooth",
            });
            // If mobile, close menu
            if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
              toggleMenu();
            }
          }
        });
      });
    };

    smoothScroll(navLinks);
    smoothScroll(mobileNavLinks);
  };

  // Mobile Menu Logic
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const menuClose = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("flex");
        document.body.classList.toggle("overflow-hidden");
    }
  };

  // Tab Switching Logic (Scoped to each card)
  const initTabs = () => {
    const tabCards = document.querySelectorAll(".tab-card");

    tabCards.forEach((card) => {
      const tabBtns = card.querySelectorAll(".tab-btn");
      const tabContents = card.querySelectorAll(".tab-content");

      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetTab = btn.getAttribute("data-tab");

          // Update Buttons within this card
          tabBtns.forEach((b) => {
            b.classList.remove("active", "text-blue-500", "bg-white/40");
            b.classList.add("text-slate-500");
          });
          btn.classList.add("active");
          btn.classList.remove("text-slate-500");

          // Update Content within this card
          tabContents.forEach((content) => {
            content.classList.add("hidden");
            content.classList.remove("block");
          });
          
          const activeContent = card.querySelector(`#tab-${targetTab}`);
          if (activeContent) {
            activeContent.classList.remove("hidden");
            activeContent.classList.add("block");
          }
        });
      });
    });
  };

  // Dynamic Footer Year
  const initFooterYear = () => {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  };

  menuToggle?.addEventListener("click", toggleMenu);
  menuClose?.addEventListener("click", toggleMenu);

  // Initialize UI immediately for static content
  initUI();
  initTabs();
  initFooterYear();
});
