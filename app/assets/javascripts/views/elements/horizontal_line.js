ClixrIo.Views.HorizontalLine = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.DivEditMenu,

  handles: {
    "e": { right: "-5px", top: "-5px"},
    "w": { left: "-5px", top: "-5px"}
  }
});
