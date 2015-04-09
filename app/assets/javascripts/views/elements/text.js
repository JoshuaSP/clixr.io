ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',

  initialize: function () {
    ClixrIo.Views.Element.initialize.apply(this);
    if ($.isEmptyObject(this.model.get('content'))) {
      this.$el.html($("<textarea>"));
    } else {
      this.$el.html(this.model.get('content'));
    }
  }
});
