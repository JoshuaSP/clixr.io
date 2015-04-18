ClixrIoLive.Routers.LiveSite = Backbone.Router.extend({
  routes: {
    ':address': 'switchPage'
  },

  initialize: function (options) {
    _.extend(this, options);
    var siteView = new ClixrIoLive.Views.Site({ model: this.site });
    this.site.fetch({
      success: function () {
        var content = siteView.render().$el;
        this.$rootEl.html(content);
        $('.user-page-elements img').on('load', function (event) {
          $(event.target).fadeIn(500, function () {
            $(event.target).css('opacity', '');
          });
        });
        $('.user-background-image').on('load', function (event) {
          setTimeout(function() {
            $('.image-cover').css('opacity', 0);
          },0);
        });
        if (this.directAddress) this.switchPage(this.directAddress);
      }.bind(this)
    });
    Backbone.history.start();
  },

  transition: {
    'None': 'switchInOut',
    'Fade': 'fadeInOut'
  },

  switchPage: function (address) {
    if (this.site.pages().length === 0) {
      this.directAddress = address;
      return;
    }
    var pageNum = this.site.pages().findWhere({ address: address }).get('ord');
    var $oldPage = $('.user-page-elements.current');
    var $newPage = $('.user-page-elements[data-page-ord=' + pageNum + ']');
    if ($oldPage.is($newPage)) return;
    this[this.transition[this.site.get('transition')]]($oldPage, $newPage);
  },

  switchInOut: function ($oldPage, $newPage) {
    $oldPage.removeClass('current');
    $newPage.addClass('current');
  },

  fadeInOut: function ($oldPage, $newPage) {
    $('.user-page-elements .user-element').css('opacity', 0);
    $newPage.addClass('current');
    setTimeout(function () {
      $newPage.find('.user-element').css('opacity', '');
    }, 1);
    setTimeout(function () {
      $oldPage.removeClass('current');
    }, 600);
  }
});
