ClixrIo.Views.ImageEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.MenuUtils, {
      template: JST['menus/image_edit_menu'],

      events: {
        'click .replace-button': 'replaceImage'
      },

      initialize: function(options) {
        _.extend(this, options)
        $('.floating-menus').append(this.render().$el);
        this.overlappingItems();
        this.setupSubmenus(this.$el, {
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
          })
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
