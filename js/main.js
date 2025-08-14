import { apiServicePublic } from './api.js';
import { Carrinho } from './carrinho.js';

function atualizarContadorCarrinho() {
    const contador = Carrinho.getCarrinho().reduce((total, p) => total + p.quantidade, 0);
    document.getElementById('contador-carrinho').textContent = contador;
}

async function carregarProdutos() {
    const container = document.querySelector('.produtos');
    container.innerHTML = '<p>Carregando...</p>';

    try {
        const dados = await apiServicePublic.fetchProdutos();
        container.innerHTML = '';

        if (dados.length === 0) {
            container.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            return;
        }

        dados.forEach(p => {
            const div = document.createElement('div');
            div.classList.add('produto-item');
            div.innerHTML = `
                <img src="${p.imagem_url}" alt="${p.nome}" width="100">
                <h3>${p.nome}</h3>
                <p>${p.descricao}</p>
                <p><strong>R$ ${parseFloat(p.preco).toFixed(2)}</strong></p>
                <button>Adicionar ao carrinho</button>
            `;

            div.querySelector('button').addEventListener('click', () => {
                Carrinho.addProduto(p);
                atualizarContadorCarrinho(); // atualiza o contador
            });

            container.appendChild(div);
        });

        atualizarContadorCarrinho(); // inicializa contador ao carregar produtos
    } catch (error) {
        container.innerHTML = `<p style="color:red;">Erro ao carregar produtos</p>`;
        console.error(error);
    }
}

carregarProdutos();
