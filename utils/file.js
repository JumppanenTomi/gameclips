const fs=require('fs');
const multer=require('multer');
const path=require('path');

//function to delete any file
function deleteAsync(file) {
    try {
        fs.unlinkSync(file);
    } catch (err) {
        return err;
    }
}


//settings for clip upload
let upload=multer({
    storage: multer.diskStorage({
        //defining destination and it will be public/
        destination: function (req, file, cb) {
            cb(null, 'public')
        },
        //defining how file is going to be added to directory
        //for example if we add file called "clip.mp4"
        //it's name will be "*currentTimeInMs-clip.mp4"
        filename: function (req, file, cb) {
            cb(null, Date.now()+'-'+file.originalname)
        },
    }),
    fileFilter: function (req, file, cb) {
        //checking if received file actually is video
        var ext=path.extname(file.originalname);
        if (ext!=='.mp4'&&ext!=='.avi') {
            return cb(new Error('Only .mp4 is supported'))
        }
        cb(null, true)
    }, limits: {
        //max file size 100mb
        fileSize: 100000000 
    }
}).single('clip')

module.exports={
    deleteAsync, upload,
};