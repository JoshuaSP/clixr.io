ClixrIo.Views.AddElementMenu = Backbone.View.extend (
  _.extend({}, ClixrIo.Mixins.MenuItems, {
    menuItems: [
      { glyph: "square", name: "Button" }, //could use entypo-doc-landscape
      { glyph: "stop", name: "Box" },
      { glyph: "font", name: "Text" },
      { glyph: "image", name: "Image" },
      { glyph: "align-justify", name: "Menu" },
      { glyph: "minus", name: "Horizontal&nbsp;Line" }
    ],

    className: "add-element-button",
    template: JST['editor/menus/function_buttons'],

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
      this.$el.removeClass("expanded-menu");
    },

    button: function () {
      var button = new ClixrIo.Models.Element({
        element_type: 'Button',
        content: "HI! I'M A BUTTON!",
        url: '#' + this.siteView.pages.at(0).get('address')
      });
      var buttonView = new ClixrIo.Views.Button({ model: button });
      this._placeCenter(buttonView);
      buttonView.$el.css({
        'width': '150px',
        'height': '60px',
        'background-color': '#efcb99'
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
      divView.$el.css('width', '280px');
      divView.$el.css('height', '130px');
      divView.$el.css('background-color', '#9f9cb5');
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
      view.model.save();
      this.siteView.selectView(view);
    },

    text: function () {
      var text = new ClixrIo.Models.Element({
        element_type: 'Text',
        content: "<h4>HEY, WHAT'S UP! I'M A PARAGRAPH!</h4>"
      });
      var textView = new ClixrIo.Views.Text({ model: text });
      this._placeCenter(textView);
      textView.$el.css('width', '360px');
      textView.$el.css('height', '200px');
      this._addAndSelect(textView);
    },

    image: function () {
      var image = new ClixrIo.Models.Element({
        element_type: 'Image'
      });
      filepicker.pick({
        services: [
          'COMPUTER',
          'FACEBOOK',
          'IMAGE_SEARCH',
          'FLICKR',
          'PICASA',
          'URL'
        ]
      }, function(blob) {
        image.set('url', blob.url);
        var imageView = new ClixrIo.Views.Image({
          model: image,
          width: '200px'
        });
        this._placeCenter(imageView);
        this._addAndSelect(imageView);
        imageView.$('img').on('load', imageView.fadeIn);
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
