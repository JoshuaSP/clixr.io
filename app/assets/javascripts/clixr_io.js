window.ClixrIo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, id) {
    new ClixrIo.Views.SiteEdit({
      el: $rootEl,
      model: new ClixrIo.Models.Site ({ id: id })
    });
  }
};
