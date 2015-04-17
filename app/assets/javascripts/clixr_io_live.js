window.ClixrIoLive = {
  Models: {},
  Collections: {},
  Views: {},
  Mixins: {},
  Routers: {},
  initialize: function($rootEl, id) {
    var siteEdit = new ClixrIoLive.Routers.LiveRouter({
      el: $rootEl,
      site: new ClixrIoLive.Models.Site ({ id: id })
    });
  }
};
