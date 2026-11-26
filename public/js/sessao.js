// =========================================================
// SESSÃO - protege as páginas internas do site
// Incluído no <head> de cada página, antes do conteúdo,
// para redirecionar quem não fez login sem mostrar a página.
// Os dados são gravados pelo js/login.js após a autenticação.
//
// Páginas públicas (index, login e cadastro) declaram, antes deste script:
//     <script>var PAGINA_PUBLICA = true;</script>
// Nelas ninguém é redirecionado: o script só mostra no header
// Entrar/Cadastrar (visitante) ou Sair (logado).
// =========================================================

// caminhos absolutos (/), pois algumas páginas estão em subpastas (ex.: dashboard/)
var CAMINHO_LOGIN = "/login.html";
var CAMINHO_INDEX = "/index.html";

// true só quando a página declarou PAGINA_PUBLICA antes deste script
var paginaPublica = typeof PAGINA_PUBLICA != "undefined" && PAGINA_PUBLICA == true;

// confere se há alguém logado nesta aba
function estaLogado() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var nomeUsuario = sessionStorage.NOME_USUARIO;

    return idUsuario != undefined && nomeUsuario != undefined;
}

function validarSessao() {
    if (estaLogado() == false) {
        // replace: a página protegida não fica no histórico do botão "voltar"
        window.location.replace(CAMINHO_LOGIN);
        return false;
    }

    return true;
}

// marca o <html> com "usuario-logado" ou "visitante".
// O header.css usa essa classe para esconder os itens que não valem agora
// (.so-logado e .so-visitante), antes mesmo de a página aparecer.
function marcarEstadoLogin() {
    if (estaLogado() == true) {
        document.documentElement.classList.add("usuario-logado");
    } else {
        document.documentElement.classList.add("visitante");
    }
}

// coloca o nome de quem entrou nos lugares da página que exibem o nome
function exibirNomeUsuario() {
    var nomeUsuario = sessionStorage.NOME_USUARIO;
    var idsNome = ["nome_usuario", "nome_ola"];

    for (var i = 0; i < idsNome.length; i++) {
        var elemento = document.getElementById(idsNome[i]);

        if (elemento != null) {
            // textContent: o nome é exibido como texto, nunca como HTML
            elemento.textContent = nomeUsuario;
        }
    }
}

// chamada pelo botão Sair do header: apaga os dados de quem entrou
function limparSessao() {
    sessionStorage.removeItem("ID_USUARIO");
    sessionStorage.removeItem("NOME_USUARIO");
    sessionStorage.removeItem("EMAIL_USUARIO");

    window.location.replace(CAMINHO_INDEX);
}

marcarEstadoLogin();

if (paginaPublica == true || validarSessao() == true) {
    if (estaLogado() == true) {
        // espera o HTML carregar para conseguir encontrar os elementos
        document.addEventListener("DOMContentLoaded", exibirNomeUsuario);
    }
}
