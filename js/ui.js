// js/ui.js

/**
 * Cria a interface do usuário.
 */
export function renderizarProdutos(produtos) {
    const container = document.querySelector('.produtos');
    if (!container) return;

    container.innerHTML = '';
    produtos.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.className = 'produto';

        divProduto.innerHTML = `
            <img src="${produto.imagemUrl}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p class="preco">${produto.getPrecoFormatado()}</p>
            <p>${produto.descricao}</p>
            <button onclick="window.compra(${produto.id})">Comprar</button>
            <button onclick="window.abreLink('${produto.link}')">Ver na Amazon</button>
        `;
        container.appendChild(divProduto);
    });
}''