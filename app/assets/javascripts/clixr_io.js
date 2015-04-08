window.ClixrIo = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, id) {
    var siteEdit = new ClixrIo.Views.SiteEdit({
      el: $rootEl,
      model: new ClixrIo.Models.Site ({ id: id })
    });
    siteEdit.render();
  }
};
