ClixrIo.Views.TextEditMenu = Backbone.View.extend(
  _.extend({}, ClixrIo.Mixins.EditElementMenu, ClixrIo.Mixins.MenuUtils, {
    template: JST['menus/text_edit_menu'],
    className: 'edit-menu',

    events: {
      'click .site-page-toggle': 'sitePageToggle',
      'click .delete-button': 'deleteElement',
      'click .fa-close': 'close'
    },

    initialize: function (options) {
      _.extend(this, options)
      $('.floating-menus').append(this.render().$el);
      this.overlappingItems();
      this.setupSubmenus(this.$el, {
        '.tolbar-button': '#wysihtml5-toolbar',
        '.overlapping-button': '.overlapping-items'
      });
      this.$targetEl.draggable('destroy');
      this.$targetEl.find('.text-content').attr('id', 'texteditor');
      this._setupToolbar();
      this.editor = new wysihtml5.Editor("texteditor", {
         toolbar: "wysihtml5-toolbar",
         parserRules: wysihtml5ParserRules, // defined in parser rules set
      });
      this._hookupSliders(this.editor);
      this.delegateEvents();
    },

    render: function () {
      var content = this.template({
        global: this.global(),
        toolbar: JST['menus/text-toolbar']
      });
      this.$el.html(content);
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
        }
      }
      ClixrIo.Mixins.MenuUtils.colorPicker(slideFunctionCreator);
    },

    _setupToolbar: function () {
      this.toolbar = $(JST['menus/text_toolbar']({ colorPicker: JST['menus/color_picker']() }));
      var menusContainer = $('.floating-menus');
      menusContainer.append(this.toolbar);
      this.toolbar.draggable();
      this.toolbar.position({
        my: "center",
        at: "center top-45px",
        of: this.$el
      });
      ClixrIo.Mixins.MenuUtils.setupSubmenus(this.toolbar, {
        '.font-button': '.font-menu',
        '.size-button': '.size-slider',
        '.color-button': '.color-picker',
      });
    }
  })
)
