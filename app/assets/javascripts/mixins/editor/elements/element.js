ClixrIo.Views.Element = Backbone.View.extend({
  handles: {
    "n": { left: "calc(50% - 6px)", top: "-5px"},
    "ne": { right: "-5px", top: "-5px"},
    "e": { right: "-5px", top: "calc(50% - 6px)"},
    "se": { right: "-5px", bottom: "-5px"},
    "s": { left: "calc(50% - 6px)", bottom: "-5px"},
    "nw": { left: "-5px", top: "-5px"},
    "w": { left: "-5px", top: "calc(50% - 6px)"},
    "sw": { left: "-5px", bottom: "-5px"}
  },

	className: "user-element",

  initialize: function (options) {
    _.extend(this, options);
    this.$el.addClass(this.model.get('element_class'));
    var css = this.model.get('css') ? $.parseJSON(this.model.get('css')) : {} ;
    css['z-index'] = ClixrIo.Mixins.ZIndex.register(this, css['z-index']);
    this.$el.css(css);
    this.model.$el = this.$el;
    this.model.view = this;
  },


  initializeSaver: function () {
    this.saver = setInterval(function() {
      if (this.model.id) this.model.save();
    }.bind(this), 300);
  },

  select: function () {
		if (this.selected) {
      this.secondClick();
      return;
    }
    var $el = this.$el;
    $el.addClass("selected-element");
    this.selected = true;
    this.$ghost = $('<div>').addClass('ghost');
    this.ghostCopy($el, this.$ghost);
    $('.user-page-elements.current').append(this.$ghost);
    this.draggable().resizable().initializeSaver();
	},

  ghostCopy: function ($source, $target) {
    $target.css({
      height: $source.css('height'),
      width: $source.css('width'),
      top: $source.css('top'),
      left: $source.css('left'),
      padding: $source.css('padding')
    });
  },

  draggable: function () {
    var $el = this.$el;
    $el.draggable({
      distance: 5,
      start: function () {
        $el.addClass('bring-to-front');
      },
      stop: function () {
        $el.removeClass('bring-to-front');
      },
      drag: function () {
        this.ghostCopy($el, this.$ghost);
      }.bind(this)
    });
    return this;
  },

  resizable: function () {
    this.$el.resizable({
      handles: this._addResizeHandles(),
      resize: function () {
        this.ghostCopy(this.$el, this.$ghost);
      }.bind(this)
    });
    return this;
  },

  global: function () {
    return this.model.collection === this.siteView.model.elements();
  },

  secondClick: function () {
    this.$el.removeClass('bring-to-front');
    if (this.editMenuView) return;
    this.editMenuView = new this.editMenu({
      $targetEl: this.$el,
      model: this.model,
      close: this.closeEditMenu.bind(this),
      draggable: this.draggable.bind(this),
      siteView: this.siteView,
      intersectingModels: this.intersectingModels,
      global: this.global,
      deleteElement: this.deleteElement.bind(this)
    });
    this.editMenuView.$el.css('opacity', 1);
    this.editMenuView.$el.draggable();
    this.positionEditMenu();
  },

  positionEditMenu: function () {
    this.editMenuView.$el.position({
      my: "center",
      at: "left-150px center",
      of: this.$el,
      within: $('.user-site')
    });
  },

  closeEditMenu: function () {
    if (this.editMenuView) {
      this.editMenuView.$el.css('opacity', 0);
      setTimeout(function () {
        if (this.editMenuView) this.editMenuView.remove();
        this.editMenuView = null;
      }.bind(this), 200);
    }
  },

	deselect: function () {
		this.selected = false;
    this.$ghost.remove();
    this.closeEditMenu({ deselect: true }); // pass in a flag saying we're deselecting the element
		this.$el.removeClass("selected-element").removeClass("bring-to-front");
    this.$el.resizable().draggable();
		this.$el.resizable('destroy').draggable('destroy');
    this.$el.off();
    clearInterval(this.saver);
	},

	_addResizeHandles: function (hndls) {
    var handles = hndls || this.handles;
    var $handles = {};
    for (var handle in handles) {
      var circle = $('<div class="drag-handle">');
      circle.addClass("ui-resizable-handle ui-resizable-" + handle);
      circle.css(handles[handle]);
      $handles[handle] = circle;
			this.$ghost.append(circle);
    }
		return $handles;
  },

  deleteElement: function () {
    this.deselect();
    this.siteView.selectedView = null;
    this.model.destroy();
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
