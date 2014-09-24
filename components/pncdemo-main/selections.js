var selections=[];
var applyMarkup=function(opts) {
	opts.selections.map(function(s){
		s[0].applyMarkup(opts.type,s[1]);
	});
}
var clear=function(opts){
	opts=opts||{};
	selections.map(function(s){
		s[0].clearRanges();
		if (!opts.keepWindowSelection) s[0].clearWindowSelection();
	});
	selections=[];
}
var get=function(){
	return selections;
}
var update=function(view,ranges){
	var hasrange=false;
	if (ranges && ranges.length) {
		hasrange=true;
		ranges=JSON.parse(JSON.stringify(ranges));//seperate instance
	}
	for (var i=0;i<selections.length;i++) {
		var sel=selections[i];
		if (view==sel[0]) {
			if (hasrange) {
				sel[1]=ranges; //update
			} else {
				selections.splice(i,1);
			}
			return;	
		}
	}
	if (hasrange) {
		selections.push([view,ranges]);
	}
	return selections;
}
module.exports={clear:clear,update:update,get:get,applyMarkup:applyMarkup};