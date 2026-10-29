window.addEventListener('load', () => {
    const vetorSalvo = localStorage.getItem('dadosVetor2');
    const culturasSalvas = localStorage.getItem('dadosCulturas');

    
    if (vetorSalvo && culturasSalvas) {
        const vetor2 = JSON.parse(vetorSalvo);
        const culturas = JSON.parse(culturasSalvas);

        
        console.log("Vetor carregado na página de alertas:", vetor2);

        
        criarTabelaAlertas(vetor2, culturas);
    } else {
        console.warn("Nenhum dado encontrado no armazenamento do navegador.");
    }
});


function criarTabelaAlertas(vetor2, culturas) {
    const main = document.querySelector(`main`);
    if (!main) return;

    const table = document.createElement(`table`);
    
    
    const trHeader = document.createElement(`tr`);
    const th1 = document.createElement(`th`);
    const th2 = document.createElement(`th`);
    th2.classList.add(`meio`)
    const th3 = document.createElement(`th`);
    th3.classList.add(`cantoR`)
    th1.innerText = "Cultura";
    th2.innerText = "Região";
    th3.innerText = "Situação";
    trHeader.append(th1, th2, th3);
    table.append(trHeader);

    
    for (let i = 0; i < vetor2[0].length; i++) {
        const tr = document.createElement(`tr`);
        const td = document.createElement(`td`);  
        const td2 = document.createElement(`td`); 
        const td3 = document.createElement(`td`); 
        
        td.innerText = `${culturas[i]}`;
        td2.innerText = `${vetor2[0][i]}`; 
        td3.innerText = `${vetor2[3][i]}`; 
        

        if (vetor2[3][i] === "falha") {
            td3.style.color = "red";
            td3.style.fontWeight = "bold";
        }
        
        tr.append(td, td2, td3);
        table.append(tr);
    }
    
    main.appendChild(table);
}
