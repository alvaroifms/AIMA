const form = document.querySelector(`#login`)
const cadastrar = document.querySelector(`#cadastrar`)

form.onsubmit = (event) => {
    event.preventDefault() 

    const cpf = document.querySelector(`#cpf-login`).value.trim()
    const senha = document.querySelector(`#senha-login`).value

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuarioEncontrado = usuarios.find(u => u.cpf === cpf && u.senha === senha)

    if (!usuarioEncontrado) {
        alert("CPF ou senha incorretos! Verifique os dados ou crie uma conta.")
        return
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado))

    alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`)

    // FLUXO CORRIGIDO: O Agrônomo agora vai primeiro para a lista de solicitações
    if (usuarioEncontrado.tipo === 'agronomo') {
        window.location.href = "painel-agronomo.html" 
    } else if (usuarioEncontrado.tipo === 'agricultor') {
        window.location.href = "painel-agricultor.html" 
    }
}

cadastrar.onclick = () => {
    window.location.href = "cadastrar.html" 
}
