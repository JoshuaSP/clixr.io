ClixrIo.Views.DivEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.Submenus,
    ClixrIo.Mixins.ColorPicker,
    ClixrIo.Mixins.Styles, {
      template: JST['editor/menus/div_edit_menu'],

      styles: [
        'user-div-style-1',
        'user-div-style-2',
        'user-div-style-3'
      ],

      initialize: function (options) {
        _.extend(this, options)
        $('.floating-menus').append(this.render().$el);
        this.setupColorPicker();
        this.styleMenu();
        this.overlappingItems();
        this.setupSubmenus(this.$el, {
          '.style-button': '.style-menu',
          '.color-button': '.color-picker',
          '.overlapping-button': '.overlapping-items'
        });
        this.delegateEvents();
      },

      render: function () {
        var content = this.template({
          styleMenu: JST['editor/menus/style_menu']({ styles: this.styles }),
          colorPicker: JST['editor/menus/color_picker'](),
          commonButtons: this.commonButtons({
            global: this.global()
          })
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
