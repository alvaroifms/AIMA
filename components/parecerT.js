export function parecerTecnico(){
 const inputPdf = document.getElementById('upload-pdf');
    const nomeArquivoSpan = document.getElementById('nome-arquivo');

    if (inputPdf && nomeArquivoSpan) {
        inputPdf.addEventListener('change', (evento) => {
            const arquivos = evento.target.files;
            
            if (arquivos.length > 0) {
                nomeArquivoSpan.innerText = `Arquivo anexado: ${arquivos[0].name}`;
                nomeArquivoSpan.style.color = "green";
                nomeArquivoSpan.style.fontWeight = "bold";
            } else {
                nomeArquivoSpan.innerText = "Nenhum arquivo selecionado";
                nomeArquivoSpan.style.color = "#666";
                nomeArquivoSpan.style.fontWeight = "normal";
            }
        });
    }
}