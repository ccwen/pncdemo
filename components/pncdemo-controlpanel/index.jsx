/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var controlpanel = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  save:function() {
    this.props.action("saveMarkups");
  },
  reset:function() {
    this.props.action("resetMarkups");
  },
  render: function() {
    return (
      <div>
        <button onClick={this.save} className="btn btn-success pull-right">Save</button>
        <button onClick={this.reset} className="btn btn-danger pull-right">Reset</button>
      </div>
    );
  }
});
module.exports=controlpanel;