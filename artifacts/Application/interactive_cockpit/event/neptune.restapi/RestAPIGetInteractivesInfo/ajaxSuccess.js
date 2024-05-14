var response = xhr.responseJSON;
var data = response[0].data;
EDI.setData(data);
BusyDialog.close();