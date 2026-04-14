import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 1. Configuración (Copia estos datos de Supabase > Settings > API)
const supabaseUrl = 'https://elmqmqxjhinzwiatvxwk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbXFtcXhqaGluendpYXR2eHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNDA1NTUsImV4cCI6MjA5MTYxNjU1NX0.6KySiOMV1bIDn2z_gArUYCXJJMf7BEzcot2T14UrlIs'
const supabase = createClient(supabaseUrl, supabaseKey)

// 2. Referencias al HTML
const btn = document.getElementById('btnEnviar');
const nombreInput = document.getElementById('nombre');
const mensajeInput = document.getElementById('mensaje');

btn.addEventListener('click', async () => {
    // Capturamos los valores actuales de los inputs
    const nombre = nombreInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    // Validación básica
    if (!nombre || !mensaje) {
        alert('Por favor, completa ambos campos.');
        return;
    }

    // Feedback visual: desactivamos el botón mientras se envía
    btn.disabled = true;
    btn.innerText = 'Enviando...';

    try {
        // 3. Inserción en la tabla 'mensajes'
        // No enviamos 'id' ni 'fecha' porque Supabase los genera solos
        const { error } = await supabase
            .from('mensajes')
            .insert([
                { 
                    nombre: nombre, 
                    mensaje: mensaje 
                }
            ]);

        if (error) {
            throw error;
        }

        // Si todo sale bien
        alert('¡Mensaje enviado con éxito!');
        nombreInput.value = ''; // Limpiamos los campos
        mensajeInput.value = '';

    } catch (error) {
        console.error('Error al insertar:', error.message);
        alert('Hubo un error: ' + error.message);
    } finally {
        // Reestablecemos el botón pase lo que pase
        btn.disabled = false;
        btn.innerText = 'Enviar';
    }
});
