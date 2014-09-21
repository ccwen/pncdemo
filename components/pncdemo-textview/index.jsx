/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var tokenize=Require("ksana-document").tokenizers.simple; 

var textview = React.createClass({
  getInitialState: function() {
    return {bar: "world", ranges:[] };
  },
  addRange:function(type,start,len) {
    var ranges=this.state.ranges;
    ranges.push({type:type,start:start,len:len});
    this.setState({ranges:ranges});
  },
  clearMarkup:function(type,start) {
    start++;//should remove it in the future
    var ranges=this.state.ranges.filter(function(r){
      return ! ((r.type==type) && (start>=r.start && start<r.start+r.len));
    });
    this.setState({ranges:ranges});
    console.log("clear",type,start);
  },
  getClass:function(i) {
    var out=[];
    this.state.ranges.map(function(r){
      var classes="";
      if (i>=r.start && i<r.start+r.len) {
        classes=r.type;
        if (i==r.start) classes+=" "+r.type+"_b";
        if (i==r.start+r.len-1) classes+=" "+r.type+"_e";
      }
      if (classes) out.push(classes);
    },this);
    return out;
  },
  getRange:function() {
    var sel = getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    var s=range.startContainer.parentElement;
    var e=range.endContainer.parentElement;
    if (s.nodeName!='SPAN' || e.nodeName!='SPAN') return;
    var start=parseInt(s.getAttribute('data-n'),10);
    var end=parseInt(e.getAttribute('data-n'),10);
    return [start,end];
  },
  getSelection:function() {
    var R=this.getRange();
    if (!R) return;
    var start=R[0];
    var end=R[1];
    var length=0;
    var sel = getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);    
    var s=range.startContainer.parentElement;
    var e=range.endContainer.parentElement;
    var n=e.nextSibling,nextstart=0;
    if (!n) return null;           
    if (n.nodeName=="SPAN") {
      nextstart=parseInt(n.getAttribute('data-n'),10);  
    }
    var selectionlength=end-start+sel.extentOffset-sel.anchorOffset;
    if (start+selectionlength==nextstart) {//select till end of last token
      length=selectionlength;
    } else {
      if (selectionlength)   length=nextstart-start; //https://github.com/ksanaforge/workshop/issues/50
      else length=end-start;
      //if (range.endOffset>range.startOffset &&!length) length=1;
      if (length<0) {
          temp=end; end=start; start=end;
      }
    }

    //sel.empty();
   //this.refs.surface.getDOMNode().focus();
    return {start:start,len:length};
  },
  mouseUp:function(e) {
    var sel=this.getSelection();
    if (!sel) return;
    var x=e.pageX,y=e.pageY;
    if (sel.len>0) {
      this.props.action("selection",{start:sel.start,len:sel.len, x:x,y:y, view:this } );  
    } else {
      var classes=this.getClass(sel.start+1);
      if (classes.length) {
        this.props.action("clearMarkup",{start:sel.start,markups:classes, x:x, y:y ,view:this});
      }
    }    
    e.preventDefault();
  },
  toXML:function(s) {
    var res=tokenize(s);
    var out=[];
    for (var i=0;i<res.tokens.length;i++) {
      var classes=this.getClass(i+1).join(" ");
      out.push(<span data-n={i+1} className={classes} key={"k"+i}>{res.tokens[i]}</span>);
    }
    return out;
  },
  render: function() {
    return (
      <div>
        <div onMouseUp={this.mouseUp}>       
          {this.toXML(this.props.text)}
        </div>
      </div>
    );
  }
});
module.exports=textview;