ClixrIo.Views.Element = Backbone.View.extend({
  events: {
  },

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
    this.model.css = this.model.get('css') ? $.parseJSON(this.model.get('css')) : {} ;
    this.model.css.position = "absolute";
    this.$el.css(this.model.css);
  },

  setCss: function (property, value) {
    this.$el.css(property, value);
    this.model.css.property = value;
  },

  selectElement: function () {
		if (this.selected) return;
    this.$el.addClass("selected-element");
		this.selected = true;
    this.$el.draggable();
		var $handles = this._addResizeHandles();
    this.$el.resizable({ handles: $handles });
	},

	deselectElement: function () {
		this.selected = false;
		this.$('.drag-handle').remove();
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
