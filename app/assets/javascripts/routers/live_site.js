ClixrIoLive.Routers.LiveSite = Backbone.Router.extend({
  initialize: function (options) {
    _.extend(this, options);
    var siteView = new ClixrIoLive.Views.Site({ model: this.site });
    this.site.fetch({
      success: function () {
        this.site.pages().forEach(function (page, i) {
          this.route(page.get('address'), this.switchPage, i);
        }.bind(this));
        var content = this.site.render().$el;
        this.$rootEl.html(content);
      }.bind(this)
    });
    Backbone.history.start();
  },

  transition: {
    'None': 'switchInOut',
    'Fade': 'fadeInOut'
  },

  switchPage: function (pageNum) {
    var $oldPage = $('.user-page-elements.current');
    var $newPage = $('.user-page-elements[data-page-ord=' + pageNum + ']');
    this[this.transition[this.model.get('transition')]]($oldPage, $newPage);

  },

  switchInOut: function ($oldPage, $newPage) {
    $oldPage.removeClass('current');
    $newPage.addClass('current');
  },

  fadeInOut: function ($oldPage, $newPage) {
    $('.user-element').css('opacity', 0);
    $newPage.addClass('current');
    setTimeout(function () {
      $newPage.find('.user-element').css('opacity', '');
    }, 0);
    setTimeout(function () {
      $oldPage.removeClass('current');
    }, 600);
  }
});
