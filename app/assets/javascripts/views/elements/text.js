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

  icon: function (options) {
    return '<i class="fa fa-text"></i>';
  },

  deselect: function () {
    this.selected = false;
    this.$el.resizable('destroy');
    this.$('.drag-handle').remove();
    this.$el.removeClass("selected-element");
    this.closeEditMenu();
    if (this.toolbar) {
      this.$textbox.attr('id','');
      this.$textbox.attr("contenteditable", "false");
      this.toolbar.css('opacity',0);
      setTimeout(function() {
        this.toolbar.remove();
        this.toolbar = null;
      }.bind(this), 200);
      this.editor = null;
    } else {
      this.$el.draggable('destroy');
    }
  }
});
