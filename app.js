const verificarSessao = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!verificarSessao) {
    window.location.href = "login.html"; // Se não tem ninguém logado, expulsa para o login
} else if (verificarSessao.tipo === 'agronomo' && !localStorage.getItem('recorteEmAnalise')) {
    window.location.href = "painel-agronomo.html"; // Se é agrônomo mas não escolheu nenhum card ainda, volta para a triagem
} else if (verificarSessao.tipo === 'agricultor') {
    window.location.href = "painel-agricultor.html"; // Se for agricultor, manda para o painel dele
}

import { graficoNDVI } from "./components/graficoNdvi.js"
import { graficoDH } from "./components/graficoDh.js"
import { tabelaC } from "./components/tabelaCulturas.js"
import { iniciarMapaNDVI } from "./components/mapaNdvi.js"
import { parecerTecnico } from "./components/parecerT.js"

const main = document.querySelector(`main`)
const ha = document.querySelector(`#historico-alertas`)
const da = document.querySelector(`#dados-agricultor`)
const pi = document.querySelector(`#painel-inicial`)
const cp = document.querySelector(`#coletas-passadas`)
const graficoBaixo = document.querySelector(`#grafico-baixo`)
const graficoCima = document.querySelector(`#grafico-cima`)
const informacoes = document.querySelector(`#informacoes`)

const vetorPadrao = [["R-A","R-B","R-C","R-D"],[50, 25, 10.5, 100], [0.2, 0.5, 0.6, 0.6, 0.7],["falha","falha","normal","normal"]];

const coletaSalva = localStorage.getItem('dadosVetor2');

export const vetor2 = coletaSalva ? JSON.parse(coletaSalva) : vetorPadrao;

export const culturas = ["milho-safrinha", "milho-safrinha", "milho-safrinha", "milho-safrinha"]

ha.onclick = () => { window.location.href = "./historico-alertas.html" }
da.onclick = () => { window.location.href = "./dados-agricultor.html" }
pi.onclick = () => { window.location.href = "./index.html" }
cp.onclick = () => { window.location.href = "./coletas-passadas.html" }

window.addEventListener('load', () => {
    try {
        
        graficoNDVI(vetor2[2]);
        graficoDH(vetor2);
        tabelaC(vetor2[0], culturas, vetor2[3]);
        parecerTecnico();
    } catch (erroGraficos) {
        console.error("Erro ao carregar os gráficos/tabela:", erroGraficos);
    }
    
    const scriptLeaflet = document.getElementById('script-leaflet');

    if (typeof L !== 'undefined') {
        iniciarMapaNDVI();
    } else if (scriptLeaflet) {
        scriptLeaflet.addEventListener('load', () => {
            console.log("Leaflet carregado com sucesso via evento!");
            iniciarMapaNDVI();
        });
    } else {
        console.error("A tag de script do Leaflet não foi encontrada no HTML.");
    }
});

    const inputPdf = document.getElementById('upload-pdf');
    const nomeArquivoSpan = document.getElementById('nome-arquivo');
    const btnSalvarParecer = document.getElementById('btn-salvar-parecer');
    const textoParecer = document.getElementById('texto-parecer');

    let pdfBase64 = null;

    if (inputPdf && nomeArquivoSpan) {
        inputPdf.addEventListener('change', (evento) => {
            const arquivo = evento.target.files[0];
            if (arquivo) {
                nomeArquivoSpan.innerText = `Arquivo anexado: ${arquivo.name}`;
                nomeArquivoSpan.style.color = "green";
                nomeArquivoSpan.style.fontWeight = "bold";

                // Converte o arquivo PDF em Base64 para salvar no localStorage
                const reader = new FileReader();
                reader.onload = (e) => { pdfBase64 = e.target.result; };
                reader.readAsDataURL(arquivo);
            }
        });
    }

    if (btnSalvarParecer) {
        btnSalvarParecer.onclick = () => {
            const recorteEmAnalise = JSON.parse(localStorage.getItem('recorteEmAnalise'));
            const laudoTexto = textoParecer.value.trim();

            if (!recorteEmAnalise) {
                alert("Nenhum talhão selecionado para análise!");
                return;
            }
            if (!laudoTexto) {
                alert("Por favor, digite o parecer antes de enviar.");
                return;
            }

            // Atualiza o banco global de recortes
            const recortes = JSON.parse(localStorage.getItem('recortes')) || [];
            const index = recortes.findIndex(r => r.id === recorteEmAnalise.id);

            if (index !== -1) {
                recortes[index].parecerTecnico = laudoTexto;
                recortes[index].nomeAgronomo = JSON.parse(localStorage.getItem('usuarioLogado')).nome;
                recortes[index].dataParecer = new Date().toLocaleDateString('pt-BR');
                recortes[index].pdfAnexo = pdfBase64; // Guarda o binário do PDF

                localStorage.setItem('recortes', JSON.stringify(recortes));
                alert("Parecer Técnico e Relatório PDF enviados com sucesso ao agricultor!");
                
                // Limpa a análise atual e volta para a triagem do agrônomo
                localStorage.removeItem('recorteEmAnalise');
                window.location.href = "painel-agronomo.html";
            }
        };
    }
