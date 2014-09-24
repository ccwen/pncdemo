/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markfootnote = React.createClass({
  getInitialState: function() {
     return { };
  },
  mixins: [Require("markupdialogmixin")],
  allow:function(opts) {
    return (opts.selections.length==1 &&  //one view
            opts.selections[0][1].length==1);//one range
  },
  execute:function() {

  },
  ok:function() {
    console.log("OKOK");
  },
  cancel:function() {
    console.log("CANCEL");
  }, 
  renderBody:function() {
    return <div>
    <textarea ref="footnote" className="form-control"></textarea>
    </div>   
  }, 
  onShow:function() {
    this.refs.footnote.getDOMNode().focus();
  }, 
  render: function() {
    return this.renderDialog(this.renderBody);
  }
});
module.exports=markfootnote;