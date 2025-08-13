// // js/admin.js

// import { apiService } from './api.js';

// export async function handleAdicionarProduto(event) {
//     event.preventDefault();

//     const nome = document.getElementById('produto').value;
//     const descricao = document.getElementById('descricao').value;
//     const codigo = document.getElementById('codigo').value;
//     const preco = parseFloat(document.getElementById('preco').value.replace(',', '.'));
//     const link = document.getElementById('linkAmazon').value;
//     // Lógica para obter a imagem do campo 'file' e enviar para a API
//     const imagemUrl = document.getElementById('linkAmazon').value; // Exemplo simplificado
    
//     // Supondo que o backend irá gerar o ID
//     const novoProduto = { nome, codigo, preco, link, descricao, imagemUrl };

//     try {
//         const resultado = await apiService.addProduto(novoProduto);
//         alert("Dados inseridos com Sucesso!");
//         // Opcional: recarregar a lista de produtos no painel de admin
//     } catch (error) {
//         console.error("Erro ao adicionar produto:", error);
//         alert("Erro ao adicionar produto.");
//     }
// }

// export async function handleExcluirProduto(produtoId) {
//     if (confirm('Tem certeza que deseja excluir este produto?')) {
//         try {
//             const resultado = await apiService.deleteProduto(produtoId);
//             if (resultado.success) {
//                 alert('Produto excluído com sucesso!');
//                 // Opcional: remover o produto da interface sem recarregar a página
//             }
//         } catch (error) {
//             console.error("Erro ao excluir produto:", error);
//             alert("Erro ao excluir produto.");
//         }
//     }
// }
import { apiService } from './api.js';

async function carregarProdutos() {
    const container = document.querySelector('.produtos');
    container.innerHTML = '<p>Carregando...</p>';

    try {
        const dados = await apiService.fetchProdutos();
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
                <button data-id="${p.id}" class="excluir">Excluir</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        container.innerHTML = `<p style="color:red;">Erro ao carregar produtos</p>`;
        console.error(error);
    }
}

document.getElementById('form-produto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const produto = {
        nome: document.getElementById('produto').value,
        descricao: document.getElementById('descricao').value,
        codigo: document.getElementById('codigo').value,
        preco: parseFloat(document.getElementById('preco').value.replace(',', '.')),
        link_amazon: document.getElementById('linkAmazon').value,
        imagem_url: document.getElementById('imagemUrl').value
    };

    try {
        await apiService.addProduto(produto);
        alert('Produto adicionado com sucesso!');
        e.target.reset();
        carregarProdutos();
    } catch (error) {
        alert('Erro ao adicionar produto.');
        console.error(error);
    }
});

document.querySelector('.produtos').addEventListener('click', async (e) => {
    if (e.target.classList.contains('excluir')) {
        const id = e.target.dataset.id;
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await apiService.deleteProduto(id);
                alert('Produto excluído com sucesso!');
                carregarProdutos();
            } catch (error) {
                alert('Erro ao excluir produto.');
                console.error(error);
            }
        }
    }
});

carregarProdutos();

