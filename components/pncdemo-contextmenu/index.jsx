/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
var contextmenu=React.createClass({
  renderItem:function(item,idx) {
      return <li key={"k"+idx}>
        <a role="menuitem" tabIndex="-1" href="#" data-i={idx} 
        onMouseUp={this.itemClicked}>{item.caption}</a>
      </li>;
      //don't know why but onClick doesn't work
      //dispatchListeners == null
  },
  itemClicked:function(e) {
    var i=e.target.dataset.i;
    var handler=this.props.menuitems[i].handler;
    if (handler) {
      handler.apply(this.props.context,[this.props.payload,i]);
    }
    this.hideDropdown();
  },
  getDefaultProps:function() {
    return {
      context: this,
      menuitems : [
        {caption:"dismiss", handler:null}
      ]
    }
  },
  render:function() {
    return <div className="dropdown" ref="menu">
    <ul className="dropdown-menu" role="menu">
      <li role="presentation" className="dropdown-header">{this.props.payload.header}</li>
      {this.props.menuitems.map(this.renderItem,this)}
    </ul>
    </div>
  },
  showDropdown:function(x,y) {
    //$(".dropdown").dropdown();
    var menu=this.refs.menu.getDOMNode();
    menu.style.left=(parseInt(x)+5)+'px';
    menu.style.top=(parseInt(y)-45)+'px'; //header size
    menu.classList.add("open");
  },
  hideDropdown:function() {
    this.refs.menu.getDOMNode().classList.remove("open");
  },
  componentDidMount:function() {
    $(this.refs.menu.getDOMNode()).dropdown();
  },
  componentDidUpdate:function() {
    if (this.props.payload) this.showDropdown(this.props.payload.x,this.props.payload.y);
    else this.hideDropdown();
  }
});
module.exports=contextmenu;