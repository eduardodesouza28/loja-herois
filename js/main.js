// js/main.js

import { apiService } from './api.js';
import Produto from './produto.js';
import { renderizarProdutos } from './ui.js';
import { handleAdicionarProduto, handleExcluirProduto } from './admin.js';

/**
 * Inicializa a aplicação.
 */
async function init() {
    console.log("Aplicação iniciada.");

    // Se estiver na página principal, carrega e renderiza os produtos
    if (document.querySelector('.produtos')) {
        try {
            const dados = await apiService.fetchProdutos();
            console.log("Produtos carregados:", dados);
            if (!Array.isArray(dados)) {
                throw new Error("Dados recebidos não são um array.");
            }
            const produtos = dados.map(item => new Produto(item.id, item.nome, item.codigo, item.preco, item.link, item.descricao, item.imagemUrl));
            renderizarProdutos(produtos);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    // Se estiver na página de administração, configura os eventos
    if (document.getElementById('form-produto')) {
        document.getElementById('form-produto').addEventListener('submit', handleAdicionarProduto);
        // Exemplo: Botão de exclusão (você precisará criar a interface)
        // document.getElementById('botao-excluir-1').addEventListener('click', () => handleExcluirProduto(1));
    }
}

document.addEventListener('DOMContentLoaded', init);