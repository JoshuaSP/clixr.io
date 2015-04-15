ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',
  template: JST['elements/text'],
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
      this.editMenuView.$toolbar.css('opacity', 0);
      setTimeout(function () {
        this.editMenuView.$toolbar.remove();
        this.editMenuView.remove();
        this.editMenuView = null;
      }.bind(this), 200);
      this.$textbox.attr('id','');
    }
  },

  deselect: function () {
    this.selected = false;
    this.$el.resizable('destroy');
    this.$el.draggable();
    this.$el.draggable('destroy');
    this.$textbox.attr("contenteditable", "false");
    this.$('.drag-handle').remove();
    this.$el.removeClass("selected-element");
    if (!this.$textbox.html()) {
      this.deleteElement();
    }
    this.closeEditMenu();
  },

  icon: function () {
    return '<i class="fa fa-font"></i>';
  }
});
