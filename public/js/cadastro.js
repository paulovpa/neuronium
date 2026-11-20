// =========================================================
// CADASTRO - validações do formulário e integração com a API
// Padrão web-data-viz: POST /usuarios/cadastrar
// =========================================================

// ---------- FUNÇÕES DE APOIO ----------

// mostra (ou limpa, se o texto for vazio) a mensagem de erro abaixo de um campo
function mostrarErroCampo(idInput, idErro, texto) {
    var input = document.getElementById(idInput);
    document.getElementById(idErro).innerHTML = texto;

    if (texto == "") {
        input.classList.remove("campo-invalido");
    } else {
        input.classList.add("campo-invalido");
        input.classList.remove("campo-valido");
    }
}

// mensagem geral, exibida abaixo do botão cadastrar
function mostrarMensagemFormulario(texto, tipo) {
    var elemento = document.getElementById("mensagem_formulario");
    elemento.innerHTML = texto;

    if (tipo == "") {
        elemento.className = "mensagem-formulario";
    } else {
        elemento.className = "mensagem-formulario mensagem-" + tipo;
    }
}

// ---------- NOME ----------

// espaços não contam: o nome precisa ter 3 ou mais caracteres depois do trim
function validarNome() {
    var nome = document.getElementById("input_nome").value.trim();

    if (nome == "") {
        mostrarErroCampo("input_nome", "erro_nome", "Preencha o seu nome.");
        return false;
    } else if (nome.length < 3) {
        mostrarErroCampo("input_nome", "erro_nome", "O nome precisa ter 3 ou mais caracteres.");
        return false;
    } else {
        mostrarErroCampo("input_nome", "erro_nome", "");
        return true;
    }
}

// ---------- E-MAIL ----------

// chamada ao sair do campo (onblur) e ao clicar em cadastrar.
// exigirPreenchido = true só no clique, para não acusar erro em quem apenas passou pelo campo
function validarEmail(exigirPreenchido) {
    var email = document.getElementById("input_email").value.trim();

    if (email == "") {
        if (exigirPreenchido == true) {
            mostrarErroCampo("input_email", "erro_email", "Preencha o seu e-mail.");
        } else {
            mostrarErroCampo("input_email", "erro_email", "");
        }
        return false;
    } else if (email.indexOf("@") == -1) {
        mostrarErroCampo("input_email", "erro_email", "Digite um e-mail válido, com @.");
        return false;
    } else {
        mostrarErroCampo("input_email", "erro_email", "");
        return true;
    }
}

// ---------- SENHA ----------

function validarSenha() {
    var senha = document.getElementById("input_senha").value;

    if (senha.trim() == "") {
        mostrarErroCampo("input_senha", "erro_senha", "Preencha a sua senha.");
        return false;
    } else {
        mostrarErroCampo("input_senha", "erro_senha", "");
        return true;
    }
}

function validarConfirmacao(exigirPreenchido) {
    var confirmacao = document.getElementById("input_confirmacao").value;

    if (confirmacao.trim() == "") {
        if (exigirPreenchido == true) {
            mostrarErroCampo("input_confirmacao", "erro_confirmacao", "Confirme a sua senha.");
        } else {
            mostrarErroCampo("input_confirmacao", "erro_confirmacao", "");
        }
        return false;
    } else {
        mostrarErroCampo("input_confirmacao", "erro_confirmacao", "");
        return true;
    }
}

// ---------- BOTÃO CADASTRAR ----------

// chamada pelo onsubmit do formulário (clique no botão ou tecla Enter).
// retorna false para o navegador não recarregar a página
function cadastrar() {
    // valido todos os campos (sem parar no primeiro) para mostrar todos os erros de uma vez
    var nomeValido = validarNome();
    var emailValido = validarEmail(true);
    var senhaValida = validarSenha();
    var confirmacaoValida = validarConfirmacao(true);

    if (nomeValido == false || emailValido == false || senhaValida == false || confirmacaoValida == false) {
        mostrarMensagemFormulario("Corrija os campos destacados para concluir o cadastro.", "erro");
        return false;
    }

    mostrarMensagemFormulario("", "");
    return false;
}
