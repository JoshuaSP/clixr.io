ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',

  initialize: function () {
    ClixrIo.Views.Element.prototype.initialize.apply(this);
    this.$el.html(this.model.escape('content'));
  },

  selectElement: function () {
    if (this.selected) {
      this.secondClick();
      return;
    }
    this.$el.addClass("selected-element");
    this.selected = true;
    this.$el.draggable();
    var $handles = this._addResizeHandles();
    this.$el.resizable({ handles: $handles });
    this.$el.attr('id', 'texteditor');
    this._setupToolbar();
    this.editor = new wysihtml5.Editor("texteditor", {
       toolbar: "wysihtml5-toolbar",
       parserRules: wysihtml5ParserRules, // defined in parser rules set
    });
  },

  // we set up the editor one click before we need to edit because reasons.
  // because we can't programmatically get the cursor in the box.
  // we really tried.

  secondClick: function () {
    this.$el.draggable('destroy');
    this._showToolbar();
  },

  _showToolbar: function () {
    this.toolbar.draggable();
    this.toolbar.position({
      my: "center",
      at: "center top-30px",
      of: this.$el
      // within: menusContainer
    });
    this.toolbar.css("display", "block");
  },

  _setupToolbar: function () {
    this.toolbar = $(JST['menus/text_toolbar']());
    var menusContainer = $('.floating-menus');
    menusContainer.append(this.toolbar);
    this.toolbar.css("display", "none");
  },

  deselectElement: function () {
    ClixrIo.Views.Element.prototype.deselectElement.apply(this);
    this.$el.attr('id','');
    this.toolbar.remove();
    this.editor = null;
  }
});
