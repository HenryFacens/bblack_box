const jwt = require('jsonwebtoken');

const { Categoria } = require('../../models');
const { verifyToken } = require('../../services/authService');

exports.listCategorias = async (req, res) => {
    try {
        verifyToken(req);
        
        const categorias = await Categoria.findAll({
            attributes: ['categoriasReporte']
        });

        if (!categorias) {
            return res.status(404).json({ message: 'Categorias não encontradas' });
        }

        const categoriasList = categorias.map(item => item.categoriasReporte);
        return res.status(200).json({
            data: categoriasList
        });

    } catch (error) {
        console.error('Erro ao listar categorias: ', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}

exports.createCategoria = async (req, res) => {
    try{
        const decoded = verifyToken(req);
        const role = decoded.role;

        const categoriasReporte = req.body;
        // Verifica se o usuário é admin
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Somente administradores podem criar categorias.' });
        }
        const newCategoria = await Categoria.create(categoriasReporte);

        return res.status(201).json(newCategoria);

    } catch (error) {
        console.error('Erro ao cadastrar nova categoria: ', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}

exports.deleteCategoria = async (req, res) => {
    try {
        const decoded = verifyToken(req);
        const role = decoded.role;
        
        const { id } = req.params;
        // Verifica se o usuário é admin
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Somente administradores podem deletar categorias.' });
        }

        // Verificar se o ID foi fornecido
        if (!id) {
            return res.status(400).json({ message: 'ID da categoria não fornecido' });
        }

        try {
            // Verificar se a categoria existe no banco de dados
            const categoria = await Categoria.findByPk(id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            // Deletar a categoria
            await categoria.destroy();
            return res.status(200).json({ message: 'Categoria deletada com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar categoria: ', error);
            return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        }
    } catch (error) {
        console.error('Erro ao deletar categoria: ', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}