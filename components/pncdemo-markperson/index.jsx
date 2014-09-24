/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var markperson = React.createClass({
  getInitialState: function() {
     return {immediate:true};
  },
  mixins: [Require("markupdialogmixin")],
  execute:function(opts) {
    this.props.action("applyMarkup",{type:"person",selections:opts.selections});
    this.props.action("clearSelection");
  },
  render: function() {
    return null;
  }
});
module.exports=markperson;