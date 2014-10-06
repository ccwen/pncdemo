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
var underlines=Require("ksana-document").underlines; 
var getselection=require("./selection");

var textview = React.createClass({
  resetCount:function() {
    this.extraCount=0;
    this.footNoteCount=0;
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    var changed=false;
    var extra=nextState.extra=nextProps.getExtra(this.props.name,this);
    if (extra.deletinggid) {
      var newmarkups=this.state.extra.markups.filter(function(m){
        return !m[3] || extra.deletinggid!=m[3].gid;
      },this);
      nextState.hoverMarkup=null;
      changed=true;
      this.setMarkups(newmarkups);
    };
    var textchanged=(nextProps.text!=this.props.text);
    if (textchanged) this.tokenized=null;

    changed = changed || (extra.hovergid != this.state.extra.hovergid);
    changed = changed || extra.markupchanged|| this.markupchanged ;
    changed = changed || (nextState.appendingSelection!=this.state.appendingSelection);
    nextState.extra.markupchanged=false;
    this.markupchanged=false;
    return textchanged || changed;
  },
  getInitialState: function() {
    this.resetCount();
    this.markupchanged=false;
    return {ranges:[],extra:{markups:[]}};
  },
  componentWillUpdate:function() {
    this.resetCount();
  },
  addSelection:function(ranges,start,len) {
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
      this.markupchanged=true;
    } else if (action=="deleteMarkup") {
      this.setState({hoverMarkup:null});
      var markups=this.state.extra.markups.filter(function(m){
        return !this.sameMarkup(m,opts);
      },this);
      this.setMarkups(markups);
    }
  },
  setMarkups:function(newmarkups) {
    var markups=this.state.extra.markups;
    markups.splice(0,markups.length);

    newmarkups.map(function(m){
      markups.push(m);
    });
    this.markupchanged=true;
  },
  applyMarkup:function(tag,ranges,payload) {
    var markups=this.state.extra.markups;
    ranges.map(function(r,idx){
      if (idx==0 && payload) {
        var py=JSON.parse(JSON.stringify(payload));  
      } else {
        var py=null;
        if (payload && payload.gid) {
          py={shadow:true}
          py.gid=payload.gid;
        }
      }
      markups.push([r[0],r[1],tag,py]);
    })
    this.clearRanges();
  },
  rangeToClasses:function(arr,i,prefix) {
    var out=[];
    arr.map(function(r){
      var classes="",start=r[0],len=r[1],tag=r[2], markuptag=this.state.extra.markuptag;
      var baseclass=r[2]||"selected";
      if (prefix) baseclass=prefix+baseclass;
      var tagmissmatch=(markuptag && tag && markuptag!=tag );
      if (i>=start && i<start+len && !tagmissmatch) {
        classes=baseclass;
        if (i==start) classes+=" "+baseclass+"_b";
        if (i==start+len-1) classes+=" "+baseclass+"_e";
      }
      if (classes) out.push(classes);
    },this);
    return out;
  },
  clearRanges:function() {
    this.setState({ranges:[],hoverMarkup:null});
    this.markupchanged=true;
  },
  mouseUp:function(e) { 
    if (this.state.extra.readonly) return;
    if (this.touchstartn>-1) {
      sel={start:this.touchstartn, len:this.touchendn-this.touchstartn+1};
      if (sel.len>10) {
        this.clearSelected();
        return;
      }
    } else {
      var sel=getselection();  
    }

    if (!sel) return;
    var markups=this.markupAt(sel.start-1,this.state.extra.markuptag);
    if (markups.length) {
        this.props.action("hoverToken",{view:this,token:e.target,x:e.pageX,y:e.pageY,markup:markups[0]});
        this.setState({hoverMarkup:markups[0]});
        return;
    }

    if (e && (e.ctrlKey || this.state.appendingSelection) && sel && sel.len) {
      //var x=e.pageX,y=e.pageY;
      var ranges=this.addSelection(this.state.ranges,sel.start,sel.len);
      this.props.action("appendSelection",{ranges:ranges,view:this});
      this.setState({appendingSelection:false});
    } else {
      if (sel && sel.len) {
        var ranges=this.state.ranges;
        //clear other selection when markup not applyable
        if (!this.props.action("markupApplyable")) ranges=[];
        var ranges=this.addSelection(ranges,sel.start,sel.len);
        this.props.action("selection",{ranges:ranges, view:this});        
      } else {
        this.props.action("selection",{ranges:null,view:this});
        this.clearRanges();
      }
    }    
    this.markupchanged=true;
  },
  markupAt:function(n,tag) {
    return this.state.extra.markups.filter(function(m){
      var start=m[0],len=m[1];
      var typemissmatch=(tag && m[2]!=tag );
      return (n>=start && n<start+len && !typemissmatch);
    });
  },
  extraElement:function(n) {
    var out="";
    var markups=this.markupAt(n,this.state.extra.markuptag);
    if (!markups.length) return out;
    markups.map(function(m){
      var start=m[0],len=m[1],tag=m[2],payload=m[3];
      if (!payload || !payload.insert) return;
      if ( (payload.insert=="end" && n==start+len-1)
      || (payload.insert=="start" && n==start) ){
        if (tag.substr(0,8)=="footnote") {
          this.footNoteCount++;
          var seq=payload.seq||this.footNoteCount;
          //var dataset={className:"extra_"+type,"data-n":n,key:this.extraCount++};
          //out.push(React.DOM.span(dataset,"\u00a0"+seq+"\u00a0"));
          //force 1em space
          out='<span class="extra_'+tag+'" data-n"='+n+'">\u00a0'+seq+'\u00a0</span>';
        }
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
    var markups=this.markupAt(n-1,this.state.extra.markuptag); //n-1 is a workaround
    if (markups.length) {
      if (this.state.hoverToken!=target) { //do not refresh if hovering on same token
        this.props.action("hoverToken",{view:this,token:target,x:x,y:y,markup:markups[0]});
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
  getName:function() {
    return this.props.name;
  }, 
  isHovering:function(i){
    var M=this.state.hoverMarkup;
    var hovering=false;
    var gid=this.state.extra.hovergid;
    if (M&&M[3] && M[3].gid) gid=M[3].gid;
    if (gid){ //find same gid with other view
      this.state.extra.markups.map(function(m){
        var start=m[0],len=m[1];
        hovering=hovering||
          ((m[3] && m[3].gid==gid) && (i>=start && i<start+len));
      });
      return hovering;
    } else if (M) {
      var start=M[0],len=M[1];
      return (i>=start && i<start+len);
    }
  },
  getOnScreenMarkups:function(){
    var markups=this.state.extra.markups;
    var markuptag=this.state.extra.markuptag;
    if (markuptag) return markups.filter(function(m){return m[2]==markuptag;});
    else return markups;
  },
  toXML:function(s) {
    if (!this.tokenized) this.tokenized=tokenize(s);
    var out="",tokens=this.tokenized.tokens;
    var markups=this.getOnScreenMarkups();
    var M=underlines.levelMarkups(markups);
    var mid=0; //markup id
    
    for (var i=tokens.length-1;i>=0;i--) {
      var classes="";
      
      if (tokens[i]=="\n") {
        out='<br/>'+out;
        continue;
      }
      
      while (mid<M.length && M[mid][1]==i+1) {
        var id=M[mid][0], pos =M[mid][1] ,tagtype=M[mid][2], level=M[mid][3];
        var tag=markups[id][2];
        if (tagtype==underlines.TAG_START) out='<span class="markup_'+tag+' lv'+level+'">'+out;
        if (tagtype==underlines.TAG_END) out= '</span>' +out;
        mid++;
      }

      if (this.state.ranges.length) classes=this.rangeToClasses(this.state.ranges,i).join(" ");
      if (this.isHovering(i)) classes= " hovering";//highest priority

      out='<span class="'+classes+'" data-n="'+(i+1)+'">'+tokens[i]+'</span>'+out;
      out=this.extraElement(i-1)+out;
    }
    return out.replace(/\n/g,"<br/>");
  },
  onClick:function(e) {
    e.preventDefault();
    alert(e.target.dataset['n'])
  },
  clearSelected:function() {
    $(this.getDOMNode()).find(".selected").removeClass("selected")
    .removeClass("selected_e").removeClass("selected_b");
  },
  touchStart:function(e){
    if (e.target.dataset.n) {
      this.touchstartn=e.target.dataset.n;
      this.touchstartx=e.changedTouches[0].pageX;
      this.touchstarty=e.changedTouches[0].pageY;
      this.touchstartelement=e.target;
      this.range=document.createRange();     
    } else {
      //this.clearSelected();
      this.touchstartn=-1;
      this.range=null;
    } 
  },
  markSelection:function() {
    var from=this.touchstartn;
    var to=this.touchendn;
    //this.clearSelected();
    for (var i=from;i<=to;i++) {
      var node=$(this.getDOMNode()).find("span[data-n='"+i+"']")[0];
      if (i==from) node.classList.add("selected_b");
      if (i==to) node.classList.add("selected_e");
      node.classList.add("selected");
    }
  },
  touchMove:function(e){
    if (!this.touchstartn==-1) return;
    var T=e.changedTouches[0];
    var rect=e.target.getBoundingClientRect();
    var stopElement=this.findElement(T.pageX,T.pageY);//T.pageX-rect.left, T.pageY-rect.top);
    if (stopElement && stopElement.dataset.n) {
      this.touchendelement=stopElement;
      this.touchendn=stopElement.dataset.n;

      this.markSelection();
      //this.range.setStart(this.touchstartelement.firstChild,0);
      //this.range.setEnd(stopElement.firstChild, 1);
    }
  },
  getOffset:function (object, offset) {
      if (!object) return;
      offset.x += object.offsetLeft;
      offset.y += object.offsetTop;

      this.getOffset (object.offsetParent, offset);
  },
  findElement:function(x,y) {
    var stopElement=this.touchstartelement;
    while (stopElement) {
      var off={x:0,y:0};
      var h=stopElement.offsetHeight, w=stopElement.offsetWidth;
      this.getOffset(stopElement,off);
      if (x>off.x &&x<off.x+w && y>off.y&&y<off.y+h) break;
      stopElement=stopElement.nextSibling;
    }
    return stopElement;
  },
  touchEnd:function(e){
    //console.log(this.touchstartelement,this.touchendelement);
    this.mouseUp(e);
  }, 
  setAppending:function() {
    this.setState({appendingSelection:true})
  },
  renderExtraControls:function() {
    if (this.state.extra.appendable) {
      var color="btn-default";
      if (this.state.appendingSelection) color="btn-primary";
      return <button onClick={this.setAppending} className={"btn appending "+color}>Sel <span className="glyphicon glyphicon-plus"/></button>  
    } else {
      return null;
    }
  },
  render: function() {
    return (
      <div>
        {this.renderExtraControls()}
        <div className="textview" 
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          onMouseUp={this.mouseUp}
          onMouseOut={this.mouseOut}
          onMouseMove={this.mouseMove} dangerouslySetInnerHTML={{__html:this.toXML(this.props.text)}}>
        </div>
      </div>
    );
  }
});
module.exports=textview;