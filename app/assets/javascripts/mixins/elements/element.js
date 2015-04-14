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

  initialize: function (options) {
    this.siteView = options.siteView;
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
    var $el = this.$el;
    $el.addClass("selected-element");
		this.selected = true;
    $el.draggable({
      start: function () {
        $el.addClass('bring-to-front');
      },
      stop: function () {
        $el.removeClass('bring-to-front');
      }
    });
		var $handles = this._addResizeHandles();
    $el.resizable({ handles: $handles });
	},

  global: function () {
    return this.model.collection === this.siteView.model.elements();
  },

  secondClick: function () {
    if (this.editMenuView) return;
    this.editMenuView = new this.editMenu({
      $targetEl: this.$el,
      model: this.model,
      close: this.closeEditMenu.bind(this),
      siteView: this.siteView,
      intersectingViews: this.intersectingViews,
      global: this.global,
      deleteElement: this.deleteElement.bind(this)
    });
    this.editMenuView.$el.position({
      my: "center",
      at: "left-150px center",
      of: this.$el
    });
    this.editMenuView.$el.css('opacity', 1);
    this.editMenuView.$el.draggable();
  },

  closeEditMenu: function () {
    if (this.editMenuView) {
      this.editMenuView.$el.css('opacity', 0);
      setTimeout(function () {
        this.editMenuView.remove();
        this.editMenuView = null;
      }.bind(this), 200);
    }
  },

	deselect: function () {
		this.selected = false;
		this.$('.drag-handle').remove();
    this.closeEditMenu();
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
  },

  deleteElement: function () {
    this.deselect();
    this.siteView.selectedView = null;
    this.model.collection.remove(this.model);
    if (this.global()) {
      this.siteView.removeSubview('.user-site-elements', this);
    } else {
      this.siteView.removeSubview('.user-page-elements', this);
    }
  },

  icon: function (dim) {
    var origWidth = parseInt(this.$el.css('width'));
    var origHeight = parseInt(this.$el.css('height'));
    var maxDim = Math.max(origWidth, origHeight);
    var $icon = $('<div>');
    $icon.css({
      'width': dim * origWidth / maxDim,
      'height': dim * origHeight / maxDim,
      'background-color': this.$el.css('background-color')
    });
    $icon.addClass('element-icon');
    var style = this.$el.attr('class').match(/user\S*style-\d+/)[0];
    $icon.addClass(style);
    return $icon.clone().wrap('<div/>').parent().html();
  }
});
