const { Op } = require('sequelize');
const { shops } = require('../models');

async function getShops(req, res) {
    try {
        const data = await shops.findAll();

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function searchShops(req, res) {
    try {
        const data = await shops.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.name
                }
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getShopById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;
        const data = await shops.findByPk(id);

        if (!data) {
            res.status(404).json({
                status: 'failed',
                message: `shop dengan id ${id} gak ada nih!`
            })
        } else {
            res.status(200).json({
                status: 'success',
                data
            })
        }
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function editShop(req, res) {
    try {
        const { name } = req.body;
        const id = req.params.id;

        await shops.update({
            name
        }, {
            where: { id }
        })

        if(name.length < 5){
            res.status(404).json({
                status: 'failed',
                message: `nama shop kurang dari 5 huruf nih!`
            })
        } else{
            res.status(200).json({
                status: 'success',
                message: `data dari id ${id} nya berhasil berubah`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function deleteShop(req, res) {
    try {
        const id = req.params.id
        const idShop = await shops.findOne({
            where: {
                id
            }
        })
        await shops.destroy({
            where: {
                id
            }
        })

        if (!idShop) {
            res.status(404).json({
                status: 'failed',
                message: `shop dengan id ${id} gak ada nih!`
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: `shop dengan id ${id} berhasil di hapus`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function createShop(req, res) {
    try {
        const { name, city } = req.body

        const shopName = await shops.findOne({
            where: {
                name
            }
        })

        const newShop = await shops.create({
            name,
            city,
            userId: req.user.id
        })

        if (shopName) {
            res.status(404).json({
                status: 'failed',
                message: `Shop dengan nama ${name} udah ada nih!`
            })
        } else if (name.length < 5) {
            res.status(404).json({
                status: 'failed',
                message: `nama shop kurang dari 5 huruf nih!`
            })
        } else {
            res.status(201).json({
                status: 'success',
                data: {
                    shop: newShop
                }
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    getShops,
    getShopById,
    searchShops,
    deleteShop,
    editShop,
    createShop,
}