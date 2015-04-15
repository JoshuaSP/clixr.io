ClixrIo.Views.LinkTargets = Backbone.View.Extend ({
  events: {
    'click li': 'setTarget'
  },

  template: JST['menus/link_targets_menu'],
  className: 'link-targets',

  initialize: function (options) {
    this.setFunction = options.setFunction;
    this.render();
  },

  render: function () {
    var content = this.template({ pages: this.collection });
  },

  setTarget: function(event) {
    var $button = $(event.currentTarget);
    if ($button.hasClass('external-url-button')) {
      var address = $button.find('input').val();
      if (!address.match(/^http/)) address = "http://" + address;
      this.setFunction(address);
    } else if ($button.hasClass('email-link-button')) {
      this.setFunction("mailto:" + $button.find('input').val());
    } else {
      this.setFunction("#" + this.collection.at($button.index() - 2).get('address'));
    }
  }
});
