import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Mejor práctica: usar variables de entorno o un archivo de configuración
// que no se incluya en el control de versiones
const supabaseUrl = 'https://rsufdpyzwhaqzaienrhk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdWZkcHl6d2hhcXphaWVucmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjk1MDEsImV4cCI6MjA2MDg0NTUwMX0.8PX9UQz61PoZpF5fSTWy8vMisJvajMl4m9dpy66-4Z8';

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);