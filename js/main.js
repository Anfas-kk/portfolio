document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.getElementById('menu-list');
    const menuIcon = document.getElementById('menu-icon');
    
    menuToggle.addEventListener('click', function() {
        menuList.classList.toggle('active');
        // Toggle between menu icons
        if (menuIcon.classList.contains('fa-bars')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-xmark');
        }
    });
    
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check for saved user preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeSwitch.checked = true;
    }

    // Listen for toggle changes
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.menu-list a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuList.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-xmark');
        });
    });
    
    // Menu active state highlighting
    function setActiveMenuItem() {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        // Reset all menu items to default color
        document.querySelectorAll('.menu-list a span').forEach(item => {
            item.classList.remove('active');
            item.style.color = '#717c87';
        });
        
        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Add active class to current menu item
                const activeLink = document.querySelector(`.menu-list a[href="#${sectionId}"] span`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.style.color = 'var(--primary-color)';
                }
            }
        });
    }
    
    // Skills progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    let skillsAnimated = false;

    // Reset bars initially
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });

    // Viewport check
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate once
    function animateProgressBarsOnce() {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        if (!isInViewport(skillsSection)) return;

        progressBars.forEach(bar => {
            const value = bar.parentElement
                .previousElementSibling
                .querySelector('.val').textContent;

            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = value;
        });

        skillsAnimated = true;
    }

    // Trigger
    animateProgressBarsOnce();
    window.addEventListener('scroll', animateProgressBarsOnce);

    
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Load services from JSON
    fetch('data/services.json')
    .then(response => response.json())
    .then(services => {
        const container = document.getElementById('servicesContainer');

        services.forEach(service => {
        const serviceBox = document.createElement('div');
        serviceBox.className = `icon-box ${service.boxClass}`;

        serviceBox.innerHTML = `
            <div class="icon">
            <svg width="100" height="100" viewBox="0 0 600 600"
                xmlns="http://www.w3.org/2000/svg">
                <path fill="#f5f5f5"
                d="M300,521C376,518,466,530,511,468C554,408,508,329,491,256C475,184,480,97,416,59C349,19,262,41,194,79C130,114,98,180,77,249C52,329,14,422,67,486C119,550,217,524,300,521">
                </path>
            </svg>
            <i class="${service.iconClass}"></i>
            </div>
            <h4><a href="#">${service.title}</a></h4>
            <p>${service.description}</p>
        `;

        container.appendChild(serviceBox);
        });
    })
    .catch(error => {
        console.error('Error loading services:', error);
    });

    // Call setActiveMenuItem on page load and scroll
    setActiveMenuItem();
    window.addEventListener('scroll', setActiveMenuItem);

    // // Form validation
    // const form = document.querySelector('form');
    // if (form) {
    //     form.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         let hasError = false;
            
    //         // Get form fields
    //         const fields = {
    //             name: form.querySelector('input[name="name"]'),
    //             email: form.querySelector('input[name="email"]'),
    //             message: form.querySelector('textarea[name="message"]')
    //         };
            
    //         // Reset any previous error states
    //         Object.values(fields).forEach(field => {
    //             field.style.borderColor = '';
    //         });
            
    //         // Validate required fields
    //         if (!fields.name.value.trim()) {
    //             fields.name.style.borderColor = '#ff5828';
    //             hasError = true;
    //         }
            
    //         if (!fields.email.value.trim()) {
    //             fields.email.style.borderColor = '#ff5828';
    //             hasError = true;
    //         } else if (!validateEmail(fields.email.value)) {
    //             fields.email.style.borderColor = '#ff5828';
    //             hasError = true;
    //         }
            
    //         if (!fields.message.value.trim()) {
    //             fields.message.style.borderColor = '#ff5828';
    //             hasError = true;
    //         }
            
    //         if (hasError) {
    //             return false;
    //         }
            
    //         // Success - would normally submit to server
    //         const submitBtn = form.querySelector('button[type="submit"]');
    //         const originalText = submitBtn.textContent;
            
    //         submitBtn.textContent = 'Sending...';
    //         submitBtn.disabled = true;
            
    //         // Simulate sending (in a real app, this would be an actual form submission)
    //         setTimeout(function() {
    //             alert('Thank you for your message! We will get back to you soon.');
    //             form.reset();
    //             submitBtn.textContent = originalText;
    //             submitBtn.disabled = false;
    //         }, 1500);
    //     });
    // }

    // // Email validation helper function
    // function validateEmail(email) {
    //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }
    
});


// EmailJS
(function () {
    emailjs.init("Iz9QY6E81QqzlKhm0"); // Public Key
})();


// Form validation

// Email validation function
function validateEmail(email) {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
}

// Validate form fields
function validateForm(form) {
    let hasError = false;

    const nameField = form.querySelector('input[name="name"]');
    const emailField = form.querySelector('input[name="email"]');
    const messageField = form.querySelector('textarea[name="message"]');

    // Reset previous errors
    [nameField, emailField, messageField].forEach(field => {
        field.style.borderColor = "";
    });

    // Name validation
    if (!nameField.value.trim()) {
        nameField.style.borderColor = "#ff5828";
        hasError = true;
    }

    // Email validation
    if (!emailField.value.trim() || !validateEmail(emailField.value)) {
        emailField.style.borderColor = "#ff5828";
        hasError = true;
    }

    // Message validation
    if (!messageField.value.trim()) {
        messageField.style.borderColor = "#ff5828";
        hasError = true;
    }

    return !hasError;
}

// Custom alert helpers
function showAlert(message) {
    const alertBox = document.getElementById("customAlert");
    const alertMsg = document.getElementById("alertMessage");

    alertMsg.textContent = message;
    alertBox.classList.add("active");
}

document.getElementById("alertClose").addEventListener("click", () => {
    document.getElementById("customAlert").classList.remove("active");
});


// Form Submission

const contactForm =  document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateForm(contactForm)) {
            return; // stop if validation fails
        }
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Loading state
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Send email
        emailjs.sendForm(
            "service_pv4ckpn",   // Service ID
            "template_0m3z95k",  // Template ID
            contactForm
        )
        .then(() => {
            showAlert(" Message sent successfully!");
            contactForm.reset();
        })
        .catch((error) => {
            showAlert("Failed to send message. Please try again later.");
        })
        .finally(() => {
            submitBtn.textContent = "Contact me";
            submitBtn.disabled = false;
        });
    });
}
