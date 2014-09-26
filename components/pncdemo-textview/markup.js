//calculate markup levels
/*

  ntoken 
  start  1
  end    2
  middle 0

 0:  [ [ markupid, start/middle/end , level] , [markupid, level] , [markupid ,level]  ]
 1:

 base on http://codepen.io/anon/pen/fHben by exebook@gmail.com
*/
//textview convert levels
var getTextLen=function(markups) {
	var textlen=0;
	markups.map(function(m){
		if (m[0]+m[1]>textlen) textlen=m[0]+m[1];
	});
	return textlen;
}
var calculateLevel=function(markups,textlen) {
	textlen=textlen||getTextLen(markups);
	return [];
}

var API={calculateLevel:calculateLevel};

module.exports=API;
