ClixrIo.Views.PageChangeMenu = Backbone.View.extend({
  template: JST['editor/menus/page_change_menu'],
  tagClass: 'page-select',

  initialize: function () {
    $('nav .logo').after(this.render().$el)
  }
})
