document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // SCROLL PROGRESS BAR
  // ==========================================================================
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // ==========================================================================
  // CURSOR GLOW EFFECT
  // ==========================================================================
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      const speed = 0.1;
      glowX += (mouseX - glowX) * speed;
      glowY += (mouseY - glowY) * speed;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  }

  // ==========================================================================
  // TYPEWRITER EFFECT (Hero Title)
  // ==========================================================================
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const phrases = [
      'Web (DAW)',
      'Multiplataforma (DAM)',
      'Laravel & Angular',
      'Móvil con Ionic',
      'Soluciones con IA',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 55 : 90;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 1800; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }
      setTimeout(typeLoop, delay);
    };
    setTimeout(typeLoop, 600);
  }

  // ==========================================================================
  // MOBILE MENU TOGGLE
  // ==========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // ==========================================================================
  // HEADER SCROLL EFFECT
  // ==========================================================================
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ==========================================================================
  // SKILLS ANIMATION (ON INTERSECT)
  // ==========================================================================
  const skillsSection = document.querySelector('#skills');
  const progressBars = document.querySelectorAll('.skill-bar-fill');

  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  };

  const skillsObserver = new IntersectionObserver(animateSkills, { threshold: 0.15 });
  if (skillsSection) skillsObserver.observe(skillsSection);

  // ==========================================================================
  // PROJECT FILTERING
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // ACTIVE LINK HIGHLIGHTING ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');

  const scrollActive = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActive);

  // ==========================================================================
  // PROJECT DETAIL MODALS
  // ==========================================================================
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtns = document.querySelectorAll('.close-modal-btn');
  const modals = document.querySelectorAll('.modal');

  const openModal = (id) => {
    const modal = document.getElementById('modal-' + id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeAllModals = () => {
    modals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const project = btn.getAttribute('data-project');
      openModal(project);
    });
  });

  closeBtns.forEach(btn => btn.addEventListener('click', closeAllModals));

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // ==========================================================================
  // CONTACT FORM — envío real vía mailto (abre cliente de correo)
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalHTML = submitBtn.innerHTML;

      // Compose and open native mail client
      const body = encodeURIComponent(
        `Hola Omar,\n\nMe llamo ${name} (${email}) y me pongo en contacto contigo desde tu portafolio web.\n\n${message}\n\nSaludos,\n${name}`
      );
      const mailtoLink = `mailto:omarlobocuesta@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

      // Visual feedback
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abriendo correo...';

      setTimeout(() => {
        window.location.href = mailtoLink;

        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Cliente de correo abierto!';
        submitBtn.style.background = 'var(--grad-secondary)';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = '';
        }, 4000);
      }, 600);
    });
  }

  // ==========================================================================
  // FADE-IN ANIMATION (sections on scroll)
  // ==========================================================================
  const fadeEls = document.querySelectorAll('.glass-card, .timeline-item');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    fadeObserver.observe(el);
  });

});
