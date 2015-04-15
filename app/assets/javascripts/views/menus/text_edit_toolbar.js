ClixrIo.Views.TextEditToolbar = Backbone.View.extend ({
  template: JST['menus/text_edit_toolbar'],

  initialize: function(options) {
    _.extend(this, options);
    this.$textbox.attr('id', 'texteditor');
    this.render();
    this.editor = new wysihtml5.Editor("texteditor", {
       toolbar: "wysihtml5-toolbar",
       parserRules: wysihtml5ParserRules, // defined in parser rules set
    });
    this._hookupSliders(this.editor);
  },

  isVisible: function () {
    return this.$el.css('opacity') == 1;
  },

  remove: function () {
    this.editor = null;
    Backbone.View.prototype.remove.apply(this);
  },

  render: function () {
    var content = this.template({
      colorPicker: JST['menus/color_picker']()
    });
    $('.floating-menus').append(this.$toolbar);
    this.$toolbar.draggable();
    this.$toolbar.position({
      my: "center",
      at: "center top-45px",
      of: this.$targetEl
    });
    ClixrIo.Mixins.MenuUtils.setupSubmenus(this.$toolbar, {
      '.font-button': '.font-menu',
      '.size-button': '.size-slider',
      '.color-button': '.color-picker',
    });
    return this;
  },

  _hookupSliders: function (editor) {
    $('.size-slider .slider').slider({
      slide: function (event, ui) {
        editor.composer.commands.exec("fontSizeStyle", ui.value + "px");
      },
      min: 5,
      max: 150,
      orientation: "vertical"
    });
    var slideFunctionCreator = function ($redSlider, $greenSlider, $blueSlider) {
      return function (event, ui) {
        editor.composer.commands.exec(
          "foreColorStyle",
          "rgb(" + $redSlider.slider("value") + "," +
          $greenSlider.slider("value") + "," +
          $blueSlider.slider("value") + ")"
        );
      };
    };
    ClixrIo.Mixins.MenuUtils.colorPicker(slideFunctionCreator);
  }
})
