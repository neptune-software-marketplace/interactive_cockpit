var response = xhr.responseJSON;
var localViewID = HBox.getId();
var hboxControl = sap.ui.getCore().byId(localViewID);
var hboxDomRef = hboxControl.getDomRef();
var container = hboxDomRef;
var areas = response;
BusyDialog.close();

if (hboxDomRef) {
    var aElements = hboxDomRef.querySelectorAll("a");
    aElements.forEach(function (aElem) {
        aElem.parentNode.removeChild(aElem);
    });
} else {
}

areas.forEach(function (area) {
    var newArea = document.createElement("a");
    var style =
        "left: " +
        area.startX +
        "px; top: " +
        area.startY +
        "px; width: " +
        (area.endX - area.startX) +
        "px; height: " +
        (area.endY - area.startY) +
        "px;";
    newArea.setAttribute("id", area.sectionID);
    newArea.setAttribute("class", area.class);
    newArea.setAttribute("style", style);
    newArea.setAttribute("roomID", area.roomID);
    newArea.textContent = area.roomID;
    container.appendChild(newArea);
});

function functionToCall(event) {
    BusyDialog.open();
    var id = event.target.id;
    console.log(id);
    var options = {
        parameters: {
            where: JSON.stringify({ sectionID: id }),
        },
    };
    apiRestAPIGetInteractivesInfo(options);
    
    var activeElements = document.querySelectorAll('a.infoAdded, a.selected-area');
    activeElements.forEach(function(element) {
        element.style.border = ''; 
    });

    event.target.style.border = '4px solid black';
}
var elements = document.getElementsByClassName("infoAdded");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", functionToCall);
}
var elements1 = document.getElementsByClassName("selected-area");
for (var i = 0; i < elements1.length; i++) {
    elements1[i].addEventListener("click", functionToCall);
}
App.setBusy(false);
