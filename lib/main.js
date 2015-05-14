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
  onClick: onComplete(state) {
var api_url = 'http://z0r.it/yourls-api.php';
var response = $.get( api_url, {
signature: "4e4b657a91";
action: "shorturl",
format: "json",
url: window.location.href
},
function(data){
alert(data.shorturl);

}
);
}
                     
