/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var markintertext = React.createClass({
  getInitialState: function() {
     return { type: this.props.type || "intertext"};
  },
  mixins: [Require("markupdialogmixin")],
  allow:function(opts) {
    return (opts.selections.length==2);//two view
  },
  appendable:true,
  editable:true,
  execute:function() {
 
  },
  loadMarkup:function(markup) {
    this.editing=markup;
    this.refs.content.getDOMNode().value=markup[3].content;
    this.refs.linktype.getDOMNode().value=markup[3].linktype;
  },
  packMarkup:function(opts) {
    opts=opts||{};
    var content=this.refs.content.getDOMNode().value;
    var linktype=this.refs.linktype.getDOMNode().value;
    var payload={insert:"end",content:content,linktype:linktype};
    this.refs.linktype.getDOMNode().value="";
    this.refs.content.getDOMNode().value="";
    var args={selections:opts.selections,type:this.state.type,payload:payload};
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
    Linktype:<input ref="linktype" className="input form-control"></input>
    Description:<textarea ref="content" className="form-control"></textarea>
    </div>   
  }, 
  onShow:function() {
    this.refs.linktype.getDOMNode().focus();
  }, 
  render: function() {
    return this.renderDialog(this.renderBody);
  }
});
module.exports=markintertext;