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
    template: JST['menus/function_buttons'],

    initialize: function (options) {
      this.setupMenuItems();
      this.parentView = options.parentView;
      options.$functionButtons.append(this.render().$el);
    },

    render: function () {
      var content = this.template({
        menuItems: this.menuItems,
        mainIcon: "plus-circle",
        title: "Add"
      });
      this.$el.html(content);
      return this;
    },

    closeMenu: function (event) {
      setTimeout(function () {
        this.openable = true;
      }.bind(this), 0);
      this.$el.removeClass("expanded-menu");
    },

    button: function () {

    },

    horizontalLine: function () {
      var div = new ClixrIo.Models.Element({ type: 'div' });
      var divView = new ClixrIo.Views.Div({ model: div });
      divView.setCss("left", "0px");
      divView.setCss("top", "200px");
      divView.setCss('width', '980px');
      divView.setCss('height', '2px');
      divView.setCss('background-color', 'black');
      this._addAndSelect(divView);
    },

    box: function () {
      var div = new ClixrIo.Models.Element({ type: 'div' });
      var divView = new ClixrIo.Views.Div({ model: div });
      this._placeCenter(divView);
      divView.setCss('width', '200px');
      divView.setCss('height', '200px');
      divView.setCss('background-color', '#7093ae');
      this._addAndSelect(divView);
    },

    _addAndSelect: function(view) {
      this.model.elements().add(view.model);
      this.parentView.addSubview('.user-page-elements', view);
      this.parentView.selectView(view);
    },

    text: function () {
      var text = new ClixrIo.Models.Element({ type: 'text' });
      var textView = new ClixrIo.Views.Text({ model: text });
      this._placeCenter(textView);
      textView.setCss('width', '200px');
      textView.setCss('height', '200px');
      this._addAndSelect(textView);
    },

    image: function () {
      var image = new ClixrIo.Models.Element({ type: 'image' });
      var imageModal = new ClixrIo.Views.ImageModal ({
        model: image,
        success: function() {},
      })
      $('.modals').append(imageModal.render().$el)
    },

    menu: function () {
      var menu = new ClixrIo.Models.Element({ type: 'menu' });
      var menuView = new ClixrIo.Views.Menu({
        model: menu,
        collection: this.collection
      });
      this._placeCenter(menuView);
      menuView.setCss('width', '400px');
      menuView.setCss('height', '75px');
      this._addAndSelect(menuView);
    },


    _placeCenter: function (view) {
      view.setCss("left", "490px");
      view.setCss("top", "200px");
    }
  })
);
