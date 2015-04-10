ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',

  initialize: function () {
    ClixrIo.Views.Element.prototype.initialize.apply(this);
    this.$el.html(this.model.escape('content'));
  },

  secondClick: function () {
    if (this.toolbar) return;
    // this next bit just for now
    this.$el.resizable('destroy').draggable('destroy');
    // we'll fix it when we have proper submenus
    this.$el.attr('id', 'texteditor');
    this._setupToolbar();
    this.editor = new wysihtml5.Editor("texteditor", {
       toolbar: "wysihtml5-toolbar",
       parserRules: wysihtml5ParserRules, // defined in parser rules set
    });
    this.$el.attr('tabindex', 0)
    this.$el.focus();
    this.$el.trigger('click');
  },

  _setupToolbar: function () {
    this.toolbar = $(JST['menus/text_toolbar']());
    var menusContainer = $('.floating-menus');
    menusContainer.append(this.toolbar);
    this.toolbar.draggable();
    this.toolbar.position({
      my: "center",
      at: "center top-30px",
      of: this.$el
      // within: menusContainer
    });
  },

  deselectElement: function () {
    ClixrIo.Views.Element.prototype.deselectElement.apply(this);
    this.$el.attr('id','');
    this.toolbar.remove();
    this.editor = null;
  }
});
