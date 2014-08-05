module.exports = {
    eloquent: require("./eloquent.js"),

    activate: function(){
        //Workspace Commands
        atom.workspaceView.command('laravel4:create-eloquent-model', this.eloquent.createModel);
    }
}
