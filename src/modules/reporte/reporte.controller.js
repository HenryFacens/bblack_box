const jwt = require('jsonwebtoken');
const { Reporte, Categoria, Status, InteracoesReporte, ComentarioReporte } = require('../../models');
const reporteService = require('../../services/reporteService');

exports.createReporte = async (req, res) =>{
    try {
        // Pegar token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
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
        // Pegar token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        // Verificar e decodificar o token
        jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');

        // Buscar todos os reportes na tabela
        //const reportes = await Reporte.findAll();
        const reportes = await reporteService.getLikesandDislikes();

        return res.status(200).json({
            data: reportes
        });
    } catch (error) {
        console.error('Erro ao listar reportes: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}

exports.avaliacaoReporte = async (req, res) => {
    try{
        // Pegar token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        // Verificar e decodificar o token
        jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');

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
        // Pegar token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
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
        // Pegar token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
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