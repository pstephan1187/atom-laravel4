(function() {
    var _atom = require('atom');
    var EditorView = _atom.EditorView;
    var View = _atom.View;
    var $ = _atom.$;
    var __hasProp = {}.hasOwnProperty;
    var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)){ child[key] = parent[key]; } } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

    Prompt = (function(_super) {
        __extends(Prompt, _super);

        function Prompt() {
            return Prompt.__super__.constructor.apply(this, arguments);
        }

        Prompt.content = function(properties){
            if(typeof properties == 'object'){
                var label = properties.label;
                var closure = properties.closure;


                if(typeof label == 'string' && typeof closure == 'function'){

                    return this.div({
                        "class": 'dialog-prompt overlay from-top',
                    }, (function(_this) {
                        return function() {
                            _this.label(label);
                            _this.subview('promptInput', new EditorView({
                                mini: true
                            }));
                        };
                    })(this));
                }else{
                    console.error('Invalid usage of Dialog.prompt(). Usage: Dialog.prompt({label: String, closure: Function})');
                }
            }

        }

        Prompt.prototype.initialize = function(properties) {
            if(typeof properties == 'object'){
                var label = properties.label;
                var closure = properties.closure;

                this.on('core:cancel', (function(_this) {
                    return function() {
                        return _this.close();
                    };
                })(this));

                this.on('core:confirm', (function(_this) {
                    return function() {
                        closure(_this.promptInput.getText());
                        return _this.close();
                    };
                })(this));

                this.promptInput.hiddenInput.on('focusout', (function(_this) {
                  return function() {
                    return _this.close();
                  };
                })(this));
            }
        };

        Prompt.prototype.prompt = function() {
            atom.workspaceView.append(this);
            return this.promptInput.focus();
        };

        Prompt.prototype.close = function() {
          this.remove();
          return atom.workspaceView.focus();
        };

        return Prompt;

    })(View);

    module.exports = Prompt;

}).call(this);
