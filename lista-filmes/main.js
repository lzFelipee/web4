const filmes = [
    { id: 0, nome: 'Parasita' },
    { id: 1, nome: 'A Forma da Água' },
    { id: 2, nome: 'Moonlight: Sob a Luz do Luar' },
    { id: 3, nome: 'Spotlight: Segredos Revelados' },
    { id: 4, nome: '12 Anos de Escravidão' }
];

let filmesFavoritos = [];

const listaFilmes = document.getElementById('listaFilmes');
const btnAdicionar = document.querySelector('button');

function renderizarListaFilmes() {
    listaFilmes.innerHTML = '';

    filmes.forEach(filme => {
        const item = document.createElement('li');
        item.innerHTML = filme.nome;

        const iconeFavorito = document.createElement('img');
        iconeFavorito.src = filmesFavoritos.includes(filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
        iconeFavorito.style.cursor = 'pointer';
        iconeFavorito.style.width = '20px';

        iconeFavorito.addEventListener('click', () => {
            if (filmesFavoritos.includes(filme.id)) {
                filmesFavoritos = filmesFavoritos.filter(favId => favId !== filme.id);
                iconeFavorito.src = 'img/heart.svg';
            } else {
                filmesFavoritos.push(filme.id);
                iconeFavorito.src = 'img/heart-fill.svg';
            }

            localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
        });

        item.appendChild(iconeFavorito);
        listaFilmes.appendChild(item);
    });
}

window.onload = () => {
    const favoritosSalvos = localStorage.getItem('favoritos');
    if (favoritosSalvos) {
        filmesFavoritos = JSON.parse(favoritosSalvos);
    }
    renderizarListaFilmes();
};

btnAdicionar.addEventListener('click', () => {
    const inputFilme = document.getElementById('filmeInput').value;
    const novoFilme = { id: filmes.length, nome: inputFilme };

    filmes.push(novoFilme);
    renderizarListaFilmes();
    document.getElementById('filmeInput').value = '';
});