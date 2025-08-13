import { apiService } from './api.js';
import Produto from './produto.js';
import { renderizarProdutos } from './ui.js';

async function init() {
    if (document.querySelector('.produtos')) {
        try {
            const dados = await apiService.fetchProdutos();
            const produtos = dados.map(
                item => new Produto(item.id, item.nome, item.codigo, parseFloat(item.preco), item.link_amazon, item.descricao, item.imagem_url)
            );
            renderizarProdutos(produtos);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
