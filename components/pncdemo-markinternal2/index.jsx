/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markinternal2 = React.createClass({
  getInitialState: function() {
     return {immediate:true};
  },
  mixins: [Require("markupdialogmixin")],

  allow:function(opts) {
    if (!opts.selections.length|| !opts.selections[0].length) return;
    console.log("allow internal2",opts.selections[0][1].length);
    if (opts.selections.length!=1) return ;

    if (opts.selections[0][1].length==1) return "more";
    if (opts.selections[0][1].length==2) return "ok";
    return ;
  },
  appendable:false,
  execute:function(opts) {
    console.log("execute internal2")
    this.props.action("applyMarkup",{tag:this.props.tag,
            selections:opts.selections,payload:{}});
  },
  render: function() {
    return null;
  }
});
module.exports=markinternal2;