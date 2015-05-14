var buttons = require('sdk/ui/button/action');
var wutils = require("sdk/window/utils");

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
  var url = document.getElementById("urlbar").value;
}
