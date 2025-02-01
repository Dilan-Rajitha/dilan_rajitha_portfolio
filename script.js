document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    











    document.querySelector('.contact-right form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the data to your server
        console.log({
            name,
            email,
            message
        });
        
        // Clear form
        this.reset();
        
        // Show success message
        alert('Message sent successfully!');
    });
    
    // Add focus effects for form fields
    const formFields = document.querySelectorAll('.contact-right input, .contact-right textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
    });












    

    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = '#ffffff';
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
        }
    });

    // Timeline filtering
    const timelineTypes = document.querySelectorAll('.timeline-type');
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineTypes.forEach(type => {
        type.addEventListener('click', function() {
            // Remove active class from all types
            timelineTypes.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked type
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Filter timeline items
            timelineItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.type === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = item.classList.contains('left') ? 
                        'translateX(-50px)' : 'translateX(50px)';
                }
            });
        });
    });

    // Initial animation for timeline items
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') ? 
            'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });

    // Show education items by default
    document.querySelector('[data-filter="education"]').click();
});






