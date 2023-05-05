const ImageKit = require("imagekit")

var imagekit = new ImageKit({
    publicKey: "public_gUM4MZjhzibIbpltJ+f5yHk8kDA=",
    urlEndpoint: "https://ik.imagekit.io/oryz",
    privateKey: "private_W7ESv4YC1jnYvHGKhmdVse7l1UM=",
});

module.exports = imagekit;