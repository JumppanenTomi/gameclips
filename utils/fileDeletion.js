const fs=require('fs')

function deleteAsync(file) {
    try {
        fs.unlinkSync(file)
    } catch (err) {
        return err
    }
}

module.exports={
    deleteAsync
};