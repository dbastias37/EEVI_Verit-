// Initialize AOS animations
if (window.AOS) {
    AOS.init();
}

// Simple ripple animation
document.addEventListener('DOMContentLoaded', () => {
    const ripple = document.querySelector('.hero-enhanced .ripple');
    if (ripple) {
        ripple.addEventListener('animationend', () => {
            ripple.classList.remove('animate');
            requestAnimationFrame(() => ripple.classList.add('animate'));
        });
        ripple.classList.add('animate');
    }
});

function handleCommunityClick() {
    {% if session.get('forum_user') or session.get('user') %}
        window.location.href = "{{ url_for('list_forum') }}";
    {% else %}
        window.location.href = "{{ url_for('forum_auth.vforum_auth') }}";
    {% endif %}
}
