let instanciaGraficoDH = null;

export function graficoDH(vetor) {
    const canvas = document.getElementById('grafico-dh');
    
    if (!canvas) return; 


    if (instanciaGraficoDH) {
        instanciaGraficoDH.destroy();
    }


    instanciaGraficoDH = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: vetor[0], 
            datasets: [{
                label: 'ETp(mm)',
                data: vetor[1], 
                backgroundColor: '#0000FF', 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 250,
                    ticks: {
                        stepSize: 50,
                        
                        forcedStepSize: 50, 
                        callback: function(value) {
                            
                            return value.toFixed(2).replace('.', ',');
                        }
                    }
                }
            }
        }
    });
}
