/*
TODO , normalize all traditional and variants to simplified Chinese
*/
var name=process.argv[2] || "iching";

var sourcexml=name+".xml";
var tei=require("ksana-document").tei;

var captureTags={
	//"cb:juan":do_juan,"/cb:juan":do_juanend
	//"cb:juan":do_juan,
};

var beforebodystart=function(s,status) {
}
var afterbodyend=function(s,status) {
}
var warning=function() {
	console.log.apply(console,arguments);
}

var onFile=function(fn) {
	process.stdout.write("indexing "+fn+"\033[0G");
}
var setupHandlers=function() {
}
var finalized=function(session) {
	console.log("VPOS",session.vpos);
	console.log("FINISHED")
}
var finalizeField=function(fields) {

}
var config={
	name:name
	,meta:{
		config:"simple1"
	}
	,glob:sourcexml
	,pageSeparator:"div.hexagram"
	,format:"TEIP5"
	,bodystart: "<body>"
	,bodyend : "</body>"
	,reset:true
	,setupHandlers:setupHandlers
	,finalized:finalized
	,finalizeField:finalizeField
	,warning:warning
	,captureTags:captureTags
	,callbacks: {
		beforebodystart:beforebodystart
		,afterbodyend:afterbodyend
		,onFile:onFile
	}
}
setTimeout(function(){ //this might load by gulpfile-app.js
	if (!config.gulp) require("ksana-document").build();
},100)
module.exports=config;