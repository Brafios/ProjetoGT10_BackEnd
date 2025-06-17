require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

const supabase = createClient(apiUrl, apiKey);

module.exports = supabase;