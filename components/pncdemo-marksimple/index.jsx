/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var marksimple = React.createClass({
  getInitialState: function() {
     return {immediate:true};
  },
  mixins: [Require("markupdialogmixin")],
  execute:function(opts) {
    this.props.action("applyMarkup",{type:this.props.type,selections:opts.selections});
  },
  render: function() {
    return null;
  }
});
module.exports=marksimple;