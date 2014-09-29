/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markfootnote = React.createClass({
  getInitialState: function() {
     return { };
  },
  mixins: [Require("markupdialogmixin")],
  allow:function(opts) {
    return (opts.selections.length==1 &&  //one view
            opts.selections[0][1].length==1);//one range
  },
  execute:function() {

  },
  loadMarkup:function(markup) {
    this.editing=markup;
    this.refs.content.getDOMNode().value=markup[3].content;
  },
  packMarkup:function(opts) {
    opts=opts||{};
    var content=this.refs.content.getDOMNode().value;
    var payload={insert:"end",content:content};
    this.refs.content.getDOMNode().value="";
    var args={selections:opts.selections,type:this.props.type,payload:payload};
    return args;
  },
  create:function(opts) {
    var args=this.packMarkup(opts);
    this.props.action("applyMarkup",args);
  },
  save:function(opts) {
    var args=this.packMarkup(opts);
    this.editing[3]=args.payload;
    this.props.action("markupSaved",args);
  },
  cancel:function(opts) {
    this.props.action("clearSelection");
  }, 
  renderBody:function() {
    return <div>
    <textarea ref="content" className="form-control"></textarea>
    </div>   
  }, 
  onShow:function() {
    this.refs.content.getDOMNode().focus();
  }, 
  render: function() {
    return this.renderDialog(this.renderBody);
  }
});
module.exports=markfootnote;