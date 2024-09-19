function adicionarProdutoCarrinho(produtoId, produtoNome, produtoValor, produtoQuantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const itemExistente = carrinho.find(item => item.id === produtoId);
    if (itemExistente) {
        itemExistente.quantidade += produtoQuantidade;
    } else {
        carrinho.push({ id: produtoId, nome: produtoNome, valor: produtoValor, quantidade: produtoQuantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function removerProdutoCarrinho(produtoId) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.id !== produtoId);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaItens = document.getElementById('lista-carrinho');
    listaItens.innerHTML = '';

    if (carrinho.length > 0) {
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.nome} - Quantidade: ${item.quantidade} - Valor: R$ ${item.valor.toFixed(2)}
                <button class="btn remover" onclick="removerProdutoCarrinho(${item.id})">Remover</button>
            `;
            listaItens.appendChild(li);
        });
    } else {
        listaItens.innerHTML = 'O carrinho está vazio!';
    }
}

function adicionarPeloFormularioCarrinho() {
    const produtoId = parseInt(document.getElementById('idProduto').value);
    const produtoNome = document.getElementById('nomeProduto').value;
    const produtoValor = parseFloat(document.getElementById('valorProduto').value);
    const produtoQuantidade = parseInt(document.getElementById('quantidadeProduto').value);

    if (!isNaN(produtoId) && produtoNome && !isNaN(produtoValor) && !isNaN(produtoQuantidade)) {
        adicionarProdutoCarrinho(produtoId, produtoNome, produtoValor, produtoQuantidade);
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

atualizarCarrinho();