var Canvas = document.getElementById("myCanvas");
var Ctx = Canvas.getContext("2d");
var BackgroundImage = new Image();
BackgroundImage.src = URL;
var Rectangles = [];

function initializeRectanglesFromResponse(response) {
    response.forEach((area) => {
        Rectangles.push({
            startX: parseFloat(area.startX),
            startY: parseFloat(area.startY),
            endX: parseFloat(area.endX),
            endY: parseFloat(area.endY),
            type: area.text,
            roomID: area.roomID,
            class: area.class,
            sectionID: area.sectionID,
        });
    });
    redrawRectangles();
    BusyDialog.close();
}
function redrawRectangles() {
    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    Ctx.drawImage(BackgroundImage, 0, 0, Canvas.width, Canvas.height);
    Rectangles.forEach(function (rect) {
        if (rect.class === "noInfo") {
            Ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
            //ctx.strokeStyle = "red";
        } else if (rect.class === "infoAdded") {
            Ctx.fillStyle = "rgba(0, 255, 0, 0.4)";
            //ctx.strokeStyle = "green";
        }
        Ctx.fillRect(rect.startX, rect.startY, rect.endX - rect.startX, rect.endY - rect.startY);
        Ctx.strokeRect(rect.startX, rect.startY, rect.endX - rect.startX, rect.endY - rect.startY);
        Ctx.font = "12px Arial";
        Ctx.fillStyle = "black";
        var text = "";
        var textWidth = Ctx.measureText(text).width;
        var textHeight = parseInt(Ctx.font, 10);
        var textX = rect.startX + (rect.endX - rect.startX) / 2 - textWidth / 2;
        var textY = rect.startY + (rect.endY - rect.startY) / 2 + textHeight / 2;
        Ctx.fillText(text, textX, textY);
    });
}

Canvas.addEventListener("click", function (event) {
    var rect = Canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    for (var i = Rectangles.length - 1; i >= 0; i--) {
        var rect = Rectangles[i];
        if (
            clickX >= rect.startX &&
            clickX <= rect.endX &&
            clickY >= rect.startY &&
            clickY <= rect.endY
        ) {
            if (DeleteMode) {
                sap.m.MessageBox.confirm("Are you sure you want to delete this?", {
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    onClose: function (sAction) {
                        if (sAction === sap.m.MessageBox.Action.YES) {
                            Rectangles.splice(i, 1);
                            redrawRectangles();
                            var secid = rect.sectionID;
                            var options = {
                                parameters: {
                                    where: JSON.stringify({ sectionID: secid }),
                                },
                            };
                            apiRestAPIDeleteSections(options);
                        }
                    },
                });
                return;
            }
            if (AddInfoMode) {
                var id = rect.sectionID;
                TextID.setText(rect.sectionID);
                var options = {
                    parameters: {
                        where: JSON.stringify({"sectionID" : id }),
                    },
                };
                apiRestAPIGetSectionsDetails(options);
                DialogAddInfo.open();
                if (EDI === "") {
                    // create_editor();
                }
            }
        }
    }
});

Canvas.addEventListener("mousedown", function (event) {
    if (DrawMode === false) return;
    BackgroundImage.src = URL;
    var rect = Canvas.getBoundingClientRect();
    var startX = event.clientX - rect.left;
    var startY = event.clientY - rect.top;
    var mainsectionID = TextMainSectionID.getText();
    var rectangle = {
        startX: startX,
        startY: startY,
        endX: startX,
        endY: startY,
        class: "noInfo",
        belongsTo: mainsectionID,
    };
    function moveListener(event) {
        rectangle.endX = event.clientX - rect.left;
        rectangle.endY = event.clientY - rect.top;
        redrawRectangles();
    }
    function upListener() {
        Canvas.removeEventListener("mousemove", moveListener);
        Canvas.removeEventListener("mouseup", upListener);
        var width = Math.abs(rectangle.endX - rectangle.startX);
        if (width < 10) {
            sap.m.MessageToast.show(
                "Please draw a selectable space larger place for better user experience"
            );
            return;
        }
        Rectangles.push(rectangle);
        Page.setBusy(true);
        var id = generateUUID();
        TextID.setText(id);
        var mainsectionID = TextMainSectionID.getText();
        var options1 = {
            data: {
                sectionID: id,
                class: "noInfo",
                title: "",
                startX: rectangle.startX,
                startY: rectangle.startY,
                endX: rectangle.endX,
                endY: rectangle.endY,
                belongsTo: mainsectionID,
            },
        };
        apiRestAPISaveSections(options1);
        redrawRectangles();
    }

    Canvas.addEventListener("mousemove", moveListener);
    Canvas.addEventListener("mouseup", upListener);
});


BackgroundImage.onload = function () {
    redrawRectangles();
    BusyDialog.close();
};
