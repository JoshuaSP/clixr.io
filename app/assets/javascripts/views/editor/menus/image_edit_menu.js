ClixrIo.Views.ImageEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.Submenus, {
      template: JST['editor/menus/image_edit_menu'],

      imageEvents: {
        'click .replace-button': 'replaceImage'
      },

      initialize: function(options) {
        _.extend(this, options);
        _.extend(this.events, this.imageEvents);
        $('.floating-menus').append(this.render().$el);
        this.overlappingItems();
        this.setupSubmenus(this.$el, {
          '.overlapping-button': '.overlapping-items'
        });
        this.delegateEvents();
      },

      replaceImage: function() {
        filepicker.pick(ClixrIo.Mixins.FilepickerOptions, function(blob) {
          this.model.set('url', blob.url);
          this.$targetEl.find('img').attr('src', blob.url);
          this.$targetEl.find('img').on('load', function () {
            this.$targetEl.height(this.$targetEl.find('img').height());
          }.bind(this));
          if (this.overlappingItemsMenu) this.overlappingItemsMenu.render();
        }.bind(this));
      },

      sitePageToggle: function () {
        ClixrIo.Mixins.EditElementMenu.sitePageToggle.apply(this);
        this.$targetEl.find('img').css('display', 'block');
      },

      render: function () {
        var content = this.template({
          commonButtons: this.commonButtons({
            global: this.global()
          }),
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
