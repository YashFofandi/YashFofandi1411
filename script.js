document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Soft Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .project-card, input, textarea');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Small delay for follower to create smooth effect
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hover Effect for Cursor
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                follower.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', () => {
                follower.classList.remove('cursor-hover');
            });
        });
    }

    // 2. Mobile Navigation Toggle
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation (turn into X)
        burger.classList.toggle('toggle');
    });

    // 3. Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once shown
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements with hidden classes
    const hiddenElements = document.querySelectorAll('.hidden, .hidden-up, .hidden-left, .hidden-right');
    hiddenElements.forEach((el) => observer.observe(el));

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('nav-active'); // Close mobile menu on click

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});