ClixrIo.Views.Element = Backbone.View.extend({
  handles: {
    "n": { left: "50%", top: "-5px"},
    "ne": { right: "-5px", top: "-5px"},
    "e": { right: "-5px", top: "50%"},
    "se": { right: "-5px", bottom: "-5px"},
    "s": { left: "50%", bottom: "-5px"},
    "nw": { left: "-5px", top: "-5px"},
    "w": { left: "-5px", top: "50%"},
    "sw": { left: "-5px", bottom: "-5px"}
  },

	className: "user-element",

  initialize: function () {
    this.$el.addClass(this.model.get('class'));
    var css = this.model.get('css') ? $.parseJSON(this.model.get('css')) : {} ;
    css.position = "absolute";
    this.model.$el = this.$el;
    this.model.view = this;
    css['z-index'] = ClixrIo.Mixins.ZIndex.register(this, css['z-index']);
    this.$el.css(css);
  },

  select: function () {
		if (this.selected) {
      this.secondClick();
      return;
    }
    this.$el.addClass("selected-element");
		this.selected = true;
    this.$el.draggable();
		var $handles = this._addResizeHandles();
    this.$el.resizable({ handles: $handles });
	},

  secondClick: function () {
    if (this.editMenuView) return;
    this.editMenuView = new this.editMenu({
      elementView: this,
      model: this.model,
      siteView: this.siteView
    });
  },

	deselect: function () {
		this.selected = false;
		this.$('.drag-handle').remove();
    if (this.editMenuView) {
      this.editMenuView.remove();
      this.editMenuView = null;
    }
		this.$el.removeClass("selected-element");
		this.$el.resizable('destroy').draggable('destroy');
	},

	_addResizeHandles: function () {
    var $handles = {};
    for (var handle in this.handles) {
      var circle = $('<div class="drag-handle">');
      circle.addClass("ui-resizable-handle ui-resizable-" + handle);
      circle.css(this.handles[handle]);
      $handles[handle] = circle;
			this.$el.append(circle);
    }
		return $handles;
  }
});
