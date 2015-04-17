window.ClixrIoLive = {
  Models: {},
  Collections: {},
  Views: {},
  Mixins: {},
  Routers: {},
  initialize: function($rootEl, id) {
    var siteEdit = new ClixrIoLive.Views.Site({
      el: $rootEl,
      model: new ClixrIoLive.Models.Site ({ id: id })
    });
  }
};
