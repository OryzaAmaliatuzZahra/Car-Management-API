const { users, shops } = require('../models');
// import bcrypt untuk authentication
const bcrypt = require('bcrypt');
// impport jsonwebtoken sebagai authorization
const jwt = require('jsonwebtoken');

async function getUsers(req, res) {
    try {
        const data = await users.findAll();

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

async function getUserById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;
        const data = await users.findByPk(id, {
            include:{
                model: shops,
                attributes: ['name']
            }
        });

        if(data){
            res.status(200).json({
                status: 'success',
                data
            })
        } else {
            res.status(404).json({
                status: 'failed',
                message: `id ${id} gak ada nih!`
            })
        }
      
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function editUser(req, res) {
    try {
        const { username } = req.body;
        const id = req.params.id;

        const unameEdit = await users.findOne({
            where: {
                username
            }
        })

        await users.update({
            username
        }, {
            where: { id }
        })

        if(unameEdit){
            res.status(404).json({
                status: 'failed',
                message: `username ${username} udah ada nih!`
            })
        } else if(username.length < 3){
            res.status(404).json({
                status: 'failed',
                message: `username kamu kurang dari 3 huruf nih!`
            })
        } else{
            res.status(200).json({
                status: 'success',
                message: `data dari id ${id} berhasil berubah`
            })
        }
        
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id
        const idUser = await users.findOne({
            where: {
                id
            }
        })
        await users.destroy({
            where: {
                id
            }
        })

        if(!idUser){
            res.status(404).json({
                status: 'failed',
                message: `id ${id} gak ada nih!`
            })
        } else{
            res.status(200).json({
                'status': 'success',
                'message': `data ${id} ini berhasil di hapus`
            })
        }
    } catch (err) {
        res.status(400).message(err.message)
    }
}

async function createUser(req, res) {
    try {
        const { username, password } = req.body
        const uname = await users.findOne({
            where: {
                username
            }
        })
        // proses enkripsi password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await users.create({
            username,
            password : hashedPassword,
            role: req.body.role 
        })

        if(uname){
            res.status(404).json({
                status: 'failed',
                message: `username ${username} udah ada nih!`
            })
        } else if(username.length < 3) {
            res.status(404).json({
                status: 'failed',
                message: `username kamu kurang dari 3 huruf nih!`
            })
        } else {
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
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

async function login(req, res) {
    try {
        const { username, password } = req.body

        // cari user berdasarkan 
        const user = await users.findOne({
            where: {
                username
            }
        })

        if(!user){
            res.status(404).json({
                status: 'failed',
                message: `user ${username} gak ketemu nih!`
            })
        }

        // check password dari req body sesuai gak sama hashed passqord dari database
        if(user && bcrypt.compareSync(password, user.password)){
            
            // generate TOKEN untuk user
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            }, 'rahasia')

            res.status(200).json({
                status: 'success',
                data: {
                    user,
                    token
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
    getUsers,
    getUserById,
    deleteUser,
    editUser,
    createUser,
    login
}