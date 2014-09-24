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
      menupayload:{}
      ,views:testdata
      ,markupdialog:markuppanel.defaultDialog
      ,markuptype:null
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
    } else if (action=="hoverToken") {
      if (this.state.hoverToken!=opts.token &&
          this.state.hoverMarkup!=opts.markup) {
        this.setState({activeView:opts.view,hoverMarkup:opts.markup,hoverToken:opts.token, x:opts.x, y:opts.y});
        //if (!this.state.hoverToken) 
      }
    } else if (action=="setMarkupDialog") {
      this.setState({markupdialog:opts.dialog, markuptype:opts.type,markupdialog_title:opts.title,markupeditable:opts.editable});
      this.setState({hoverToken:null});
    } else if (action=="clearSelection") {
      selections.clear(opts);
    } else if (action=="applyMarkup") {
      selections.applyMarkup(opts);
      this.action("clearSelection");
    } else if (action=="deleteMarkup") {
      this.state.activeView.action("deleteMarkup",this.state.hoverMarkup);
      this.setState({hoverToken:null});
    }
  },
  viewExtra:function() {
    return {markuptype:this.state.markuptype};
  },
  render: function() {
    return (
      <div id="main">
        <markuppanel action={this.action}/>
        {this.state.markupdialog?this.state.markupdialog({ref:"markupdialog",action:this.action,type:this.state.markup_type,title:this.state.markupdialog_title}):null}
        <div>
        <hoverMenu action={this.action} 
          markup={this.state.hoverMarkup} target={this.state.hoverToken} 
          editable={this.state.markupeditable} x={this.state.x} y={this.state.y}/>
        <div className="col-md-3">
          <stackview view={textview} action={this.action} views={this.state.views[0]}extra={this.viewExtra()}  />
        </div>
        <div className="col-md-9">
          <stackview view={textview} action={this.action} views={this.state.views[1]} extra={this.viewExtra()} />
        </div>
        </div>
      </div>
    );
  }
});
module.exports=main;