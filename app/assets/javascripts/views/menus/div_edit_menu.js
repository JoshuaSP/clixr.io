ClixrIo.Views.DivEditMenu = Backbone.View.extend({
  _.extend({}, ClixrIo.Mixins.EditElementMenu, ClixrIo.Mixins.MenuUtils, {
    template: 'menus/div_edit_menu',

    styles: [
      'user-div-style-1',
      'user-div-style-2',
      'user-div-style-3'
    ],



    render: function () {
      content = JST[template]({
        styleMenu: JST['menus/style'](this.styles),
        colorPicker: JST['menus/color_picker'](),
        overlappingItems: JST['menus/overlapping_items']()
      })
    }


  })
});
