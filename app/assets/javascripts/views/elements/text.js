ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',
  template: JST['elements/text_element'],

  initialize: function () {
    ClixrIo.Views.Element.prototype.initialize.apply(this);
    this.$el.addClass('text-element')
    this.$el.html(this.template({ content: this.model.escape('content')}));
    this.$textbox = this.$('.text-content')
  },

  secondClick: function () {
    if (this.toolbar) return;
    this.$el.draggable('destroy');
    this.$textbox.attr('id', 'texteditor');
    this._setupToolbar();
    this.editor = new wysihtml5.Editor("texteditor", {
       toolbar: "wysihtml5-toolbar",
       parserRules: wysihtml5ParserRules, // defined in parser rules set
    });
    setTimeout(function () {
      $('a[data-wysihtml5-command-value="p"]')[0].click()
    },1);
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
    });
  },

  deselectElement: function () {
    this.selected = false;
    this.$el.resizable('destroy');
    this.$('.drag-handle').remove();
    this.$el.removeClass("selected-element");
    if (this.toolbar) {
      this.$textbox.attr('id','');
      this.$textbox.attr("contenteditable", "false")
      this.toolbar.remove();
      this.toolbar = null;
      this.editor = null;
    } else {
      this.$el.draggable('destroy');
    }
  }
});
