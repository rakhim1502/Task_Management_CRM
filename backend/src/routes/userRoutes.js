const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'MANAGER'), userController.getUsers);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'MANAGER'), userController.getUser);
router.post('/', authMiddleware, roleMiddleware('ADMIN'), userController.createUser);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), userController.updateUser);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), userController.deleteUser);

module.exports = router;
