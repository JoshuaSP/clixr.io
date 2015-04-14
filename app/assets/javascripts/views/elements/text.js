ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',
  template: JST['elements/text_element'],
  editMenu: ClixrIo.Views.TextEditMenu,

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.$el.addClass('text-element');
    this.$el.html(this.template({ content: this.model.escape('content') }));
    this.$textbox = this.$('.text-content');
  },

  closeEditMenu: function () {
    if (this.editMenuView) {
      this.editMenuView.$el.css('opacity', 0);
      setTimeout(function () {
        this.editMenuView.remove();
        this.editMenuView = null;
      }.bind(this), 200);
      if (this.editMenuView.toolbar) {
        var toolbar = this.editMenuView.toolbar;
        toolbar.css('opacity', 0);
        setTimeout(function () {
          toolbar.remove();
        }, 200);
        if (!this.editMenuView.toolbarVisible) this.$el.draggable('destroy');
        this.$textbox.attr("contenteditable", "false");
        this.$textbox.attr('id','');
      }
    }
  },

  deselect: function () {
    this.selected = false;
    this.$el.resizable('destroy');
    this.$('.drag-handle').remove();
    this.$el.removeClass("selected-element");
    this.closeEditMenu();
  },

  icon: function () {
    return '<i class="fa fa-font"></i>';
  }
});
