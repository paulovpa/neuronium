// =========================================================
// INÍCIO - destaca no header o link da seção que está na tela
// O conteúdo das seções já está escrito no HTML; este script
// só muda a aparência do link (classe "active" do menu-item).
// =========================================================

// vetor com os ids de TODAS as seções, na ordem da página.
// Mesmo as que não têm link no header entram aqui: assim, quando
// o usuário passa da seção "A Conexão", o link dela deixa de ficar ativo.
var idsSecoes = [
    "boas_vindas",
    "universo",
    "neurociencia",
    "jornada",
    "conexao",
    "feiticos",
    "palacio",
    "game",
    "dashboard"
];

// descobre qual seção está aparecendo na tela agora
function descobrirSecaoAtual() {
    var secaoAtual = idsSecoes[0];

    for (var i = 0; i < idsSecoes.length; i++) {
        var secao = document.getElementById(idsSecoes[i]);

        // getBoundingClientRect().top = distância entre o topo da seção e o topo da tela.
        // Considero a seção "atual" quando o topo dela já passou da metade da tela.
        if (secao != null && secao.getBoundingClientRect().top <= window.innerHeight / 2) {
            secaoAtual = idsSecoes[i];
        }
    }

    return secaoAtual;
}

// coloca a classe "active" só no link que aponta para a seção atual
function marcarLinkAtivo() {
    var secaoAtual = descobrirSecaoAtual();

    // só os links do header que levam para uma seção desta página (começam com "#")
    var links = document.querySelectorAll('#menu_itens a[href^="#"]');

    for (var i = 0; i < links.length; i++) {
        // o estilo "active" fica no <li> (pai do link), igual ao do header pré-login
        var itemMenu = links[i].parentElement;

        if (links[i].getAttribute("href") == "#" + secaoAtual) {
            itemMenu.classList.add("active");
        } else {
            itemMenu.classList.remove("active");
        }
    }
}

// confere a cada rolagem e também quando a página termina de carregar
window.addEventListener("scroll", marcarLinkAtivo);
document.addEventListener("DOMContentLoaded", marcarLinkAtivo);
