module.exports=[
   {caption:"View",type:null,dialog: Require("markoverview")} //nothing happen
  ,{caption:"Why", type:"why", dialog: Require("marksimple")  } 
  ,{caption:"What", type:"what", dialog: Require("marksimple")  } 
  ,{caption:"Where", type:"where", dialog: Require("marksimple")  } 
  ,{caption:"When", type:"when",dialog:Require("marksimple")}  
  ,{caption:"Who", type:"who",dialog:Require("marksimple")} 
  ,{caption:"How",type:"how",dialog:Require("marksimple")} 
  ,{caption:"Note", type:"footnote",dialog:Require("markfootnote"),editable:true}  //single view dialog markup
  ,{caption:"Intertext",type:"intertext",dialog:Require("markintertext"),editable:true} //dual view dialog markup
];