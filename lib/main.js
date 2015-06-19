var url = require("sdk/url");
var self = require("sdk/self");
var { MatchPattern } = require("sdk/util/match-pattern");

// *** User Interface ***
var button = require("sdk/ui/button/action").ActionButton(
{
	id: "z0r-shortner",
	label: "z0r.it Shortner",
	icon:
	{
		"16": self.data.url("icon-16.png"),
		"32": self.data.url("icon-32.png"),
		"64": self.data.url("icon-64.png"),
		"128": self.data.url("icon-128.png")
	},
	
	onClick: handleClick
});


// *** handlers ***
function handleClick(state)
{
	button.disabled = true;

	var longurl = require("sdk/tabs").activeTab.url;
	
	// Shrink Request (default action)
	shortUrl(longurl);
}


function shortUrlHandler(response)
{
	// Response Status Check
	if (response.status != 200)
	{
		notify("Unexpected Response", "Unexpected Response from z0r.it (ECode: " + response.status + "). Please Try Again.");
		button.disabled = false;
		return;
	}
	
	// Get Result
	var short = response.text;
	
	//Result Check
	var patternwww = new MatchPattern("http://www.z0r.it/*");
	var pattern = new MatchPattern("http://z0r.it/*");
	if (!url.isValidURI(short) || (!patternwww.test(short) && !pattern.test(short)))
	{
		notify("ERROR: Invalid Response", "Invalid Response from z0r.it. Please Try Again.");
		// Exit
		button.disabled = false;
		return;
	}
	
	// Remove "www"
	short = "http://z0r.it" + short.substr(short.lastIndexOf("/"));
	
	// Set Clipboard
	require("sdk/clipboard").set(short);
	
	notify("URL Shrinked!", short + " (Copied to clipboard)");
	
	button.disabled = false;
}


// *** Funcs ***
// Send notification
function notify(title, text)
{

	require("sdk/notifications").notify(
	{
		title: title,
		text: text,
		iconURL: self.data.url("icon-128.png")
	});
}


// shorturl Request
function shortUrl(longurl)
{
	// URL Check - TODO: Fix - it invalidates some kind of good urls
	var pattern = new MatchPattern("*");
	if (!url.isValidURI(longurl) || !pattern.test(longurl))
	{
		notify("ERROR: Invalid URL", "Invalid URL. Try Reloading Page.");
		// Exit
		button.disabled = false;
		return;
	}

	var params = "action=shorturl&title=shrinked_with_z0r_ff&format=simple&url=" + encodeURIComponent(longurl);
	
	sendRequest(params, shortUrlHandler);
}

// expand/url-stats/other Request
function doRequest(action, shorturl, format, requestHandler)
{
	var params = "action=" + action + "&format=" + format + "&shorturl=" + shorturl;
	
	sendRequest(params, requestHandler);
}

// Send a Request to z0r
function sendRequest(params, handler)
{
	var z0rRequest = require("sdk/request").Request(
	{
		// (signature=4e4b657a91 is just an API Key, NOT a referral tracking)
		url: "http://www.z0r.it/yourls-api.php?signature=4e4b657a91&" + params,
		onComplete: handler
	});
	
	// Send Request
	z0rRequest.get();
}
