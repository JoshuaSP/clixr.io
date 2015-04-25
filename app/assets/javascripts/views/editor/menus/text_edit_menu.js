ClixrIo.Views.TextEditMenu = Backbone.View.extend(
  _.extend({},
    ClixrIo.Mixins.EditElementMenu,
    ClixrIo.Mixins.Submenus, {
      template: JST['editor/menus/text_edit_menu'],

      events: {
        'click .site-page-toggle': 'sitePageToggle',
        'click .delete-button': 'deleteElement',
        'click .fa-close': 'close'
      },

      initialize: function (options) {
        _.extend(this, options);
        $('.floating-menus').append(this.render().$el);
        this.overlappingItems();
        this.$textbox = this.$targetEl.find('.text-content');
        this.toolbar = new ClixrIo.Views.TextEditToolbar({
          $textbox: this.$textbox
        });
        this.$('.toolbar-button').click(function(event) {
          if (this.toolbar.isVisible()) {
            event.preventDefault();
            this.textboxUnedit();
          } else {
            event.preventDefault();
            this.textboxEdit();
          }
        }.bind(this));
        this.setupSubmenus(this.$el, {
          '.overlapping-button': '.overlapping-items',
          '.toolbar-button': '#wysihtml5-toolbar'
        });
        this.delegateEvents();
      },

      textboxEdit: function () {
        this.$targetEl.draggable('destroy');
        this.$textbox.css('cursor','text');
        this.$textbox.attr("contenteditable", "true");
        this.$textbox.removeClass('noselect');
      },

      textboxUnedit: function (deselect) {
        this.$textbox.attr("contenteditable", "false");
        this.$textbox.addClass('noselect');
        if (deselect) return;
        this.$textbox.css('cursor','move');
        this.$targetEl.draggable();
      },

      overlapListen: function () {
        this.$targetEl.find('.text-content').on('keyup', function () {
          this.overlappingItemsMenu.render();
        }.bind(this));
      },

      remove: function (options) {
        this.$textbox.attr('id','');
        this.textboxUnedit(options.deselect);
        ClixrIo.Mixins.EditElementMenu.remove.apply(this);
      },

      render: function () {
        var content = this.template({
          global: this.global()
        });
        this.$el.html(content);
        return this;
      }
    }
  )
);
