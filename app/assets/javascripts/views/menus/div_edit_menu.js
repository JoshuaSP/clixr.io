ClixrIo.Views.DivEditMenu = Backbone.View.extend(
  _.extend({}, ClixrIo.Mixins.EditElementMenu, ClixrIo.Mixins.MenuUtils, {
    template: 'menus/div_edit_menu',

    styles: [
      'user-div-style-1',
      'user-div-style-2',
      'user-div-style-3'
    ],

    intersectingViews: [],

    initialize: function (options) {
      this.$targetEl = options.$targetEl;
      this.siteView = options.siteView;
      $('.floating-menus').append(this.render().$el);
      this.setupSubmenus(this.$el, {
        '.style-button': '.style-menu',
        '.color-button': '.color-picker',
        '.overlapping-button': '.overlapping-items'
      });
      this.setupColorPicker();
      this.styleMenu();
      this.overlappingItems();
    },

    overlappingItems: function () {
      if (this.intersectingViews.length < 2) {
        this.$('.overlapping-button').remove();
        return
      }
      this.overlappingItemsMenu = new ClixrIo.Views.OverlappingItemsMenu({
        collection: new ClixrIo.Collections.Elements(
          this.intersectingViews.map(function(view) {
              return view.model;
            })
        )
      });
      this.$('.overlapping-items').html(this.overlappingItemsMenu.render().$el)
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
      var slideFunctionCreator = function ($redSlider, $greenSlider, $blueSlider) {
        return function (event, ui) {
          this.$targetEl.css(
            "background-color",
            "rgb(" + $redSlider.slider("value") + "," +
            $greenSlider.slider("value") + "," +
            $blueSlider.slider("value") + ")"
          );
        };
      };
      this.colorPicker(slideFunctionCreator);
    },

    render: function () {
      var content = JST[this.template]({
        styleMenu: JST['menus/style_menu']({ styles: this.styles }),
        colorPicker: JST['menus/color_picker'](),
      });
      this.$el.html(content);
      return this;
    },

    remove: function () {
      this.overlappingItemsMenu.remove();
      Backbone.View.prototype.remove.apply(this);
    }
  })
);
