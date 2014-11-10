/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markinternal = React.createClass({
  getInitialState: function() {
     return {immediate:true};
  },
  mixins: [Require("markupdialogmixin")],
  allow:function(opts) {
    return (opts.selections.length==1 && opts.selections[0][1].length>=2);
  },
  appendable:true,
  execute:function(opts) {
    this.props.action("applyMarkup",{tag:this.props.tag,
            selections:opts.selections,payload:{}});
  },
  render: function() {
    return null;
  }
});
module.exports=markinternal;