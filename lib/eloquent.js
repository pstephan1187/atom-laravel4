var Dialog = require("./dialog/index.js");
var FS = require("fs");
var _ref = require("atom");


module.exports = {
    createModel: function(){
        var editor = atom.workspace.activePaneItem;

        var msg = Dialog.prompt('New Eloquent Model Name:', function(modelName){
            var filename = atom.project.path + '/app/models/' + modelName + '.php';

            FS.exists(filename, function(exists){
                if(!exists){
                    var content = "<?php\n\nclass "+modelName+" extends Eloquent {\n\t\n}\n";
                    FS.writeFile(filename, content, function(error){
                        if(error){
                            alert(error);
                        }else{
                            var editor = atom.workspace.open(filename, {
                                initialLine: 3,
                                initialColumn: 2
                            });
                        }
                    });
                }else{
                    alert('That model already exists');
                }
            });
        });
    }
}
