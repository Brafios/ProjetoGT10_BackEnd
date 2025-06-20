const supabase = require('../config/supabase');

class Noticia{

    static async findAll() {
        const{data, error} = await supabase
        .from('noticias')
        .select('*');

        if (error) throw new Error(error.message);
        return data;
    }

    static async findById(id) {
        const {data, error} = await supabase
        .from('noticias')
        .select('*')
        .eq('id', id)
        .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async create(noticiaData) {
        const {data, error} = await supabase
        .from('noticias')
        .insert([noticiaData])
        .select()
        .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async update(id, noticiaData) {
        const { data, error } = await supabase
        .from('noticias')
        .update(noticiaData)
        .eq('id', id)
        .select()
        .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async delete(id) {
        const{ error } = await supabase
        .from('noticias')
        .delete()
        .eq('id', id);

        if (error) throw new Error (error.message);
        return true;
    }
}

module.exports = Noticia;