const supabase = require('../config/supabase');

class Associacao {
    static async findAll() {
        const { data, error } = await supabase
            .from('associacoes')
            .select('*')
            .order('cidade', { ascending: true });

        if (error) throw new Error(`Falha ao buscar associações: ${error.message}`);
        return data;
    }

    static async findById(id) {
        if (!id) throw new Error('ID não fornecido');

        const { data, error } = await supabase
            .from('associacoes')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(`Falha ao buscar associação: ${error.message}`);
        if (!data) throw new Error('Associação não encontrada');
        return data;
    }

    static async create(associacaoData) {

        if (!associacaoData.nome) throw new Error('Nome é obrigatório');
        if (!associacaoData.cnpj) throw new Error('CNPJ é obrigatório');

        const { data, error } = await supabase
            .from('associacoes')
            .insert([associacaoData])
            .select('id, nome, cnpj, email, data_fundacao')
            .single();

        if (error) throw new Error(`Falha ao criar associação: ${error.message}`);
        return data;
    }

    static async update(id, associacaoData) {
        if (!id) throw new Error('ID não fornecido');

        const { data, error } = await supabase
            .from('associacoes')
            .update(associacaoData)
            .eq('id', id)
            .select('id, nome, cnpj, email, data_fundacao')
            .single();

        if (error) throw new Error(`Falha ao atualizar associação: ${error.message}`);
        if (!data) throw new Error('Associação não encontrada');
        return data;
    }

    static async delete(id) {
        if (!id) throw new Error('ID não fornecido');

        const { error } = await supabase
            .from('associacoes')
            .delete()
            .eq('id', id);

        if (error) throw new Error(`Falha ao deletar associação: ${error.message}`);
        return true;
    }
}

module.exports = Associacao;
