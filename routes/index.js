const router = require('express').Router();

// import package swagger
const swaggerUi = require('swagger-ui-express');

// import file JSON
const swaggerDocument = require('../docs/swagger.json');

// API docs --> dokumentasi API
router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

const Admin = require('./adminProduct');
const Product = require('./product');
const User = require('./users');
const Shop = require('./shops');

router.use('/admin/products', Admin);
router.use('/api/v1/products', Product);
router.use('/api/v1/users/', User);
router.use('/api/v1/shops/', Shop);


module.exports = router
