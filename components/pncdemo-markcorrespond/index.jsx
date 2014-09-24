/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markcorrespond = React.createClass({
  getInitialState: function() {
     return {
        test: 'test'
      };
  },
  mixins: [Require("markupdialogmixin")],
  execute:function(opts) {
    if (opts.selections.length<2) return;
    this.show();
  },
  renderBody:function() {
    return <div>corresponding link</div>
  },
  render: function() {
    return this.renderDialog(this.renderBody);
  }
});
module.exports=markcorrespond;