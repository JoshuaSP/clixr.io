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
      var button = new ClixrIo.Models.Element({
        element_type: 'Button',
        content: "My Button"
      });
      var buttonView = new ClixrIo.Views.Button({ model: button });
      this._placeCenter(buttonView);
      buttonView.$el.css({
        'width': '150px',
        'height': '60px',
        'background-color': '#cc9966'
      });
      buttonView.$el.addClass('user-button-style-1');
      this._addAndSelect(buttonView);
    },

    horizontalLine: function () {
      var div = new ClixrIo.Models.Element({ element_type: 'Horizontal Line' });
      var divView = new ClixrIo.Views.HorizontalLine({ model: div });
      divView.$el.css("left", "0px");
      divView.$el.css("top", "200px");
      divView.$el.css('width', '980px');
      divView.$el.css('height', '2px');
      divView.$el.css('background-color', 'black');
      this._addAndSelect(divView);
    },

    box: function () {
      var div = new ClixrIo.Models.Element({ element_type: 'Box' });
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
      this.siteView.addSubview(this.siteView.pageSelector(this.model), view);
      view.model.set({
        'placeable_type': 'Page',
        'placeable_id': this.model.id
      });
      this.siteView.selectView(view);
    },

    text: function () {
      var text = new ClixrIo.Models.Element({
        element_type: 'Text',
        content: "My Paragraph"
      });
      var textView = new ClixrIo.Views.Text({ model: text });
      this._placeCenter(textView);
      textView.$el.css('width', '200px');
      textView.$el.css('height', '200px');
      this._addAndSelect(textView);
    },

    image: function () {
      var image = new ClixrIo.Models.Element({
        element_type: 'Image',
        resize_property: 'scale'
      });
      filepicker.pick(function(blob) {
        image.set('url', blob.url);
        var imageView = new ClixrIo.Views.Image({
          model: image,
          width: '200px'
        });
        imageView.$el.addClass('user-image-style-1');
        this._placeCenter(imageView);
        this._addAndSelect(imageView);
      }.bind(this));
    },

    menu: function () {
      var menu = new ClixrIo.Models.Element({ element_type: 'Menu' });
      var menuView = new ClixrIo.Views.Menu({
        model: menu,
        collection: this.collection
      });
      this._placeCenter(menuView);
      menuView.$el.addClass('user-menu-style-1');
      menuView.$el.css('width', '450px');
      menuView.$el.css('height', '50px');
      this._addAndSelect(menuView);
    },


    _placeCenter: function (view) {
      view.$el.css("left", "490px");
      view.$el.css("top", "200px");
    }
  })
);
