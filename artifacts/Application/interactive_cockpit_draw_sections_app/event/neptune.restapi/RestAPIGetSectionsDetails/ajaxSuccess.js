var response = xhr.responseJSON;
var title = response[0].title;
var data = response[0].data;
InputTitle.setValue(response[0].title);
if(data){
EDI.setData(data);
}
BusyDialog.close();