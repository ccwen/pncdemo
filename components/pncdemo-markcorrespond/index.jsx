/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markcorrespond = React.createClass({
  getInitialState: function() {
     return {immediate:true};
  },
  mixins: [Require("markupdialogmixin")],
  allow:function(opts) {
    return (opts.selections.length==2);//one range
  },
  appendable:true,
  execute:function(opts) {
    this.props.action("applyLink",{tag:"correspond",
            selections:opts.selections,payload:{}});
  },
  render: function() {
    return null;
  }
});
module.exports=markcorrespond;