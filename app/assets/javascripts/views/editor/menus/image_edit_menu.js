ClixrIo.Views.ImageEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.Styles,
    ClixrIo.Mixins.Submenus, {
      template: JST['editor/menus/image_edit_menu'],

      events: {
        'click .replace-button': 'replaceImage'
      },

      styles: [
        'user-image-style-1',
        'user-image-style-2',
        'user-image-style-3'
      ],

      initialize: function(options) {
        _.extend(this, options);
        $('.floating-menus').append(this.render().$el);
        this.overlappingItems();
        this.setupSubmenus(this.$el, {
          '.style-button': '.style-menu',
          '.overlapping-button': '.overlapping-items'
        });
        this.delegateEvents();
      },

      replaceImage: function() {
        filepicker.pick(function(blob) {
          this.model.set('url', blob.url);
          this.$targetEl.attr('src', blob.url);
          if (this.overlappingItemsMenu) this.overlappingItemsMenu.render();
        }.bind(this));
      },

      render: function () {
        var content = this.template({
          commonButtons: this.commonButtons({
            global: this.global()
          }),
          styleMenu: JST['editor/menus/style_menu']({ styles: this.styles })
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
