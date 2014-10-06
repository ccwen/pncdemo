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
  componentDidUpdate:function() {
    if (this.state.markup) {
      this.loadMarkup(this.state.markup);
    } else {//set default value
      var fields=this.getFields();
      fields.map(function(f){
        this.refs[f.name].getDOMNode().value=f.defaultValue||"";
      },this);
    }
  },
  editable:true,
  loadMarkup:function(markup) {
    this.editing=markup;
    this.refs.content.getDOMNode().value=markup[3].content;
    var fields=this.getFields();
    fields.map(function(f){
      this.refs[f.name].getDOMNode().value=markup[3][f.name];
    },this);
  },
  packMarkup:function(opts) {
    opts=opts||{};
    var content=this.refs.content.getDOMNode().value;

    var payload={insert:"end",content:content};
    var fields=this.getFields();
    fields.map(function(f){
      payload[f.name]=this.refs[f.name].getDOMNode().value;
    },this);

    this.refs.content.getDOMNode().value="";
    var args={selections:opts.selections,tag:this.props.tag,payload:payload};
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
  renderField:function(f) {
    return <div className="input-group">
      {f.name}<input ref={f.name} className="input" name={f.name}/>
      </div>
  },
  getFields:function() {
    if (this.opts && this.opts.options && this.opts.options.fields) {
      return this.opts.options.fields || [];
    } else return [];
  },
  renderExtraFields:function() {
    var fields=this.getFields();
    if (!fields.length) return;
    return fields.map(this.renderField);
  },
  renderBody:function() {
    return <div>
      <textarea ref="content" className="form-control"></textarea>
      {this.renderExtraFields()}
    </div>   
  }, 
  onShow:function() {
    var first=Object.keys(this.refs)[0];
    this.refs[first].getDOMNode().focus();
  }, 
  render: function() {
    return this.renderDialog(this.renderBody);
  }
});
module.exports=markfootnote;