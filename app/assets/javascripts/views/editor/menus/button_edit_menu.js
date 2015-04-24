ClixrIo.Views.ButtonEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.Submenus,
    ClixrIo.Mixins.ColorPicker,
    ClixrIo.Mixins.Styles, {
      template: JST['editor/menus/button_edit_menu'],

      styles: [
        'user-button-style-1',
        'user-button-style-2',
        'user-button-style-3'
      ],

      initialize: function (options) {
        _.extend(this, options);
        $('.floating-menus').append(this.render().$el);
        this.setupColorPicker(this.$targetEl, this.$el);
        this.styleMenu();
        this.linkTargets();
        this.setupTextbox();
        this.overlappingItems();
        this.setupSubmenus(this.$el, {
          '.style-button': '.style-menu',
          '.overlapping-button': '.overlapping-items',
          '.target-button': '.link-targets',
          '.color-button': '.edit-menu .color-picker'
        });
        this.delegateEvents();
      },

      overlapListen: function () {
        this.$el.find('input').on('keyup', function () {
          this.overlappingItemsMenu.render();
        }.bind(this));
        ClixrIo.Mixins.EditElementMenu.overlapListen.apply(this);
      },

      linkTargets: function () {
        this.linkTargetsMenu = new ClixrIo.Views.LinkTargetsMenu({
          collection: this.siteView.model.pages(),
          setUrl: function (value) {
            this.model.set('url', value);
          }.bind(this),
          getUrl: function () {
            return this.model.get('url');
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
          styleMenu: JST['editor/menus/style_menu']({ styles: this.styles }),
          commonButtons: this.commonButtons({
            global: this.global()
          }),
          colorPicker: JST['editor/menus/color_picker']()
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
