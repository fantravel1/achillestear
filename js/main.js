/* ============================================================
   AchillesTear.com — Main JavaScript
   Interactivity, Animations, Risk Test, Counters
   ============================================================ */

(function () {
  'use strict';

  // ---- DOM Ready ----
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavigation();
    initScrollEffects();
    initHeroParticles();
    initCounters();
    initRiskTest();
    initSmoothScroll();
    initRevealAnimations();
  }

  /* ===========================================================
     NAVIGATION
     =========================================================== */
  function initNavigation() {
    var navbar = document.getElementById('navbar');
    var menuToggle = document.getElementById('menuToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileOverlay = document.getElementById('mobileOverlay');
    var mobileClose = document.getElementById('mobileClose');
    var mobileLinks = document.querySelectorAll('.nav__mobile-link');

    // Scroll effect on nav
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });

    // Hamburger toggle
    if (menuToggle) {
      menuToggle.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMenu);
    }

    // Close menu on link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    function openMenu() {
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      menuToggle.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      mobileOverlay.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    // Active link highlighting
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', function () {
      var scrollPos = window.pageYOffset + 200;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  }

  /* ===========================================================
     SMOOTH SCROLL
     =========================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80; // nav height
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ===========================================================
     SCROLL REVEAL ANIMATIONS (Intersection Observer)
     =========================================================== */
  function initRevealAnimations() {
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      reveals.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all elements
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  /* ===========================================================
     SCROLL EFFECTS (Parallax-like)
     =========================================================== */
  function initScrollEffects() {
    var heroImage = document.querySelector('.hero__bg-image');

    if (heroImage) {
      window.addEventListener('scroll', function () {
        var scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
          heroImage.style.transform = 'translateY(' + (scrolled * 0.3) + 'px) scale(1.1)';
        }
      }, { passive: true });
    }
  }

  /* ===========================================================
     HERO PARTICLES
     =========================================================== */
  function initHeroParticles() {
    var container = document.getElementById('heroParticles');
    if (!container) return;

    var particleCount = 20;

    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.className = 'hero__particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      particle.style.width = (2 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;

      // Alternate colors
      if (Math.random() > 0.6) {
        particle.style.background = 'var(--color-secondary)';
      }

      container.appendChild(particle);
    }
  }

  /* ===========================================================
     ANIMATED COUNTERS
     =========================================================== */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(function (counter) {
        observer.observe(counter);
      });
    }

    // Also animate hero stat numbers
    var heroStats = document.querySelectorAll('.hero__stat-number[data-count]');
    if ('IntersectionObserver' in window) {
      var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            heroObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      heroStats.forEach(function (stat) {
        heroObserver.observe(stat);
      });
    }
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);

      // Format number with commas
      var formatted = current.toLocaleString();

      // Check if the element contains child elements (.accent span)
      var accentSpan = el.querySelector('.accent');
      if (accentSpan) {
        accentSpan.textContent = formatted;
      } else {
        el.textContent = formatted + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ===========================================================
     INTERACTIVE RISK TEST
     =========================================================== */
  function initRiskTest() {
    var form = document.getElementById('riskTestForm');
    if (!form) return;

    var questions = form.querySelectorAll('.risk-test__question');
    var progressBars = form.querySelectorAll('.risk-test__progress-bar');
    var prevBtn = document.getElementById('riskPrev');
    var nextBtn = document.getElementById('riskNext');
    var result = document.getElementById('riskResult');
    var restartBtn = document.getElementById('riskRestart');

    var currentQuestion = 0;
    var totalQuestions = questions.length;
    var answers = new Array(totalQuestions).fill(null);

    // Option click handlers
    form.querySelectorAll('.risk-test__option').forEach(function (option) {
      option.addEventListener('click', function () {
        var questionId = parseInt(this.getAttribute('data-question-id'), 10);
        var value = parseInt(this.getAttribute('data-value'), 10);

        // Deselect siblings
        var siblings = this.parentNode.querySelectorAll('.risk-test__option');
        siblings.forEach(function (s) { s.classList.remove('selected'); });

        // Select this
        this.classList.add('selected');
        answers[questionId - 1] = value;

        // Enable next button
        nextBtn.disabled = false;

        // Auto-advance after short delay
        setTimeout(function () {
          if (currentQuestion < totalQuestions - 1) {
            goToQuestion(currentQuestion + 1);
          }
        }, 400);
      });
    });

    // Next button
    nextBtn.addEventListener('click', function () {
      if (currentQuestion < totalQuestions - 1) {
        goToQuestion(currentQuestion + 1);
      } else {
        showResult();
      }
    });

    // Previous button
    prevBtn.addEventListener('click', function () {
      if (currentQuestion > 0) {
        goToQuestion(currentQuestion - 1);
      }
    });

    // Restart
    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        answers = new Array(totalQuestions).fill(null);
        currentQuestion = 0;

        // Reset UI
        form.querySelectorAll('.risk-test__option').forEach(function (o) {
          o.classList.remove('selected');
        });
        result.classList.remove('active');

        // Show questions again
        var navDiv = form.querySelector('.risk-test__nav');
        if (navDiv) navDiv.style.display = 'flex';

        var progressDiv = document.getElementById('riskProgress');
        if (progressDiv) progressDiv.style.display = 'flex';

        goToQuestion(0);
      });
    }

    function goToQuestion(index) {
      questions.forEach(function (q) { q.classList.remove('active'); });
      questions[index].classList.add('active');
      currentQuestion = index;

      // Update progress
      progressBars.forEach(function (bar, i) {
        bar.classList.remove('active', 'completed');
        if (i < index) bar.classList.add('completed');
        if (i === index) bar.classList.add('active');
      });

      // Update buttons
      prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
      nextBtn.textContent = index === totalQuestions - 1 ? 'See Results' : 'Next \u2192';
      nextBtn.disabled = answers[index] === null;
    }

    function showResult() {
      // Hide questions and nav
      questions.forEach(function (q) { q.classList.remove('active'); });
      var navDiv = form.querySelector('.risk-test__nav');
      if (navDiv) navDiv.style.display = 'none';

      var progressDiv = document.getElementById('riskProgress');
      if (progressDiv) progressDiv.style.display = 'none';

      // Calculate score
      var totalScore = answers.reduce(function (sum, val) {
        return sum + (val || 0);
      }, 0);
      var maxScore = totalQuestions * 3;
      var percentage = Math.round((totalScore / maxScore) * 100);

      // Show result
      result.classList.add('active');

      // Animate score ring
      var scoreCircle = document.getElementById('scoreCircle');
      var circumference = 2 * Math.PI * 70; // r=70
      var offset = circumference - (percentage / 100) * circumference;

      setTimeout(function () {
        scoreCircle.style.strokeDashoffset = offset;
      }, 100);

      // Set color based on risk
      var scoreValue = document.getElementById('scoreValue');
      var riskLevel = document.getElementById('riskLevel');
      var riskDesc = document.getElementById('riskDescription');

      // Animate score number
      animateScoreValue(scoreValue, percentage);

      if (percentage <= 25) {
        scoreCircle.style.stroke = '#00e676';
        scoreValue.style.color = '#00e676';
        riskLevel.textContent = 'Low Risk';
        riskDesc.textContent = 'Great news — your current habits put you in a lower risk category. Keep up the strength training, warm-ups, and load management. Consider the AchillesProof\u2122 program to stay ahead.';
      } else if (percentage <= 50) {
        scoreCircle.style.stroke = '#ffab00';
        scoreValue.style.color = '#ffab00';
        riskLevel.textContent = 'Moderate Risk';
        riskDesc.textContent = 'You have some protective factors, but there are gaps. Focus on adding structured calf strengthening, better warm-ups, and managing your training load progression.';
      } else if (percentage <= 75) {
        scoreCircle.style.stroke = '#ff6d00';
        scoreValue.style.color = '#ff6d00';
        riskLevel.textContent = 'Elevated Risk';
        riskDesc.textContent = 'Multiple risk factors are present. We strongly recommend starting an Achilles prevention program immediately. Focus on eccentric strengthening, proper warm-ups, and gradual load progression.';
      } else {
        scoreCircle.style.stroke = '#ff1744';
        scoreValue.style.color = '#ff1744';
        riskLevel.textContent = 'High Risk';
        riskDesc.textContent = 'Several significant risk factors detected. Please consult a sports medicine professional, and begin a structured tendon loading program. Do not ignore Achilles symptoms.';
      }
    }

    function animateScoreValue(el, target) {
      var duration = 1500;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + '%';
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }
  }

  /* ===========================================================
     WEEKLY CONTENT ROTATION (simulated)
     =========================================================== */
  // This would connect to a CMS in production.
  // For now, content is static but the framework is in place.

})();
