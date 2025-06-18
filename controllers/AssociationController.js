const Associacao = require('../models/AssociationModel');

class AssociacaoController {
    static async list(req, res) {
        try {
            const associacoes = await Associacao.findAll();
            res.status(200).json(associacoes);
        } catch (error) {
            res.status(500).json({ 
                error: 'Erro ao listar associações',
                details: error.message 
            });
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID da associação não fornecido' });
            }
            
            const associacao = await Associacao.findById(id);
            res.status(200).json(associacao);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ 
                    error: 'Erro ao buscar associação',
                    details: error.message 
                });
            }
        }
    }

    static async create(req, res) {
        try {
            const associacao = await Associacao.create(req.body);
            res.status(201).json({
                message: 'Associação criada com sucesso',
                data: associacao
            });
        } catch (error) {
            if (error.message.includes('obrigatório')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ 
                    error: 'Erro ao criar associação',
                    details: error.message 
                });
            }
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID da associação não fornecido' });
            }
            
            const associacao = await Associacao.update(id, req.body);
            res.status(200).json({
                message: 'Associação atualizada com sucesso',
                data: associacao
            });
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else if (error.message.includes('obrigatório')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ 
                    error: 'Erro ao atualizar associação',
                    details: error.message 
                });
            }
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID da associação não fornecido' });
            }
            
            await Associacao.delete(id);
            res.status(200).json({ message: 'Associação deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ 
                error: 'Erro ao deletar associação',
                details: error.message 
            });
        }
    }
}

module.exports = AssociacaoController;