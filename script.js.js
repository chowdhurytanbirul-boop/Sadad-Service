// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            // Update active nav link
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Animate stats counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // The lower the slower
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // If it's the stats section, start counting
                if (entry.target.id === 'experience') {
                    setTimeout(animateCounters, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe service cards for staggered animation
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });
    
    // Form submission
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const business = this.querySelector('select').value;
            
            // Simple validation
            if (!name || !email || !business) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.querySelector('span').textContent;
            const originalIcon = submitBtn.querySelector('i').className;
            
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Request Sent!';
                submitBtn.querySelector('i').className = 'fas fa-check';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.querySelector('i').className = originalIcon;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
        
        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add hover effect to cards programmatically
    const cards = document.querySelectorAll('.service-card, .stat-card, .client-type, .why-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Initialize with stats hidden
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.textContent = '0';
    });
});