ClixrIo.Views.SiteEdit = Backbone.View.extend({
  template: JST['sites/edit'],

  render: function () {
    var content = this.template({site: this.model});
    this.$el.html(content);
    return this;
  }

});
