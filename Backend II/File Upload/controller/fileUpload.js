const File = require('../models/File')
const cloudinary = require("cloudinary").v2

exports.localFileUpload = async (req,res) =>{
    try{
        const file = req.files.file;
        console.log("File->" , file)

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1] }`;
        console.log("Path -> ", path);
        file.mv(path , (err) =>{
            console.log(err);
        });

        res.json({
            success: true,
            message: 'File uploaded successfully',
        })
    }
    catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file , folder , quality){
    const options = {folder};
    console.log("tempFileDir", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath , options)
}

// image upload
exports.imageUpload = async(req,res) =>{
    try{
        const {name , tags, email} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log("File->" , file)

        // Validation
        const supportedTypes = ["jpg" , "png" , "jpeg"];
        const fileType= file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'Unsupported file type. Only jpg, png, and jpeg are supported.',
            })
        }

        // Format is Supported
        console.log("Yaha");
        const response= await uploadFileToCloudinary(file , "Codehelp")
        console.log(response);

        // DB me entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        res.json({
            success: true,
            message: 'Image uploaded successfully',
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

exports.videoUpload = async(req,res) =>{
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log("File->" , file)

        // Validation
        const supportedTypes = ["mp4" , "mov"];
        const fileType= file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'Unsupported file type. Only mp4 and mov are supported.',
            })
        }

        // Format is Supported
        console.log("Yaha");
        const response= await uploadFileToCloudinary(file , "Codehelp")
        console.log(response);

        // DB me entry
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        });

        res.json({
            success: true,
            message: 'Video uploaded successfully',
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}

exports.imageSizeReducer = async(req , res)=>{
    try{
        const {name , tags, email} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log("File->" , file)

        // Validation
        const supportedTypes = ["jpg" , "png" , "jpeg"];
        const fileType= file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'Unsupported file type. Only jpg, png, and jpeg are supported.',
            })
        }

        // Format is Supported
        console.log("Yaha");
        const response= await uploadFileToCloudinary(file , "Codehelp" , 50)
        console.log(response);

        // DB me entry
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        res.json({
            success: true,
            message: 'Image uploaded successfully',
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
}