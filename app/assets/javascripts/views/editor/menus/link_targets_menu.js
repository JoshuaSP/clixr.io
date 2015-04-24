ClixrIo.Views.LinkTargetsMenu = Backbone.View.extend ({
  events: {
    'click li': 'setTarget',
    'keyup input': 'setTarget',
    'blur input': 'render'
  },

  template: JST['editor/menus/link_targets_menu'],
  className: 'link-targets',
  tagName: 'ul',

  initialize: function (options) {
    _.extend(this, options);
    this.render();
  },

  render: function () {
    var content = this.template({
      pages: this.collection,
      linkTarget: this.getUrl()
    });
    this.$el.html(content);
    return this;
  },

  setTarget: function(event) {
    var address, $inputbox, $operator = $(event.currentTarget);
    if (event.which === 13) {
      this.render();
      return;
    }
    if ($operator.closest('.external-url-button').length) {
      $inputbox = $operator.closest('.external-url-button').find('input');
      address = $inputbox.val();
      if (!address.match(/^http/)) address = "http://" + address;
      if (!address.match(/^(https?:\/\/)?\w+\.(\w+\.)*\w+(\/\w+)*\/?(\w+\.\w+)?$/)) {
        $inputbox.addClass('input-bad');
      } else {
        $inputbox.removeClass('input-bad');
      }
      this.setUrl(address);
    } else if ($operator.closest('.email-link-button').length) {
      $inputbox = $operator.closest('.email-link-button').find('input');
      address = $inputbox.val();
      if (!address.match(/[\w\.]+@\w+\.(\w+\.)*\w+/)) {
        $inputbox.addClass('input-bad');
      } else {
        $inputbox.removeClass('input-bad');
      }
      this.setUrl("mailto:" + address);
    } else {
      this.setUrl("#" + this.collection.at($operator.index() - 5).get('address'));
      this.render();
    }
    this.$el.find('.target-name').text(this.getUrl());
  }
});
