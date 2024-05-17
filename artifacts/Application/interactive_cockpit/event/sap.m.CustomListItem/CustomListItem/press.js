const context = oEvent.oSource.getBindingContext();
var sectionID = context.getProperty("id");
var title = context.getProperty("Title");
const data = context.getObject();
var id = data.UUID;
URL = data.Image_URL;
Image.setSrc(URL);
App.to(Page);
App.setBusy(true);
var options = {
    parameters: {
        where: JSON.stringify({ belongsTo: id }),
    },
};
apiRestAPIGetSections(options);
Page.setTitle(title);
