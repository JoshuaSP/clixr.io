ClixrIo.Views.LinkTargetsMenu = Backbone.View.extend ({
  events: {
    'click li': 'setTarget',
    'keyup input': 'setTarget'
  },

  template: JST['menus/link_targets_menu'],
  className: 'link-targets',
  tagName: 'ul',

  initialize: function (options) {
    _.extend(this, options);
    this.render();
  },

  render: function () {
    var content = this.template({
      pages: this.collection,
      linkTarget: this.targetFunction()
    });
    this.$el.html(content);
    return this;
  },

  setTarget: function(event) {
    var address, $inputbox, $operator = $(event.currentTarget);
    if ($operator.closest('.external-url-button').length) {
      $inputbox = $operator.closest('.external-url-button').find('input');
      address = $inputbox.val();
      if (!address.match(/^http/)) address = "http://" + address;
      if (!address.match(/^(https?:\/\/)?\w+\.(\w+\.)*\w+(\/\w+)*\/?(\w+\.\w+)?$/)) {
        $inputbox.addClass('input-bad');
      } else {
        $inputbox.removeClass('input-bad');
      }
      this.setFunction(address);
    } else if ($operator.closest('.email-link-button').length) {
      $inputbox = $operator.closest('.email-link-button').find('input');
      address = $inputbox.val();
      if (!address.match(/[\w\.]+@\w+\.(\w+\.)*\w+/)) {
        $inputbox.addClass('input-bad');
      } else {
        $inputbox.removeClass('input-bad');
      }
      this.setFunction("mailto:" + address);
    } else {
      this.setFunction("#" + this.collection.at($operator.index() - 5).get('address'));
    }
    this.$el.find('.target-name').text(this.targetFunction());
  }
});
