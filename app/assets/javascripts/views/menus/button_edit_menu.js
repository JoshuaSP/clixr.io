ClixrIo.Views.ButtonEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.MenuUtils,
    ClixrIo.Mixins.Styles,
    {
      template: JST['menus/button_edit_menu'],

      styles: [
        'user-button-style-1',
        'user-button-style-2',
        'user-button-style-3'
      ],

      initialize: function (options) {
        _.extend(this, options);
        $('.floating-menus').append(this.render().$el);
        this.styleMenu();
        this.overlappingItems();
        this.linkTargets();
        this.setupSubmenus(this.$el, {
          '.style-button': '.style-menu',
          '.overlapping-button': '.overlapping-items',
          '.target-button': '.link-targets'
        });  // TODO: maybe add some color-pickers later, see what we need after creating user styles
        this.setupTextbox();
        this.delegateEvents();
      },

      linkTargets: function () {
        this.linkTargetsMenu = new ClixrIo.Views.LinkTargetsMenu({
          collection: this.siteView.model.pages(),
          setFunction: function (value) {
            this.model.set('url', value);
          }.bind(this),
          targetFunction: function () {
            return this.model.get('url')
          }.bind(this)
        });
        this.$el.append(this.linkTargetsMenu.render().$el);
      },

      setupTextbox: function (options) {
        var $inputfield = this.$('.button-text input');
        $inputfield.on('keyup', function () {
          this.$targetEl.find('a').text($inputfield.val());
        }.bind(this));
      },

      render: function () {
        var content = this.template({
          global: this.global(),
          styleMenu: JST['menus/style_menu']({ styles: this.styles }),
          commonButtons: this.commonButtons()
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
