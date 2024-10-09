const cloudinary = require('cloudinary').v2;
const multer = require('multer')

cloudinary.config({
  cloud_name: 'dkv6tb2fq',
  api_key: '732276516525931',
  api_secret: 'o0k9wHIUb_uo6MeW2-G33fuCNk4'
})

const storage = new multer.memoryStorage();

const imageUploadUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  })

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtils };
