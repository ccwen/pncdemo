var dbname="pncdemo";

//var db=new PouchDB(dbname);
if (window.location.host.substring(0,9)=="127.0.0.1"){
    var db=new Pouchdb(dbname);
} else {
    var db=new PouchDB('http://114.34.238.149:5984/'+dbname);
}


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

var resetMarkups=function(bulk) {
	db.destroy("pncdemo");
	bulk.map(function(b){
		b.markups=[];
	});
}

var saveMarkups=function(markups,cb,context) {

	db.bulkDocs(markups,function(err,response){
		if (cb) cb.apply(context,[response]);
	});
    
    db.bulkDocs(markups,function(err,response){
       if (err) console.log(err);
       else console.log(response);
    });
}

module.exports={loadMarkups:loadMarkups,saveMarkups:saveMarkups,resetMarkups:resetMarkups}