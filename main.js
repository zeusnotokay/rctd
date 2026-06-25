/* 
   Rotaract Club of Thane Downtown - Core Interaction Script
   Handles Slideshows, Count-Up Animations, FAQs, Lightboxes, and Form validations.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Interactions
  initHeroSlideshow();
  initStatsCounter();
  initFaqAccordion();
  initLightbox();
  initContactForm();
  initNetflixMode();
});

// 1. Premium Slideshow for index.html
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-nav');
  const nextBtn = document.querySelector('.slider-arrow-next');
  const prevBtn = document.querySelector('.slider-arrow-prev');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  // Create dots dynamically
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetInterval();
    });
    if (dotsContainer) dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');
  
  function goToSlide(n) {
    if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
    if (dots && dots[currentSlide]) dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots && dots[currentSlide]) dots[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }
  
  function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }
  
  startInterval();
}

// 2. Count-Up Stats Animation
function initStatsCounter() {
  const statsSection = document.querySelector('.stats-trigger');
  const numbers = document.querySelectorAll('.counter-number');
  
  if (!statsSection || numbers.length === 0) return;
  
  let animated = false;
  
  const animateCounts = () => {
    numbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'), 10);
      const suffix = num.getAttribute('data-suffix') || '';
      let count = 0;
      const duration = 2000; // 2 seconds
      const stepTime = Math.max(Math.floor(duration / target), 15);
      
      const timer = setInterval(() => {
        if (target <= 20) {
          count += 1;
        } else {
          count += Math.ceil(target / 100);
        }
        
        if (count >= target) {
          num.textContent = target + suffix;
          clearInterval(timer);
        } else {
          num.textContent = count + suffix;
        }
      }, stepTime);
    });
  };
  
  // Use IntersectionObserver to start counting when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounts();
        animated = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(statsSection);
}

// 3. FAQ Accordion for FAQ Page
function initFaqAccordion() {
  const headers = document.querySelectorAll('.faq-header');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains('active');
      
      // Close other accordions
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle current accordion
      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });
}

// 4. Lightbox Gallery for Contact Us page
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length === 0) return;
  
  // Create lightbox markup
  const lightboxHtml = `
    <div class="lightbox">
      <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
      <img class="lightbox-content" src="" alt="Expanded Gallery Image">
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHtml);
  
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  
  if (!lightboxImg || !closeBtn) return;
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        const imgSrc = img.getAttribute('src');
        lightboxImg.setAttribute('src', imgSrc);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock scrolling
      }
    });
  });
  
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scrolling
  };
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// 5. Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('rctdContactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameEl = document.getElementById('formName');
    const phoneEl = document.getElementById('formPhone');
    const emailEl = document.getElementById('formEmail');
    const messageEl = document.getElementById('formMessage');
    const messageDiv = document.querySelector('.form-message');
    
    if (!nameEl || !phoneEl || !emailEl || !messageEl || !messageDiv) {
      return;
    }
    
    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();
    
    if (!name || !phone || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Success simulation
    messageDiv.classList.add('success');
    messageDiv.textContent = 'Thank you for reaching out! We will get in touch with you shortly.';
    
    // Clear form
    contactForm.reset();
    
    // Fade success message out after 5 seconds
    setTimeout(() => {
      messageDiv.classList.remove('success');
      messageDiv.textContent = '';
    }, 6000);
  });
}

// 6. Netflix Movie Mode Actions
function initNetflixMode() {
  const sliders = document.querySelectorAll('.movie-cards-container');
  const leftArrows = document.querySelectorAll('.row-arrow-left');
  const rightArrows = document.querySelectorAll('.row-arrow-right');
  
  // Row Scroll Trigger
  leftArrows.forEach((arrow, i) => {
    arrow.addEventListener('click', () => {
      if (sliders[i]) {
        sliders[i].scrollLeft -= window.innerWidth * 0.75;
      }
    });
  });
  
  rightArrows.forEach((arrow, i) => {
    arrow.addEventListener('click', () => {
      if (sliders[i]) {
        sliders[i].scrollLeft += window.innerWidth * 0.75;
      }
    });
  });
  
  // Header scroll sticky background
  const netflixHeader = document.querySelector('.netflix-header-nav');
  if (netflixHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        netflixHeader.classList.add('scrolled');
      } else {
        netflixHeader.classList.remove('scrolled');
      }
    });
  }

  // Movie Database
  const movieDb = {
    'raasleela': {
      title: 'RaasLeela',
      year: '2025',
      match: '98%',
      duration: '1 Season',
      maturity: 'PG-13',
      genres: 'Musical, Culture, Celebration',
      desc: 'RaasLeela is a flagship cultural celebration designed to bring the Thane community together through the joy of Garba. It serves as one of our biggest public-facing initiatives, celebrating culture and tradition. The proceeds raised are donated to our Jaipur Foot Donation project, making RaasLeela a perfect blend of celebration and service.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/untitled-design.jpg'
    },
    'eloquence': {
      title: 'Eloquence',
      year: '2024',
      match: '96%',
      duration: '1h 45m',
      maturity: 'PG',
      genres: 'Competition, Soft-Skills, Inspiring',
      desc: 'An elocution, debate, and essay writing competition held across school classes in Thane aimed at building children\'s public speaking confidence and soft skills.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/screenshot-20230727-223512-instagram.jpg'
    },
    'circle-of-love': {
      title: 'Circle Of Love',
      year: '2025',
      match: '99%',
      duration: '45m',
      maturity: '16+',
      genres: 'Documentary, Heartfelt, Social Action',
      desc: 'Uplifting the transgender community in the Thane region with annual monsoon support, providing food rations, raincoats, sarees, and water purifiers.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/circle-of-love.jpg'
    },
    'sports-extravaganza': {
      title: 'Sports Extravaganza',
      year: '2024',
      match: '97%',
      duration: '2h 10m',
      maturity: 'PG',
      genres: 'Action, Sports, Teamwork',
      desc: 'Promoting fitness and teamwork in Thane by hosting simultaneous tournaments across 14+ sports over two weekends, open to all age groups.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/3fe634d3-3ecf-4e0c-a31d-5e9a07638559.jpg'
    },
    'jaipur-foot': {
      title: 'Jaipur Foot Donation',
      year: '2025',
      match: '99%',
      duration: '1h 30m',
      maturity: 'G',
      genres: 'Social Welfare, Emotional, Biography',
      desc: 'Providing prosthetic legs to amputees to help them walk again and regain independence after accidents or disabilities.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/img-7505.jpg'
    },
    'rakshapatra': {
      title: 'Rakshapatra',
      year: '2025',
      match: '95%',
      duration: '1 Season',
      maturity: 'G',
      genres: 'Patriotic, Emotion, Family',
      desc: 'Connecting school children and active soldiers on Rakshabandhan through letters of appreciation. Sending over 1,00,000 letters to army base camps annually.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/20220801-155811.jpg'
    },
    'secret-santa': {
      title: 'Secret Santa',
      year: '2024',
      match: '94%',
      duration: '1h 15m',
      maturity: 'G',
      genres: 'Holiday, Family, Joy',
      desc: 'Spreading festive warmth and joy by distributing gifts and sharing Christmas cheer with orphaned children.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/img-20230130-wa0091.jpg'
    },
    'rock-rotaract': {
      title: 'Rock Rotaract',
      year: '2023',
      match: '92%',
      duration: '1h 50m',
      maturity: '13+',
      genres: 'Musical, Concert, Fellowship',
      desc: 'A grand youth music festival promoting local bands while raising funds and awareness for social causes in the community.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/img-20230130-wa0111.jpg'
    },
    'fellowship-outings': {
      title: 'Fellowship Outings',
      year: '2025',
      match: '93%',
      duration: '1 Season',
      maturity: 'PG',
      genres: 'Adventure, Comedy, Travel',
      desc: 'Treks, outings, and bowling fellowship events designed to build deep friendships and coordinate strategies among club members.',
      backdrop: 'https://rc-thanedowntown.weebly.com/uploads/1/1/4/1/114181425/bowling.jpg'
    }
  };

  // Modal display elements
  const modal = document.querySelector('.netflix-modal');
  if (!modal) return;
  
  const modalClose = modal.querySelector('.netflix-modal-close');
  const modalTitle = modal.querySelector('.netflix-modal-title');
  const modalDesc = modal.querySelector('.netflix-modal-desc');
  const modalImg = modal.querySelector('.netflix-modal-video-bg');
  const modalMatch = modal.querySelector('.netflix-modal-match');
  const modalYear = modal.querySelector('.netflix-modal-year');
  const modalMaturity = modal.querySelector('.netflix-modal-maturity');
  const modalDuration = modal.querySelector('.netflix-modal-duration');
  const modalGenres = modal.querySelector('.netflix-modal-genres-text');
  
  const openModal = (movieId) => {
    const movie = movieDb[movieId];
    if (!movie) return;
    
    if (modalTitle) modalTitle.textContent = movie.title;
    if (modalDesc) modalDesc.textContent = movie.desc;
    if (modalImg) modalImg.setAttribute('src', movie.backdrop);
    if (modalMatch) modalMatch.textContent = movie.match + ' Match';
    if (modalYear) modalYear.textContent = movie.year;
    if (modalMaturity) modalMaturity.textContent = movie.maturity;
    if (modalDuration) modalDuration.textContent = movie.duration;
    if (modalGenres) modalGenres.textContent = movie.genres;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Attach movie cards listeners
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    card.addEventListener('click', () => {
      const movieId = card.getAttribute('data-id');
      if (movieId) openModal(movieId);
    });
  });

  // Attach billboard hero buttons
  const playBtn = document.querySelector('.netflix-btn-play');
  const infoBtn = document.querySelector('.netflix-btn-info');
  
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const movieId = playBtn.getAttribute('data-id');
      if (movieId) openModal(movieId);
    });
  }
  
  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      const movieId = infoBtn.getAttribute('data-id');
      if (movieId) openModal(movieId);
    });
  }
}
