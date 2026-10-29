const coletas = {
    coleta0 : [["R-A","R-B","R-C","R-D"],[50, 25, 10.5, 100], [0.2, 0.5, 0.6, 0.6, 0.7],["falha","falha","normal","normal"]],
    coleta1 : [["R-A","R-B","R-C","R-D"],[10, 15, 5.5, 10], [0.1, 0.3, 0.2, 0.3, 0.4],["falha","falha","falha","falha"]],
    coleta2 : [["R-A","R-B","R-C","R-D"],[20, 20, 9.5, 10], [0.2, 0.5, 0.6, 0.6, 0.7],["falha","falha","normal","falha"]]
};

function cards() {
    const main = document.querySelector(`main`)
    
    for (let i = 0; i < Object.keys(coletas).length; i++) {
        const card = document.createElement(`div`)
        card.id = `coleta${i}`
        card.classList.add(`card`)
        card.innerText = `Coleta ${i}`
        
        card.onclick = (evento) => {
            const clicado = evento.target.id;
            
            const indiceAtual = i; 
            
            if (clicado === Object.keys(coletas)[indiceAtual]) {

                const dadosColeta = coletas[clicado];
                
                localStorage.setItem('dadosVetor2', JSON.stringify(dadosColeta));
                
                window.location.href = "./index.html";
            }
        }
        
        main.appendChild(card);
    }
}


window.addEventListener('load', cards);