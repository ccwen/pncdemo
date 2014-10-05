module.exports=[
   {caption:"View",type:null,dialog: Require("markoverview")} //nothing happen
  ,{caption:"Important", type:"important", dialog: Require("marksimple")  } //immediate single view markup
  ,{caption:"Footnote", type:"footnote",dialog:Require("markfootnote"),editable:true}  //single view dialog markup
  ,{caption:"Footnote2", type:"footnote2",dialog:Require("markfootnote"),editable:true}  //single view dialog markup
  ,{caption:"Correspondance",type:"correspond",dialog:Require("markcorrespond")} //dual view markup
  ,{caption:"Intertext",type:"intertext",dialog:Require("markintertext"),editable:true} //dual view dialog markup
];