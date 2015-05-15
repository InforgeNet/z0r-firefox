var buttons = require('sdk/ui/button/action');
var wutils = require("sdk/window/utils");
var clipboard = require("sdk/clipboard");
var request = require("sdk/request");
var api_url = 'http://z0r.it/yourls-api.php';
var notifications = require("sdk/notifications");

var button = buttons.ActionButton({
  id: "z0r-shortner",
  label: "z0r.it Shortner",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  var dcm = wutils.getMostRecentBrowserWindow().document;
  var url = dcm.getElementById("urlbar").value;
  var requrl = api_url + "?signature=4e4b657a91&action=shorturl&title=shrinked_with_z0r_ff&format=simply&url=" + url;
  var req = request.Request({
    url: requrl,
    onComplete: handleResponse
  });
  req.get();
}

function handleResponse(response) {
  var short = response.text;
  clipboard.set(short);
 notifications.notify({
text:"URL shrinked:"+short,
});
}
