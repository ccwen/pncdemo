/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
var markups=[
   {caption:"Pointer",dialog: Require("markpointer")} //nothing happen
  ,{caption:"Person", dialog: Require("markperson") } //immediate single view markup
  ,{caption:"Footnote",dialog:Require("markfootnote")}  //single view dialog markup
  ,{caption:"Correspondance",dialog:Require("markcorrespond")} //dual view markup
];

var markuppanel = React.createClass({
  getInitialState: function() {
    return {bar: "world", markups:markups, selected:this.props.mode||0};
  },
  activateMarkup:function(e) {
    var n=e.target.dataset['n'];
    this.props.action("setMarkupDialog",{dialog:markups[n].dialog, title:markups[n].caption});
    this.setState({selected:n});
  },
  renderMarkupButtons:function(m,idx) {
    var extra="";
    var color="btn-default";
    if (idx==this.state.selected) {
      extra=" active";
      color="btn-primary";
    }
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
markuppanel.defaultDialog=markups[0].dialog;

module.exports=markuppanel;
