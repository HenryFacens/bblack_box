const { Categoria } = require('../../models');

class CategoriaService {
    async listarCategorias() {
        const categorias = await Categoria.findAll({
            attributes: ['categoriasReporte']
        });

        if (!categorias) {
            throw new Error('Categorias não encontradas');
        }

        return categorias.map(item => item.categoriasReporte);
    }

    async criarCategoria(categoriaData) {
        return await Categoria.create(categoriaData);
    }

    async deletarCategoria(id) {
        if (!id) {
            const error = new Error('ID da categoria não fornecido');
            error.status = 400;
            throw error;
        }

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            const error = new Error('Categoria não encontrada');
            error.status = 404;
            throw error;
        }

        await categoria.destroy();
        return true;
    }
}

module.exports = CategoriaService;