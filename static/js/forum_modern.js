// VFORUM Modern JavaScript - Interacciones y animaciones

document.addEventListener('DOMContentLoaded', function() {
    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');
            
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth transition for content
            const topicsList = document.querySelector('.topics-list');
            topicsList.style.opacity = '0.5';
            topicsList.style.transform = 'translateY(10px)';
            
            // Update URL with sort parameter
            const url = new URL(window.location);
            if (sortType && sortType !== 'recent') {
                url.searchParams.set('sort', sortType);
            } else {
