/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
Require("bootstrap");
var contextmenu=Require("contextmenu");
var stackview=Require("stackview"); 
var textview=Require("textview");
var markuppanel=Require("markuppanel");
var testdata=require('./testdata');
var main = React.createClass({
  selection_menuitems:function() {
    return [
      {caption:"Add",handler:this.addSelection, previousView:null}
    ]
  },
  getInitialState: function() {
    return {
     // menuitems:this.selection_menuitems(),
      menupayload:{},
      views:testdata,
    };
  },
  addSelection:function(opts,idx) {
    //console.log("add",opts);
    opts.view.addRange("selected",opts.selstart,opts.sellength);
  },
  clearMarkup:function(opts,idx) {
    //console.log("clearMarkup");
    var baseclass=this.state.menuitems[idx].caption;
    opts.view.clearMarkup(baseclass,opts.selstart);
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

  action: function() {
    var args = [];
    Array.prototype.push.apply( args, arguments );
    var action=args.shift();
    if (action=="selection" ) {
     
      var opts=args[0];
      var payload=this.getMenuPayload(opts);
    //  var menuitems=this.selection_menuitems();
       /*
      if (action=="clearMarkup") {
        menuitems=this.createMarkupMenuItems(opts.markups);
        payload.header="Clear";
      }

      if (opts.len || action=="clearMarkup") {
        this.setState({menuitems:menuitems,menupayload:payload});
      } else {
        this.setState({menuitems:[],menupayload:{}});
      }
      */
      this.setState({previousView:payload.view});
    } 
  },
  clickme:function() {
    //
  },
  //<contextmenu menuitems={this.state.menuitems} payload={this.state.menupayload}/>
  render: function() {
    return (
      <div id="main">
        <markuppanel/>
        <div>
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