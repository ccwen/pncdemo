/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */
Require("bootstrap");
var contextmenu=Require("contextmenu");
var stackview=Require("stackview"); 
var textview=Require("textview");
var main = React.createClass({
  selection_menuitems:function() {
    return [
      {caption:"Add",handler:this.addSelection}
    ]
  },
  getInitialState: function() {
    return {
      menuitems:this.selection_menuitems(),
      menupayload:{},
      views:[
        {name:"v1",content:"乾\n元亨，利貞。天行健，君子以自強不息。\n初九：潛龍，勿用。九二：見龍在田，利見大人。九三：君子終日乾乾，夕惕若，厲，无咎。九四：或躍在淵，无咎。九五：飛龍在天，利見大人。上九：亢龍有悔。用九：見群龍无首，吉。"}
        ,{name:"v2",content:"坤\n元亨，利牝馬之貞。君子有攸往，先迷後得主，利西南得朋，東北喪朋。安貞，吉。地勢坤，君子以厚德載物。\n初六：履霜，堅冰至。六二：直，方，大，不習无不利。六三：含章可貞。或從王事，无成有終。六四：括囊；无咎，无譽。六五：黃裳，元吉。上六：龍戰于野，其血玄黃。用六：利永貞。"}
        ,{name:"v3",content:"屯\n元亨，利貞，勿用有攸往，利建侯。屯，剛柔始交而難生，動乎險中，大亨貞。雷雨之動滿盈，天造草昧，宜建侯而不寧。\n初九：磐桓；利居貞，利建侯。六二：屯如邅如，乘馬班如。匪寇婚媾，女子貞不字，十年乃字。六三：即鹿无虞，惟入于林中，君子幾不如舍，往吝。六四：乘馬班如，求婚媾，往吉，无不利。九五：屯其膏，小貞吉，大貞凶。上六：乘馬班如，泣血漣如。"}
        ,{name:"v4",content:"蒙\n亨。匪我求童蒙，童蒙求我。初筮告，再三瀆，瀆則不告。利貞。\n蒙，山下有險，險而止，蒙。蒙亨，以亨行時中也。匪我求童蒙，童蒙求我，志應也。初噬告，以剛中也。再三瀆，瀆則不告，瀆蒙也。蒙以養正，聖功也。\n初六：發蒙，利用刑人，用說桎梏，以往吝。九二：包蒙吉；納婦吉；子克家。六三：用取女；見金夫，不有躬，无攸利。六四：困蒙，吝。六五：童蒙，吉。上九：擊蒙；不利為寇，利禦寇。"}
      ]
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
      view:opts.view,
      selstart:opts.start,
      sellength:opts.len,
      x:opts.x,
      y:opts.y,
      header:"Selection"
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
    if (action=="selection" || action=="clearMarkup") {
      var opts=args[0];
      var payload=this.getMenuPayload(opts);
      var menuitems=this.selection_menuitems();
      if (action=="clearMarkup") {
        menuitems=this.createMarkupMenuItems(opts.markups);
        payload.header="Clear";
      }

      if (opts.len || action=="clearMarkup") {
        this.setState({menuitems:menuitems,menupayload:payload});
      } else {
        this.setState({menupayload:null});
      }
    }
  },
  clickme:function() {
    //
  },
  render: function() {
    return (
      <div id="main">
        <contextmenu menuitems={this.state.menuitems} payload={this.state.menupayload}/>
        <div className="col-md-6">
          <stackview view={textview} action={this.action} views={this.state.views}/>
        </div>
        <div className="col-md-6">
          <stackview view={textview} action={this.action} views={this.state.views}/>
        </div>
      </div>
    );
  }
});
module.exports=main;