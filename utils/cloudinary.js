const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
})

const cloudinaryUploadImg = async(filetoUploads) => {
    return await new Promise((resolve) => {
        cloudinary.UploadStream.upload
        (filetoUploads, (result) => {
            reslove({
                url: result.secure_url,
            }, {
                resource_type: "auto"
            })
        })
    })
}

module.exports = cloudinaryUploadImg