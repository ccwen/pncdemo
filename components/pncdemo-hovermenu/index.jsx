/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var hovermenu = React.createClass({
  getInitialState: function() {
    return {};
  },
  editMarkup:function(e) {
    this.props.action("editMarkup");
  },
  deleteMarkup:function(e) {
    this.props.action("deleteMarkup");
  },
  renderEditButton:function() {//invoke the dialog
    return <button onClick={this.editMarkup} className="btn btn-sm btn-primary"><span className="glyphicon glyphicon-pencil"/></button>
  },
  renderDeleteButton:function() {
    return <button onClick={this.deleteMarkup} className="btn btn-sm btn-danger"><span className="glyphicon glyphicon-remove"/></button>;
  },
  renderContent:function() {
    var content="";
    if (this.props.markup && this.props.markup[2]) {
      content=this.props.markup[3].content;
    }
    return <div>{content}</div>
  },
  //{"\u2716"}  remove
  render: function() {
    return ( 
      <div className="hovermenu"> 
        {this.props.readonly?this.renderContent():null}
        {!this.props.readonly?this.renderDeleteButton():null}
        {this.props.editable?this.renderEditButton():null}
      </div>
    );
  },
  componentDidMount:function() {
    this.getDOMNode().style.visibility="hidden";
  },
  componentDidUpdate:function() {
    var dom=this.getDOMNode();
    var target=this.props.target;
    if (target) {
      var pRect=target.parentElement.getBoundingClientRect();
      var rect=target.getBoundingClientRect();
      //console.log(pRect.left,rect.left, rect.left-pRect.left);
      //console.log(pRect.top,rect.top ,  rect.top-pRect.top);
      dom.style.visibility="visible"; 
      dom.style.left = this.props.x- dom.offsetWidth/2+"px";//this.props.x-dom.offsetWidth/2+"px";
      dom.style.top  = rect.top+dom.offsetHeight/2+"px";//this.props.y-dom.offsetTop/2+"px";
    } else {
      dom.style.visibility="hidden";
    }
  }
});
module.exports=hovermenu;