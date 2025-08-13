// js/admin.js

import { apiService } from './api.js';

export async function handleAdicionarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('produto').value;
    const descricao = document.getElementById('descricao').value;
    const codigo = document.getElementById('codigo').value;
    const preco = parseFloat(document.getElementById('preco').value.replace(',', '.'));
    const link = document.getElementById('linkAmazon').value;
    // Lógica para obter a imagem do campo 'file' e enviar para a API
    const imagemUrl = document.getElementById('linkAmazon').value; // Exemplo simplificado
    
    // Supondo que o backend irá gerar o ID
    const novoProduto = { nome, codigo, preco, link, descricao, imagemUrl };

    try {
        const resultado = await apiService.addProduto(novoProduto);
        alert("Dados inseridos com Sucesso!");
        // Opcional: recarregar a lista de produtos no painel de admin
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        alert("Erro ao adicionar produto.");
    }
}

export async function handleExcluirProduto(produtoId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            const resultado = await apiService.deleteProduto(produtoId);
            if (resultado.success) {
                alert('Produto excluído com sucesso!');
                // Opcional: remover o produto da interface sem recarregar a página
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            alert("Erro ao excluir produto.");
        }
    }
}