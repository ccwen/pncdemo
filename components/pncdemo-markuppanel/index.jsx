/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var markups=[
   {caption:"Pointer",type:null}
  ,{caption:"Person",type:"person"}
  ,{caption:"Place",type:"place"}
  ,{caption:"Translation",type:"translation",selection:2 }
  ,{caption:"Footnote",type:"footnote"}
];
var markuppanel = React.createClass({
  getInitialState: function() {
    return {bar: "world", markups:markups, active:0};
  },
  renderMarkupButtons:function(m,idx) {
    var extra="";
    var color="btn-primary";
//    if (m.selection>1) color="btn-success";
    if (idx==0) extra=" active";
    return <label key={idx} data-type={m.type} className={"btn "+color+extra}>
      <input type="radio" name="markup" checked={idx==0}></input>{m.caption}
    </label>
  },
  render: function() { 
    return (
      <div className="btn-group" data-toggle="buttons">
        {this.state.markups.map(this.renderMarkupButtons)}
      </div>
    );
  } 
});
module.exports=markuppanel;