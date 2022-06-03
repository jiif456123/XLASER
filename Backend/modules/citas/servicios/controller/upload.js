const multer = require('multer')
    //const fs = require('../../../../../Frontend/template/demo_1/src/assets')
    //ESTO ES MI SERVICE
const imgPath = "";
const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/serviceImg')
                // cb(null, path.join('Frontend/template/demo_1/', 'assets'))

            // cb(null, '../../../../../Frontend/template/demo_1/src/assets')
        },
        filename: function(req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    //var upload = multer({ dest: 'uploads/' })


const upload = multer({ storage: storage })

exports.upload = upload.single('file')

exports.uploadFile = (req, res) => {
    res.send({ data: 'Enviar un archivo', data2: req.file.filename })
}