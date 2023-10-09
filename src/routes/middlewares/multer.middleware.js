import multer from "multer";
import __dirname from "../../utils.js";
import { v4 as uuidV4 } from "uuid";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        //con file.fieldname -- le indicamos a qué carpeta va el archivo
        cb(null, __dirname + "/public/images/documents/"+file.fieldname);
    },
    filename: function (req, file, cb) {
        cb(null, uuidV4()+ "-" + file.originalname);
    },
});

export const uploaderMulter = multer({
    storage,
    onError: function (err, next) {
        console.log(err);
        next();
    },
});

export default uploaderMulter;