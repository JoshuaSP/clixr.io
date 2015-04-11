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
    $(document).click(function (event) {
      if (!event.target.closest(this.$el).length) {
        this.closeModal;
      }
    }.bind(this));
  },

  selectUrl: function () {
    this.model.set('url', this.$('input').val());
    this.render();
  },

  render: function () {
    var content = this.template({ model: this.model });
    this.$el.html(content);
    // TODO make things blurry
    return this;
  },

  closeModal: function () {
    $(document).off();
  }

})
