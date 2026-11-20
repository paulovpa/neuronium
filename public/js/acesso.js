// =========================================================
// CADASTRO E LOGIN
// Como ainda não tenho banco de dados, guardo os usuários no
// localStorage do navegador, em 3 VETORES PARALELOS:
//   nomes[0], emails[0] e senhas[0] são da mesma pessoa.
// O localStorage só guarda texto, então uso JSON.stringify
// para transformar o vetor em texto e JSON.parse para voltar.
// (Quando tiver back-end, isso vai para o banco.)
// =========================================================

var nomes = [];
var emails = [];
var senhas = [];

// carrega os vetores salvos (se ainda não existir nada, ficam vazios)
function carregarUsuarios() {
    var nomesSalvos = localStorage.getItem("neuronium_nomes");
    if (nomesSalvos != null) {
        nomes = JSON.parse(nomesSalvos);
        emails = JSON.parse(localStorage.getItem("neuronium_emails"));
        senhas = JSON.parse(localStorage.getItem("neuronium_senhas"));
    }
}

function mostrarMensagem(texto, tipo) {
    var elemento = document.getElementById("mensagem");
    elemento.innerHTML = texto;
    elemento.className = "mensagem mensagem-" + tipo;
}

// ---------- CADASTRO ----------
function cadastrar() {
    var nome = document.getElementById("input_nome").value.trim();
    var email = document.getElementById("input_email").value.trim().toLowerCase();
    var senha = document.getElementById("input_senha").value;
    var confirmacao = document.getElementById("input_confirmacao").value;

    carregarUsuarios();

    // procuro se o e-mail já existe (-1 = não achei)
    var posicaoExistente = -1;
    for (var i = 0; i < emails.length; i++) {
        if (emails[i] == email) {
            posicaoExistente = i;
        }
    }

    // validações, da mais simples para a mais específica
    if (nome == "" || email == "" || senha == "" || confirmacao == "") {
        mostrarMensagem("Preencha todos os campos.", "erro");
    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        mostrarMensagem("Digite um e-mail válido (com @ e ponto).", "erro");
    } else if (senha.length < 6) {
        mostrarMensagem("A senha precisa ter pelo menos 6 caracteres.", "erro");
    } else if (senha != confirmacao) {
        mostrarMensagem("As senhas não são iguais.", "erro");
    } else if (posicaoExistente != -1) {
        mostrarMensagem("Esse e-mail já tem cadastro. Tente entrar.", "erro");
    } else {
        // tudo certo: coloco a pessoa no fim dos 3 vetores
        nomes.push(nome);
        emails.push(email);
        senhas.push(senha);

        localStorage.setItem("neuronium_nomes", JSON.stringify(nomes));
        localStorage.setItem("neuronium_emails", JSON.stringify(emails));
        localStorage.setItem("neuronium_senhas", JSON.stringify(senhas));

        mostrarMensagem("Conta criada! Indo para o login...", "ok");
        window.location.href = "login.html";
    }
}

// ---------- LOGIN ----------
function entrar() {
    var email = document.getElementById("input_email").value.trim().toLowerCase();
    var senha = document.getElementById("input_senha").value;

    carregarUsuarios();

    var posicao = -1;
    for (var i = 0; i < emails.length; i++) {
        if (emails[i] == email) {
            posicao = i;
        }
    }

    if (email == "" || senha == "") {
        mostrarMensagem("Preencha e-mail e senha.", "erro");
    } else if (posicao == -1) {
        mostrarMensagem("Não encontrei esse e-mail. Crie uma conta.", "erro");
    } else if (senhas[posicao] != senha) {
        mostrarMensagem("Senha incorreta.", "erro");
    } else {
        // guardo quem entrou; as outras páginas leem isso no global.js
        sessionStorage.setItem("nomeUsuario", nomes[posicao]);
        sessionStorage.setItem("emailUsuario", emails[posicao]);
        window.location.href = "inicio.html";
    }
}
