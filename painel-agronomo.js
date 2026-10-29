const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

if (!usuarioLogado || usuarioLogado.tipo !== 'agronomo') {
    alert("Acesso negado! Faça login com uma conta de Agrônomo.")
    window.location.href = "login.html"
}

document.querySelector('#boas-vindas').innerText = `Painel do Agrônomo - ${usuarioLogado.nome}`

document.querySelector('#logout').onclick = () => {
    localStorage.removeItem('usuarioLogado')
    window.location.href = "login.html"
}

const containerRecortes = document.querySelector('#container-recortes-recebidos')

function carregarRecortesRecebidos() {
    containerRecortes.innerHTML = ''
    const recortes = JSON.parse(localStorage.getItem('recortes')) || []

    if (recortes.length === 0) {
        containerRecortes.innerHTML = '<p>Nenhum recorte de área foi enviado até o momento.</p>'
        return
    }

    recortes.forEach(recorte => {
        const card = document.createElement('div')
        card.style.border = '1px solid #ccc'
        card.style.padding = '15px'
        card.style.marginBottom = '10px'
        card.style.borderRadius = '5px'

        const statusParecer = recorte.parecerTecnico ? 'Analisado' : 'Pendente de Análise'

        card.innerHTML = `
            <h4>${recorte.nomePropriedade} <small>(${statusParecer})</small></h4>
            <p><strong>Agricultor:</strong> ${recorte.nomeAgricultor} | <strong>Telefone:</strong> ${recorte.telefoneAgricultor || 'Não informado'}</p>
            <p><strong>Cultura:</strong> ${recorte.cultura} | <strong>Data de Envio:</strong> ${recorte.dataCriacao}</p>
            <button onclick="analisarRecorte(${recorte.id})">Analisar Área</button>
        `
        containerRecortes.appendChild(card)
    })
}

window.analisarRecorte = function(idRecorte) {
    const recortes = JSON.parse(localStorage.getItem('recortes')) || []
    const recorteSelecionado = recortes.find(r => r.id === idRecorte)

    if (!recorteSelecionado) return

    localStorage.setItem('recorteEmAnalise', JSON.stringify(recorteSelecionado))
    
    const vetorSimulado = [
        ["R-A","R-B","R-C","R-D"],
        [35, 45, 12.5, 85], 
        [0.4, 0.6, 0.7, 0.5, 0.8], 
        ["falha", "normal", "normal", "falha"]
    ]
    localStorage.setItem('dadosVetor2', JSON.stringify(vetorSimulado))

    window.location.href = "index.html"
}

carregarRecortesRecebidos()
