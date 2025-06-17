const Associacao = require('../models/AssociationModel');

class AssociacaoController {

    static async list(req, res) {
        const associacoes = await Associacao.findAll();
        res.json({ success: true, data: associacoes});

    }

    static async show(req , res ) {
        const associacao = await Associacao.findById(req.params.id);

        if (!associacao) {
            return res.status(404).json({ success: false, message: 'Associação não encontrada'})
        }

        res.json({ success: true, data: associacao});
    }

    static async create(req , res) {
        const associacao = await Associacao.create(req.body);
        res.status(201).json({ success: true, data: associacao});
    }

    static async update(req , res) {
        const associacao = await Associacao.update(req.body);
        
        if (!associacao) {
           return res.status(404).json({ success: false, message: 'Associação não encontrada' });
        }

        res.json({ success: true , data: associacao});
    }

    static async delete(req, res) {
        await Associacao.delete(req.params.id);
        res.json({ success: true, message: 'Associação deletada com sucesso'});
    }
}

module.exports = AssociacaoController;