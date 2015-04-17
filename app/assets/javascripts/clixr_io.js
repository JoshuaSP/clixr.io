window.ClixrIo = {
  Models: {},
  Collections: {},
  Mixins: {},
  Views: {},
  initialize: function($rootEl, id) {
    var siteEdit = new ClixrIo.Views.SiteEdit({
      el: $rootEl,
      model: new ClixrIo.Models.Site ({ id: id })
    });
  }
};
