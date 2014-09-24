/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markfootnote = React.createClass({
  getInitialState: function() {
     return { type: this.props.type || "footnote"};
  },
  mixins: [Require("markupdialogmixin")],
  allow:function(opts) {
    return (opts.selections.length==1 &&  //one view
            opts.selections[0][1].length==1);//one range
  },
  execute:function() {

  },
  ok:function(opts) {
    var note=this.refs.note.getDOMNode().value;
    var payload={insert:"end",note:note};
    this.refs.note.getDOMNode().value="";
    var args={selections:opts.selections,type:this.state.type,payload:payload};
    this.props.action("applyMarkup",args);
  },
  cancel:function(opts) {
    this.props.action("clearSelection");
  }, 
  renderBody:function() {
    return <div>
    <textarea ref="note" className="form-control"></textarea>
    </div>   
  }, 
  onShow:function() {
    this.refs.note.getDOMNode().focus();
  }, 
  render: function() {
    return this.renderDialog(this.renderBody);
  }
});
module.exports=markfootnote;