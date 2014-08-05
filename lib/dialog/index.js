var Dialog = {
    prompt: function(label, closure){
        var properties = {
            'label': label,
            'closure': closure
        };
        var PromptObj = require("./prompt.js");
        var prompt = new PromptObj(properties);
        return prompt.prompt();
    }
}

module.exports = Dialog;
