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
      this.siteView = options.siteView;
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
      var div = new ClixrIo.Models.Element({ type: 'Horizontal Line' });
      var divView = new ClixrIo.Views.HorizontalLine({ model: div });
      divView.$el.css("left", "0px");
      divView.$el.css("top", "200px");
      divView.$el.css('width', '980px');
      divView.$el.css('height', '2px');
      divView.$el.css('background-color', 'black');
      this._addAndSelect(divView);
    },

    box: function () {
      var div = new ClixrIo.Models.Element({ type: 'Box' });
      var divView = new ClixrIo.Views.Box({ model: div });
      this._placeCenter(divView);
      divView.$el.css('width', '200px');
      divView.$el.css('height', '200px');
      divView.$el.css('background-color', '#7093ae');
      divView.$el.addClass('user-div-style-1');
      this._addAndSelect(divView);
    },

    _addAndSelect: function(view) {
      view.siteView = this.siteView;
      this.model.elements().add(view.model);
      this.siteView.addSubview('.user-page-elements', view);
      this.siteView.selectView(view);
    },

    text: function () {
      var text = new ClixrIo.Models.Element({ type: 'Text' });
      var textView = new ClixrIo.Views.Text({ model: text });
      this._placeCenter(textView);
      textView.$el.css('width', '200px');
      textView.$el.css('height', '200px');
      this._addAndSelect(textView);
    },

    image: function () {
      // var imageModal = new ClixrIo.Views.ImageModal ({
      //   model: image,
      //   success: function() {},
      // });
      // $('.modals').append(imageModal.render().$el);
      // imageModal.$el.css('opacity', 1)
      var image = new ClixrIo.Models.Element({ type: 'Image' });
      filepicker.pick(function(blob) {
        image.set('url', blob.url);
        var imageView = new ClixrIo.Views.Image({ model: image });
        this._placeCenter(imageView);
        imageView.$el.css('width', '200px');      
        this._addAndSelect(imageView);
      }.bind(this));
    },

    menu: function () {
      var menu = new ClixrIo.Models.Element({ type: 'Menu' });
      var menuView = new ClixrIo.Views.Menu({
        model: menu,
        collection: this.collection
      });
      this._placeCenter(menuView);
      menuView.$el.css('width', '400px');
      menuView.$el.css('height', '75px');
      this._addAndSelect(menuView);
    },


    _placeCenter: function (view) {
      view.$el.css("left", "490px");
      view.$el.css("top", "200px");
    }
  })
);
