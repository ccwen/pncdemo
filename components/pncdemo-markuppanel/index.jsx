/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
var markups=[
   {caption:"Pointer",type:null}
  ,{caption:"Person",type:"person", dialog: Require("markperson") }
  ,{caption:"Place",type:"place", dialog:Require("markplace")}
  ,{caption:"Translation",type:"translation",dialog:Require("markcorrespond")}
  ,{caption:"Footnote",type:"footnote",dialog:Require("markfootnote")}
];

var markuppanel = React.createClass({
  getInitialState: function() {
    return {bar: "world", markups:markups, selected:this.props.mode||0};
  },
  activateMarkup:function(e) {
    var n=e.target.dataset['n'];
    this.props.action("setMarkupDialog",markups[n].dialog);
    this.setState({selected:n})
  },
  renderMarkupButtons:function(m,idx) {
    var extra="";
    var color="btn-primary";
    if (idx==this.state.selected) extra=" active";
    return <label key={"b"+idx} ref={"b"+idx} className={"btn "+color+extra}>
      <input onChange={this.activateMarkup} type="radio" name="markup"
      checked={idx==this.state.selected} data-n={idx}></input>{m.caption}
    </label>
  },
  render: function() { 
    return (
      <div>
      <div  className="btn-group">
        {this.state.markups.map(this.renderMarkupButtons,this)}
      </div>
      </div>
    );
  } 
});
module.exports=markuppanel;