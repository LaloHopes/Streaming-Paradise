const express = require('express');
const router = express.Router();
const RolePermission = require('../models/RolePermission');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

// Asignar un permiso a un rol
router.post('/assign', async (req, res) => {
  try {
    const { idrol, idpermiso } = req.body; // Extraer los IDs de rol y permiso del cuerpo de la solicitud

    // Verificar si ya existe la asociación entre rol y permiso
    const existingAssociation = await RolePermission.findOne({ where: { idrol, idpermiso } });
    if (existingAssociation) {
      return res.status(400).json({ message: 'El rol ya tiene este permiso asignado' });
    }

    // Crear la nueva asociación entre rol y permiso
    const newRolePermission = await RolePermission.create({
      idrol,
      idpermiso
    });

    res.status(201).json(newRolePermission); // Responder con la nueva asociación
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los permisos asignados a un rol
router.get('/role/:idrol', async (req, res) => {
  try {
    const { idrol } = req.params;

    // Buscar todos los permisos asociados con el rol
    const permissions = await RolePermission.findAll({
      where: { idrol },
      include: [Permission] // Incluir la información del permiso
    });

    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los roles asociados a un permiso
router.get('/permission/:idpermiso', async (req, res) => {
  try {
    const { idpermiso } = req.params;

    // Buscar todos los roles asociados con el permiso
    const roles = await RolePermission.findAll({
      where: { idpermiso },
      include: [Role] // Incluir la información del rol
    });

    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un permiso asignado a un rol
router.delete('/remove', async (req, res) => {
  try {
    const { idrol, idpermiso } = req.body;

    // Eliminar la asociación entre rol y permiso
    const deleted = await RolePermission.destroy({ where: { idrol, idpermiso } });

    if (!deleted) {
      return res.status(404).json({ message: 'No se encontró la asociación' });
    }

    res.json({ message: 'Permiso eliminado del rol' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
