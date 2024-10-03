// routes/subscriptionRoutes.js
const express = require('express');
const { Subscription, User } = require('../models'); // Asegúrate de que el modelo Subscription esté importado correctamente
const router = express.Router();
const { Op } = require('sequelize');

// Crear una nueva suscripción
router.post('/', async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.body;

    // Verificar si el usuario ya tiene una suscripción activa
    const existingSubscription = await Subscription.findOne({
      where: {
        userId,
        endDate: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (existingSubscription) {
      return res.status(400).json({ message: 'El usuario ya tiene una suscripción activa.' });
    }

    // Crear una nueva suscripción
    const subscription = await Subscription.create({
      userId,
      startDate: new Date(startDate), // Podrías manejarlo automáticamente según las necesidades
      endDate: new Date(endDate),
      isActive: true,
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener la suscripción actual de un usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await Subscription.findOne({
      where: {
        userId,
        endDate: {
          [Op.gt]: new Date(),
        },
      },
      include: [User], // Incluye la información del usuario si es necesario
    });

    if (!subscription) {
      return res.status(404).json({ message: 'No se encontró una suscripción activa para este usuario.' });
    }

    res.json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancelar una suscripción
router.delete('/:subscriptionId', async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const result = await Subscription.destroy({
      where: { id: subscriptionId },
    });

    if (result) {
      res.json({ message: 'Suscripción eliminada correctamente.' });
    } else {
      res.status(404).json({ message: 'Suscripción no encontrada.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
