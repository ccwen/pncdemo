/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var tagsets={standard:require("./tagset_default"),news:require("./tagset_news")
,other:require("./tagset_other")};

var news_markups=require("./tagset_news");

var markuppanel = React.createClass({
  getInitialState: function() {
    return {bar: "world", markups:tagsets.other||tagsets.standard, selected:this.props.mode||0};
  },
  activateMarkup:function(n) {
    var m=this.state.markups[n];
    this.props.action("setMarkupDialog",m);
    this.setState({selected:n});
  },
  onSelectMarkup:function(e) {
    var n=e.target.dataset['n']; 
    this.activateMarkup(n);
  },
  renderMarkupButtons:function(m,idx) {
    var extra="";
    var color="btn-default";
    var markupcaption=function() {
      if (m.caption.indexOf("glyphicon-")>-1) {
        return <span title={m.tag} className={"glyphicon "+m.caption}/>
      } else {
        return m.caption;
      }
    }
    if (idx==this.state.selected) {
      extra=" active";
      color="btn-primary";
    }
    return <label key={"b"+idx} ref={"b"+idx} className={"btn "+color+extra}>
      <input onChange={this.onSelectMarkup} type="radio" name="markup"
      checked={idx==this.state.selected} data-n={idx}></input>
      {markupcaption()}
    </label>
  },
  selectset:function(e) {
    var name=e.target.dataset["tagset"];
    var newtagset=tagsets[name];//require("./tagset_"+name);
    if(newtagset) {
      this.setState({markups:newtagset});
      this.activateMarkup(0);      
    }
    //this.props.action("setTagset",name,newtagset);
  },
  renderTagset:function() {
    return (
      <div className="btn-group pull-right">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
        TagSet<span className="glyphicon glyphicon-bookmark"/> <span className="caret"></span>
        </button>
        <ul onClick={this.selectset} className="dropdown-menu" role="menu">
          <li><a href="#" data-tagset="standard">Default</a></li>
          <li><a href="#" data-tagset="other">Other </a></li>
          <li><a href="#" data-tagset="news">News </a></li>
        </ul>
      </div>
      );
  },  
  render: function() { 
    return (
      <div>
      <div  className="btn-group">
        {this.state.markups.map(this.renderMarkupButtons,this)}
      </div>
      {this.renderTagset()}
      </div>
    );
  } 
});
//markuppanel.defaultDialog=this.state.markups[0].dialog;

module.exports=markuppanel;
