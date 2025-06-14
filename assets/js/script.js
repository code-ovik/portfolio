let email = "ovikbiswas01@gmail.com";
let phone = "01276337325974";
let address = "37/22 Chackbazar, Faridpur, Bangladesh";
let company = "CodeOVIK";
let skill = ["Web Developer", "Freelancer", "Youtuber", "Designer"];
let formEmail = "ovikbiswas01@gmail.com";
let googleMapEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d418.33658606179426!2d89.831961775283!3d23.59963987930877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe3b2c12fc96e5%3A0x539b9acdc8d58c20!2sKamakhabinaloy!5e1!3m2!1sen!2sbd!4v1746706538790!5m2!1sen!2sbd"


//Navbar fetch and logic
fetch('./assets/component/nav.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('nav').innerHTML = data;
    // get dark and light color from css variable
    const mybg = getComputedStyle(document.documentElement).getPropertyValue('--mybg').trim();
    const mytext = getComputedStyle(document.documentElement).getPropertyValue('--mytext').trim();

    // get element colors for light and dark
    const elementColorLight = getComputedStyle(document.documentElement).getPropertyValue('--myElementColorInLight').trim();
    const elementColorDark = getComputedStyle(document.documentElement).getPropertyValue('--myElementColorInDark').trim();

    let isLight = false;
    let ElementBackground = "";

    // DOM elements
    const sunIcon = document.getElementsByClassName("fa-sun")[0];
    const moonIcon = document.getElementsByClassName("fa-moon")[0];

    // Load saved theme
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.style.setProperty('--mybg', mytext);
      document.documentElement.style.setProperty('--mytext', mybg);
      isLight = true;
      ElementBackground = elementColorLight;
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline-block";
    } else {
      document.documentElement.style.setProperty('--mybg', mybg);
      document.documentElement.style.setProperty('--mytext', mytext);
      isLight = false;
      ElementBackground = elementColorDark;
      sunIcon.style.display = "inline-block";
      moonIcon.style.display = "none";
    }
    document.documentElement.style.setProperty('--secondary', ElementBackground);

    // Toggle Theme
    document.getElementById("darkBtn").addEventListener("click", () => {
      if (isLight) {
        document.documentElement.style.setProperty('--mybg', mybg);
        document.documentElement.style.setProperty('--mytext', mytext);
        localStorage.setItem("theme", "dark");
        sunIcon.style.display = "inline-block";
        moonIcon.style.display = "none";
        ElementBackground = elementColorDark;
      } else {
        document.documentElement.style.setProperty('--mybg', mytext);
        document.documentElement.style.setProperty('--mytext', mybg);
        localStorage.setItem("theme", "light");
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline-block";
        ElementBackground = elementColorLight;
      }
      document.documentElement.style.setProperty('--secondary', ElementBackground);
      isLight = !isLight;
    });

    // Toggle Menu
    let navBtn = document.getElementById("navBtn");
    navBtn.addEventListener("click", (e) => {
      navBtn.classList.toggle("active");
      document.getElementById("mobileNavList").classList.toggle("active");
    });

    // getting current page
    const currentPage = location.pathname.split("/").pop().replace('./', '');
    //  set current page link behavior for desktop
    const pcLinks = document.querySelectorAll("nav ul li a");
    pcLinks.forEach(link => {
      const linkPage = link.getAttribute("href").replace('./', '');
      if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
        link.classList.add("activenavforpc");
      }
    });

    // set current page link behavior for mobile
    const mobileLinks = document.querySelectorAll("#mobileNavList a");
    mobileLinks.forEach(link => {
      const linkPage = link.getAttribute("href").replace('./', '');
      if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
        link.classList.add("activenavformobile");
      }
    });
  });


//Form section fetch and logic
fetch('./assets/component/form.html')
.then(res => res.text())
.then(data => {
  document.getElementById('form').innerHTML = data;
  if (form) {
    form.innerHTML = data;
    document.querySelector("form").action = "https://formsubmit.co/" + formEmail;
    let saveBtn = document.getElementById('saveDraft');
    if (saveBtn) {
      saveBtn.onclick = function (e) {
        e.preventDefault();
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value
        };
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
        // Show success alert using SweetAlert2
        function showAlert() {
          Swal.fire({
            title: "Draft Saved",
            text: "Your draft has been saved successfully in local storage.",
            icon: "success"
          });
        }
        showAlert();
      };
      const savedDraft = localStorage.getItem('contactFormDraft');
      if (savedDraft) {
        const formData = JSON.parse(savedDraft);
        document.getElementById('name').value = formData.name || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('subject').value = formData.subject || '';
        document.getElementById('message').value = formData.message || '';
      }
    }
    document.querySelector(".googlemapembed").src = googleMapEmbed;
    scrollAnimation.reveal(".child", {
      interval: 300
    })
    scrollAnimation.reveal(".forminput, .form-button", {
      interval: 300
    })
  }
});


//Footer fetch and logic
fetch('./assets/component/footer.html')
.then(res => res.text())
.then(data => {
  document.getElementById('footer').innerHTML = data;
  if (footer) {
    footer.innerHTML = data;
    let year = new Date().getFullYear();
document.getElementById("copyright").innerText = `© ${year} ${company}. All rights reserved.`


// footer section hero section social inject
fetch('./assets/data/social.json')
.then(res => res.json())
.then(data => {
  const container = document.querySelector(".social-icon-footer-section")
  data.forEach(e => {
    const card = document.createElement("div");
    card.className = "iconContainer";
    card.innerHTML = `
      <a href="${e.link}" target="_blank"><i class="fa-brands fa-${e.plartform}"></i></a>
    `;
    container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to load portfolio data:", error);
  });
  document.querySelector(".email").innerHTML = email;
  document.querySelector(".email").href = "mailto:" + email
  document.querySelector(".phone").innerHTML = phone;
  document.querySelector(".phone").href = "tel:" + phone;
  document.querySelector(".address").innerHTML = address;
  }
  scrollAnimation.reveal(".footer-element", {
    interval: 300
  })
});


//typewriter effect on homepage hero section
let typeSkill = document.querySelector("#typeSkill");
  if(typeSkill) {
    var typed = new Typed("#typeSkill", {
    strings: skill,
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
  });
}


// Go top button
const goTop = document.getElementById("goTop");
const circle = goTop.querySelector("circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

const showAfter = 300; // px scroll এর পর দেখা যাবে

function updateProgress() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollY / docHeight;
  const offset = circumference - scrollPercent * circumference;
  circle.style.strokeDashoffset = offset;

  if (scrollY > showAfter) {
    goTop.classList.add("show");
  } else {
    goTop.classList.remove("show");
  }
}
// Smooth scroll on Go top
goTop.addEventListener("click", function(e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute("href"));
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // milliseconds
  let startTime = null;
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  function ease(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  }
  requestAnimationFrame(animation);
});
window.addEventListener("scroll", updateProgress);
updateProgress();





// smooth scroll by Lenis cdn
const lenis = new Lenis({
  duration: 1.5, // scroll speed
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
  smooth: true,
  direction: 'vertical', // optional
  gestureDirection: 'vertical', // optional
  smoothTouch: true, // mobile smooth scroll
  touchMultiplier: 1.5, // mobile scroll speed
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// video pop up in homepage's hero section
const overlay = document.getElementById('videoOverlay');
const frame = document.getElementById('youtubeFrame');
function openPopup() {
  overlay.classList.add('active');
  frame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}
function closePopup() {
  overlay.classList.remove('active');
  frame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}


// Cursor style by kursor.js
const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
new kursor({
  type: 4,
  color: primary
})


// clients swiper review slider by swiper.js
const swiperEl = document.querySelector(".clientsSwiper");
if(swiperEl) {
  const swiper = new Swiper(".clientsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
  swiperEl.addEventListener("mouseenter", () => swiper.autoplay.stop());
  swiperEl.addEventListener("mouseleave", () => swiper.autoplay.start());
}


// Portfolio Homepage
let isHome = document.querySelector(".home_portfolio");
if(isHome) {
  fetch('./assets/data/portfolio.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector(".home_portfolio");

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'portfolio-modal';
    modal.className = 'fixed inset-0 bg-black/80 z-1000 hidden flex items-center justify-center p-4';
    
    modal.innerHTML = `
      <div class="bg-mybg rounded-3xl w-9/10 max-h-[90vh] z-100 overflow-y-auto border border-gray-200 transform transition-all scale-95 opacity-0" id="modal-container">
        <div class="relative">
          <img id="modal-image" src="" alt="" class="w-full h-600 object-cover">
          <button id="close-modal" class="absolute top-[4px] right-[4px] bg-white/90 text-gray-800 rounded-full p-[4px]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-30 w-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-[16px]">
          <div class="flex justify-between items-start mb-[16px]">
            <div>
              <h2 id="modal-title" class="lg:text-4xl text-2xl text-mytext font-bold"></h2>
              <div class="flex gap-[8px] mt-[8px]">
                <span id="modal-duration" class="bg-blue-100 text-blue-800 font-medium text-xl px-[6px] py-[1px] rounded"></span>
                <span id="modal-cost" class="bg-green-100 text-green-800 font-medium text-xl px-[6px] py-[1px] rounded"></span>
              </div>
            </div>
          </div>
          
          <div class="mb-[16px]">
            <h3 class="lg:text-xl text-xl font-semibold mb-[8px] text-mytext">Description</h3>
            <p id="modal-description" class="text-mytext lg:text-xl text-sm"></p>
          </div>
          
          <div>
            <h3 class="lg:text-3xl text-xl font-semibold text-mytext mb-[8px]">Tags</h3>
            <div id="modal-tags" class="flex flex-wrap gap-[4px] text-lg"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Store scroll position
    let scrollPosition = 0;

    // Animation functions
    const showModal = () => {
      // Store current scroll position
      scrollPosition = window.pageYOffset;
      
      // Prevent body scrolling while keeping scrollbar
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // Keep scrollbar visible
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const modalContent = modal.querySelector('#modal-container');
      modal.classList.remove('hidden');
      setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
      }, 10);
    };

    const hideModal = () => {
      const modalContent = modal.querySelector('#modal-container');
      modalContent.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        
        // Restore body scrolling
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollPosition);
      }, 200);
    };

    // Add wheel event handling for modal scrolling
    const modalContainer = modal.querySelector('#modal-container');
    modalContainer.addEventListener('wheel', function(e) {
      const canScrollUp = this.scrollTop > 0;
      const canScrollDown = this.scrollTop < this.scrollHeight - this.clientHeight;
      
      if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
        e.stopPropagation();
        e.preventDefault();
        this.scrollTop += e.deltaY;
      }
    }, { passive: false });

    // Close modal events
    document.getElementById('close-modal').addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });

    // Create portfolio cards
    data.slice(0, 4).forEach(project => {
      const card = document.createElement("div");
      card.className = "card";
      
      card.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.title}" class="w-full aspect-4/3 lg:border-4 border-2 border-mytext/20 rounded-xl lg:rounded-3xl transition-all">
        <a class="flex justify-between">
          <div class="cursor-pointer">
            <p class="text-xl md:text-4xl lg:text-3xl font-myFont text-mytext after:content-[''] relative after:bg-primary after:h-4 after:w-0 after:transition-all after:absolute after:bottom-0 after:left-0">${project.title}</p>
            <p class="text-sm md:text-2xl text-mytext opacity-70 transition-all">${project.projectDuration + " | " + project.cost}</p>
          </div>
          <div class="bg-transparent border-2 lg:border-4 border-primary relative text-uiMatchColor rounded-full text-sm lg:text-2xl md:text-3xl aspect-square lg:h-68 md:h-72 h-48 scale-80 hover:scale-70 transition-all hover:bg-primary cursor-pointer"><i class="fa-solid fa-arrow-right-long absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-0 transition-all text-mytext"></i></div>
        </a>
      `;

      card.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Populate modal
        document.getElementById("modal-title").textContent = project.title;
        document.getElementById("modal-image").src = project.thumbnail;
        document.getElementById("modal-duration").textContent = project.projectDuration;
        document.getElementById("modal-cost").textContent = project.cost;
        document.getElementById("modal-description").textContent = project.description;
        
        const tagsContainer = document.getElementById("modal-tags");
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
          const tagElement = document.createElement("span");
          tagElement.className = "bg-gray-100 text-gray-800 md:text-xl text-sm px-[8px] py-[2px] rounded";
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
        
        showModal();
      });

      container.appendChild(card);
    });
    
    scrollAnimation.reveal(".card", {
      interval: 300
    });
  })
  .catch(error => console.error("Failed to load portfolio data:", error));
}





// Portfolio page
let isPortfolioPage = document.querySelector("#portfolio-cards");
if(isPortfolioPage) {
  fetch('./assets/data/portfolio.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector("#portfolio-cards");

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'portfolio-modal';
    modal.className = 'fixed inset-0 bg-black/80 z-100 hidden flex items-center justify-center p-4';
    
    modal.innerHTML = `
      <div class="bg-mybg rounded-3xl w-9/10 max-h-[90vh] z-100 overflow-y-auto border border-gray-200 transform transition-all scale-95 opacity-0" id="modal-container">
        <div class="relative">
          <img id="modal-image" src="" alt="" class="w-full h-600 object-cover">
          <button id="close-modal" class="absolute top-[4px] right-[4px] bg-white/90 text-gray-800 rounded-full p-[4px]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-30 w-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-[16px]">
          <div class="flex justify-between items-start mb-[16px]">
            <div>
              <h2 id="modal-title" class="lg:text-4xl text-2xl text-mytext font-bold"></h2>
              <div class="flex gap-[8px] mt-[8px]">
                <span id="modal-duration" class="bg-blue-100 text-blue-800 font-medium text-xl px-[6px] py-[1px] rounded"></span>
                <span id="modal-cost" class="bg-green-100 text-green-800 font-medium text-xl px-[6px] py-[1px] rounded"></span>
              </div>
            </div>
          </div>
          
          <div class="mb-[16px]">
            <h3 class="lg:text-xl text-xl font-semibold mb-[8px] text-mytext">Description</h3>
            <p id="modal-description" class="text-mytext lg:text-xl text-sm"></p>
          </div>
          
          <div>
            <h3 class="lg:text-3xl text-xl font-semibold text-mytext mb-[8px]">Tags</h3>
            <div id="modal-tags" class="flex flex-wrap gap-[4px] text-lg"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Store scroll position
    let scrollPosition = 0;

    // Animation functions
    const showModal = () => {
      // Store current scroll position
      scrollPosition = window.pageYOffset;
      
      // Prevent body scrolling while keeping scrollbar
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // Keep scrollbar visible
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const modalContent = modal.querySelector('#modal-container');
      modal.classList.remove('hidden');
      setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
      }, 10);
    };

    const hideModal = () => {
      const modalContent = modal.querySelector('#modal-container');
      modalContent.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        
        // Restore body scrolling
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollPosition);
      }, 200);
    };

    // Add wheel event handling for modal scrolling
    const modalContainer = modal.querySelector('#modal-container');
    modalContainer.addEventListener('wheel', function(e) {
      const canScrollUp = this.scrollTop > 0;
      const canScrollDown = this.scrollTop < this.scrollHeight - this.clientHeight;
      
      if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
        e.stopPropagation();
        e.preventDefault();
        this.scrollTop += e.deltaY;
      }
    }, { passive: false });

    // Close modal events
    document.getElementById('close-modal').addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });

    // Create portfolio cards
    data.forEach(project => {
      const card = document.createElement("div");
      card.className = "card";
      
      card.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.title}" class="w-full aspect-4/3 lg:border-4 border-2 border-mytext/20 rounded-xl lg:rounded-3xl transition-all">
        <a class="flex justify-between">
          <div class="cursor-pointer">
            <p class="text-xl md:text-4xl lg:text-3xl font-myFont text-mytext after:content-[''] relative after:bg-primary after:h-4 after:w-0 after:transition-all after:absolute after:bottom-0 after:left-0">${project.title}</p>
            <p class="text-sm md:text-2xl text-mytext opacity-70 transition-all">${project.projectDuration + " | " + project.cost}</p>
          </div>
          <div class="bg-transparent border-2 lg:border-4 border-primary relative text-uiMatchColor rounded-full text-sm lg:text-2xl md:text-3xl aspect-square lg:h-68 md:h-72 h-48 scale-80 hover:scale-70 transition-all hover:bg-primary cursor-pointer"><i class="fa-solid fa-arrow-right-long absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-0 transition-all text-mytext"></i></div>
        </a>
      `;

      card.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Populate modal
        document.getElementById("modal-title").textContent = project.title;
        document.getElementById("modal-image").src = project.thumbnail;
        document.getElementById("modal-duration").textContent = project.projectDuration;
        document.getElementById("modal-cost").textContent = project.cost;
        document.getElementById("modal-description").textContent = project.description;
        
        const tagsContainer = document.getElementById("modal-tags");
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
          const tagElement = document.createElement("span");
          tagElement.className = "bg-gray-100 text-gray-800 md:text-xl text-sm px-[8px] py-[2px] rounded";
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
        
        showModal();
      });

      container.appendChild(card);
      scrollAnimation.reveal(".card", {
        interval: 300
      })
    });
  })
  .catch(error => console.error("Failed to load portfolio data:", error));
}


// FAQ in homapage
fetch('./assets/data/faq.json')
.then(res => res.json())
.then(data => {
  const container = document.querySelector(".faq")
  data.forEach(e => {
    const card = document.createElement("div");
    card.className = "faq-item";
    card.innerHTML = `
      <div class="faq-question">
        <h3>${e.question}</h3>
        <span class="toggle-btn">+</span>
      </div>
      <div class="faq-answer">
        <p>${e.answer}</p>
    `;
    container.appendChild(card);
  });
  scrollAnimation.reveal(".faq-item")
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const toggleBtn = item.querySelector('.toggle-btn');
      question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.toggle-btn').textContent = '+';
          }
        });
        item.classList.toggle('active');
      });
    });
  }
})


// home page hero section social inject
fetch('./assets/data/social.json')
.then(res => res.json())
.then(data => {
  const container = document.querySelector(".social-icon-hero-section")

  data.forEach(e => {
    const card = document.createElement("div");
    card.className = "iconContainer";
    card.innerHTML = `
      <a href="${e.link}" target="_blank"><i class="fa-brands fa-${e.plartform}"></i></a>
    `;
    container.appendChild(card);
  });
})


// my skill
fetch('./assets/data/skill.json')
.then(res => res.json())
.then(data => {
  const container = document.querySelector(".skill-container")
  data.forEach(e => {
    const card = document.createElement("div");
    card.className = "skill";
    card.innerHTML = `
      <div class="skill-name flex justify-between font-bold text-sm lg:text-xl">
          <span class="skill-title">${e.name}</span>
          <span class="skill-percent text-xs lg:text-xl font-bold">0%</span>
        </div>
        <div class="lg:h-10 h-6 lg:outline-4 outline-2 outline-secondary bg-light1 dark:bg-secondary rounded-full overflow-hidden">
          <div class="skill-progress h-full w-0 bg-primary rounded-full transition duration-1000 ease-out" data-width="${e.level}"></div>
        </div>
    `;
    container.appendChild(card);
    scrollAnimation.reveal(".skill-title", {
      interval: 100,
      origin: "right"
    })
  });
  // Initialize progress bars after content is loaded
  const progressBars = document.querySelectorAll('.skill-progress');
  if (progressBars.length === 0) {
    console.error("No progress bars found!");
    return;
  }
  // Reset all progress bars to 0 width without transition
  progressBars.forEach(bar => {
    bar.style.width = '0';
    bar.style.transition = 'none';
  });
  // Force reflow to ensure reset takes effect
  void progressBars[0].offsetHeight;
  // Add transition back
  progressBars.forEach(bar => {
    bar.style.transition = 'width 3s ease-out';
  });
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width') + '%';
          bar.style.width = targetWidth;
          // Animate percentage text
          const percentElement = bar.closest('.skill').querySelector('.skill-percent');
          let current = 0;
          const target = parseInt(bar.getAttribute('data-width'));
          const duration = 1500;
          const step = target / (duration / 16);
          const animatePercent = () => {
            current += step;
            if (current < target) {
              percentElement.textContent = Math.round(current) + '%';
              requestAnimationFrame(animatePercent);
            } else {
              percentElement.textContent = target + '%';
            }
          };
          animatePercent();
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  // Start observing
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    observer.observe(skillsSection);
  } else {
    console.error("Skills section not found!");
  }
})
.catch(error => {
  console.error("Failed to load portfolio data:", error);
});


// statictics
fetch('./assets/data/statistics.json')
.then(res => res.json())
.then(data => {
  const container = document.querySelector(".statistics")
  data.forEach(e => {
    const card = document.createElement("div");
    card.className = "p-20 lg:p-60 rounded-xl lg:rounded-3xl bg-secondary box";
    card.innerHTML = `
      <div class="flex flex-col">
        <p class="text-primary text-5xl lg:text-8xl font-extrabold font-myFont counter text-center" data-target="${e.value}">0</p>
        <p class="font-myFont text-xl lg:text-4xl py-5 text-center statistics-label">${e.title}</p>
      </div>
    `;
    container.appendChild(card);
    scrollAnimation.reveal(".statistics-label", {
      interval: 100
    })
  });
  const counterSection = document.getElementById("counterSection");
  const counters = document.querySelectorAll(".counter");
  const duration = 5000; // Total animation duration in milliseconds
  let started = false;
  function startCounters() {
    if (started) return;
    started = true;
    counters.forEach(counter => {
      const start = 0;
      const target = +counter.getAttribute("data-target");
      const startTime = Date.now();
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        counter.innerText = current;
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + "+";
        }
      };
      updateCount();
    });
  }
  // Intersection Observer setup
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounters();
      observer.unobserve(counterSection);
    }
  }, { threshold: 0.5 });
  observer.observe(counterSection);
})
.catch(error => {
  console.error("Failed to load portfolio data:", error);
});



// plan
fetch('./assets/data/plan.json')
.then(response => response.json())
.then(data => renderPlans(data))
.catch(error => console.error('Error fetching plans:', error));
function renderPlans(data) {
const container = document.querySelector('.plan-container');
data.forEach(plan => {
  const planHTML = `
    <div class="plan px-20 lg:px-40 py-40 lg:py-80 lg:rounded-3xl rounded-xl bg-secondary text-mytext flex flex-col justify-between">
      <div class="flex flex-col">
        <p class="type inline-block text-2xl lg:text-3xl mb-5 font-myFont">${plan.type}</p>
        <p class="price inline-block text-3xl lg:text-5xl font-myFont font-bold">${plan.price}</p>
        <hr class="lg:mt-10 mt-5 mb-15 lg:mb-30 text-mytext/20">
        <ul class="flex flex-col gap-5 lg:gap-10 lg:mb-30">
          ${plan.features.map(feature => `
            <li class="lg:text-2xl text-sm">
              <i class="fa-solid ${feature.included ? 'fa-circle-check' : 'fa-circle-minus'}"></i>
              <p class="inline-block opacity-80 hover:opacity-100 text-lg">${feature.text}</p>
            </li>
          `).join('')}
        </ul>
      </div>
      <div>
        <a href="./contact.html" class="btn"><span>Let's Hire<i class="fa-solid fa-arrow-right-long"></i></span></a>
      </div>
    </div>
  `;
  container.innerHTML += planHTML;
});
scrollAnimation.reveal(".plan", {
  interval: 300
})
}


// about me page
if(document.querySelector('.title-in-about')) {
fetch('./assets/data/about.json')
.then(response => response.json())
.then(data => {
  // Access the data directly
  document.querySelector('.name-in-about').textContent = data.name;
  document.querySelector('.title-in-about').textContent = data.title;
  document.querySelector('.img-in-about').src = data.image;
  // Loop through the personalInfo array and display it
  const infoContainer = document.querySelector('.aboutme');
  data.personalInfo.forEach(info => {
    const div = document.createElement('div');
    div.className = "flex justify-center items-center flex-col data"
    div.innerHTML = `<p class="md:text-xl text-mytext/80 text-sm font-normal rounded-3xl">${info.label}</p><p class="font-semibold md:text-2xl text-center">${info.value}</p>`;
    infoContainer.appendChild(div);
  });
  scrollAnimation.reveal(".data", {
    interval: 300
  })
})
.catch(error => console.error('Error fetching the data:', error));
}


// education
fetch('./assets/data/education.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to load data');
  }
  return response.json();
})
.then(data => {
  const container = document.getElementById('education-container');
  // Loop through the data and create HTML for each item
  data.forEach((edu, index) => {
    const card = document.createElement('div');
    card.classList.add('flex', 'flex-col', 'md:flex-row', 'justify-between', 'gap-12', 'mt-10', 'educationCard');
    // Odd items on left (index is 0, 2, 4...)
    if (index % 2 === 0) {
      card.innerHTML = `
        <div class="w-full md:w-[45%] overflow-hidden p-20 lg:p-40 grid gap-5 rounded-xl lg:rounded-3xl bg-secondary box">
          <h3 class="text-xl lg:text-4xl font-bold">${edu.degree}</h3>
          <p class="font-semibold lg:text-2xl text-sm mt-1">${edu.institution}</p>
          <span class="px-10 font-bold inline-block bg-primary lg:text-xl text-xs text-uiMatchColor py-3 w-max rounded-full mt-2">${edu.duration}</span>
          <p class="mt-3 lg:text-2xl text-sm">GPA: ${edu.gpa}</p>
        </div>
        <div class="hidden md:block w-[45%]"></div>
      `;
    }
    // Even items on right (index is 1, 3, 5...)
    else {
      card.innerHTML = `
        <div class="hidden md:block w-[45%]"></div>
        <div class="w-full md:w-[45%] overflow-hidden p-20 lg:p-40 grid gap-5 rounded-xl lg:rounded-3xl bg-secondary box">
          <h3 class="text-xl lg:text-4xl font-bold">${edu.degree}</h3>
          <p class="font-semibold lg:text-2xl text-sm mt-1">${edu.institution}</p>
          <span class="px-10 font-bold inline-block bg-primary lg:text-xl text-xs text-uiMatchColor py-3 w-max rounded-full mt-2">${edu.duration}</span>
          <p class="mt-3 lg:text-2xl text-sm">GPA: ${edu.gpa}</p>
        </div>
      `;
    }
    // Append the card to the container
    container.appendChild(card);
  });
  scrollAnimation.reveal(".educationCard")
  scrollAnimation.reveal(".educationCard h3, .educationCard p, .educationCard span", {
    interval: 300
  })
})
.catch(error => {
  console.error('Error fetching the data:', error);
});


// Scroll reveal animation
let scrollAnimation = ScrollReveal({
  distance: '100px',
  duration: 1500,
  delay: true,
  // reset: true,
  opacity: 0,
  easing: 'ease',
  origin: 'bottom'
})

scrollAnimation.reveal(".heroText", {
  interval: 300
})
scrollAnimation.reveal(".heroBg", {
  distance: '0'
})
scrollAnimation.reveal(".about", {
  interval: 300
})
scrollAnimation.reveal(".title", {
  origin: 'left'
})
