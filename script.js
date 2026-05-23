// script.js - Interactive Controls & Mathematical Simulators

// Page Navigation Handler
function showSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    target.classList.add('active');
  }

  updateNavActive(id);

  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.remove('active');
  }
}

function updateNavActive(id) {
  document.querySelectorAll('.sidebar nav ul li button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.desktop-nav .nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-' + id);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  const activeDesktopBtn = document.getElementById('desktop-btn-' + id);
  if (activeDesktopBtn) {
    activeDesktopBtn.classList.add('active');
  }
}

// Mobile Hamburger Menu Binding
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const sidebar = document.getElementById('sidebar');
  const themeBtn = document.getElementById('themeToggleBtn');
  const mobileThemeBtn = document.getElementById('mobileThemeBtn');
  const desktopThemeBtn = document.getElementById('desktopThemeBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const body = document.body;

  const applyTheme = (theme) => {
    document.body.classList.toggle('light-theme', theme === 'light');
    if (themeBtn) {
      themeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
    if (mobileThemeBtn) {
      mobileThemeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
    if (desktopThemeBtn) {
      desktopThemeBtn.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
    localStorage.setItem('siteTheme', theme);
  };

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('siteTheme');
    applyTheme(savedTheme === 'light' ? 'light' : 'dark');
  };

  const sections = Array.from(document.querySelectorAll('.content-section'));

  const splashScreen = document.getElementById('splashScreen');
  const removeSplash = () => {
    if (!splashScreen) return;
    splashScreen.classList.add('hidden');
    setTimeout(() => {
      splashScreen.remove();
    }, 700);
  };

  const syncSectionOnScroll = () => {
    const offset = window.innerHeight * 0.25;
    let currentSection = sections[0];
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= offset) {
        currentSection = section;
      }
    });
    if (currentSection) {
      document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
      currentSection.classList.add('active');
      updateNavActive(currentSection.id);
    }
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(syncSectionOnScroll);
  }, { passive: true });

  const toggleSidebarByBrand = () => {
    if (!sidebar) return;
    if (window.innerWidth <= 900) {
      sidebar.classList.toggle('active');
      return;
    }

    openSidebar();
  };

  const closeSidebar = () => {
    body.classList.add('sidebar-collapsed');
    if (sidebar) {
      sidebar.classList.remove('active');
    }
  };

  const openSidebar = () => {
    body.classList.remove('sidebar-collapsed');
    if (sidebar) {
      sidebar.classList.add('active');
    }
  };

  document.querySelectorAll('.brand-name').forEach(element => {
    element.addEventListener('click', toggleSidebarByBrand);
  });

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  if (desktopThemeBtn) {
    desktopThemeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });

    // Close menu when clicking outside sidebar on mobile
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
        sidebar.classList.remove('active');
      }
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeSidebar);
  }

  if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener('click', openSidebar);
  }

  window.addEventListener('load', () => {
    setTimeout(removeSplash, 1000);
  });

  loadTheme();
  syncSectionOnScroll();

  // Bind real-time input listeners to all diabetes inputs for instant predictions
  const diabetesForm = document.getElementById('diabetes-form');
  if (diabetesForm) {
    diabetesForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', calculateDiabetesRisk);
    });
  }

  // Initialize interactive widgets
  initSliders();
  calculateDiabetesRisk();
});

// Typing Text Effect
const typed = new Typed(".typed-text", {
  strings: ["BSIT Student", "Amazon Account Handler"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});

// Linear Regression Engine - Salary Predictor
function initSliders() {
  const slider = document.getElementById('experience-slider');
  const expVal = document.getElementById('exp-val');
  const salaryOutput = document.getElementById('salary-output');

  if (slider && expVal && salaryOutput) {
    const updateSalary = () => {
      const exp = Number.parseFloat(slider.value);
      expVal.textContent = exp.toFixed(1) + (exp === 1 ? ' Year' : ' Years');
      
      // Exact Linear Regression Model derived from Salary_Data.csv:
      // Salary = 9449.962321455074 * Experience + 25792.20019866871
      const salary = 9449.96232 * exp + 25792.2002;
      
      // Format as USD
      salaryOutput.textContent = '$' + Math.round(salary).toLocaleString();
    };

    slider.addEventListener('input', updateSalary);
    updateSalary(); // Run initial render
  }
}

// Logistic Regression Classifier Engine - Clinical Diabetes Risk Assessor
function calculateDiabetesRisk() {
  // Extract inputs
  const glucose = Number.parseFloat(document.getElementById('input-glucose').value) || 0;
  const bmi = Number.parseFloat(document.getElementById('input-bmi').value) || 0;
  const age = Number.parseFloat(document.getElementById('input-age').value) || 0;
  const pregnancies = Number.parseFloat(document.getElementById('input-pregnancies').value) || 0;
  const insulin = Number.parseFloat(document.getElementById('input-insulin').value) || 0;
  const dpf = Number.parseFloat(document.getElementById('input-dpf').value) || 0;

  // Average controls (mean dataset replacements) for hidden features in simple input
  const bp = 69.105469; 
  const skin = 20.536458;

  // Exact StandardScaler Normalization Coefficients
  const scalerParams = {
    pregnancies: { mean: 3.845052, scale: 3.367384 },
    glucose: { mean: 120.894531, scale: 31.951796 },
    bp: { mean: 69.105469, scale: 19.343202 },
    skin: { mean: 20.536458, scale: 15.941829 },
    insulin: { mean: 79.799479, scale: 115.168949 },
    bmi: { mean: 31.992578, scale: 7.879026 },
    dpf: { mean: 0.471876, scale: 0.331113 },
    age: { mean: 33.240885, scale: 11.752573 }
  };

  // Exact Logistic Regression Weight Vectors
  const coef = {
    pregnancies: 0.408804,
    glucose: 1.107349,
    bp: -0.250794,
    skin: 0.00901,
    insulin: -0.130753,
    bmi: 0.696354,
    dpf: 0.308889,
    age: 0.176551
  };
  const intercept = -0.866786;

  // Normalize inputs (z-score scaling)
  const scaleVal = (val, param) => (val - param.mean) / param.scale;

  const sPreg = scaleVal(pregnancies, scalerParams.pregnancies);
  const sGluc = scaleVal(glucose, scalerParams.glucose);
  const sBp = scaleVal(bp, scalerParams.bp);
  const sSkin = scaleVal(skin, scalerParams.skin);
  const sIns = scaleVal(insulin, scalerParams.insulin);
  const sBmi = scaleVal(bmi, scalerParams.bmi);
  const sDpf = scaleVal(dpf, scalerParams.dpf);
  const sAge = scaleVal(age, scalerParams.age);

  // Compute log-odds sum (z)
  const z = intercept +
            (coef.pregnancies * sPreg) +
            (coef.glucose * sGluc) +
            (coef.bp * sBp) +
            (coef.skin * sSkin) +
            (coef.insulin * sIns) +
            (coef.bmi * sBmi) +
            (coef.dpf * sDpf) +
            (coef.age * sAge);

  // Apply logistic sigmoid function: probability = 1 / (1 + e^-z)
  const probability = 1 / (1 + Math.exp(-z));
  const riskPercent = (probability * 100).toFixed(1);

  // Update visual elements
  const probVal = document.getElementById('prob-val');
  const probBar = document.getElementById('prob-bar');
  const riskTier = document.getElementById('risk-tier');
  const riskAdvice = document.getElementById('risk-advice');

  if (probVal && probBar && riskTier && riskAdvice) {
    probVal.textContent = riskPercent + '% Risk probability';
    probBar.style.width = riskPercent + '%';

    // Apply risk bands & active color styling
    if (probability < 0.3) {
      riskTier.textContent = 'Low Risk Profile';
      riskTier.className = 'risk-level-tag low';
      probBar.style.background = 'var(--accent-emerald)';
      riskAdvice.textContent = 'Your current input configurations correlate with optimal metabolic and clinical averages. Maintain standard active lifestyle patterns.';
    } else if (probability < 0.6) {
      riskTier.textContent = 'Moderate Risk Profile';
      riskTier.className = 'risk-level-tag mod';
      probBar.style.background = 'var(--accent-gold)';
      riskAdvice.textContent = 'Input markers indicate intermediate classifications. Keep monitoring daily glucose, focus on balanced nutrition, and maintain weekly workouts.';
    } else {
      riskTier.textContent = 'High Risk Profile';
      riskTier.className = 'risk-level-tag high';
      probBar.style.background = 'var(--accent-coral)';
      riskAdvice.textContent = 'Statistical threshold values are significantly elevated. It is recommended to schedule regular checkups to review diagnostic parameters.';
    }
  }
}

// Contact Form Handler with Custom visual response dialogue
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const feedbackAlert = document.getElementById('form-feedback-alert');

  if (feedbackAlert) {
    feedbackAlert.textContent = "Processing and validating your message...";
    feedbackAlert.className = "form-feedback";
    feedbackAlert.style.display = "block";

    // Simulate reliable form log response
    setTimeout(() => {
      feedbackAlert.textContent = `Success! Thanks ${name}, your inquiry on "${subject}" was successfully sent. A confirmation has been logged for ${email}.`;
      feedbackAlert.className = "form-feedback success";
      document.getElementById('contact-form').reset();
    }, 1200);
  }
}
