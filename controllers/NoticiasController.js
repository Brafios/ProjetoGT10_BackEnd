const Noticia = require('../models/AssociationModel');

class NoticiaController {
    static async list(req, res) {
        try {
            const Noticias = await Noticia.findAll();
            res.status(200).json(Noticias);
        } catch (error) {
            res.status(500).json({ 
                error: 'Erro ao listar Noticias',
                details: error.message 
            });
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID da Noticia não fornecido' });
            }
            
            const noticia = await Noticia.findById(id);
            res.status(200).json(noticia);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ 
                    error: 'Erro ao buscar noticia',
                    details: error.message 
                });
            }
        }
    }

    static async create(req, res) {
        try {
            const noticia = await Noticia.create(req.body);
            res.status(201).json({
                message: 'Noticia criada com sucesso',
                data: noticia
            });
        } catch (error) {
            if (error.message.includes('obrigatório')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ 
                    error: 'Erro ao criar noticia',
                    details: error.message 
                });
            }
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID da noticia não fornecido' });
            }
            
            const noticia = await Noticia.update(id, req.body);
            res.status(200).json({
                message: 'Noticia atualizada com sucesso',
                data: noticia
            });
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                res.status(404).json({ error: error.message });
            } else if (error.message.includes('obrigatório')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ 
                    error: 'Erro ao atualizar noticia',
                    details: error.message 
                });
            }
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID da noticia não fornecido' });
            }
            
            await Noticia.delete(id);
            res.status(200).json({ message: 'Noticia deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ 
                error: 'Erro ao deletar noticia',
                details: error.message 
            });
        }
    }
}

module.exports = NoticiaController;