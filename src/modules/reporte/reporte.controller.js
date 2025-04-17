const jwt = require('jsonwebtoken');
const { Reporte, Categoria, Status, InteracoesReporte, ComentarioReporte } = require('../../models');
const reporteService = require('../../services/reporteService');
const { verifyToken } = require('../../services/authService');
const path = require('path');

const corrigirCaminhoImagem = (caminho, tipo) => {
    if (!caminho) return null;
    if (caminho.startsWith(tipo + '/')) return caminho;
    if (caminho.includes(tipo)) return tipo + '/' + path.basename(caminho);
    return caminho;
};

exports.createReporte = async (req, res) =>{
    try {
        const decoded = verifyToken(req);
        const nomePerfil = decoded.nome;
        const fotoPerfil = decoded.fotoPerfil;
        const userId = decoded.id;

        const { descricaoReporte, localizacaoReporte, categoriasReporte, statusReporte } = req.body;

        const categoriaExistente = await Categoria.findOne({
            where: { categoriasReporte: categoriasReporte }
        });
        if (!categoriaExistente) {
            return res.status(400).json({ message: 'Categoria não encontrada.' });
        }

        // Verificar se o status existe
        const statusExistente = await Status.findOne({
            where: { statusReporte }
        });
        if (!statusExistente) {
            return res.status(400).json({ message: 'Status não encontrado.' });
        }

        // Pegar imagem do reporte enviada
        const imagemReporte = req.files.imagemReporte[0].path;

        const horarioReporte = new Date();
        const avaliacaoReporte = null;

        const novoReporte = await Reporte.create({
            fotoPerfil,
            nomePerfil,
            horarioReporte,
            localizacaoReporte,
            descricaoReporte,
            imagemReporte,
            avaliacaoReporte,
            categoriaReporte: categoriasReporte,
            statusReporte,
            userId
        });

        return res.status(201).json({
            message: 'Reporte criado com sucesso',
            data: novoReporte
        });
    } catch (error) {
        console.error('Erro ao criar reporte: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

exports.getReportes = async (req, res) => {
    try {
        verifyToken(req);

        // Buscar todos os reportes na tabela
        const reportes = await reporteService.getLikesandDislikes();

        return res.status(200).json({
            data: reportes
        });
    } catch (error) {
        console.error('Erro ao listar reportes: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

exports.getMyReportes = async (req, res) => {
    try {
        const decoded = verifyToken(req);
        const userId = decoded.id;

        // Buscar todos os reportes do usuário logado
        let reportes = await Reporte.findAll({ where: { userId } });

        // Corrigir os caminhos das imagens
        reportes = reportes.map(reporte => ({
            id: reporte.id,
            descricao: reporte.descricaoReporte,
            fotoPerfil: corrigirCaminhoImagem(reporte.fotoPerfil, 'fotosPerfil'),
            imagemReporte: corrigirCaminhoImagem(reporte.imagemReporte, 'uploads'),
            nomePerfil: reporte.nomePerfil,
            horarioReporte: reporte.horarioReporte,
            localizacaoReporte: reporte.localizacaoReporte,
            categoriaReporte: reporte.categoriaReporte,
            statusReporte: reporte.statusReporte,
            avaliacaoReporte: reporte.avaliacaoReporte,
            // Adicione outros campos necessários
        }));

        return res.status(200).json({
            data: reportes
        });
    } catch (error) {
        console.error('Erro ao listar reportes do usuário: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.avaliacaoReporte = async (req, res) => {
    try{
        verifyToken(req);

        const { idReporte, avaliacao } = req.body;

        // Verifica se o idReporte é um número
        if (!idReporte || typeof idReporte !== 'number') {
            return res.status(400).json({ message: 'ID do reporte inválido ou não fornecido.' });
        }

        // verifica se a avaliação é um número entre 0 e 5
        if (avaliacao === undefined || typeof avaliacao !== 'number' || avaliacao < 0 || avaliacao > 5) {
            return res.status(400).json({ message: 'Avaliação inválida. Deve ser um número entre 0 e 5.' });
        }

        // procura o reporte pelo id
        const reporte = await Reporte.findByPk(idReporte);
        if (!reporte) {
            return res.status(404).json({ message: 'Reporte não encontrado.' });
        }

        // Atualiza o campo de avaliação do reporte
        reporte.avaliacaoReporte = avaliacao;
        await reporte.save();

        return res.status(200).json({
            message: 'Avaliação atualizada com sucesso.',
            data: reporte
        });
    } catch (error) {
        console.error('Erro ao listar reportes: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

exports.interagirReporte = async (req, res) =>{
    try{
        const decoded = verifyToken(req);
        const userId = decoded.id;

        const { reporteId, } = req.params;
        const { tipo } = req.body; // like ou dislike

        if (!['like', 'dislike'].includes(tipo)){
            return res.status(400).json({ message: 'Tipo inválido.' });
        }

        const existing = await InteracoesReporte.findOne({
            where: { userId, reporteId }
        });

        let responseMessage = '';
        let interacao = null;

        if (!existing) {
            // nenhuma interação anterior, cria
            interacao = await InteracoesReporte.create({ userId, reporteId, tipo });
            responseMessage = `Interação '${tipo}' criada com sucesso.`;
        } else if (existing.tipo === tipo) {
            // mesmo tipo, remove interação
            await existing.destroy();
            responseMessage = `Interação '${tipo}' removida com sucesso.`;
        } else {
            // Tipo diferente — atualiza para o novo tipo
            await existing.update({ tipo });
            interacao = existing;
            responseMessage = `Interação atualizada de '${existing.tipo}' para '${tipo}'.`;
        }

        res.status(200).json({
            message: responseMessage,
            data: interacao
        });
    } catch (err) {
        console.error('Erro na interação:', err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

exports.comentarioReporte = async (req, res) => {
    try {
        const decoded = verifyToken(req);
        const userId = decoded.id;

        const { reporteId, } = req.params;
        const { comentario } = req.body;

        await ComentarioReporte.create({
            comentario,
            userId,
            reporteId
        });

        res.status(200).json({
            message: 'Comentário criado com sucesso',
            data: {
                comentario,
                userId,
                reporteId
            }
        });
    } catch (err) {
        console.error('Erro na criação de comentário:', err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}