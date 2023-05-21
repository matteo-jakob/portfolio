var emoticonsSpan = document.getElementById("emoticons");
var emoticons = [
  "ヾ( ×`⌓´×)ﾉﾞ",
  "ᕦ(ᓀ‸ᓂ)ᕥ",
  " (ง ᗒᗨᗕ)ง",
  " ٩(͡๏̯͡๏)〴",
  "╰( ▪‿▪)╮",
];
var random = Math.floor(Math.random() * emoticons.length);
emoticonsSpan.innerHTML = emoticons[random];
