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

// classificação atual da senha: "vazia", "fraca", "media" ou "forte"
var forcaSenhaAtual = "vazia";

// vetores paralelos: id do item da lista e o texto que ele mostra
var idsRequisitos = ["req_tamanho", "req_maiuscula", "req_numero", "req_especial"];
var textosRequisitos = [
    "No mínimo 8 caracteres",
    "Uma letra maiúscula",
    "Um número",
    "Um caractere especial (!@#$...)"
];

// percorre a senha caractere por caractere (laço for) e devolve um vetor
// com true/false para cada requisito, na mesma ordem de idsRequisitos
function analisarSenha(senha) {
    var temMaiuscula = false;
    var temNumero = false;
    var temEspecial = false;

    for (var i = 0; i < senha.length; i++) {
        var caractere = senha[i];

        if (caractere >= "A" && caractere <= "Z") {
            temMaiuscula = true;
        } else if (caractere >= "0" && caractere <= "9") {
            temNumero = true;
        } else if (caractere == " ") {
            // espaço não conta como caractere especial
        } else if (caractere.toLowerCase() == caractere.toUpperCase()) {
            // letras mudam entre maiúscula e minúscula; símbolos não mudam,
            // então se ficou igual, é um caractere especial (!, @, #, ...)
            temEspecial = true;
        }
    }

    var temTamanho = senha.length >= 8;

    return [temTamanho, temMaiuscula, temNumero, temEspecial];
}

// chamada a cada tecla digitada no campo senha (oninput)
function atualizarForcaSenha() {
    var senha = document.getElementById("input_senha").value;
    var requisitos = analisarSenha(senha);
    var quantidadeAtendida = 0;

    // atualiza a lista de requisitos abaixo do campo
    for (var i = 0; i < requisitos.length; i++) {
        var item = document.getElementById(idsRequisitos[i]);

        if (requisitos[i] == true) {
            quantidadeAtendida++;
            item.className = "requisito-ok";
            item.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + textosRequisitos[i];
        } else {
            item.className = "";
            item.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ' + textosRequisitos[i];
        }
    }

    // classificação: até 2 requisitos = fraca, 3 = média, 4 = forte
    var barra = document.getElementById("barra_forca_preenchimento");
    var texto = document.getElementById("texto_forca");

    if (senha == "") {
        forcaSenhaAtual = "vazia";
        barra.className = "barra-forca-preenchimento";
        texto.className = "texto-forca";
        texto.innerHTML = "";
    } else if (quantidadeAtendida <= 2) {
        forcaSenhaAtual = "fraca";
        barra.className = "barra-forca-preenchimento forca-fraca";
        texto.className = "texto-forca forca-fraca";
        texto.innerHTML = "Senha fraca";
    } else if (quantidadeAtendida == 3) {
        forcaSenhaAtual = "media";
        barra.className = "barra-forca-preenchimento forca-media";
        texto.className = "texto-forca forca-media";
        texto.innerHTML = "Senha média";
    } else {
        forcaSenhaAtual = "forte";
        barra.className = "barra-forca-preenchimento forca-forte";
        texto.className = "texto-forca forca-forte";
        texto.innerHTML = "Senha forte";
        mostrarErroCampo("input_senha", "erro_senha", "");
    }
}

// só permite o cadastro quando a senha for forte
function validarSenha() {
    var senha = document.getElementById("input_senha").value;

    if (senha.trim() == "") {
        mostrarErroCampo("input_senha", "erro_senha", "Preencha a sua senha.");
        return false;
    } else if (forcaSenhaAtual != "forte") {
        mostrarErroCampo("input_senha", "erro_senha", "A senha precisa ser forte para concluir o cadastro.");
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
