const mobileToggle = document.getElementById('mobileToggle');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerClose = document.getElementById('drawerClose');
const pageOverlay = document.getElementById('pageOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const drawerLinks = document.querySelectorAll('.drawer-link');
const revealElements = document.querySelectorAll('.reveal');
const statValues = document.querySelectorAll('.stat-value');
const skillFills = document.querySelectorAll('.skill-fill');
const tabButtons = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card');
const switchButtons = document.querySelectorAll('.switch-btn');
const projectGrid = document.querySelector('.project-grid');
const techGrid = document.querySelector('.tech-grid');
const projectsSection = document.querySelector('.projects-section');
const internshipToggle = document.getElementById('internshipToggle');
const badgeModal = document.getElementById('badgeModal');
const badgeModalOverlay = document.getElementById('badgeModalOverlay');
const badgeModalClose = document.getElementById('badgeModalClose');
const badgeModalDismiss = document.getElementById('badgeModalDismiss');
const badgeRotator = document.querySelector('.badge-rotator span');
const badgePhrases = ['Problem Solver', 'AI/ML Enthusiast', 'Front-end Developer', 'Team Collaborator'];
let badgeIndex = 0;
let badgeChar = 0;
let badgeDeleting = false;

const openDrawer = () => {
  mobileDrawer.classList.add('active');
  pageOverlay.classList.add('active');
  mobileDrawer.setAttribute('aria-hidden', 'false');
};

const closeDrawer = () => {
  mobileDrawer.classList.remove('active');
  pageOverlay.classList.remove('active');
  mobileDrawer.setAttribute('aria-hidden', 'true');
};

const toggleDrawer = () => {
  if (mobileDrawer.classList.contains('active')) {
    closeDrawer();
  } else {
    openDrawer();
  }
};

const updateActiveNav = (hash) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
  drawerLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
};

const handleLinkClick = (event) => {
  const target = event.currentTarget.getAttribute('href');
  if (target && target.startsWith('#')) {
    event.preventDefault();
    document.querySelector(target).scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateActiveNav(target);
    closeDrawer();
  }
};

navLinks.forEach((link) => link.addEventListener('click', handleLinkClick));
drawerLinks.forEach((link) => link.addEventListener('click', handleLinkClick));

if (mobileToggle) {
  mobileToggle.addEventListener('click', toggleDrawer);
}

if (drawerClose) {
  drawerClose.addEventListener('click', closeDrawer);
}

if (pageOverlay) {
  pageOverlay.addEventListener('click', closeDrawer);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

revealElements.forEach((element) => observer.observe(element));

const statsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      statValues.forEach((stat) => {
        const target = Number(stat.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 60);
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target;
            clearInterval(counter);
          } else {
            stat.textContent = current;
          }
        }, 20);
      });
      obs.disconnect();
    }
  });
}, { threshold: 0.45 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

const skillsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const fill = entry.target;
    fill.style.width = fill.dataset.width || '0%';
    obs.unobserve(fill);
  });
}, { threshold: 0.25 });

skillFills.forEach((fill) => skillsObserver.observe(fill));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      updateActiveNav(`#${entry.target.id}`);
    }
  });
}, { threshold: 0.5 });

const sectionTargets = document.querySelectorAll('section[id], .hero-section');
sectionTargets.forEach((section) => sectionObserver.observe(section));

const updateBadgeText = () => {
  const current = badgePhrases[badgeIndex];
  if (!badgeDeleting) {
    badgeChar += 1;
    badgeRotator.textContent = current.slice(0, badgeChar);
    if (badgeChar === current.length) {
      badgeDeleting = true;
      setTimeout(updateBadgeText, 1200);
      return;
    }
  } else {
    badgeChar -= 1;
    badgeRotator.textContent = current.slice(0, badgeChar);
    if (badgeChar === 0) {
      badgeDeleting = false;
      badgeIndex = (badgeIndex + 1) % badgePhrases.length;
    }
  }
  setTimeout(updateBadgeText, badgeDeleting ? 80 : 120);
};

if (badgeRotator) {
  updateBadgeText();
}

const filterProjects = (filter) => {
  projectCards.forEach((card) => {
    const categories = card.dataset.category.split(' ');
    card.style.display = filter === 'all' || categories.includes(filter) ? 'grid' : 'none';
  });
};

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(button.dataset.filter);
  });
});

filterProjects('all');

const toggleProjectView = (view) => {
  const isTech = view === 'tech';
  switchButtons.forEach((button) => button.classList.toggle('active', button.dataset.view === view));
  if (projectsSection) {
    projectsSection.classList.toggle('tech-view', isTech);
  }
  if (projectGrid) {
    projectGrid.classList.toggle('hidden', isTech);
  }
  if (techGrid) {
    techGrid.classList.toggle('hidden', !isTech);
  }
};

switchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;
    toggleProjectView(view);
  });
});

toggleProjectView('projects');

const openBadgeModal = () => {
  if (badgeModal && badgeModalOverlay) {
    badgeModal.classList.remove('hidden');
    badgeModalOverlay.classList.remove('hidden');
    badgeModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
};

const closeBadgeModal = () => {
  if (badgeModal && badgeModalOverlay) {
    badgeModal.classList.add('hidden');
    badgeModalOverlay.classList.add('hidden');
    badgeModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

if (internshipToggle) {
  internshipToggle.addEventListener('click', openBadgeModal);
}

if (badgeModalClose) {
  badgeModalClose.addEventListener('click', closeBadgeModal);
}

if (badgeModalDismiss) {
  badgeModalDismiss.addEventListener('click', closeBadgeModal);
}

if (badgeModalOverlay) {
  badgeModalOverlay.addEventListener('click', closeBadgeModal);
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && badgeModal && !badgeModal.classList.contains('hidden')) {
    closeBadgeModal();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeDrawer();
  }
});

// Theme toggle: persist preference and update UI
const modeToggle = document.getElementById('modeToggle');
const THEME_KEY = 'pz_theme_pref';

const applyTheme = (theme) => {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    if (modeToggle) modeToggle.innerHTML = '<span class="mode-thumb"><span class="mode-emoji">☀️</span></span>';
  } else {
    document.body.classList.remove('light-theme');
    if (modeToggle) modeToggle.innerHTML = '<span class="mode-thumb"><span class="mode-emoji">🌙</span></span>';
  }
};

// initialize from storage
try {
  const stored = localStorage.getItem(THEME_KEY);
  applyTheme(stored === 'light' ? 'light' : 'dark');
} catch (e) {
  applyTheme('dark');
}

if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    const newTheme = isLight ? 'dark' : 'light';
    applyTheme(newTheme);
    try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) { /* ignore */ }
  });
}
