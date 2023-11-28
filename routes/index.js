const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController.js');
const usuariosController = require('../controllers/usuariosController.js');
const authController = require('../controllers/authController.js')
const adminController = require('../controllers/adminController.js')
const gruposController = require('../controllers/gruposController.js')
const meetiController = require('../controllers/meetiController.js')

const usuariosControllerFE = require('../controllers/frontend/usuariosControllerFE.js')
const meetiControllerFE = require('../controllers/frontend/meetiControllerFE')
const gruposControllerFE = require('../controllers/frontend/gruposControllerFE')
const comentariosControllerFE = require('../controllers/frontend/comentariosControllerFE.js')
const busquedaControllerFE = require('../controllers/frontend/busquedaControllerFE.js')

module.exports = function(){
    router.get('/', homeController.home);

    // Muestra un meeti
    router.get('/meeti/:slug',
    meetiControllerFE.mostrarMeeti
    );

    // Confirma la asistencia a meeti
    router.post('/confirmar-asistencia/:slug',
        meetiControllerFE.confirmarAsistencia
    );
    /** Muestra asistencia al meeti */
    router.get('/asistentes/:slug',
        meetiControllerFE.mostrarAsistentes
    );

    // Muestra perfiles en el front end
    router.get('/usuarios/:id',
        usuariosControllerFE.mostrarUsuario
    );
    // muestra los grupos en el front end
    router.get('/grupos/:id',
        gruposControllerFE.mostrarGrupo
    )
    // Muestra meeti's por catergoria
    router.get('/categoria/:categoria',
        meetiControllerFE.mostrarCategoria
    )
    /**Agrega Comentarios en el Meeti */
    router.post('/meeti/:id',
        comentariosControllerFE.agregarComentario
    )
    /**Elimina comentario en el meeti */
    router.post('/eliminar-comentario',
        comentariosControllerFE.eliminarComentario
    );
    // Añade la busqueda
    router.get('/busqueda',
    busquedaControllerFE.resultadosBusqueda
    )

    /** Crear y confirmar cuentas */
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearNuevaCuenta);
    router.get('/confirmar-cuenta/:correo', usuariosController.confirmarCuenta)
    
    // Iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    // cerrar sesion
    router.get('/cerrar-sesion',
        authController.usuarioAutenticado,
        authController.cerrarSesion
    );

    /** Panel de administración */
    router.get('/administracion', 
        authController.usuarioAutenticado,
        adminController.panelAdministracion);

    /** Nuevos Grupos */
    router.get('/nuevo-grupo',
        authController.usuarioAutenticado,
        gruposController.formNuevoGrupo
    );

    router.post('/nuevo-grupo',
        gruposController.subirImagen,
        gruposController.crearGrupo
    )

    // Editar grupos
    router.get('/editar-grupo/:grupoId',
        authController.usuarioAutenticado,
        gruposController.formEditarGrupo
    )
    router.post('/editar-grupo/:grupoId',
        authController.usuarioAutenticado,
        gruposController.editarGrupo
    )

    // Editar la imagen del grupo 
    router.get('/imagen-grupo/:grupoId',
        authController.usuarioAutenticado,
        gruposController.formEditarImagen
    );
    router.post('/imagen-grupo/:grupoId',
        authController.usuarioAutenticado,
        gruposController.subirImagen,
        gruposController.editarImagen
    );

    // Eliminar grupos
    router.get('/eliminar-grupo/:grupoId',
        authController.usuarioAutenticado,
        gruposController.formEliminarGrupo
    )
    router.post('/eliminar-grupo/:grupoId',
        authController.usuarioAutenticado,
        gruposController.eliminarGrupo
    )

    // Nuevos Meeti
    router.get('/nuevo-meeti',
        authController.usuarioAutenticado,
        meetiController.formNuevoMeeti       
    );
    router.post('/nuevo-meeti',
        authController.usuarioAutenticado,
        meetiController.sanitizarMeeti,
        meetiController.crearMeti
    );

    // Editar Meeti
    router.get('/editar-meeti/:id',
        authController.usuarioAutenticado,
        meetiController.formEditarMeeti
    );

    router.post('/editar-meeti/:id',
        authController.usuarioAutenticado,
        meetiController.editarMeeti
    );

    // Eliminar Meeti
    router.get('/eliminar-meeti/:id',
        authController.usuarioAutenticado,
        meetiController.formEliminarMeeti
    )
    router.post('/eliminar-meeti/:id',
        authController.usuarioAutenticado,
        meetiController.eliminarMeeti
    )
    
    // Editar informacion de perfil
    router.get('/editar-perfil',
        authController.usuarioAutenticado,
        usuariosController.formEditarPerifl
    );
    router.post('/editar-perfil',
        authController.usuarioAutenticado,
        usuariosController.editarPerifl
    );
    // Modificar el password
    router.get('/cambiar-password',
        authController.usuarioAutenticado,
        usuariosController.formCambiarPassword
    )
    router.post('/cambiar-password',
        authController.usuarioAutenticado,
        usuariosController.cambiarPassword
    )

    // Imagenes de perfil
    router.get('/imagen-perfil',
        authController.usuarioAutenticado,
        usuariosController.formSubirImagenPerfil
    )
    router.post('/imagen-perfil',
        authController.usuarioAutenticado,
        usuariosController.subirImagen,
        usuariosController.guardarImagenPerfil
    )
    return router;
}