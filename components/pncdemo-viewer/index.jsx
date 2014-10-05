/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var textnavigator=React.createClass({
  next:function() {
    this.props.action("next");
  },
  prev:function() {
    this.props.action("prev");
  },
  render:function(){
    if (!this.props.view) return <div></div>
    return (
      <div>
        <button onClick={this.prev} className="btn btn-default">Prev</button>
        {this.props.view.name}
        <button onClick={this.next}className="btn btn-default">Next</button>
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
      ,extra:this.props.extra(v.name)
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
  render: function() {
    var v=this.props.views[this.state.cur];
    return (
      <div>
        <textnavigator action={this.action} view={v}/>
        {this.renderView()}
      </div>
    );
  }
});
module.exports=viewer;