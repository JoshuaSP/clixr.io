ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',
  template: JST['editor/elements/text'],
  editMenu: ClixrIo.Views.TextEditMenu,

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.$el.addClass('text-element');
    this.$el.html(this.template({ content: this.model.get('content') }));
    this.$textbox = this.$('.text-content');
  },

  closeEditMenu: function () {
    if (this.editMenuView) {
      this.editMenuView.$el.css('opacity', 0);
      this.editMenuView.toolbar.$el.css('opacity', 0);
      setTimeout(function () {
        this.editMenuView.toolbar.remove();
        this.editMenuView.remove();
        this.editMenuView = null;
      }.bind(this), 200);
    }
  },

  deselect: function () {
    this.closeEditMenu();
    this.selected = false;
    this.$el.resizable().draggable();
    this.$el.resizable('destroy').draggable('destroy');
    this.$textbox.attr("contenteditable", "false");
    this.$textbox.css('cursor', 'default');
    this.$textbox.addClass('noselect');
    this.$('.drag-handle').remove();
    this.$el.removeClass("selected-element");
    if (!this.$textbox.html()) {
      this.deleteElement();
    }
    clearInterval(this.saver);
  },

  icon: function () {
    return '<i class="fa fa-font"></i>';
  }
});
