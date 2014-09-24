/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markfootnote = React.createClass({
  getInitialState: function() {
     return {
        test: 'test'
      };
  },
  mixins: [Require("markupdialogmixin")],

  renderBody:function() {
    return <div>foot node</div>
  },
  render: function() {
    return this.renderDialog(this.renderBody);
  }
});
module.exports=markfootnote;