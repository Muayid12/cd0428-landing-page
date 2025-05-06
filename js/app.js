/**
 * Define Global Variables
 */
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');
const scrollToTopBtn = document.createElement('button');
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 */

// Helper function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -300 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 300 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Helper function to throttle scroll events
function throttle(callback, limit) {
  let wait = false;
  return function() {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 */

// build the nav
function buildNav() {
  const fragment = document.createDocumentFragment();
  
  sections.forEach(section => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'menu__link';
    a.dataset.nav = section.id;
    a.textContent = section.dataset.nav;
    a.href = `#${section.id}`;
    li.appendChild(a);
    fragment.appendChild(li);
  });
  
  navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
  sections.forEach(section => {
    const navLink = document.querySelector(`.menu__link[data-nav="${section.id}"]`);
    
    if (isInViewport(section)) {
      section.classList.add('your-active-class');
      navLink.classList.add('active-link');
    } else {
      section.classList.remove('your-active-class');
      navLink.classList.remove('active-link');
    }
  });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(e) {
  e.preventDefault();
  if (e.target.dataset.nav) {
    const sectionId = e.target.dataset.nav;
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Hide navbar when not scrolling
function handleScroll() {
  const header = document.querySelector('.page__header');
  header.style.transform = 'translateY(0)';
  
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    header.style.transform = 'translateY(-100%)';
  }, 2000);
}

// Create scroll to top button
function createScrollToTopButton() {
  scrollToTopBtn.innerHTML = '↑ Top';
  scrollToTopBtn.id = 'scrollToTopBtn';
  document.body.appendChild(scrollToTopBtn);
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
}

/**
 * End Main Functions
 * Begin Events
 */

document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    createScrollToTopButton();
    
    // Add collapsible functionality
    document.querySelectorAll('.collapsible').forEach(button => {
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });
  
  // Scroll to section on link click
  navbarList.addEventListener('click', scrollToSection);
  
  // Set sections as active
  window.addEventListener('scroll', throttle(() => {
    setActiveSection();
    handleScroll();
  }, 100));
