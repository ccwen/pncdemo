/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
/*
  if ctrlKey is pressed, do not fired the default markup behavior
  , instead, append the selection.

  
*/
var tokenize=Require("ksana-document").tokenizers.simple; 
var getselection=require("./selection");
var textview = React.createClass({
  getInitialState: function() {
    return {bar: "world", selections:[] };
  },
  addSelection:function(start,len) {
    var selections=this.state.selections;
    selections.push([start-1,len]);
    this.setState({selections:selections});
    window.getSelection().empty();
  },
  clearMarkup:function(type,start) {
    /*
    start++;//should remove it in the future
    var ranges=this.state.ranges.filter(function(r){
      return ! ((r.type==type) && (start>=r.start && start<r.start+r.len));
    });
    this.setState({ranges:ranges});
    console.log("clear",type,start);
    */
  },
  
  rangeToClasses:function(arr,i) {
    var out=[];
    arr.map(function(r){
      var classes="",start=r[0],len=r[1];
      var basetype=r[2]||"selected";
      if (i>=start && i<start+len) {
        classes=basetype;
        if (i==start) classes+=" "+basetype+"_b";
        if (i==start+len-1) classes+=" "+basetype+"_e";
      }
      if (classes) out.push(classes);
    },this);
    return out;
  },

  clearSelection:function() {
    if (this.state.selections.length) {
      this.setState({selections:[]});
    }
  },
  mouseDown:function(e) {
    //if (e.ctrlKey) console.log("ctrl");
  },
  mouseUp:function(e) {
    var sel=getselection();
    if (e.ctrlKey && sel && sel.len) {
      this.addSelection(sel.start,sel.len);
    } else {
      var x=e.pageX,y=e.pageY;
      var selections=this.state.selections;
      selections.push([sel.start,sel.len]);
      this.props.action("selection",{selections:selections, x:x,y:y, view:this});  
      this.clearSelection();
    }    
  },
  toXML:function(s) {
    var res=tokenize(s);
    var out=[];
    for (var i=0;i<res.tokens.length;i++) {
      if (res.tokens[i]=="\n") {
        out.push(<br/>);
        continue;
      }
      var classes=this.rangeToClasses(this.state.selections,i).join(" ");
      out.push(<span data-n={i+1} className={classes} key={"k"+i}>{res.tokens[i]}</span>);
    }
    return out;
  },
  render: function() {
    return (
      <div>
        <div className="textview" onMouseUp={this.mouseUp} onMouseDown={this.mouseDown}>
          {this.toXML(this.props.text)}
        </div>
      </div>
    );
  }
});
module.exports=textview;