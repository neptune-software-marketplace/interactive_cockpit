const context = oEvent.oSource.getBindingContext();  
var sectionID = context.getProperty("id");
const data = context.getObject();
var id = data.UUID;
URL = data.Image_URL;
BackgroundImage.src = URL;
Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
Ctx.drawImage(BackgroundImage, 0, 0, Canvas.width, Canvas.height);
TextMainSectionID.setText(id);
Rectangles = [];
var response = Rectangles;
initializeRectanglesFromResponse(response);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
AddInfoMode = true;
DeleteMode = false;
DrawMode = false;
canvas.style.cursor = "pointer";
BusyDialog.open();

HBox4.setBlocked(false);
HBox3.setVisible(false);
App.to(Page);
var options = {
    parameters: {
        "where": JSON.stringify({"belongsTo":id})
    }
};
apiRestAPIGetSections(options);