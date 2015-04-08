ClixrIo.Views.AddElementMenu = Backbone.View.extend (
  _.extend({}, ClixrIo.Mixins.MenuItems, {
    menuItems: [
      { glyph: "square", name: "Button" }, //could use entypo-doc-landscape
      { glyph: "stop", name: "Box" },
      { glyph: "font", name: "Text" },
      { glyph: "image", name: "Image" },
      { glyph: "align-justify", name: "Menu" },
      { glyph: "minus", name: "Horizontal Line" }
    ],

    className: "add-element-button",

    template: JST['menus/add_element'],

    initialize: function (options) {
      this.parent = options.parent;
      this.setupMenuItems();
      this.parent.append(this.render().$el);
    },

    closeMenu: function (event) {
      event.preventDefault();
      this.$el.removeClass("expanded-menu");
    },

    button: function () {

    },

    box: function () {

    },

    text: function () {

    },

    image: function () {

    },

    menu: function () {

    },

    horizontalLine: function () {

    }
  })
);
