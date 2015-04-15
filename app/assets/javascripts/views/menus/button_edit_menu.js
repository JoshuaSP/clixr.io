ClixrIo.Views.ButtonEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.MenuUtils,
    ClixrIo.Mixins.Styles,
    ClixrIo.Mixins.LinkTargets,
    {
      template: JST['menus/button_edit_menu'],

      styles: [
        'user-button-style-1',
        'user-button-style-2',
        'user-button-style-3'
      ],

      initialize: function (options) {
        _.extend(this, options)
        $('.floating-menus').append(this.render().$el);
        this.styleMenu();
        this.overlappingItems();
        this.setupSubmenus(this.$el, {
          '.style-button': '.style-menu',
          '.overlapping-button': '.overlapping-items'
        });  // TODO: maybe add some color-pickers later, see what we need after creating user styles
        this.setupTextbox();
        this.delegateEvents();
      },

      setupTextbox: function (options) {
        var $inputfield = this.$('.button-text input');
        $inputfield.on('keyup', function () {
          this.$el.text($inputfield.val());
        });
      },

      render: function () {
        var content = this.template({
          global: this.global(),
          styleMenu: JST['menus/style_menu']({ styles: this.styles }),
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
