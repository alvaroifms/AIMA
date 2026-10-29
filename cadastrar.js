const form = document.querySelector(`#cadastro`)
const voltar = document.querySelector(`#voltar`)

form.onsubmit = (event) => {
    event.preventDefault()

    const tipo = document.querySelector(`#tipo-usuario`).value
    const nome = document.querySelector(`#nome-cadastro`).value.trim()
    const cpf = document.querySelector(`#cpf`).value.trim()
    const telefone = document.querySelector(`#telefone`).value.trim()
    const senha = document.querySelector(`#senha-cadastro`).value

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    const usuarioExistente = usuarios.find(u => u.cpf === cpf)
    if (usuarioExistente) {
        alert("Já existe uma conta cadastrada com este CPF!")
        return
    }

    const novoUsuario = { 
        tipo, 
        nome, 
        cpf, 
        telefone, 
        senha,
        propriedade: tipo === "agricultor" ? "Fazenda Recanto do Milho" : "N/A",
        localizacao: tipo === "agricultor" ? "Lavras - MG" : "N/A",
        totalHectares: tipo === "agricultor" ? "150 ha" : "N/A",
        safraAtual: tipo === "agricultor" ? "Milho Safrinha 2026" : "N/A",
        statusConta: "Ativo / Premium"
    }
    
    usuarios.push(novoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))

    alert("O seu cadastro foi realizado com sucesso!") 
    window.location.href = "login.html"
}

voltar.onclick = () => {
    window.location.href = "login.html" 
}
