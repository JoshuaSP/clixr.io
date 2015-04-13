ClixrIo.Views.DivEditMenu = Backbone.View.extend(
  _.extend({}, ClixrIo.Mixins.EditElementMenu, ClixrIo.Mixins.MenuUtils, {
    template: JST['menus/div_edit_menu'],
    className: 'edit-menu',

    events: {
      'click .site-page-toggle': 'sitePageToggle',
      'click .delete-button': 'deleteElement',
      'click .fa-close': 'close'
    },

    styles: [
      'user-div-style-1',
      'user-div-style-2',
      'user-div-style-3'
    ],

    intersectingViews: [],

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

    sitePageToggle: function () {
      if (this.global()) {
        this.model.collection.remove(this.model);
        this.siteView.currentPage.elements().add(this.model);
        this.$('.site-page-toggle i').removeClass('fa-check-square-o').addClass('fa-square-o');
      } else {
        this.model.collection.remove(this.model);
        this.siteView.model.elements().add(this.model);
        this.$('.site-page-toggle i').addClass('fa-check-square-o').removeClass('fa-square-o');
      }
    },

    overlappingItems: function () {
      if (this.intersectingViews.length < 2) {
        this.$('.overlapping-button').remove();
        return;
      }
      this.overlappingItemsMenu = new ClixrIo.Views.OverlappingItemsMenu({
        collection: new ClixrIo.Collections.Elements(
          this.intersectingViews.map(function(view) {
              return view.model;
            })
        )
      });
      this.$el.append(this.overlappingItemsMenu.render().$el);
      this.$('.overlapping-button').click(function() {
        this.overlappingItemsMenu.render();
      }.bind(this));
    },

    styleMenu: function () {
      var view = this;
      this.$el.find('.style-menu li').each(function(index) {
        var style = view.styles[index];
        $(this).click( function () {
          var currentStyle = view.$targetEl.attr('class').match(/user-div-style-\d+/)[0];
          view.$targetEl.removeClass(currentStyle);
          view.$targetEl.addClass(style);
        });
      });
    },

    setupColorPicker: function () {
      var $el = this.$targetEl
      var slideFunctionCreator = function ($redSlider, $greenSlider, $blueSlider) {
        return function (event, ui) {
          $el.css(
            "background-color",
            "rgb(" + $redSlider.slider("value") + "," +
            $greenSlider.slider("value") + "," +
            $blueSlider.slider("value") + ")"
          );
        };
      };
      this.colorPicker(slideFunctionCreator, $el.css('background-color'));
    },

    render: function () {
      var content = this.template({
        global: this.global(),
        styleMenu: JST['menus/style_menu']({ styles: this.styles }),
        colorPicker: JST['menus/color_picker'](),
      });
      this.$el.html(content);
      return this;
    },

    remove: function () {
      if (this.overlappingItemsMenu) this.overlappingItemsMenu.remove();
      Backbone.View.prototype.remove.apply(this);
    }
  })
);
