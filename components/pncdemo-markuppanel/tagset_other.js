module.exports=[
   {caption:"glyphicon-eye-open",tag:null,dialog: Require("markoverview")} //nothing happen
  ,{caption:"hello", tag:"hello", dialog: Require("marksimple")  } 
  ,{caption:"同義", tag:"sym", dialog: Require("markinternal")  } 
  ,{caption:"因果", tag:"causeeffect", dialog: Require("markinternal2")  } 
  ,{caption:"地", tag:"where", dialog: Require("marksimple")  } 
  ,{caption:"How",tag:"how",dialog:Require("marksimple")} 
  ,{caption:"glyphicon-comment", tag:"footnote",dialog:Require("markfootnote")}  //single view dialog markup
  ,{caption:"glyphicon-link",tag:"intertext",dialog:Require("markintertext")} //dual view dialog markup
];
