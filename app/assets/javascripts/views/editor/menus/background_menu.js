ClixrIo.Views.BackgroundMenu = Backbone.CompositeView.extend(
  _.extend({}, ClixrIo.Mixins.ColorPicker, {

    template: JST['menus/editor/background_menu'],
    className: 'site-background-menu',

    events: {
      'click .fa-close': 'close',
      'click .load-image-button': 'selectImage',
      'click .tile-mode': 'toggleImageMode'
    },

    subtlePatterns: [
      'swirl_pattern.png'
    ],

    intialize: function () {
      this.$background = $('.user-site')
      this.$image_cover = $('.image-cover')
      $('.floating-menus').append(this.render().$el)
      this.$('.image-transparency .slider').slider({
        slide: function (event, ui) {
          this.$image_cover.css('opacity', ui.value)
        }.bind(this),
        min: 0,
        max: 1,
        step: 0.01
      });
      this.$('.tile-size .slider').slider({
        slide: function (event, ui) {
          this.$background.css('background-size', ui.value)
        }.bind(this),
        min: 10,
        max: 600,
        value: 25
      })
      this.fillSubtlePatterns();
    },

    toggleImageMode: function () {
      var $imageMode = $('.image-mode span')
      var currentImageMode = $imageMode.text();
      if (currentImageMode === "Tile") {
        $imageMode.text('Cover')
        this.$background.css('background-size', 'cover');
        this.$('.tile-size').css('display', 'none');
      } else {
        $imageMode.text('Tile');
        this.$('.tile-size').css('display', 'block');
        this.$background.css('background-size', this.$('.tile-size .slider').slider('value'))
      }
    },

    render: function () {
      var content = this.template({
        imageMode: imageMode();
        colorPicker: 4
      })
    },

    imageMode: function () {
      this.$background.css('background-size') === "cover" ? "Cover" : "Tile"
    },

    selectImage: function () {
      filepicker.pick(function(blob) {
        this.setImage(blob.url);
      }.bind(this));
    },

    setImage: function (image) {
      this.$background.css('background-image', 'url:("' + image + '")');
    },

    fillSubtlePatterns: function () {
      // $.ajax({
      //   url: "subtle_patterns/",
      //
      // }) robust AJAX code to grab filenames. right now, an array.
      this.subtlePatterns.forEach(function (pattern) {
        var subtlePatternView = new ClixrIo.Views.SubtlePattern ({
          image: pattern,
          setImage: function () {
            this.setImage(pattern)
          }.bind(this)
        })
      })
    }

  })
);

ClixrIo.Views.SubtlePattern = Backbone.View.extend({
  template: JST['menus/editor/subtle_pattern'],
  className: 'subtle-pattern-item',

  events: {
    "click": "setImage"
  }

  initialize: function(options) {
    this.image = options.image;
  },

  render: function () {
    var content = this.template({ image: this.image })

  }

})
