ClixrIo.Views.SiteEdit = Backbone.CompositeView.extend({
  template: JST['live/site'],

  elementTemplates: {
    'Box': JST['live/div'],
    'Horizontal Line': JST['live/div'],
    'Text': JST['live/text'],
    'Menu': JST['live/menu'],
    'Image': JST['live/image'],
    'Button': JST['live/button'],
  },

  domElement: function (element) {
    var $element = $(this.elementTemplates[element.get('element_type')]({
      element: element,
      site: this.model
    }));
    $element.addClass('user-element ' + element.get('element_class'));
    $element.css($.parseJSON(element.get('css')));
    return $element.clone().wrap('<div/>').parent().html();
  },

  render: function () {
    var content = this.template({
      site: this.model,
      domElement: this.domElement
    });
  }
});
