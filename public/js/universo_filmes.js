// carrossel dos filmes do Universo Mágico

var carrosselFilmes = document.getElementById('carrossel_filmes');

// direcao: -1 volta (seta da esquerda) e 1 avança (seta da direita).
// Rola a largura visível do carrossel, ou seja, uma "tela" de filmes por clique;
// o scroll-snap do CSS acerta a parada para começar exatamente num filme.
function passarFilmes(direcao) {
    carrosselFilmes.scrollBy({ left: direcao * carrosselFilmes.clientWidth });
}
