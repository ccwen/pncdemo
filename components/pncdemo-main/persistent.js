var db=new PouchDB("pncdemo");

var loadMarkups=function(keys,cb,context){  
  db.allDocs({keys:keys,include_docs:true},function(err,response){
    var bulk=[];
    response.rows.map(function(d){
    	if (d.error) {
    		bulk.push({_id:d.key,markups:[]});
    	} else {
    		bulk.push({_id:d.id,_rev:d.doc._rev,markups:d.doc.markups||[]});	
    	}
      
    });
    cb.apply(context,[bulk]);
  });	
}

var resetMarkups=function() {
	db.destroy("pncdemo");
}

var saveMarkups=function(markups,cb,context) {
	db.bulkDocs(markups,function(err,response){
		if (cb) cb.apply(context,[response]);
	});
}

module.exports={loadMarkups:loadMarkups,saveMarkups:saveMarkups,resetMarkups:resetMarkups}