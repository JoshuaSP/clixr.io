ClixrIoLive.Views.Site = Backbone.View.extend({
  template: JST['live/site'],

  elementTemplates: {
    'Box': JST['live/elements/div'],
    'Horizontal Line': JST['live/elements/div'],
    'Text': JST['live/elements/text'],
    'Menu': JST['live/elements/menu'],
    'Image': JST['live/elements/image'],
    'Button': JST['live/elements/button'],
  },

  domElement: function () {
    return function (element) {
      var $element = $(this.elementTemplates[element.get('element_type')]({
        element: element,
        site: this.model
      }));
      $element.addClass('user-element ' + element.get('element_class'));
      $element.css($.parseJSON(element.get('css')));
      // $element.css('position', 'absolute');
      return $element.clone().wrap('<div/>').parent().html();
    }.bind(this);
  },

  render: function () {
    var content = this.template({
      site: this.model,
      domElement: this.domElement()
    });
    this.$el.html(content);
    return this;
  }
});
