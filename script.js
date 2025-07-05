        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const servicesTitle = document.querySelector('.services h2');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (servicesTitle) observer.observe(servicesTitle);
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });

        // Bottom animation observer
        const bottomObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.3 });

        const contactCTA = document.querySelector('.contact-cta');
        if (contactCTA) bottomObserver.observe(contactCTA);

        // Floating elements parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Ripple effect for buttons
        document.querySelectorAll('.cta-button, .nav-menu a').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.borderRadius = '50%';
                ripple.style.width = '10px';
                ripple.style.height = '10px';
                ripple.style.animation = 'ripple 0.6s ease-out';
                ripple.style.left = e.clientX - this.offsetLeft - 5 + 'px';
                ripple.style.top = e.clientY - this.offsetTop - 5 + 'px';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Modal functionality
        const modal = document.getElementById('contactModal');
        const contactLinks = document.querySelectorAll('.contact-link');
        const closeBtn = document.querySelector('.close');
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Open modal
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Reset form and messages
            contactForm.reset();
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
        }

        closeBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Here you would typically send the data to your server
                console.log('Form data:', data);
                
                // Show success message
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Close modal after 2 seconds
                setTimeout(() => {
                    closeModal();
                }, 2000);
                
            }, 1000);
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // -----------------------------------------

