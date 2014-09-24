/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
Require("bootstrap");
var contextmenu=Require("contextmenu");
var stackview=Require("stackview"); 
var textview=Require("textview");
var markuppanel=Require("markuppanel");
var hoverMenu=Require("hovermenu");
var testdata=require('./testdata');
var selections=require("./selections");
var main = React.createClass({
  selection_menuitems:function() {
    return [
      //{caption:"Add",handler:this.addSelection, previousView:null}
    ]
  },
  getInitialState: function() {
    return {
     // menuitems:this.selection_menuitems(),
      menupayload:{},
      views:testdata,
      markupdialog:null
    };
  },
  clearMarkup:function(opts,idx) {
    //console.log("clearMarkup");
    var baseclass=this.state.menuitems[idx].caption;
    opts.view.clearMarkup(baseclass,opts.selstart);
  },
  componentWillUpdate:function() {
    selections.clear();
  },
  componentDidMount:function() {
  },
  getMenuPayload:function(opts) {
    return {
      view:opts.view,header:"Selection"
      ,selstart:opts.start, sellength:opts.len
      ,x:opts.x, y:opts.y
    }
  },
  createMarkupMenuItems:function(markups) {
    return markups.map(function(m){
      var baseclass=m.replace(/ .*/g,'');
      return {caption:baseclass, handler:this.clearMarkup}
    },this); 
  },
  showHoverMenu:function() {
    return false;
  },
  fireMarkup:function() {
    //this.state.markupAction(selections.get());
  },
  updateSelections:function(view,sels) {
    selections.update(view,sels);
  },
  action: function() {
    var args = [];
    Array.prototype.push.apply( args, arguments );
    var action=args.shift();
    var opts=args[0];
    var payload=null;
    if (action=="selection" || action=="appendSelection") {
      this.updateSelections(opts.view,opts.selections);
      if (action=="selection") this.fireMarkup();
    } else if (action=="appendSelection") {
    } else if (action=="hoverToken" && this.showHoverMenu() ) {
      if (this.state.hoverToken!=opts.token) {
        this.setState({hoverToken:opts.token, x:opts.x, y:opts.y});  
      }
    } else if (action=="setMarkupDialog") {
      this.setState({markupdialog:opts});
    }
  },
  clickme:function() {
    //
  },
  //<contextmenu menuitems={this.state.menuitems} payload={this.state.menupayload}/>
  render: function() {
    return (
      <div id="main">
        <markuppanel action={this.action}/>
        {this.state.markupdialog?this.state.markupdialog({action:this.action}):null}
        <div>
        <hoverMenu action={this.action} 
          target={this.state.hoverToken} x={this.state.x} y={this.state.y}/>
        <div className="col-md-3">
          <stackview view={textview} action={this.action} views={this.state.views[0]}/>
        </div>
        <div className="col-md-9">
          <stackview view={textview} action={this.action} views={this.state.views[1]}/>
        </div>
        </div>
      </div>
    );
  }
});
module.exports=main;