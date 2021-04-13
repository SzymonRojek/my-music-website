const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const directory = path.join(path.resolve(), "/");
const quality = 20;
fs.readdir(directory, async (err, files) => {
    let image_array = [];
    for(const i in files){
        if([".svg", ".png", ".jpg", ".jpeg"].includes(path.extname(files[i]).toLowerCase()) && !files[i].includes("min-")){
            image_array.push(files[i]);
        }
    }
    for(const i in image_array){
        console.log(image_array)
        let file_orientation = "";
        let sizeOf = require('image-size');
        sizeOf(image_array[i], (err, dimensions) => {
            if(dimensions.width > dimensions.height) file_orientation = "landscape";
            else if(dimensions.width < dimensions.height) file_orientation = "portrait";
            else if(dimensions.width === dimensions.height) file_orientation = "square";
            if(path.extname(image_array[i].toLowerCase()) === ".png"){
                if(file_orientation === "landscape" || file_orientation === "square"){
                    sharp(image_array[i]).png({quality: quality}).resize({width: 1500, height: null}).toFile(`min-${image_array[i]}`);
                }
                else if(file_orientation === "portrait"){
                    sharp(image_array[i]).png({quality: quality}).resize({width: null, height: 1500}).toFile(`min-${image_array[i]}`);
                }
            }
            else if(path.extname(image_array[i].toLowerCase()) === ".jpg"){
                if(file_orientation === "landscape" || file_orientation === "square"){
                    sharp(image_array[i]).jpeg({quality: quality}).resize({width: 1500, height: null}).toFile(`min-${image_array[i]}`);
                }
                else if(file_orientation === "portrait"){
                    sharp(image_array[i]).jpeg({quality: quality}).resize({width: null, height: 1500}).toFile(`min-${image_array[i]}`);
                }
            }
            else if(path.extname(image_array[i].toLowerCase()) === ".jpeg"){
                if(file_orientation === "landscape" || file_orientation === "square"){
                    sharp(image_array[i]).jpeg({quality: quality}).resize({width: 1500, height: null}).toFile(`min-${image_array[i]}`);
                }
                else if(file_orientation === "portrait"){
                    sharp(image_array[i]).jpeg({quality: quality}).resize({width: null, height: 1500}).toFile(`min-${image_array[i]}`);
                }
            }
        });
    }
});