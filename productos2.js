import { supabase } from './supabase-client.js';

// Funciones para manejar operaciones de productos
export async function cargarProductosDestacados(categoriaSeleccionada = null) {  // 🚀 NUEVO parámetro
  try {
    let query = supabase.from('productos').select('*').limit(40);

    if (categoriaSeleccionada) {
      query = query.eq('categoria', categoriaSeleccionada); // 🚀 Si hay categoría, filtramos
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error al cargar productos:', error.message);
    return [];
  }
}

export async function insertarProducto(producto) {
  try {
    const { data, error } = await supabase
      .from('productos')
      .insert([producto]);

    if (error) throw error;

    console.log('✅ Producto insertado con éxito:', data);
    return data;
  } catch (error) {
    console.error('❌ Error al insertar producto:', error.message);
    throw error;
  }
}

// Inicializar y cargar productos cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await inicializarProductos();
  } catch (error) {
    console.error('Error al inicializar productos:', error);
  }
});

// 🚀 NUEVO: Función para inicializar con selección de categoría
async function inicializarProductos() {
  const selectCategoria = document.createElement('select');
  selectCategoria.id = 'categoriaSelect';
  selectCategoria.style.margin = '20px 0';
  selectCategoria.innerHTML = `
    <option value="">Todas las categorías</option>
    <option value="Tecnologia">Tecnologia</option>
    <option value="Ropa">Ropa</option>
    <option value="Comida">Comida</option>
    <option value="Hogar">Hogar</option>
    <option value="Deporte">Deporte</option>
  `;

  const section = document.querySelector('section');
  section.insertBefore(selectCategoria, section.children[1]); // Insertamos antes del grid

  selectCategoria.addEventListener('change', async function() {
    const productos = await cargarProductosDestacados(this.value || null);
    mostrarProductos(productos);
  });

  const productos = await cargarProductosDestacados();
  mostrarProductos(productos);
}

// Función para mostrar los productos en la UI
function mostrarProductos(productos) {
  const contenedor = document.querySelector('.grid, [style*="grid-template-columns"]');

  if (!contenedor || productos.length === 0) {
    contenedor.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No se encontraron productos.</p>';
    return;
  }

  // Limpiar contenedor
  contenedor.innerHTML = '';

  // Agregar cada producto
  productos.forEach(producto => {
    const productoHTML = `
      <div style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        <img src="${producto.imagen_url || '/api/placeholder/400/320'}" alt="${producto.nombre}" style="width: 100%; height: 200px; object-fit: contain; background: #f9f9f9;">
        <div style="padding: 15px;">
          <h3 style="font-size: 1.2em; margin-bottom: 10px;">${producto.nombre}</h3>
          <p style="color: #555;">${producto.descripcion}</p>
          <p style="color: #d4141a; font-weight: bold; margin-top: 10px;">S/ ${producto.precio.toFixed(2)}</p>
          <button onclick="location.href='detalle.html?id=${producto.id}'" 
          style="margin-top: 10px; background: #d4141a; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Ver más</button>
        </div>
      </div>
    `;

    contenedor.innerHTML += productoHTML;
  });
}
