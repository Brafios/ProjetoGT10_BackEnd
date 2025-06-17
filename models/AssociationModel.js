const { supabse } = require('../config/supabase');

class Associaçao{

    static async findAll() {
        const{data, error} = await supabase
        .from('associacoes')
        .select('*');

        if (error) throw new Error(error.message);
        return data;
    }

    static async findById(id) {
        const {data, error} = await supabase
        .from('associacoes')
        .select('*')
        .eq('id', id)
        .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async create(associacaoData) {
        const {data, error} = await supabase
        .from('associacoes')
        .insert([associacaoData])
        .select()
        .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async update(id, associacaoData) {
        const { data, error } = await supabase
        .from('associacoes')
        .update(associacaoData)
        .eq('id', id)
        .select()
        .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async delete(id) {
        const{ error } = await supabase
        .from('associacoes')
        .delete()
        .eq('id', id);

        if (error) throw new Error (error.message);
        return true;
    }
}

module.exports = Associacao;