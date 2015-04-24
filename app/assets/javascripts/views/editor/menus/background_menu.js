ClixrIo.Views.BackgroundMenu = Backbone.CompositeView.extend(
  _.extend({}, ClixrIo.Mixins.ColorPicker, {

    template: JST['editor/menus/background_menu'],
    className: 'site-background-menu',

    events: {
      'click .fa-close': 'close',
      'click .load-image-button': 'selectImage',
      'click .image-mode': 'toggleImageMode'
    },

    subtlePatterns: [
      'swirl_pattern.png',
      'cream_pixels_@2X.png',
      'hoffman_@2X.png',
      'simple_dashed_@2X.png',
      'knitting250px_@2X.png',
      'wavegrid_@2X.png',
      'escheresque_@2X.png',
      'ps_neutral_@2X.png',
      'footer_lodyas.png',
      'subtle_white_mini_waves.png',
      'escheresque_ste_@2X.png',
      'pyramid_@2X.png',
      'triangular_@2X.png'
      ].map(function(pattern) {
        return "/images/subtle_patterns/" + pattern;
      }),

    initialize: function (options) {
      _.extend(this, options);
      this.$background = $('.user-site');
      this.$image_cover = $('.image-cover');
      $('.floating-menus').append(this.render().$el);

      this.$background.styleListener({
        styles: ['background-size', 'background-image'],
        changed: function () {
          this.model.save();
        }.bind(this)
      });
      this.$image_cover.styleListener({
        styles: ['background-color', 'opacity'],
        changed: function () {
          this.model.save();
        }.bind(this)
      });

      this.$('.image-transparency .slider').slider({
        slide: function (event, ui) {
          this.$image_cover.css('opacity', ui.value);
        }.bind(this),
        min: 0,
        max: 1,
        step: 0.01,
        value: $.parseJSON(this.model.get('image_cover_css')).opacity
      });
      this.$('.tile-size .slider').slider({
        slide: function (event, ui) {
          this.$background.css('background-size', ui.value);
        }.bind(this),
        min: 10,
        max: 1000,
        value: 90
      });
      this.setupColorPicker(this.$image_cover);
      this.fillSubtlePatterns();
      this.delegateEvents();
    },

    toggleImageMode: function () {
      var $imageMode = $('.image-mode span');
      var currentImageMode = $imageMode.text();
      if (currentImageMode === "Tile") {
        $imageMode.text('Cover');
        this.$background.css('background-size', 'cover');
        this.$('.tile-size').fadeOut(300);
      } else {
        $imageMode.text('Tile');
        this.$('.tile-size').fadeIn(300);
        this.$background.css('background-size', this.$('.tile-size .slider').slider('value'));
      }
    },

    close: function () {
      $('.background-button').click();
    },

    render: function () {
      var content = this.template({
        imageMode: this.imageMode(),
        colorPicker: JST['editor/menus/color_picker']()
      });
      this.$el.html(content);
      return this;
    },

    imageMode: function () {
      return this.$background.css('background-size') === "cover" ? "Cover" : "Tile";
    },

    selectImage: function () {
      filepicker.pick(ClixrIo.Mixins.FilepickerOptions, function(blob) {
        this.setImage(blob.url);
      }.bind(this));
    },

    setImage: function (image) {
      this.$background.css('background-image', 'url(' + image + ')');
    },

    fillSubtlePatterns: function () {
      this.subtlePatterns.forEach(function (pattern) {
        var subtlePatternView = new ClixrIo.Views.SubtlePattern ({
          image: pattern,
          setImage: function () {
            this.setImage(pattern);
          }.bind(this)
        });
        this.addSubview('.subtle-patterns ul', subtlePatternView);
      }.bind(this));
    }

  })
);

ClixrIo.Views.SubtlePattern = Backbone.View.extend({
  template: JST['editor/menus/subtle_pattern'],
  className: 'subtle-pattern-item',
  tagName: 'li',

  events: {
    "click": "setImage"
  },

  initialize: function(options) {
    _.extend(this, options);
  },

  render: function () {
    var content = this.template({ image: this.image });
    this.$el.html(content);
    return this;
  }
});
