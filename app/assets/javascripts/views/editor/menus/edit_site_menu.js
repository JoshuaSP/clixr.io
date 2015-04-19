ClixrIo.Views.EditSiteMenu = Backbone.CompositeView.extend({
  className: 'edit-site-button',
  template: JST['editor/menus/edit_site_menu'],

  events: {
    'click .fa-close': 'closeMenu',
    'keyup .site-title input': 'changeTitleIfEnter',
    'focusout .site-title input': 'changeTitle',
    'keyup .site-address input': 'checkAddress',
    'focusout .site-address input': 'addressBlur',
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

  changeTitleIfEnter: function (event) {
    if (event.which === 13) this.changeTitle(event);
  },

  changeTitle: function (event) {
    this.site.set('title', $(event.currentTarget).val());
    this.render();
  },

  checkAddress: function (event) {
    this.addressBlurred = false;
    var $input = $(event.currentTarget);
    if (event.which === 13) {
      this.changeAddress($input);
      return;
    }
    var newAddress = $input.val();
    $input.removeClass('validated').removeClass('input-bad');
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
      this.site.set('published_address', $input.val());
      this.render();
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
    $input = $('<input type="text" value="' + currentValue + '">')
    $span.replaceWith($input);
    $input.focus();
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
    'click .fa-pencil': 'renameBox',
    'click .fa-trash': 'delete',
    'focusout input': 'rename'
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
    $span.replaceWith('<input type= "text" value="' + currentValue + '">');
  },

  delete: function () {
    if (this.model.collection.length > 1) this.model.destroy();
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
    this.render();
  }
});
