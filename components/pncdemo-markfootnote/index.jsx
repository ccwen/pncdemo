/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var mixin=Require("markupdialogmixin");
var markfootnote = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  mixins: [mixin],
  render: function() {
    return (
      <div>
        add foot note
      </div>
    );
  }
});
module.exports=markfootnote;