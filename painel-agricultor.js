const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

if (!usuarioLogado || usuarioLogado.tipo !== 'agricultor') { 
    alert("Acesso restrito! Faça login como agricultor.") 
    window.location.href = "login.html"
}

document.querySelector('#boas-vindas').innerText = `Bem-vindo, ${usuarioLogado.nome}!`

document.querySelector('#logout').onclick = () => { 
    localStorage.removeItem('usuarioLogado') 
    window.location.href = "login.html"
}

const btnNovoRecorte = document.querySelector('#btn-novo-recorte')
const containerRecorte = document.querySelector('#container-recorte')
const btnSalvarRecorte = document.querySelector('#salvar-recorte')
const btnCancelarRecorte = document.querySelector('#cancelar-recorte')
const listaRecortes = document.querySelector('#lista-recortes')
const secaoRetorno = document.querySelector('#visualizar-retorno')
const btnFecharRetorno = document.querySelector('#btn-fechar-retorno')

let mapa = null
let mapaRetorno = null
let drawControl = null
let drawnItems = null
let camadaDesenhada = null 
let camadaRetornoAtual = null

btnNovoRecorte.onclick = () => { 
    containerRecorte.style.display = 'block' 
    secaoRetorno.style.display = 'none'
    if (!mapa) { 
        inicializarMapa() 
    } else { 
        mapa.invalidateSize() 
    }
}

btnCancelarRecorte.onclick = () => { 
    containerRecorte.style.display = 'none' 
    limparFormulario()
}

btnFecharRetorno.onclick = () => {
    secaoRetorno.style.display = 'none'
}

function inicializarMapa() { 
    mapa = L.map('mapa').setView([-21.1718, -44.9922], 15) // Atualizado para a coordenada do milho em Lavras

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 19, 
        attribution: '© OpenStreetMap' 
    }).addTo(mapa) 

    drawnItems = new L.FeatureGroup() 
    mapa.addLayer(drawnItems) 

    drawControl = new L.Control.Draw({ 
        draw: { 
            polygon: true, 
            rectangle: true, 
            polyline: false, 
            circle: false, 
            marker: false, 
            circlemarker: false 
        }, 
        edit: { 
            featureGroup: drawnItems 
        } 
    }) 
    mapa.addControl(drawControl) 

    mapa.on(L.Draw.Event.CREATED, function (e) { 
        drawnItems.clearLayers() 
        camadaDesenhada = e.layer 
        drawnItems.addLayer(camadaDesenhada) 
    })
}

btnSalvarRecorte.onclick = () => { 
    const nomePropriedade = document.querySelector('#nome-propriedade').value.trim() 
    const cultura = document.querySelector('#cultura').value.trim() 
    
    if (!nomePropriedade || !cultura) { 
        alert("Preencha o nome da propriedade e a cultura!") 
        return 
    } 
    if (!camadaDesenhada) { 
        alert("Por favor, desenhe uma área/recorte no mapa antes de salvar!") 
        return 
    } 

    const coordenadas = camadaDesenhada.toGeoJSON() 

    const novoRecorte = { 
        id: Date.now(), 
        cpfAgricultor: usuarioLogado.cpf, 
        nomeAgricultor: usuarioLogado.nome, 
        telefoneAgricultor: usuarioLogado.telefone, 
        nomePropriedade, 
        cultura, 
        coordenadas, 
        parecerTecnico: null,
        nomeAgronomo: null,
        dataParecer: null,
        pdfAnexo: null,
        dataCriacao: new Date().toLocaleDateString('pt-BR') 
    } 

    const recortesExistentes = JSON.parse(localStorage.getItem('recortes')) || [] 
    recortesExistentes.push(novoRecorte) 
    localStorage.setItem('recortes', JSON.stringify(recortesExistentes)) 

    alert("Recorte saved com sucesso e enviado ao agrônomo!") 
    containerRecorte.style.display = 'none' 
    limparFormulario() 
    carregarRecortesDoUsuario()
}

function limparFormulario() { 
    document.querySelector('#nome-propriedade').value = '' 
    document.querySelector('#cultura').value = '' 
    if (drawnItems) drawnItems.clearLayers() 
    camadaDesenhada = null
}

function carregarRecortesDoUsuario() { 
    listaRecortes.innerHTML = '' 
    const recortes = JSON.parse(localStorage.getItem('recortes')) || [] 
    
    // CORREÇÃO: Ajustado de usuarioLoado para usuarioLogado
    const meusRecortes = recortes.filter(r => r.cpfAgricultor === usuarioLogado.cpf) 

    if (meusRecortes.length === 0) { 
        listaRecortes.innerHTML = '<p>Você ainda não cadastrou nenhum recorte de área.</p>' 
        return 
    } 

    meusRecortes.forEach(recorte => { 
        const card = document.createElement('div') 
        card.style.border = '1px solid #ddd' 
        card.style.padding = '10px' 
        card.style.marginBottom = '10px' 
        card.style.borderRadius = '5px' 

        const statusLaudo = recorte.parecerTecnico ? `<span style="color: green; font-weight: bold;">Análise Concluída</span>` : `<span style="color: orange; font-weight: bold;">Aguardando Agrônomo</span>`;

        card.innerHTML = ` 
            <h4>${recorte.nomePropriedade} - ${statusLaudo}</h4> 
            <p><strong>Cultura:</strong> ${recorte.cultura}</p> 
            <p><strong>Data de Envio:</strong> ${recorte.dataCriacao}</p> 
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button onclick="verLaudo(${recorte.id})" style="flex: 2; cursor: pointer; padding: 5px;">Visualizar Mapa e Parecer</button>
                <button onclick="apagarRecorte(${recorte.id})" style="flex: 1; background-color: #ff3b30; color: white; border: none; border-radius: 3px; cursor: pointer; padding: 5px;">Excluir</button>
            </div>
        ` 
        listaRecortes.appendChild(card) 
    })
}

// ADICIONADO: Função para excluir o chamado com prompt antiqueda
window.apagarRecorte = function(idRecorte) {
    const recortes = JSON.parse(localStorage.getItem('recortes')) || []
    const oRecorte = recortes.find(r => r.id === idRecorte)

    if (!oRecorte) return

    const confirmarExclusao = confirm(`Tem certeza de que deseja apagar o recorte da área "${oRecorte.nomePropriedade}"? Esta ação removerá a solicitação do painel do agrônomo.`);

    if (confirmarExclusao) {
        const novaLista = recortes.filter(r => r.id !== idRecorte)
        localStorage.setItem('recortes', JSON.stringify(novaLista))
        secaoRetorno.style.display = 'none'
        alert("Recorte excluído com sucesso!")
        carregarRecortesDoUsuario()
    }
}

// ADICIONADO: Função que desenha o mapa da área enviada e o PDF na tela do produtor
window.verLaudo = function(idRecorte) {
    const recortes = JSON.parse(localStorage.getItem('recortes')) || []
    const oRecorte = recortes.find(r => r.id === idRecorte)

    if (!oRecorte) return

    containerRecorte.style.display = 'none'
    secaoRetorno.style.display = 'block'
    
    document.querySelector('#v-titulo').innerText = `Talhão: ${oRecorte.nomePropriedade}`
    
    const divParecer = document.querySelector('#v-parecer')
    if (oRecorte.parecerTecnico) {
        let htmlBotoes = `<h4>Parecer do Dr(a). ${oRecorte.nomeAgronomo} (${oRecorte.dataParecer}):</h4><p>${oRecorte.parecerTecnico}</p><br>`;
        
        if (oRecorte.pdfAnexo) {
            htmlBotoes += `
                <a href="${oRecorte.pdfAnexo}" download="Relatorio_Tecnico_${oRecorte.nomePropriedade}.pdf" style="display: inline-block; background-color: green; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 0.9rem; margin-top: 10px;">
                    📥 Baixar Relatório Técnico Completo (PDF)
                </a>`;
        } else {
            htmlBotoes += `<p><small style="color: #666;">Nenhum anexo em PDF foi incluído neste parecer.</small></p>`;
        }
        
        divParecer.innerHTML = htmlBotoes;
    } else {
        divParecer.innerHTML = `<h4>Status:</h4><p>Este talhão ainda está na fila de análise do laboratório agronômico.</p>`
    }

    if (!mapaRetorno) {
        mapaRetorno = L.map('mapa-retorno')
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(mapaRetorno)
    }

    if (camadaRetornoAtual) {
        mapaRetorno.removeLayer(camadaRetornoAtual)
    }

    camadaRetornoAtual = L.geoJSON(oRecorte.coordenadas, {
        style: { color: 'blue', weight: 3, fillOpacity: 0.2 }
    }).addTo(mapaRetorno)

    mapaRetorno.fitBounds(camadaRetornoAtual.getBounds())
    setTimeout(() => mapaRetorno.invalidateSize(), 200)
    secaoRetorno.scrollIntoView({ behavior: 'smooth' })
}

carregarRecortesDoUsuario()
