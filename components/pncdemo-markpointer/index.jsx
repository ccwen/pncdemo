/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var markpointer = React.createClass({
  getInitialState: function() {
     return {};
  },
  mixins: [Require("markupdialogmixin")],
  action:function(opts) {
    this.props.action("clearSelection",{keepWindowSelection:true});
  },
  render: function() {
    return null;
  }
});
module.exports=markpointer;