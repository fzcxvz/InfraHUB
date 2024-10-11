// Create a chart for energy consumption
const ctx = document.getElementById('energyChart').getContext('2d');
const energyChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['02:00', '02:30', '03:00', '03:30', '04:00'],
        datasets: [{
            label: 'Energy Consumption',
            data: [60, 80, 72, 50, 68],
            backgroundColor: ['#ffab40', '#ffab40', '#ffab40', '#ffab40', '#ffab40'],
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
