// Enhanced word rotation with mobile stability
const words = [
    "FILMMAKERS",
    "DESARROLLADORES",
    "EDITORES", 
    "AUDIOVISUALES",
    "YOUTUBERS"
];

document.addEventListener('DOMContentLoaded', () => {
    const span = document.getElementById('dynamic-word');
    if (!span) return;

    let index = 0;
    
    // Animation timing constants
    const fadeIn = 1000;
    const fadeOut = 500;
    const minVisible = 4000;
    const maxVisible = 7000;

    // Calculate optimal display time based on word length
    function getDisplayTime(word) {
        const baseTime = minVisible;
        const extraTime = Math.min(word.length * 100, 2000); // Max 2s extra
        return baseTime + extraTime;
    }

    function randomVisible() {
        return Math.floor(Math.random() * (maxVisible - minVisible + 1)) + minVisible;
    }

    // Enhanced word switching with layout stability
    function cycle() {
        const currentWord = words[index];
        const visible = getDisplayTime(currentWord);
        
        // Start fade out
        span.classList.remove('show');
        
        setTimeout(() => {
            // Change word during invisible period
            index = (index + 1) % words.length;
            
            // Truncate word if too long for mobile
            let displayWord = words[index];
            if (window.innerWidth <= 480 && displayWord.length > 12) {
                displayWord = displayWord.substring(0, 12) + '...';
            }
            
            span.textContent = displayWord;
            
            // Fade in new word
            span.classList.add('show');
        }, fadeOut);
        
        // Schedule next cycle
        setTimeout(cycle, fadeOut + fadeIn + visible);
    }

    // Initialize with proper classes
    span.classList.add('rotator', 'fade', 'show');
    
    // Set initial word
    let initialWord = words[0];
    if (window.innerWidth <= 480 && initialWord.length > 12) {
        initialWord = initialWord.substring(0, 12) + '...';
    }
    span.textContent = initialWord;
    
    // Start rotation cycle
    const startDelay = randomVisible();
    setTimeout(cycle, fadeOut + fadeIn + startDelay);
    
    // Handle window resize to adjust text
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const currentWord = words[index];
            let displayWord = currentWord;
            
            if (window.innerWidth <= 480 && displayWord.length > 12) {
                displayWord = displayWord.substring(0, 12) + '...';
            }
            
            if (span.textContent !== displayWord) {
                span.textContent = displayWord;
            }
        }, 250);
    });
});
