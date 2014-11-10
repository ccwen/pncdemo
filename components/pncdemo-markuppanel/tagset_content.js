module.exports=[
   {caption:"glyphicon-eye-open",tag:null,dialog: Require("markoverview")} //nothing happen
  ,{caption:"題名互文", tag:"bookquote", dialog: Require("markinternal2") ,label:["題名","引文"] } 
  ,{caption:"人名互文", tag:"personquote", dialog: Require("markinternal2") ,label:["人名","引文"] } 
  ,{caption:"跨文本互文", tag:"quote", dialog: Require("markintertext") } 
  ,{caption:"同義", tag:"synonym", dialog: Require("markinternal")  ,label:["詞彙","同義詞"]} 
  ,{caption:"能所", tag:"sign", dialog: Require("markinternal2")  ,label:["能指","所指"]} 
  ,{caption:"名相", tag:"nameappearance", dialog: Require("markinternal2") ,label:["名","相"] } 
  ,{caption:"因果", tag:"causeeffect", dialog: Require("markinternal2") ,label:["因","果"] } 
  ,{caption:"總別", tag:"commonindividual", dialog: Require("markinternal2") ,label:["總","別"] } 
  ,{caption:"整體與部份", tag:"wholepart", dialog: Require("markinternal2")  ,label:["整體","部份"]} 
];
