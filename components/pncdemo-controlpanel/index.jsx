/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

var dataset={mn118:require("./mn118"),
             yijing:require("./yijing"),
             oclp:require("./oclp")};
 
var controlpanel = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  save:function() {
    this.props.action("saveMarkups");
  },
  reset:function() {
    this.props.action("resetMarkups");
  },
  selectset:function(e) {
    var name=e.target.dataset["name"];
    this.props.action("dataset",dataset[name]);
  },
  componentDidMount:function() {
    this.props.action("dataset",dataset["yijing"]);
  },
  renderDataset:function() {
    return (
      <div className="btn-group pull-right">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
        Dataset <span className="caret"></span>
        </button>
        <ul onClick={this.selectset} className="dropdown-menu" role="menu">
          <li><a href="#" data-name="yijing">YiJing</a></li>
          <li><a href="#" data-name="mn118">Ānāpānasatisuttaṁ</a></li>
          <li><a href="#" data-name="oclp">Occupy Central with Love and Peace</a></li>
        </ul>
      </div>
      );
  },
  render: function() {
    return (
      <div>
        <button onClick={this.save} className="btn btn-success pull-right">Save</button>
        <button onClick={this.reset} className="btn btn-danger pull-right">Reset</button>
        {this.renderDataset()}
      </div>
    );
  }
});
module.exports=controlpanel;