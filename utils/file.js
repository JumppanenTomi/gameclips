const fs=require('fs');
const multer=require('multer');
const path=require('path');


function deleteAsync(file) {
    try {
        fs.unlinkSync(file);
    } catch (err) {
        return err;
    }
}

let upload=multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public')
        },
        filename: function (req, file, cb) {
            let extArray=file.mimetype.split("/");
            let extension=extArray[extArray.length-1];
            cb(null, Date.now()+'-'+file.originalname)
        },
    }),
    fileFilter: function (req, file, cb) {
        var ext=path.extname(file.originalname);
        if (ext!=='.mp4'&&ext!=='.avi') {
            return cb(new Error('Only .mp4 and AVI are supported'))
        }
        cb(null, true)
    }, limits: { fileSize: 50000000 }
}).single('clip')

module.exports={
    deleteAsync, upload,
};