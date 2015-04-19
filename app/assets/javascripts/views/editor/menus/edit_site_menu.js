ClixrIo.Views.EditSiteMenu = Backbone.CompositeView.extend({
  className: 'edit-site-button',
  template: JST['editor/menus/edit_site'],

  events: {
    'click .fa-close': 'closeMenu',
    'input.site-title blur': 'changeTitle',
    'input.site-address keyup': 'checkAddress',
    'input.site-address blur': 'addressBlur',
    'click .click-to-edit': 'clickToEdit',
    'click .add-page': 'addPage',
    'click .page-transition': 'pageTransition'
  },

  transitions: [
    'None',
    'Fade'
  ],

  initialize: function(options) {
    _.extend(this, options);
    this.render();
    this.$functionButtons.append(this.$el);
    this.setup();
    this.listenTo(this.site, "change", this.render);
    this.listenTo(this.pages, "add", this.addPageListView);
    this.listenTo(this.pages, "remove", this.removePageListView);
  },

  setup: function () {
    this.pages.forEach(this.addPageListView.bind(this));
    this.$('.page-reorder').sortable({
      update: function () {
        this.subviews().forEach(function(subview) {
          subview.reorder();
        });
      }
    });
  },

  addPageListView: function(page) {
    var pageListItem = new ClixrIo.Views.PageListItem({ model: page });
    this.addSubview('.page-reorder', pageListItem);
  },

  removePageListView: function(page) {
    this.removeModelSubview('.page-reorder', page);
  },

  addPage: function () {
    var page = new ClixrIo.Models.Page({ title: "New Page" });
    this.pages.add(page);
  },

  pageTransition: function () {
    var currIdx = this.transitions.indexOf(this.site.get('transition'));
    this.site.set('transition', this.transitions[(currIdx + 1) % 2]);
  },

  changeTitle: function (event) {
    this.site.set('title', $(event.currentTarget).val());
  },

  checkAddress: function (event) {
    this.addressBlurred = false;
    var $input = $(event.currentTarget);
    var newAddress = $input.val();
    $input.removeClass('validated');
    $.ajax({
      url: "/api/sites/" + this.site.id + "/address",
      data: {address: newAddress},
      success: function () {
        $input.addClass('validated');
        if (this.addressBlurred) this.changeAddress($input);
      },
      error: function () {
        $input.addClass('validated input-bad');
        if (this.addressBlurred) this.changeAddress($input);
      }
    });
  },

  changeAddress: function ($input) {
    if (!$input.hasClass('input-bad')) {
      this.site.set('title', $input.val());
    } else {
      this.render();
    }
  },

  addressBlur: function (event) {
    var $input = $(event.currentTarget);
    if (!$input.hasClass('validated')) {
      this.addressBlurred = true;
    } else {
      this.changeAddress($input);
    }
  },

  clickToEdit: function (event) {
    var $span = $(event.currentTarget).find('span');
    var currentValue = $span.text();
    $span.replaceWith('<input value="' + currentValue + '">');
  },

  render: function () {
    var content = this.template({
      site: this.site,
      pages: this.pages
    });
    this.$el.html(content);
    this.attachSubviews();
  },

  closeMenu: function (event) {
    this.$el.removeClass("expanded-menu");
  }
});


ClixrIo.Views.PageListItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['editor/menus/page_list_item'],
  className: 'page-edit',

  events: {
    'click fa-pencil': 'renameBox',
    'click fa-trash': 'delete',
    'input blur': 'rename'
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render());
  },

  reorder: function () {
    this.model.set('ord', this.$el.index());
  },

  render: function () {
    var content = this.template({ page: this.model });
    this.$el.html(content);
    return this;
  },

  renameBox: function () {
    var $span = $(event.currentTarget).find('span');
    var currentValue = $span.text();
    $span.replaceWith('<input value="' + currentValue + '">');
  },

  delete: function () {
    this.model.destroy();
  },

  rename: function () {
    var newName = $(event.currentTarget).find('span').val();
    this.model.set('title', newName);
    var address = newName.replace(/[^A-Za-z]/g, "_");
    if (this.pages.where({ address: address }).length) {
      var i = 1;
      while (this.pages.where({ address: address + i }).length) i++;
      address += i;
    }
    this.model.set('address', address);
  }
});
