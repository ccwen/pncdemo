/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var Textnavigator=React.createClass({
  getInitialState:function() {
    return {appendingSelection:false}
  },
  next:function() {
    this.props.action("next");
  },
  prev:function() {
    this.props.action("prev");
  },
  render:function(){
    if (!this.props.view) return <div></div>;
    var nextclasses="",prevclasses="";
    if (!this.props.buttons.next) nextclasses=" disabled";
    if (!this.props.buttons.prev) prevclasses=" disabled";
    return (
      <div> 
        <button onClick={this.prev} className={"btn  btn-default"+prevclasses}><span className="glyphicon glyphicon-chevron-left"/></button>
        <span className="pagetitle">{this.props.view.name}</span>
        <button onClick={this.next} className={"btn  btn-default"+nextclasses}><span className="glyphicon glyphicon-chevron-right"/></button>
      </div>
    )

  }
});
var viewer = React.createClass({
  getInitialState: function() {
    return {bar: "world", cur:0 };
  },
  renderView:function() {
    if (!this.props.views.length)return <div></div>;
    var v=this.props.views[this.state.cur];
    return this.props.view({
      action:this.props.action
      ,getExtra:this.props.getExtra
      ,name:v.name
      ,text:v.content
    });
  },
  action:function() {
    var args = [];
    Array.prototype.push.apply( args, arguments );
    var action=args.shift();
    var opts=args[0];
    var cur=this.state.cur;
    if (action=="next") {
      if (cur<this.props.views.length-1) this.setState({cur:cur+1});
    } else if (action=="prev"){
      if (cur>0) this.setState({cur:cur-1});
    }
  },
  getClickableButtons:function() {
    var cur=this.state.cur;
    var buttons={next:cur<this.props.views.length-1,prev:cur>0};
    return buttons;
  },
  render: function() {
    var buttons=this.getClickableButtons();
    var v=this.props.views[this.state.cur];
    return (
      <div>
        <Textnavigator getExtra={this.props.getExtra} action={this.action} view={v} buttons={buttons}/>
        {this.renderView()}
      </div>
    );
  }
});
module.exports=viewer;