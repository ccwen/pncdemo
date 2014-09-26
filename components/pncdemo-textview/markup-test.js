// [ markupid, middle/start/end/unit , level]

var markup=require("./markup");


QUnit.test("overlap",function(){
	var m=[
		[1,3],
		[0,2]
	];
	var res=markup.calculateLevel(m);
	equal(res.length,4);
	deepEqual(res,[ 
		[[1,1,0]], 
		[[1,2,0],[0,1,1]], 
		[[0,0,1]],
		[[0,2,1]] 
	]);
});


QUnit.test("unit length token",function(){
	var m=[
		[0,1],
		[1,2]
	];
	var res=markup.calculateLevel(m);
	equal(res.length,3);
	deepEqual(res,[ 
		[[0,3,0]], 
		[[1,1,0]], 
		[[1,2,0]],
	]);
});