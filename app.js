import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Estas variables las configuraremos en Vercel luego
const supabaseUrl = 'TU_URL_DE_SUPABASE'
const supabaseKey = 'TU_LLAVE_ANON_DE_SUPABASE'
const supabase = createClient(supabaseUrl, supabaseKey)

const btn = document.getElementById('btnEnviar');

btn.addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;

    const { error } = await supabase
        .from('mensajes') // Crearemos esta tabla ahora
        .insert([{ nombre, mensaje }]);

    if (error) console.error(error);
    else alert('¡Mensaje enviado!');
});