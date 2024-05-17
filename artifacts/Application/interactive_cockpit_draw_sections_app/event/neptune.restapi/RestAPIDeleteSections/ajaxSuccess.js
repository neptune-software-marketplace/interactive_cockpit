sap.m.MessageToast.show("Deleted!");
var id = TextMainSectionID.getText();
var options = {
    parameters: {
        "where": JSON.stringify({"belongsTo":id})
    }
};
apiRestAPIGetSections(options);
Page.setBusy(false);