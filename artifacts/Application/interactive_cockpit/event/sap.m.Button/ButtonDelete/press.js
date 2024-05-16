const context = oEvent.oSource.getBindingContext();
var sectionID = context.getProperty("id");
var belongsID = context.getProperty("UUID");

App.setBusy(true);

var options = {
    parameters: {
        where: JSON.stringify({ "id": sectionID}),
    }
};

apiRestAPIDeleteInteractives(options);

var selectedAreas = rect.sectionID;
var options = {
    parameters: {
        where: JSON.stringify({ "belongsTo": belongsID}),
    },
};
apiRestAPIDeleteSections(options);


