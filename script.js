document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggleButton.querySelector('.fa-sun');
    const moonIcon = themeToggleButton.querySelector('.fa-moon');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    // --- Theme Toggling ---

    // Function to apply theme based on preference
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        } else {
            body.classList.remove('dark-mode');
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        }
    };

    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme
    let currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', () => {
        currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(currentTheme);
        // Save the user's preference to local storage
        localStorage.setItem('theme', currentTheme);
    });

    // --- Mobile Navigation ---
    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            // Optional: Change hamburger icon to 'X' when menu is open
            const icon = mobileNavToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile nav when a link is clicked
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }


    // --- Update Copyright Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Smooth scrolling for internal links ---
    // Note: CSS `scroll-behavior: smooth;` handles this in modern browsers,
    // but this JS provides wider compatibility or more control if needed.
     const internalLinks = document.querySelectorAll('a[href^="#"]');
     internalLinks.forEach(link => {
         link.addEventListener('click', function (e) {
             // Check if it's a valid section link and not just '#'
             if (this.getAttribute('href').length > 1) {
                 const targetId = this.getAttribute('href');
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                     e.preventDefault(); // Prevent default anchor jump
                     targetElement.scrollIntoView({
                         behavior: 'smooth',
                         block: 'start' // Adjust alignment if needed ('center', 'end')
                     })
                     // If using mobile nav, close it after clicking
                     if (mobileNav && mobileNav.classList.contains('active')) {
                         mobileNav.classList.remove('active');
                          const icon = mobileNavToggle.querySelector('i');
                         icon.classList.remove('fa-times');
                         icon.classList.add('fa-bars');
                     }
                 }
             }
         });
     });

     // --- Optional: Simple fade-in animation on scroll ---
     const animatedSections = document.querySelectorAll('.content-section, .project-card, .skill-item');

     const observerOptions = {
         root: null, // Use the viewport as the root
         rootMargin: '0px',
         threshold: 0.1 // Trigger when 10% of the element is visible
     };

     const observerCallback = (entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.style.opacity = '1';
                 entry.target.style.transform = 'translateY(0)';
                 // Optional: Stop observing once animated
                 observer.unobserve(entry.target);
             }
         });
     };

     const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

     animatedSections.forEach(section => {
         // Set initial state for animation
         section.style.opacity = '0';
         section.style.transform = 'translateY(20px)'; // Start slightly lower
         section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
         intersectionObserver.observe(section);
     });

}); // End DOMContentLoaded

const container = document.querySelector('.tilt-container');
const image = container.querySelector('.profile-pic.fancy-hover');

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
});

container.addEventListener('mouseleave', () => {
    image.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach((item) => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;

        item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

 const canvas = document.getElementById('binaryRain');
const ctx = canvas.getContext('2d');

// Set canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for the rain (binary)
const binary = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

// Draw function
function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4169E1"; // Green text
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 50);

// Optional: resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const lines = [
    "> Hello, World_",
    "> Initializing system...",
    "> Loading modules...",
    "> System ready."
  ];

  const speed = 100;
  const pause = 1000;
  const nextLineDelay = 600;
  const clearDelay = 1500;

  const typedText = document.getElementById("typed-text");

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      typedText.textContent += currentLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, speed);
    } else {
      // Line done
      setTimeout(() => {
        lineIndex++;
        if (lineIndex < lines.length) {
          charIndex = 0;
          typedText.textContent += '\n';
          setTimeout(typeLine, nextLineDelay);
        } else {
          // All lines done, reset
          setTimeout(() => {
            typedText.textContent = '';
            lineIndex = 0;
            charIndex = 0;
            typeLine();
          }, clearDelay);
        }
      }, pause);
    }
  }

  typeLine();
  const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const body = item.querySelector('.accordion-body');

    // Collapse all other items
    document.querySelectorAll('.accordion-body').forEach(b => {
      if (b !== body) b.style.maxHeight = null;
    });

    // Toggle current item
    if (body.style.maxHeight) {
      body.style.maxHeight = null;
    } else {
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });
});
const typeName = document.getElementById('type-name');
const typeRole = document.getElementById('type-role');
const typeDesc = document.getElementById('type-desc');

const textSteps = [
  { el: typeName, text: "Hi, I'm Rakshith Pippari", delay: 50 },
  { el: typeRole, text: "Frontend Developer", delay: 60 },
  { el: typeDesc, text: "Passionate about creating interactive and user-friendly web experiences.", delay: 35 }
];

async function typeWriter(el, text, speed) {
  for (let char of text) {
    el.textContent += char;
    await new Promise(res => setTimeout(res, speed));
  }
}

async function startTyping() {
  for (let step of textSteps) {
    await typeWriter(step.el, step.text, step.delay);
    await new Promise(res => setTimeout(res, 300)); // Pause between lines
  }
}

document.addEventListener("DOMContentLoaded", startTyping);
// After last line types
document.querySelector('.cta-button').classList.add('fade-in');
document.querySelector('.social-links').classList.add('fade-in');


const code = `
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
  <title>Rakshith | Frontend Dev</title>
  <link rel="stylesheet" href="style.css"/>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <script src="app.js"></script>
  </body>
</html>
`;

  const liveCodeElement = document.getElementById("liveCode");
  let index = 0;
  let deleting = false;

  function typeLoop() {
    if (!deleting) {
      liveCodeElement.textContent += code[index];
      index++;
      if (index < code.length) {
        setTimeout(typeLoop, 25);
      } else {
        // wait, then start deleting
        setTimeout(() => {
          deleting = true;
          setTimeout(typeLoop, 25);
        }, 1500); // pause before deleting
      }
    } else {
      // deleting
      liveCodeElement.textContent = liveCodeElement.textContent.slice(0, -1);
      if (liveCodeElement.textContent.length > 0) {
        setTimeout(typeLoop, 15);
      } else {
        // reset
        deleting = false;
        index = 0;
        setTimeout(typeLoop, 500);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", typeLoop);
 
  // Scroll-triggered fade-in animation
  const cards = document.querySelectorAll('.testimonial-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
  cards.forEach((card, i) => {
    observer.observe(card);
    card.style.animationDelay = `${i * 0.2}s`;
  });
  document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * 10;
      const rotateY = ((x / rect.width) - 0.5) * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    });
  });
  