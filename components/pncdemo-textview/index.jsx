/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
/*
  if ctrlKey is pressed, do not fired the default markup behavior
  , instead, append the selection.
  use border-bottom and padding-bottom for multiple underline
  show certain type of markup
*/
/*

UNDO  , especially for deletion

*/
var tokenize=Require("ksana-document").tokenizers.simple; 
var getselection=require("./selection");

var footnote1=[5,2,"footnote",{insert:"end",content:"2",note:"footnote footnote"}];
var footnote2=[5,2,"footnote2",{insert:"end",note:"footnote footnote"}];
var textview = React.createClass({
  resetCount:function() {
    this.extraCount=0;
    this.footNoteCount=0;
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    var textchanged=(nextProps.text!=this.props.text);
    if (textchanged) this.tokenized=null;
    //return textchanged;
    return true;
  },
  getInitialState: function() {
    this.resetCount();
    return {ranges:[] , markups:[]};
  },
  componentWillUpdate:function() {
    this.resetCount();
  },
  addSelection:function(start,len) {
    var ranges=this.state.ranges;
    ranges.push([start-1,len]);
    this.setState({ranges:ranges});
    return ranges;
  },
  sameMarkup:function(m1,m2) {//this is stupid
    return (m1[0]==m2[0] && m1[1]==m2[1] && m1[2] && m2[2]);
  },
  action:function() {
    var args = [];
    Array.prototype.push.apply( args, arguments );
    var action=args.shift();
    var opts=args[0];
    if (action=="clearWindowSelection") {
      window.getSelection().empty();  
    } else if (action=="applyMarkup") {
      this.applyMarkup.apply(this,args);
    } else if (action=="markupSaved") {
      this.setState({refresh:true,hoverMarkup:null});
    } else if (action=="clearRanges") {
      this.clearRanges();
    } else if (action=="deleteMarkup") {
      this.setState({hoverMarkup:null});
      var markups=this.state.markups.filter(function(m){
        return !this.sameMarkup(m,opts);
      },this);
      if (markups.length!=this.state.markups.length) {
        this.setState({markups:markups});
      }
    }
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
  applyMarkup:function(type,ranges,payload) {
    var markups=this.state.markups;
    ranges.map(function(r){
      markups.push([r[0],r[1],type,payload]);
    })
    this.setState({markups:markups});
  },
  rangeToClasses:function(arr,i,prefix) {
    var out=[];
    arr.map(function(r){
      var classes="",start=r[0],len=r[1],type=r[2], markuptype=this.props.extra.markuptype;
      var baseclass=r[2]||"selected";
      if (prefix) baseclass=prefix+baseclass;
      var typemissmatch=(markuptype && type && markuptype!=type );
      if (i>=start && i<start+len && !typemissmatch) {
        classes=baseclass;
        if (i==start) classes+=" "+baseclass+"_b";
        if (i==start+len-1) classes+=" "+baseclass+"_e";
      }
      if (classes) out.push(classes);
    },this);
    return out;
  },
  clearRanges:function() {
    if (this.state.ranges.length) {
      this.setState({ranges:[],hoverMarkup:null});
    }
    //this.clearWindowSelection();
  },
  mouseDown:function(e) {
    //if (e.ctrlKey) console.log("ctrl");
  },
  mouseUp:function(e) { 
    var sel=getselection();
    var x=e.pageX,y=e.pageY;
    if (e.ctrlKey && sel && sel.len) {
      var ranges=this.addSelection(sel.start,sel.len);
      this.props.action("appendSelection",{ranges:ranges,x:x,y:y,view:this});
    } else {
      if (sel.len) {
        var ranges=this.addSelection(sel.start,sel.len);
        this.props.action("selection",{ranges:ranges, x:x,y:y, view:this});        
      } else {
        this.props.action("selection",{ranges:null,view:this});
        this.clearRanges();
      }
    }    
  },
  markupAt:function(n,type) {
    return this.state.markups.filter(function(m){
      var start=m[0],len=m[1];
      var typemissmatch=(type && m[2]!=type );
      return (n>=start && n<start+len && !typemissmatch);
    });
  },
  extraElement:function(n) {
    var out=[];
    var markups=this.markupAt(n,this.props.extra.markuptype);
    if (!markups.length) return out;
    markups.map(function(m){
      var start=m[0],len=m[1],type=m[2],payload=m[3];
      if (!payload || !payload.insert) return;
      if ( (payload.insert=="end" && n==start+len-1)
      || (payload.insert=="start" && n==start) ){
        if (type.substr(0,8)=="footnote") this.footNoteCount++;
        var content=payload.content||this.footNoteCount;
        var dataset={className:"extra_"+type,"data-n":n,key:this.extraCount++};
        //force 1em space
        out.push(React.DOM.span(dataset,"\u00a0"+content+"\u00a0"));
      }
    },this);
    return out;
  },
  checkTokenUnderMouse:function(target,x,y) {
    //var rect=this.getDOMNode().getBoundingClientRect();
    //x-=rect.left;
    //y-=rect.top;
    if (!target) return;
    if (target.nodeName!="SPAN") return;
    var n=parseInt(target.dataset['n']);
    var markups=this.markupAt(n-1,this.props.extra.markuptype); //n-1 is a workaround
    if (markups.length) {
      if (this.state.hoverToken!=target) { //do not refresh if hovering on same token
        this.props.action("hoverToken",{view:this,token:target,markup:markups[0],x:x,y:y});
        this.setState({hoverMarkup:markups[0]});
      }
    } else {
      this.props.action("hoverToken",{view:this,token:null});
      this.setState({hoverMarkup:null});
    }
    //this.props.action("mousemove",{view:this}); //notify caller, for onBlur Event
  },
  stillInView:function(relatedTarget)  {
    return relatedTarget &&
       (relatedTarget.className=="hovermenu" ||
        (relatedTarget.parentElement && relatedTarget.parentElement.className=="hovermenu"));
  },
  clearHoverIfOutOfView:function(relatedTarget){
      var stillInView=this.stillInView(relatedTarget);
      if (stillInView) return;
      if (this.state.hoverMarkup) this.setState({hoverMarkup:null});
  },
  mouseOut:function(e) {
    clearTimeout(this.mousetimer);
    this.mousetimer=setTimeout(this.clearHoverIfOutOfView.bind(this,e.relatedTarget),100);
  },
  mouseMove:function(e) {
    clearTimeout(this.mousetimer);
    this.mousetimer=setTimeout( 
      this.checkTokenUnderMouse.bind(this,e.target,e.pageX,e.pageY),100);
  },
  isHovering:function(i){
    var M=this.state.hoverMarkup;
    if (!M) return false;
    var start=M[0],len=M[1];
    return (i>=start && i<start+len);
  },
  toXML:function(s) {
    if (!this.tokenized) this.tokenized=tokenize(s);
    var out=[],tokens=this.tokenized.tokens;
    for (var i=0;i<tokens.length;i++) {
      if (tokens[i]=="\n") {
        out.push(<br key={"k"+i}/>);
        continue;
      } 
      var classes=this.rangeToClasses(this.state.ranges,i).join(" ");
      classes+=" "+this.rangeToClasses(this.state.markups,i,"markup_").join(" ");
      classes=classes.trim();
      if (this.isHovering(i)) classes= " hovering";//highest priority

      var attributes={
        onMouseDown:this.mouseDown
        ,className:classes
        ,key:"k"+i
        ,"data-n":i+1
      };
      out.push(React.DOM.span(attributes,tokens[i]));
      var extra=this.extraElement(i);
      if (extra.length) out=out.concat(extra);
    }
    return out;
  },
  render: function() {
    return (
      <div>
        <div className="textview" 
          onMouseUp={this.mouseUp}
          onMouseOut={this.mouseOut}
          onMouseMove={this.mouseMove}>{this.toXML(this.props.text)}
        </div>
      </div>
    );
  }
});
module.exports=textview;