ClixrIo.Views.MenuEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.MenuUtils,
    ClixrIo.Mixins.Styles, {
      template: JST['menus/menu_edit_menu'],

      styles: [
        'user-menu-style-1',
        'user-menu-style-2',
        'user-menu-style-3'
      ],

      initialize: function(options) {
        _.extend(this, options);
        $('.floating-menus').append(this.render().$el);
        this.styleMenu();
        this.overlappingItems();
        this.setupSubmenus(this.$el, {
          '.style-button': '.style-menu',
          '.overlapping-button': '.overlapping-items',
        });
        this.delegateEvents();
      },

      render: function () {
        var content = this.template({
          styleMenu: JST['menus/style_menu']({ styles: this.styles }),
          commonButtons: this.commonButtons({
            global: this.global()
          })
        });
        this.$el.html(content);
        return this;
      }
    }
  )
)
