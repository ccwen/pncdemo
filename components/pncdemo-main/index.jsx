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
      markupdialog:markuppanel.defaultDialog
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
    var M=this.refs.markupdialog;
    if (!M) return;
    M.activate({selections:selections.get()});
  },
  updateSelection:function(view,ranges) {
    selections.update(view,ranges);
  },
  action: function() {
    var args = [];
    Array.prototype.push.apply( args, arguments );
    var action=args.shift();
    var opts=args[0];
    var payload=null;
    if (action=="selection" || action=="appendSelection") {
      this.updateSelection(opts.view,opts.ranges);
      if (action=="selection") this.fireMarkup();
    } else if (action=="hoverToken" && this.showHoverMenu() ) {
      if (this.state.hoverToken!=opts.token) {
        this.setState({hoverToken:opts.token, x:opts.x, y:opts.y});  
      }
    } else if (action=="setMarkupDialog") {
      this.setState({markupdialog:opts.dialog, markupdialog_type:opts.type,markupdialog_title:opts.title});
    } else if (action=="clearSelection") {
      selections.clear(opts);
    } else if (action=="applyMarkup") {
      selections.applyMarkup(opts);
      this.action("clearSelection");
    }
  },
  render: function() {
    return (
      <div id="main">
        <markuppanel action={this.action}/>
        {this.state.markupdialog?this.state.markupdialog({ref:"markupdialog",action:this.action,type:this.state.markupdialog_type,title:this.state.markupdialog_title}):null}
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