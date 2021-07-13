export default function UploadFile(file) {

    return new Promise((resolve, reject) => {

        ajax({
            url: '../back-end/fileManager/uploadFile.php',
            files: {
                file: file
            },
            complete: (e) => {
                resolve(e);
            }
        });

    });

}