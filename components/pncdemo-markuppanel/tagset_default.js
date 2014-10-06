var commentFields=[
	{name:"extra1",defaultValue:"default e1"}
];
module.exports=[
   {caption:"glyphicon-eye-open",tag:null,dialog: Require("markoverview")} //nothing happen
  ,{caption:"glyphicon-pushpin", tag:"important", dialog: Require("marksimple")  } //immediate single view markup
  ,{caption:"glyphicon-comment", tag:"footnote",dialog:Require("markfootnote")}  //single view dialog markup
  ,{caption:"glyphicon-comment", tag:"footnote2",dialog:Require("markfootnote"),fields:commentFields}  //single view dialog markup
  ,{caption:"glyphicon-transfer",tag:"correspond",dialog:Require("markcorrespond")} //dual view markup
  ,{caption:"glyphicon-link",tag:"intertext",dialog:Require("markintertext")} //dual view dialog markup
];

/*
see http://getbootstrap.com/components/#glyphicons for more icons
*/