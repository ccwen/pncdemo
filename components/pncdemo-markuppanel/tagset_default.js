var commentFields=[
	{name:"extra1",defaultValue:"default e1"}
	,{name:"extra2",defaultValue:"default e2"}
];
module.exports=[
   {caption:"glyphicon-eye-open",type:null,dialog: Require("markoverview")} //nothing happen
  ,{caption:"glyphicon-pushpin", type:"important", dialog: Require("marksimple")  } //immediate single view markup
  ,{caption:"glyphicon-comment", type:"footnote",dialog:Require("markfootnote")}  //single view dialog markup
  ,{caption:"glyphicon-comment", type:"footnote2",fields:commentFields,dialog:Require("markfootnote")}  //single view dialog markup
  ,{caption:"glyphicon-transfer",type:"correspond",dialog:Require("markcorrespond")} //dual view markup
  ,{caption:"glyphicon-link",type:"intertext",dialog:Require("markintertext")} //dual view dialog markup
];

/*
see http://getbootstrap.com/components/#glyphicons for more icons
*/