/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var hovermenu = React.createClass({
  getInitialState: function() {
    return {};
  },
  renderEditButton:function() {//invoke the dialog
    return <button className="btn btn-xs btn-primary">Change</button>
  },
  deleteMarkup:function(e) {
    this.props.action("deleteMarkup");
  },
  render: function() {
    return (
      <div className="hovermenu"> 
        {this.props.editable?this.renderEditButton():null}
        <button onClick={this.deleteMarkup} className="btn btn-xs btn-danger">{"\u2716"}</button>
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