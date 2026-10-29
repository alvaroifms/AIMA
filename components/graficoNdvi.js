
export function graficoNDVI(vetor) {
    const ctx = document.getElementById('grafico-ndvi');
    
    if (!ctx) return; 

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5'], 
            datasets: [{
                label: 'Média NDVI',
                data: vetor, 
                borderColor: '#ff0000',
                backgroundColor: '#ff0000l',
                borderWidth: 3,
                tension: 0.2,
                pointBackgroundColor: '#ff0000',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 1,
                    ticks: {
                        stepSize: 0.10,
                        callback: function(value) {
                            return value.toFixed(2).replace('.', ',');
                        }
                    }
                }
            }
        }
    });
}