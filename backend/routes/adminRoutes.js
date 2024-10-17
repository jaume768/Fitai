// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUserRole,
    deleteUser,
    createAdminProduct,
    updateAdminProduct,
    deleteAdminProduct,
    createAdminCategory,
    updateAdminCategory,
    deleteAdminCategory,
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// Rutas de Usuarios
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/role', protect, admin, updateUserRole);
router.delete('/users/:id', protect, admin, deleteUser);

// Rutas de Productos
router.post('/products', protect, admin, createAdminProduct);
router.put('/products/:id', protect, admin, updateAdminProduct);
router.delete('/products/:id', protect, admin, deleteAdminProduct);

// Rutas de Categorías
router.post('/categories', protect, admin, createAdminCategory);
router.put('/categories/:id', protect, admin, updateAdminCategory);
router.delete('/categories/:id', protect, admin, deleteAdminCategory);

module.exports = router;
