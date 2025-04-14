import multer from 'multer'
const storage =multer.diskStorage({
    filename: function (req,file,cb){
        cb(null,file.fieldname+'_'+Date.now()+'_'+file.originalname)
    }
});
const Upload =multer({storage:storage})
export default Upload