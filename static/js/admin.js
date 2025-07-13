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
});
