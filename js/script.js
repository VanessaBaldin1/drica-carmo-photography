document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menu Mobile ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animação Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // --- Header Sticky ---
    const header = document.querySelector('header');
    const backToTop = document.querySelector('#backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });

    // --- Filtro do Portfólio ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

// --- Lógica de Carrossel Interno ---
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        const track = item.querySelector('.carousel-track');
        const nextBtn = item.querySelector('.next');
        const prevBtn = item.querySelector('.prev');
        const images = item.querySelectorAll('.carousel-track img');
        
        let index = 0;

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (index < images.length - 1) {
                index++;
                updateSlide();
            } else {
                index = 0; // Volta ao início
                updateSlide();
            }
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (index > 0) {
                index--;
                updateSlide();
            } else {
                index = images.length - 1; // Vai para a última
                updateSlide();
            }
        });

        function updateSlide() {
            track.style.transform = `translateX(-${index * 100}%)`;
        }
    });

    // --- Lógica do Lightbox (Ampliar Foto) ---
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("imgFull");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".lightbox-close");

    document.querySelectorAll('.lightbox-trigger').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // Libera o scroll
    });

    // Fechar ao clicar fora da imagem
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });



});