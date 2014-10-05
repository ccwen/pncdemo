/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
Require("bootstrap");
var contextmenu=Require("contextmenu");
var viewer=Require("viewer"); 
var textview=Require("textview");
var controlpanel=Require("controlpanel");
var markuppanel=Require("markuppanel");
var hoverMenu=Require("hovermenu");
var selections=require("./selections");
var persistent=require("./persistent");
function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
var main = React.createClass({
  selection_menuitems:function() {
    return [
      //{caption:"Add",handler:this.addSelection, previousView:null}
    ]
  },
  getInitialState: function() {
    React.initializeTouchEvents(true);
    return {
     // menuitems:this.selection_menuitems(),
      menupayload:{}
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
  componentDidUpdate:function() {
    this.deletinggid=null;
  },
  loadMarkups:function(views) {
    var keys=[];
    views.map(function(t){t.map(function(m){keys.push(m.name)})});
    persistent.loadMarkups(keys,function(bulk){
      this.setState({markupready:true,bulk:bulk});
    },this);
  },
  componentDidMount:function() {
    if (detectmob()) {
      this.getDOMNode().classList.add("noselect");
      this.getDOMNode().classList.add("mobile");  
    } else {
      this.getDOMNode().classList.add("desktop");
    }

  },
  viewExtra:function(name) {
    var match=[];
    if (this.state.bulk) match=this.state.bulk.filter(function(m){
      return (m._id==name);
    });
    var markups=[];
    if (match.length) markups=match[0].markups;
    var views=[];
    var readonly=!this.state.markuptype;
    return {markuptype:this.state.markuptype, hovergid:this.state.hovergid,deletinggid:this.deletinggid, markups: markups , readonly:readonly};
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
  createMarkup:function() {
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
      if (action=="selection") this.createMarkup();
    } else if (action=="hoverToken") {
      if (this.state.hoverToken!=opts.token ||
          this.state.hoverMarkup!=opts.markup) {
        //do not show hover menu for shadow markup
        if (opts.markup) {
          var gid=null;
          if (opts.markup[3] &&opts.markup[3].gid) gid=opts.markup[3].gid;

          if ((opts.markup[3] && opts.markup[3].shadow)){
            this.setState({activeView:opts.view,hoverMarkup:opts.markup,hovergid:gid,hoverToken:null}); //set hoverToken to null so that  show hover menu is hidden
          } else {
            this.setState({activeView:opts.view, x:opts.x, y:opts.y,
              hoverMarkup:opts.markup,hoverToken:opts.token,hovergid:gid});
          }          
        } else {
          this.setState({hoverMarkup:null,hoverToken:null,hovergid:null});
        }
      }
    } else if (action=="setMarkupDialog") {
      this.setState({markupdialog:opts.dialog, markuptype:opts.type,markupdialog_title:opts.title,markupeditable:opts.editable});
      this.setState({hoverToken:null,hoverMarkup:null});
    } else if (action=="clearSelection") {
      selections.clear(opts);
    } else if (action=="applyMarkup") {
      selections.applyMarkup(opts);
      this.action("clearSelection");
    } else if (action=="applyLink") {
      selections.applyLink(opts);
      this.action("clearSelection");
    } else if (action=="deleteMarkup") {
      this.state.activeView.action("deleteMarkup",this.state.hoverMarkup);
      //broad cast the gid to delete all
      var m=this.state.hoverMarkup;
      if (m[3] && m[3].gid) this.deletinggid=m[3].gid;
      this.setState({hoverToken:null,hoverMarkup:null,hovergid:null});
    } else if (action=="editMarkup") {
      this.refs.markupdialog.edit(this.state.hoverMarkup);
      this.setState({hoverToken:null,hoverMarkup:null});
    } else if (action=="markupSaved") {
      this.state.activeView.action("markupSaved");
      this.setState({hoverToken:null,hoverMarkup:null});
    } else if (action=="saveMarkups") {
      persistent.saveMarkups(this.state.bulk);
    } else if (action=="resetMarkups") {
      persistent.resetMarkups(this.state.bulk);
      this.forceUpdate();
    } else if (action=="dataset") {
      this.setState({views:opts});
      this.loadMarkups(opts);
    }
  },

  render: function() {
    var left=[],right=[];
    var leftcol=6,rightcol=6;
    if (this.state.views) {
      left=this.state.views[0];
      leftcol=left[0].cols||leftcol;
    }
    if (this.state.views) {
      right=this.state.views[1];
      rightcol=right[0].cols||rightcol;
    } 
    return (
      <div id="main"> 
        <controlpanel action={this.action}/>
        <markuppanel action={this.action}/>
        {this.state.markupdialog?this.state.markupdialog({ref:"markupdialog",action:this.action,type:this.state.markuptype,title:this.state.markupdialog_title}):null}
        <div>
        <hoverMenu action={this.action} 
          readonly={!this.state.markuptype}
          markup={this.state.hoverMarkup} target={this.state.hoverToken} 
          editable={this.state.markupeditable} x={this.state.x} y={this.state.y}/> 
        <div className="views">
        <div className={"col-md-"+leftcol}>
          <viewer view={textview} action={this.action} views={left} extra={this.viewExtra}  />
        </div>
        <div className={"col-md-"+rightcol}>
          <viewer view={textview} action={this.action} views={right} extra={this.viewExtra} />
        </div>
        </div>
        </div>
      </div>
    );
  }
});
module.exports=main;