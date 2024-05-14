
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var backgroundImage = new Image();
var file = FileUploader.oFileUpload.files[0];
if (file) {
    var fileReader = new FileReader();
    fileName = file.name;
    var fileExtn = fileName.split(".")[1];
    fileReader.onload = function (fileLoadedEvent) {
        fileContentBase64 = fileLoadedEvent.target.result;
        backgroundImage.src = fileContentBase64;
        backgroundImage.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
    };

    fileReader.readAsDataURL(file);
}
