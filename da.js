const agricultor = {
    nome: "João da Silva Sauro",
    cpf: "123.456.789-00",
    propriedade: "Fazenda Recanto do Milho",
    localizacao: "Lavras - MG",
    totalHectares: "150 ha",
    safraAtual: "Milho Safrinha 2026",
    statusConta: "Ativo",
    contato: "(35) 99999-8888"
};

renderizarPerfil()

function renderizarPerfil() {
    const container = document.querySelector(`#container-agricultor`);
    if (!container) return;

    // 1. LÓGICA DINÂMICA: Verifica se o agrônomo está analisando o recorte de algum cliente ativo
    const recorteSalvo = localStorage.getItem('recorteEmAnalise');
    
    // Objeto base que servirá de modelo
    let agricultor = {
        nome: "Produtor Padrão Demo",
        cpf: "000.000.000-00",
        propriedade: "Fazenda Demonstrativa",
        localizacao: "Lavras - MG",
        totalHectares: "120 ha",
        safraAtual: "Cultura Geral",
        statusConta: "Ativo",
        contato: "(35) 90000-0000"
    };

    // 2. Se houver um recorte em análise, substituímos os dados fixos pelos dados REAIS do dono do recorte!
    if (recorteSalvo) {
        const recorte = JSON.parse(recorteSalvo);
        
        agricultor.nome = recorte.nomeAgricultor;
        agricultor.cpf = recorte.cpfAgricultor || "123.456.789-00"; // Puxa do cadastro do cliente
        agricultor.propriedade = recorte.nomePropriedade;
        agricultor.localizacao = "Lavras - MG"; // Região focal da lavoura de milho
        agricultor.totalHectares = "150 ha";
        agricultor.safraAtual = recorte.cultura; // Mostra se é Milho, Soja, etc.
        agricultor.statusConta = "Ativo / Premium";
        agricultor.contato = recorte.telefoneAgricultor || "(35) 99999-8888";
    }

    // 3. Monta a estrutura visual idêntica com os dados injetados dinamicamente
    const perfilBox = document.createElement('div');
    perfilBox.id = 'perfil-box';

    perfilBox.innerHTML = `
        <div class="perfil-header">
            <div class="avatar-simulado"></div>
            <h2>Ficha do Produtor Rural</h2>
        </div>
        <div class="perfil-dados">
            <p><strong>Nome Completo:</strong> ${agricultor.nome}</p>
            <p><strong>CPF:</strong> ${agricultor.cpf}</p>
            <p><strong>Nome da Propriedade:</strong> ${agricultor.propriedade}</p>
            <p><strong>Localização:</strong> ${agricultor.localizacao}</p>
            <p><strong>Área Total Disponível:</strong> ${agricultor.totalHectares}</p>
            <p><strong>Cultura em Campo:</strong> ${agricultor.safraAtual}</p>
            <p><strong>Telefone de Contato:</strong> ${agricultor.contato}</p>
            <p><strong>Status do Cadastro:</strong> <span class="badge-status">${agricultor.statusConta}</span></p>
        </div>
    `;

    container.appendChild(perfilBox);
}

