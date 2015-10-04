// ==UserScript==
// @name                 is.gd url shortener
// @namespace            https://github.com/krikx/is-gd
// @version              0.1
// @description          shortens current page using is.gd
// @author               Vamsi Krishna | vamsi_ism@outlook.com
// @match                http://*/*
// @match                https://*/*
// @grant                GM_xmlhttpRequest
// @grant                GM_setClipboard
// ==/UserScript==

var base = 'http://is.gd/create.php?format=simple&url=';

function isgd(url){
	GM_xmlhttpRequest({
		method: 'POST',
		url: url,
		data: 'opt=1',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(resp){
			if (resp.responseText == 'Error: Sorry, the URL you entered is on our internal blacklist. It may have been used abusively in the past, or it may link to another URL redirection service.'){
				alert('is.gd: Entered URL is on internal blacklist');
			}
			else{
				GM_setClipboard(resp.responseText);
			}
		},
		onerror: function(resp){
			alert('is.gd: Error contacting is.gd')
		},
		ontimeout: function(resp){
			alert('is.gd: Request timed out')
		},
		timeout: 1729
	});
}

document.addEventListener('keydown', function(e){
	// setup for ctrl+shift+a
	if (e.keyCode == 65 && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey){
		console.log('works');
		isgd(base + location.href);
	}
});
