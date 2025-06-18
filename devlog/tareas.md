## Landing Page ##

**Visual**

    - Diseño Logo y Background
    - Diseño Panel Inicio Sesion o continuar sin sesion

**Backend**
- Revisar de que manera realizar POST Request para iniciar sesion
- Crear Diagrama E-R de la base de Datos
- Crear table de WebUser sencilla
- LogIn con custom User table
- Redireccion si el usuario esta autenticado
- Funcion de Logout
- Diseño de Landing Page
- Crear tabla Profiles
- Modificar tabla WebUser para enlazar a Profiles
- Form y Validation para registro de usuario
- Revisar de que manera se abre un form, como declarar su uri y como se inicializa su propiedad csrf
- Diseño E-R
- Diseño pagina draft para Crear Nuevo Producto
- Pagina boceto para mostrar la informacion del producto
- Llenar el select cargando opciones para Categoria de Producto
- Llenar el select cargando opciones para Categoria de Brand
- Campo de inventario para producto
- Crear tabla WebUserCart
- Funcion para agregar al carrito articulos
    - El usuario podra seleccionar una cantidad
- Pagina y Route para ver el carrito del usuario
- Crear tabla Purchase
- Funcion para confirmar compra del carrito
- Funcion para eliminacion de productos del carrito
- Confirmar compra de carrito
- Funcion para actualizar la cantidad en pedido de articulos
    - Validacion para revisar si el usuario no esta pidiendo mas articulos de los que existen en stock
- Revisar historial de compras
    - Pagina para ver el historial de compras
- Reducir stock de producto al confirmar compra
- Busqueda paginacion de historial de compras
- Pagina para ver el perfil del usuario
- Funcion para actualizar contraseña del usuario
- Diseño vista de producto
- Diseño NavBar
- Generar Nuevo Token 
- Al ver la pagina del producto realizar validacion para evitar compra en caso de que no exista mas stock
- Middleware Route para autorizacion para entrar a la pagina de Crear Nuevo Producto (Solo para SysAdmin o Admin)
    - Revisar Bug para session expire que causa bug en el middleware SysAdmin.php, (En lugar de usar session usar las propiedades de Auth para revisar el ID_ProfileType)
- Agregar validation al hacer store de un producto
- El usuario puede iniciar sesion desde la pagina de Inicio
- Slideshow
- Categorias
- Cinta de Productos
- Controller para obtener productos de categoria X
- Crear tabla de comentarios
- Funcion para crear comentarios
- Funcion de paginacion en comentarios
- Funcion para eliminar comentarios solo de Auth
- Animacion para eliminar de manera mas estilizada el comentario (fade-out)
- Arreglar submit Add to Cart
- Actualizar cantidad si es que el usuario vuelve a agregar el producto al carrito con distinta cantidad
- Arreglar img aspect ratio 
- Mostrar paginacion de 5 opciones (1.., 3,4,5, ...10)
- Diseño Busqueda de Resultados
- Funcion SearchBar del topbar
- Diseño HTML de pagina de resultado de busquedas
- Creacion de Tabla de Ratings
- Diseño HTML para rating
- Funcion backend para insertar/actualizar calificacion del producto
- Diseño HTML para califacion del producto
- Backend para obtener califacion promedio
- Funcion para validacion de rating solo si el usuario ha comprado el producto
- Arreglar Bug de Imagen de Previsualizacion en Product View
- Codificacion para reemplazar uri al cambiar parametros de busqueda
-> Funcion busqueda con filtros especificados

<br/>


## FUNCIONES ##

- El usuario puede registrarse (LISTO)
- El usuario puede logearse (LISTO)
- El usuario puede editar su perfil (LISTO)
- El usuario puede editar su contraseña (LISTO)
- El usuario puede agregar productos a su carrito (LISTO)
- El usuario puede elimnar articulos de su carrito (LISTO)
- El usuario puede modificar la cantidad a comprar de un producto (LISTO)
- El usuario puede ver el historial de sus compras (LISTO)

- El admin puede agregar articulos (LISTO)
- 



