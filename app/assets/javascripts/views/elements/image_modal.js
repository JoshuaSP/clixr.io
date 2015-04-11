ClixrIo.Views.ImageModal = Backbone.View.extend({
  template: JST['elements/image_modal'],

  tagName: "form",
  className: "image-modal",

  events: {
    "click .fa-close": "closeModal",
    "submit": "chooseImage",
    "a .select": "selectUrl",
    "click .upload": "uploadFile"
  },

  initialize: function (options) {
    this.success = options.success;
    var modalView = this;
    setTimeout(function () {
      $(document).click(function (event) {
        if (!$(event.target).closest(modalView.$el).length) {
          modalView.closeModal;
        }
      });
    }, 0);
  },

  selectUrl: function () {
    this.model.set('url', this.$('input').val());
    this.render();
  },

  render: function () {
    var content = this.template({ model: this.model });
    this.$el.html(content);
    // TODO make things blurry
    this.$('.image-upload').load('/image_upload');
    return this;
  },

  closeModal: function () {
    $(document).off();
  }

})
