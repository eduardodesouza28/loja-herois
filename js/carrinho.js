export const Carrinho = {
    key: 'meuCarrinho',

    // Recupera o carrinho do localStorage
    getCarrinho() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    },

    // Salva o carrinho no localStorage
    setCarrinho(carrinho) {
        localStorage.setItem(this.key, JSON.stringify(carrinho));
    },

    // Adiciona um produto
    addProduto(produto) {
        const carrinho = this.getCarrinho();
        const index = carrinho.findIndex(p => p.id === produto.id);

        if (index > -1) {
            carrinho[index].quantidade += 1;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }

        this.setCarrinho(carrinho);
    },

    // Remove um produto (ou diminui quantidade)
    removeProduto(produtoId) {
        let carrinho = this.getCarrinho();
        carrinho = carrinho.filter(p => p.id !== produtoId);
        this.setCarrinho(carrinho);
    },

    // Limpa o carrinho
    limparCarrinho() {
        localStorage.removeItem(this.key);
    },

    // Calcula o total
    getTotal() {
        return this.getCarrinho().reduce((total, p) => total + p.preco * p.quantidade, 0);
    }
};
