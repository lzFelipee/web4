function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoExistente = carrinho.find(produto => produto.id === id);
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({ id, nome, valor, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}
                <button onclick="removerProduto(${produto.id})">Remover</button>
            `;
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

function adicionarPeloFormulario() {
    const id = parseInt(document.getElementById('idProduto').value);
    const nome = document.getElementById('nomeProduto').value;
    const valor = parseFloat(document.getElementById('valorProduto').value);
    const quantidade = parseInt(document.getElementById('quantidadeProduto').value);

    if (!isNaN(id) && nome && !isNaN(valor) && !isNaN(quantidade)) {
        adicionarProduto(id, nome, valor, quantidade);
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

exibirCarrinho();