ClixrIo.Views.Text = ClixrIo.Views.Element.extend({
  tagName: 'div',
  template: JST['elements/text_element'],

  initialize: function () {
    ClixrIo.Views.Element.prototype.initialize.apply(this);
    this.$el.addClass('text-element')
    this.$el.html(this.template({ content: this.model.escape('content')}));
    this.$textbox = this.$('.text-content')
  },

  secondClick: function () {
    if (this.toolbar) return;
    this.$el.draggable('destroy');
    this.$textbox.attr('id', 'texteditor');
    this._setupToolbar();
    this.editor = new wysihtml5.Editor("texteditor", {
       toolbar: "wysihtml5-toolbar",
       parserRules: wysihtml5ParserRules, // defined in parser rules set
    });
    this._hookupSliders(this.editor);
    setTimeout(function () {
      $('a[data-wysihtml5-command-value="p"]')[0].click();
    },1);
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
    var $redSlider = $('.color-picker .red .slider');
    var $greenSlider = $('.color-picker .green .slider');
    var $blueSlider = $('.color-picker .blue .slider');
    $('.color-picker .red .slider, .color-picker .green .slider, .color-picker .blue .slider').slider({
      slide: function (event, ui) {
        editor.composer.commands.exec(
          "foreColorStyle",
          "rgb(" + $redSlider.slider("value") + "," +
          $greenSlider.slider("value") + "," +
          $blueSlider.slider("value") + ")"
        );
      },
      min: 0,
      max: 256
    });
  },

  _setupToolbar: function () {
    this.toolbar = $(JST['menus/text_toolbar']());
    var menusContainer = $('.floating-menus');
    menusContainer.append(this.toolbar);
    this.toolbar.draggable();
    this.toolbar.position({
      my: "center",
      at: "center top-45px",
      of: this.$el
    });
    ClixrIo.Mixins.SetupSubmenus(this.toolbar, {
      '.font-button': '.font-menu',
      '.size-button': '.size-slider',
      '.color-button': '.color-picker',
    });
  },

  deselectElement: function () {
    this.selected = false;
    this.$el.resizable('destroy');
    this.$('.drag-handle').remove();
    this.$el.removeClass("selected-element");
    if (this.toolbar) {
      this.$textbox.attr('id','');
      this.$textbox.attr("contenteditable", "false")
      this.toolbar.remove();
      this.toolbar = null;
      this.editor = null;
    } else {
      this.$el.draggable('destroy');
    }
  }
});
