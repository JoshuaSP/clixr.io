ClixrIo.Views.Element = Backbone.View.extend({
  events: {
    "click": "selectElement"
  },

  initialize: function () {
    this.className = this.model.get('class'),
    this.model.css = this.model.get('css') ? $.parseJSON(this.model.get('css')) : {} ;
    this.model.css.position = "absolute";
    this.$el.css(this.model.css);
  },

  setCss: function (property, value) {
    this.$el.css(property, value);
    this.model.css.property = value;
  },

  selectElement: function () {
    this.$el.draggable().resizable({ handles: "all" });
    this.setCss("border", "2px solid " + ClixrIo.Constants.SelectBoxColor);
  }
});

ClixrIo.Constants.SelectBoxColor = "#7effeb";
