// =========================================================
// LOGIN - validações do formulário e integração com a API
// Padrão web-data-viz: POST /usuarios/autenticar
// =========================================================

// ---------- FUNÇÕES DE APOIO ----------

function mostrarErroCampo(idInput, idErro, texto) {
    var input = document.getElementById(idInput);
    document.getElementById(idErro).innerHTML = texto;

    if (texto == "") {
        input.classList.remove("campo-invalido");
    } else {
        input.classList.add("campo-invalido");
    }
}

// mensagem geral, exibida abaixo do botão entrar
function mostrarMensagemFormulario(texto, tipo) {
    var elemento = document.getElementById("mensagem_formulario");
    elemento.innerHTML = texto;

    if (tipo == "") {
        elemento.className = "mensagem-formulario";
    } else {
        elemento.className = "mensagem-formulario mensagem-" + tipo;
    }
}

// alterna o campo entre "password" (escondido) e "text" (visível) e troca o ícone
function alternarSenha(idInput, botao) {
    var input = document.getElementById(idInput);

    if (input.type == "password") {
        input.type = "text";
        botao.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        botao.setAttribute("aria-label", "Esconder senha");
    } else {
        input.type = "password";
        botao.innerHTML = '<i class="fa-solid fa-eye"></i>';
        botao.setAttribute("aria-label", "Mostrar senha");
    }
}

// ---------- VALIDAÇÕES ----------

function validarCamposLogin() {
    var email = document.getElementById("input_email").value.trim();
    var senha = document.getElementById("input_senha").value;
    var valido = true;

    if (email == "") {
        mostrarErroCampo("input_email", "erro_email", "Preencha o seu e-mail.");
        valido = false;
    } else if (email.indexOf("@") == -1) {
        mostrarErroCampo("input_email", "erro_email", "Digite um e-mail válido, com @.");
        valido = false;
    } else {
        mostrarErroCampo("input_email", "erro_email", "");
    }

    // espaços não contam como campo preenchido
    if (senha.trim() == "") {
        mostrarErroCampo("input_senha", "erro_senha", "Preencha a sua senha.");
        valido = false;
    } else {
        mostrarErroCampo("input_senha", "erro_senha", "");
    }

    return valido;
}

// ---------- CARREGAMENTO (evita clique duplo) ----------

var loginEmAndamento = false;

function iniciarCarregamento() {
    var botao = document.getElementById("botao_entrar");
    loginEmAndamento = true;
    botao.disabled = true;
    botao.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';
}

function finalizarCarregamento() {
    var botao = document.getElementById("botao_entrar");
    loginEmAndamento = false;
    botao.disabled = false;
    botao.innerHTML = "Entrar";
}

// ---------- INTEGRAÇÃO COM A API ----------

function enviarLogin(email, senha) {
    iniciarCarregamento();

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // os nomes abaixo são os mesmos lidos em usuarioController.autenticar
            emailServer: email,
            senhaServer: senha
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (json) {
                    // guarda quem entrou; js/sessao.js lê esses dados nas páginas internas
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.EMAIL_USUARIO = json.email;

                    window.location.href = "index.html";
                });
            } else if (resposta.status == 403) {
                // mensagem genérica: não revela se o erro foi no e-mail ou na senha
                mostrarMensagemFormulario("E-mail ou senha incorretos.", "erro");
                finalizarCarregamento();
            } else {
                throw "Houve um erro ao tentar realizar o login! Status: " + resposta.status;
            }
        })
        .catch(function (erro) {
            // API fora do ar ou erro no banco
            console.log("#ERRO: " + erro);
            mostrarMensagemFormulario("O sistema está indisponível. Atualize a página e tente novamente.", "erro");
            finalizarCarregamento();
        });
}

// ---------- BOTÃO ENTRAR ----------

// chamada pelo onsubmit do formulário (clique no botão ou tecla Enter).
// retorna false para o navegador não recarregar a página
function entrar() {
    // ignora novos envios enquanto o anterior não terminou
    if (loginEmAndamento == true) {
        return false;
    }

    if (validarCamposLogin() == false) {
        mostrarMensagemFormulario("", "");
        return false;
    }

    mostrarMensagemFormulario("", "");

    var email = document.getElementById("input_email").value.trim().toLowerCase();
    var senha = document.getElementById("input_senha").value;

    enviarLogin(email, senha);
    return false;
}
