window.ClixrIo = {
  Models: {},
  Collections: {},
  Mixins: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, id) {
    var siteEdit = new ClixrIo.Views.SiteEdit({
      el: $rootEl,
      model: new ClixrIo.Models.Site ({ id: id })
    });
  }
};
