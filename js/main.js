
import { apiServicePublic } from './api.js';

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

            `;
            container.appendChild(div);
        });
    } catch (error) {
        container.innerHTML = `<p style="color:red;">Erro ao carregar produtos</p>`;
        console.error(error);
    }
}

carregarProdutos();
