ClixrIo.Views.Element = Backbone.View.extend({
  events: {
    "click": "selectElement"
  },

  handles: {
    "n": { left: "50%", top: "-5px"},
    "ne": { right: "-5px", top: "-5px"},
    "e": { right: "-5px", top: "50%"},
    "se": { right: "-5px", bottom: "-5px"},
    "s": { right: "50%", bottom: "-5px"},
    "nw": { left: "-5px", top: "-5px"},
    "w": { left: "-5px", top: "50%"},
    "sw": { left: "-5px", bottom: "-5px"}
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
    var $handles = {};
    this.$el.draggable();
    for (var handle in this.handles) {
      var circle = $('<div class="drag-handle">');
      circle.addClass("ui-resizable-handle ui-resizable-" + handle);
      circle.css(this.handles[handle]);
      $handles[handle] = circle;
    }
    this.$el.resizable($handles);
    this.setCss("border", "1px solid " + ClixrIo.Constants.SelectBoxColor);
  }
});

ClixrIo.Constants.SelectBoxColor = "#7effeb";
