// carrinhoPage.js
import { Carrinho } from './carrinho.js';

function renderizarCarrinho() {
    const carrinho = Carrinho.getCarrinho();
    const container = document.getElementById('carrinho');
    container.innerHTML = '';

    carrinho.forEach(prod => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${prod.nome}</h3>
            <p>Preço: R$ ${(Number(prod.preco)).toFixed(2)
            }</p>
            <p>Quantidade: ${prod.quantidade}</p>
            <button>Remover</button>
        `;
        div.querySelector('button').addEventListener('click', () => {
            Carrinho.removeProduto(prod.id);
            renderizarCarrinho();
        });

        container.appendChild(div);
    });

    document.getElementById('total').textContent = Carrinho.getTotal().toFixed(2);
}

document.getElementById('limpar').addEventListener('click', () => {
    Carrinho.limparCarrinho();
    renderizarCarrinho();
});

renderizarCarrinho();
