ClixrIo.Views.DivEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.MenuUtils,
    ClixrIo.Mixins.Styles, {
      template: JST['menus/div_edit_menu'],
      className: 'edit-menu',

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
          global: this.global(),
          styleMenu: JST['menus/style_menu']({ styles: this.styles }),
          colorPicker: JST['menus/color_picker'](),
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
