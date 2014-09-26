// [ markupid, middle/start/end , level]

var markup=require("./markup");
QUnit.test("overlap",function(){
	var m=[
		[0,2],
		[1,3]
	];
	var res=markup.calculateLevel(m);
	equal(res.length,4);
	deepEqual(res,[ 
		[[0,1,0]], 
		[[0,2,0],[1,1,1]], 
		[[1,0,1]],
		[[1,2,1]] 
	]);
});