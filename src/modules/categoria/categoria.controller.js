class CategoriaController {
    constructor(categoriaService, errorHandler) {
        this.categoriaService = categoriaService;
        this.errorHandler = errorHandler;
    }

    async listCategorias(req, res) {
        try {
            const categorias = await this.categoriaService.listarCategorias();
            return res.status(200).json({ data: categorias });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao listar categorias');
        }
    }

    async createCategoria(req, res) {
        try {
            const userId = req.user.id; // Já verificado pelo middleware
            const newCategoria = await this.categoriaService.criarCategoria(req.body);
            return res.status(201).json(newCategoria);
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao cadastrar nova categoria');
        }
    }

    async deleteCategoria(req, res) {
        try {
            const { id } = req.params;
            await this.categoriaService.deletarCategoria(id);
            return res.status(200).json({ message: 'Categoria deletada com sucesso' });
        } catch (error) {
            return this.errorHandler.handleError(error, res, 'Erro ao deletar categoria');
        }
    }
}

module.exports = CategoriaController;