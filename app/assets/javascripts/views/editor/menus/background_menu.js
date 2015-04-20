ClixrIo.Views.BackgroundMenu = Backbone.View.extend(
  _.extend({}, ClixrIo.Mixins.ColorPicker, {

    template: JST['menus/editor/background_menu'],
    className: 'site-background-menu'



  })
);
