var nodeID3 = require('node-id3');
var fs = require('fs-extra');
var mv = require('mv');
var path = require('path'); 
var args = process.argv.slice(2);
var mPath; //where music is
if (typeof args[0] == 'undefined'){ //check if at least an argument is specified 
    console.log("Usage: node trackseparate path/of/files");
    process.exit(1);
} else{
    mPath = args[0]; //set first argument as path. Other pathes will be ignored
}
if(!fs.existsSync(mPath)){ //check if path exist.
    console.log("Specified path doesn't exist");
    process.exit(3);
}
fs.access(mPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if(err){
      console.log("No read/write permission on selected folder.");
      process.exit(4);
  }
});

function getFiles (dir){ //get file pathes and filenames not recursevely
    var filelist = {name : [],path : []}; 
    var tmp;
    tmp = fs.readdirSync(dir);
    for (var i = 0;i<tmp.length;i++){
        var fullpath = path.join(dir,tmp[i]);
        try{
            if (fs.statSync(fullpath).isFile()){
                filelist.path.push(fullpath);
                filelist.name.push(tmp[i]);
            } 
        }
        catch(e){
            console.log("Catched error on reading " + tmp[i] + ", probably a permission issue. Skipping.");
            continue;
        }
    }
    return filelist;
}
function encodePath(dir){ //remove illegal win32 chars    
    var output = dir.replace(/[|&;$:%@"<>()+,"\\|*?]/g, "")
    return output;
}
var list = getFiles(mPath); //get filenames and pathes list 
var files = list.path.length;
if(files == 0)
{
    console.log("No tracks found. Closing.");
    process.exit(2);
}

for (var i = 0;i<files;i++){ //do the job  
    var read = nodeID3.read(list.path[i]);    
    var year = read.year;
    if (typeof read.album == 'undefined'){
        console.log("Can't find album tag on " + list.name[i] + " file. Skipping.");
        continue;
    }
    if(typeof read.year == 'undefined'){
        console.log("Year tag not found, so it won't be specified on folder name"); 
        year = '';      
    } else{
        year = read.year + ' - ';
    }

    var album = encodePath(read.album);
    if (!fs.existsSync(path.join(mPath , year + album))){ //check if folder exist, if not create then
        fs.mkdirsSync(path.join(mPath, year + album));      
    }   
    console.log( path.join(mPath,year + album + list.name[i]));
    mv(list.path[i], path.join(mPath,year + album + '\\' + list.name[i]), 
    function(err) {       
    if(err){
      console.log(err);
    }      
    });     
}
console.log("END");