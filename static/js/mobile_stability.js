// Mobile layout stability utilities
document.addEventListener('DOMContentLoaded', () => {
    // Prevent layout shifts during text animations
    function stabilizeTextContainers() {
        const dynamicElements = document.querySelectorAll('#dynamic-word, .rotator, .fade');
        
        dynamicElements.forEach(element => {
            if (element) {
                // Set minimum dimensions based on content
                const computedStyle = window.getComputedStyle(element);
                const currentWidth = element.offsetWidth;
                
                // Set minimum width to prevent shrinking
                if (currentWidth > 0) {
                    element.style.minWidth = Math.min(currentWidth, window.innerWidth * 0.9) + 'px';
                }
            }
        });
    }
    
    // Run stabilization
    stabilizeTextContainers();
    
    // Re-stabilize on orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(stabilizeTextContainers, 100);
    });
    
    // Handle viewport size changes
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset min-width constraints on resize
            const dynamicElements = document.querySelectorAll('#dynamic-word, .rotator, .fade');
            dynamicElements.forEach(element => {
                if (element) {
                    element.style.minWidth = 'auto';
                }
            });
            
            // Re-apply stabilization
            setTimeout(stabilizeTextContainers, 50);
        }, 250);
    });
    
    // Prevent horizontal scroll on dynamic content changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                // Check if any element is causing horizontal overflow
                const body = document.body;
                const scrollWidth = body.scrollWidth;
                const clientWidth = body.clientWidth;
                
                if (scrollWidth > clientWidth) {
                    // Find and constrain overflowing elements
                    const allElements = document.querySelectorAll('*');
                    allElements.forEach(el => {
                        if (el.scrollWidth > window.innerWidth) {
                            el.style.maxWidth = '100vw';
                            el.style.overflow = 'hidden';
                            el.style.boxSizing = 'border-box';
                        }
                    });
                }
            }
        });
    });
    
    // Monitor dynamic content changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
});
