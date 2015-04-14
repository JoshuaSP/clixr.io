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
      var textEdit = this;
      _.extend(textEdit, options);
      $('.floating-menus').append(textEdit.render().$el);
      textEdit.overlappingItems();
      textEdit.setupSubmenus(textEdit.$el, {
        '.overlapping-button': '.overlapping-items'
      });
      textEdit.$targetEl.find('.text-content').attr('id', 'texteditor');
      textEdit._setupToolbar();
      textEdit.editor = new wysihtml5.Editor("texteditor", {
         toolbar: "wysihtml5-toolbar",
         parserRules: wysihtml5ParserRules, // defined in parser rules set
      });
      textEdit.setupSubmenus(textEdit.$el, {
        '.toolbar-button': '#wysihtml5-toolbar',
      });
      textEdit._hookupSliders(textEdit.editor);
      textEdit.$('.toolbar-button').click(function() {
        if (textEdit.toolbarVisible) {
          textEdit.toolbarVisible = false;
          textEdit.$targetEl.draggable();
        } else {
          textEdit.toolbarVisible = true;
          textEdit.$targetEl.draggable('destroy');
        }
      });
      textEdit.delegateEvents();
    },

    render: function () {
      var content = this.template({
        global: this.global()
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
        of: this.$targetEl
      });
      ClixrIo.Mixins.MenuUtils.setupSubmenus(this.toolbar, {
        '.font-button': '.font-menu',
        '.size-button': '.size-slider',
        '.color-button': '.color-picker',
      });
    }
  })
)
