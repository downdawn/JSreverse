function base64_encode(str)
{
	return btoa(unescape(encodeURIComponent(str)));
}


function base64_decode(str)
{
	return decodeURIComponent(escape(atob(str)));
}