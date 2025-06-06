// server/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');

router.get('/', ContactController.getAllContacts);
router.get('/:id', ContactController.getContactById);
router.post('/', ContactController.createContact);
router.put('/:id', ContactController.updateContact);
router.delete('/:id', ContactController.deleteContact);

module.exports = router;