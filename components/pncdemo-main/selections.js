var selections=[];
var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

var setGUID=function(opts){ //need guid for multiple range or links
	if (opts.selections.length>1
	||opts.selections[0][1].length>1) {
	 opts.payload.gid=guid();
	}
}

var applyMarkup=function(opts) {
	setGUID(opts);
	opts.selections.map(function(s,idx){
		var view=s[0], ranges=s[1],py=opts.payload;
		if (idx>0) py={shadow:true, gid:opts.payload.gid}; //only first selection has payload
		s[0].action("applyMarkup",opts.type,ranges,py);
	});
}

var applyLink=function(opts) {
	setGUID(opts);
	var view1=opts.selections[0][0];
	var view2=opts.selections[1][0];
	var range1=opts.selections[0][1];
	var range2=opts.selections[1][1];

	var py=JSON.parse(JSON.stringify(opts.payload));
	py.target=view1.getName();
	py.ranges=range2;
	view1.action("applyMarkup",opts.type,range1,py);	

	var shadowpy={target:view2.getName(), shadow:true, gid:py.gid};
	view2.action("applyMarkup",opts.type,range2,shadowpy);	
}

var clear=function(opts){
	opts=opts||{};
	selections.map(function(s){
		s[0].action("clearRanges");
		if (!opts.keepWindowSelection) s[0].action("clearWindowSelection");
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
module.exports={clear:clear,update:update,get:get,applyMarkup:applyMarkup,applyLink:applyLink};