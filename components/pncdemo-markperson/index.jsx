/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var markperson = React.createClass({
  getInitialState: function() {
     return {};
  },
  mixins: [Require("markupdialogmixin")],
  action:function(opts) {
    console.log(opts.selections)
  },
  render: function() {
    return null;
  }
});
module.exports=markperson;