document.addEventListener('DOMContentLoaded', function () {
  var ctx = document.getElementById('txnChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Pending'],
        datasets: [{
          data: [60, 40],
          backgroundColor: ['#2ecc71', '#e74c3c']
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
            }
          }
        }
      }
    });
  }

  var openBtn = document.getElementById('open-upload');
  var modal = document.getElementById('upload-modal');
  var closeBtn = modal ? modal.querySelector('.close-modal') : null;
  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', function () {
      modal.classList.add('show');
    });
    closeBtn.addEventListener('click', function () {
      modal.classList.remove('show');
    });
  }

  document.querySelectorAll('.sidebar-nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = document.querySelector('.section:not(.hidden)');
      const targetId = btn.getAttribute('data-section');
      const targetSection = document.getElementById(targetId);
      if (!active || !targetSection) return;
      if (active !== targetSection) {
        active.classList.add('hidden');
        setTimeout(() => {
          active.style.display = 'none';
          targetSection.style.display = 'block';
          setTimeout(() => targetSection.classList.remove('hidden'), 50);
        }, 600);
      }
    });
  });
});
