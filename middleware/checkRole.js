module.exports = (role) => {
    return async function (req, res, next) {
        if(req.user.role !== role) {
            res.status(403).json({
                status: "failed",
                message: `Kamu gak bisa akses nih! Role kamu bukan ${role}`
            }) 
        } else{
            next()
        }
    }
}