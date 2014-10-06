module.exports=[
   {caption:"glyphicon-eye-open",type:null,dialog: Require("markoverview")} //nothing happen
  ,{caption:"glyphicon-star", type:"important", dialog: Require("marksimple")  } //immediate single view markup
  ,{caption:"glyphicon-comment", type:"footnote",dialog:Require("markfootnote"),editable:true}  //single view dialog markup
  ,{caption:"glyphicon-comment", type:"footnote2",dialog:Require("markfootnote"),editable:true}  //single view dialog markup
  ,{caption:"glyphicon-transfer",type:"correspond",dialog:Require("markcorrespond")} //dual view markup
  ,{caption:"glyphicon-link",type:"intertext",dialog:Require("markintertext"),editable:true} //dual view dialog markup
];