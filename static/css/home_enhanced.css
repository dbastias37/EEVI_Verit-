/* HOME ENHANCED CSS - VERITÉ */
/* Archivo: static/css/home_enhanced.css */

:root {
    --primary: #00D4B8;
    --accent: #0080FF;
    --dark: #0A0F1C;
    --darker: #050811;
    --card-bg: #1A2332;
    --text-light: #E9E9E9;
    --text-muted: #6B7A8A;
    --gradient-primary: linear-gradient(135deg, var(--primary), var(--accent));
    --gradient-dark: linear-gradient(135deg, var(--dark), var(--darker));
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glow: 0 0 30px rgba(0, 212, 184, 0.3);
}

/* Reset específico para home enhanced */
.home-enhanced * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.home-enhanced {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--dark);
    color: var(--text-light);
    overflow-x: hidden;
    line-height: 1.6;
}

/* Hero Enhanced */
.hero-enhanced {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 8rem 2rem 4rem;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-dark);
    z-index: -2;
}

.hero-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}

.particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--primary);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
    opacity: 0.6;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-text {
    z-index: 2;
}

.hero-badge {
    display: inline-block;
    background: var(--glass-bg);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(0, 212, 184, 0.3);
    backdrop-filter: blur(10px);
}

.hero-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.title-highlight {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
}

.hero-description {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    line-height: 1.6;
}

.hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.btn-enhanced {
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
}

.btn-primary {
    background: var(--gradient-primary);
    color: var(--dark);
    box-shadow: var(--glow);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 40px rgba(0, 212, 184, 0.5);
}

.btn-secondary {
    background: transparent;
    color: var(--text-light);
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
    background: var(--glass-bg);
    border-color: var(--primary);
    transform: translateY(-3px);
}

/* Hero Visual - Ripple Loader Effect */
.hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
}

.loader-container {
    position: relative;
    height: 400px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-inner {
    --loader-background: linear-gradient(0deg, rgba(0, 212, 184, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%);
    position: relative;
    height: 350px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: logoGlow 4s infinite ease-in-out;
    z-index: 999;
    background: var(--gradient-primary);
    border-radius: 50%;
    box-shadow: var(--glow);
}

.loader-logo .logo-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 2.5rem;
    color: var(--dark);
}

.ripple-box {
    position: absolute;
    background: var(--loader-background);
    border-radius: 50%;
    border-top: 2px solid var(--primary);
    box-shadow: rgba(0, 212, 184, 0.3) 0 10px 30px 0;
    backdrop-filter: blur(10px);
    animation: rippleEffect 4s infinite ease-in-out;
}

.ripple-box:nth-child(2) {
    width: 25%;
    aspect-ratio: 1/1;
    z-index: 99;
}

.ripple-box:nth-child(3) {
    inset: 30%;
    z-index: 98;
    border-color: rgba(0, 212, 184, 0.8);
    animation-delay: 0.5s;
}

.ripple-box:nth-child(4) {
    inset: 20%;
    z-index: 97;
    border-color: rgba(0, 212, 184, 0.6);
    animation-delay: 1s;
}

.ripple-box:nth-child(5) {
    inset: 10%;
    z-index: 96;
    border-color: rgba(0, 128, 255, 0.4);
    animation-delay: 1.5s;
}

.ripple-box:nth-child(6) {
    inset: 0;
    z-index: 95;
    border-color: rgba(0, 128, 255, 0.2);
    animation-delay: 2s;
}

@keyframes rippleEffect {
    0% {
        transform: scale(1);
        box-shadow: rgba(0, 212, 184, 0.3) 0 10px 30px 0;
        opacity: 0.8;
    }
    50% {
        transform: scale(1.4);
        box-shadow: rgba(0, 212, 184, 0.5) 0 30px 50px 0;
        opacity: 1;
    }
    100% {
        transform: scale(1);
        box-shadow: rgba(0, 212, 184, 0.3) 0 10px 30px 0;
        opacity: 0.8;
    }
}

@keyframes logoGlow {
    0% {
        opacity: 0.9;
        box-shadow: var(--glow);
    }
    50% {
        opacity: 1;
        box-shadow: 0 0 50px rgba(0, 212, 184, 0.6), 0 0 80px rgba(0, 128, 255, 0.3);
        transform: translate(-50%, -50%) scale(1.05);
    }
    100% {
        opacity: 0.9;
        box-shadow: var(--glow);
        transform: translate(-50%, -50%) scale(1);
    }
}

.scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--text-muted);
    font-size: 0.9rem;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
    40% { transform: translateX(-50%) translateY(-10px); }
    60% { transform: translateX(-50%) translateY(-5px); }
}

/* Features Section */
.features-enhanced {
    padding: 6rem 2rem;
    background: rgba(255, 255, 255, 0.02);
}

.features-container {
    max-width: 1400px;
    margin: 0 auto;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1rem;
}

.section-subtitle {
    font-size: 1.2rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: var(--glass-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.feature-card:hover::before {
    transform: scaleX(1);
}

.feature-card:hover {
    transform: translateY(-10px);
    border-color: rgba(0, 212, 184, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.feature-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.feature-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    margin-bottom: 1rem;
}

.feature-description {
    color: var(--text-muted);
    line-height: 1.6;
}

/* Stats Section */
.stats-enhanced {
    padding: 4rem 2rem;
    background: var(--card-bg);
}

.stats-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
}

.stat-item {
    padding: 2rem;
}

.stat-number {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 3rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    display: block;
}

.stat-label {
    color: var(--text-muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
}

/* CTA Section */
.cta-enhanced {
    padding: 6rem 2rem;
    background: var(--gradient-dark);
    text-align: center;
}

.cta-container {
    max-width: 800px;
    margin: 0 auto;
}

.cta-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 1.5rem;
}

.cta-description {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
}

/* Estilos adicionales para AOS y Fallback */
[data-aos] {
    pointer-events: none;
}

[data-aos].aos-animate {
    pointer-events: auto;
}

.feature-card[data-aos] {
    opacity: 0;
    transform: translateY(30px);
}

.feature-card[data-aos].aos-animate {
    opacity: 1;
    transform: translateY(0);
}

/* Fallback animations si AOS no carga */
.aos-fallback {
    animation: fallbackFadeUp 0.8s ease forwards;
}

.aos-fallback:nth-child(1) { animation-delay: 0.1s; }
.aos-fallback:nth-child(2) { animation-delay: 0.2s; }
.aos-fallback:nth-child(3) { animation-delay: 0.3s; }
.aos-fallback:nth-child(4) { animation-delay: 0.4s; }
.aos-fallback:nth-child(5) { animation-delay: 0.5s; }
.aos-fallback:nth-child(6) { animation-delay: 0.6s; }

@keyframes fallbackFadeUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animaciones específicas para fallback */
[data-aos="fade-down"].aos-fallback {
    animation: fallbackFadeDown 0.8s ease forwards;
}

[data-aos="fade-left"].aos-fallback {
    animation: fallbackFadeLeft 0.8s ease forwards;
}

[data-aos="fade-right"].aos-fallback {
    animation: fallbackFadeRight 0.8s ease forwards;
}

[data-aos="zoom-in"].aos-fallback {
    animation: fallbackZoomIn 0.8s ease forwards;
}

[data-aos="flip-left"].aos-fallback {
    animation: fallbackFlipLeft 0.8s ease forwards;
}

@keyframes fallbackFadeDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fallbackFadeLeft {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fallbackFadeRight {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes fallbackZoomIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes fallbackFlipLeft {
    from { opacity: 0; transform: rotateY(-90deg); }
    to { opacity: 1; transform: rotateY(0); }
}

/* Responsive */
@media (max-width: 968px) {
    .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }

    .loader-container {
        height: 300px;
    }

    .loader-inner {
        height: 250px;
    }

    .loader-logo {
        width: 60px;
        height: 60px;
    }

    .logo-text {
        font-size: 2rem !important;
    }

    .features-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .hero-enhanced {
        padding: 6rem 1rem 3rem;
    }

    .hero-cta {
        flex-direction: column;
        align-items: center;
    }

    .btn-enhanced {
        width: 100%;
        justify-content: center;
    }
}
