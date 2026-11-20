// =========================================================
// SESSÃO - protege as páginas internas do site
// Incluído no <head> de cada página interna, antes do conteúdo,
// para redirecionar quem não fez login sem mostrar a página.
// Os dados são gravados pelo js/login.js após a autenticação.
// =========================================================

// caminhos absolutos (/), pois algumas páginas estão em subpastas (ex.: dashboard/)
var CAMINHO_LOGIN = "/login.html";
var CAMINHO_INDEX = "/index.html";

function validarSessao() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var nomeUsuario = sessionStorage.NOME_USUARIO;

    if (idUsuario == undefined || nomeUsuario == undefined) {
        // replace: a página protegida não fica no histórico do botão "voltar"
        window.location.replace(CAMINHO_LOGIN);
        return false;
    }

    return true;
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

if (validarSessao() == true) {
    // espera o HTML carregar para conseguir encontrar os elementos
    document.addEventListener("DOMContentLoaded", exibirNomeUsuario);
}
