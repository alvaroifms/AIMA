export function tabelaC(vetor, vetor2, vetor3) {

    const c = document.querySelector(`#culturas`);
    

    let table = c.querySelector(`#tabela-cultura`);
    if (!table) {
        table = document.createElement(`table`);
        table.id = `tabela-cultura`; 
    } else {
        table.innerHTML = ''; 
    }

  
    const tr = document.createElement(`tr`);
    const th = document.createElement(`th`);
    const th2 = document.createElement(`th`);
    const th3 = document.createElement(`th`);

    th.innerText = `Culturas`;
    th2.innerText = `Recorte`;
    th3.innerText = `Situação`;
    th2.classList.add(`meio`)
    th3.classList.add(`cantoR`)
    
    
    
    tr.append(th, th2, th3);
    table.append(tr);

    
    for (let i = 0; i < vetor.length; i++) {
        const tr2 = document.createElement(`tr`);  
        const td = document.createElement(`td`);   
        const td2 = document.createElement(`td`);  
        const td3 = document.createElement(`td`); 
        
        td.innerText = `${vetor2[i]}`;
        td2.innerText = `${vetor[i]}`;
        td3.innerText = `${vetor3[i]}`
        
        tr2.append(td, td2, td3);
        table.append(tr2);
    }

    
    c.appendChild(table);
}