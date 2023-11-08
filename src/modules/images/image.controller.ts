import { randomInt } from "crypto";
import { Express, Request, Response } from "express";
import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer'
import multerS3 from 'multer-s3'
// import { requireLogin } from "../auth/auth.middleware";


const s3 = new S3Client({
    endpoint: process.env.S3_URL ?? '',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.S3_SECRET_KEY ?? '',
    },
    forcePathStyle: true,
    region: 'do-not-care'
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.S3_BUCKET_NAME ?? '',
    contentType(_req, file, cb) {
        cb(null, file.mimetype)
    },
    metadata: function (_req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: async function (_req, _file, cb) {
        const filename = Date.now().toString() + randomInt(10000000, 99999999) + '_' + _file.originalname
        //const result = await imageService.saveUpload()
        cb(null, filename)
    }
  })
})


export function registerUploadRoutes(app: Express) {
    
    // .                                        TypeParams, TypeQuery, TypeBody
    app.post('/upload', upload.array('images', 3), async (req: Request<unknown, unknown, unknown>, res: Response) => {
        if (req.files && Array.isArray(req.files)) {
            const files = []
            for(let file of req.files) {
                files.push({
                    originalName: file.originalname,
                    url: `${process.env.S3_PUBLIC_URL}/${file.key}`
                })
            }
            res.json({ message: 'Successfully uploaded ' + req.files.length + ' files!', files })
        }
        else {
            res.json({ message: 'No image received' })
        }
    })
}
