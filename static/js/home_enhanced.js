// HOME ENHANCED JAVASCRIPT - VERITÉ
// Archivo: static/js/home_enhanced.js

// Funcionalidad para manejar el botón de comunidad (adaptar según tu lógica de auth)
function handleCommunityClick() {
    // Esta función debe ser adaptada según tu sistema de autenticación
    // Ejemplo para Flask con current_user:
    
    // Si ya tienes esta lógica en tu template, mantenla
    // Si no, implementa algo similar a esto:
    
    console.log('Community button clicked');
    
    // Redireccionar al foro o login según autenticación
    // Esta lógica debe manejarse desde el template con Jinja2
    // Ver ejemplo en home_enhanced.html
}

// Rotación de palabras dinámicas
const words = [
    "COBRA VIDA",
    "SE TRANSFORMA", 
    "BRILLA",
    "INSPIRA",
    "CONECTA"
];

let currentIndex = 0;

function rotateWords() {
    const element = document.getElementById('dynamic-word');
    if (!element) return;
    
    element.style.opacity = '0';
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        element.textContent = words[currentIndex];
        element.style.opacity = '1';
    }, 300);
}

// Contador animado
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Observador de intersección para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animar contadores cuando entren en vista
            if (entry.target.closest('.stats-enhanced')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Animación de partículas
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Delay aleatorio para la animación
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Duración aleatoria
        particle.style.animationDuration = (3 + Math.random() * 3) + 's';
        
        container.appendChild(particle);
    }
}

// Inicialización con múltiples intentos de carga de AOS
function initializeAOS() {
    console.log('Attempting to initialize AOS...');
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            disable: false
        });
        console.log('✅ AOS initialized successfully');
        return true;
    } else {
        console.warn('⚠️ AOS not yet available, retrying...');
        return false;
    }
}

// Scroll suave para header
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-enhanced');
    if (!header) return;
    
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(10, 15, 28, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(10, 15, 28, 0.9)';
    }
    
    lastScrollY = currentScrollY;
});

// Debug y fallback mejorado
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            console.log('✅ AOS is loaded and ready');
            AOS.refresh();
        } else {
            console.log('🔄 AOS not available, activating CSS fallback animations');
            // Activar animaciones fallback
            const elementsWithAOS = document.querySelectorAll('[data-aos]');
            elementsWithAOS.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('aos-fallback');
                }, index * 100);
            });
        }
    }, 1000);
});

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    console.log('Home Enhanced initialized');
    
    createParticles();
    
    // Intentar inicializar AOS inmediatamente
    if (!initializeAOS()) {
        // Si falla, esperar un poco y reintentar
        setTimeout(() => {
            if (!initializeAOS()) {
                console.error('❌ Failed to load AOS library. Using fallback animations.');
                // Activar animaciones CSS como fallback
                document.querySelectorAll('[data-aos]').forEach(el => {
                    el.classList.add('aos-fallback');
                });
            }
        }, 500);
    }
    
    // Observar elementos para animaciones (mantener para compatibilidad)
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Iniciar rotación de palabras
    const dynamicWord = document.getElementById('dynamic-word');
    if (dynamicWord) {
        setInterval(rotateWords, 4000);
    }
    
    // Scroll suave para enlaces internos
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
});
