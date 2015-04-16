ClixrIo.Views.SiteEdit = Backbone.CompositeView.extend({
  template: JST['sites/edit'],

  currentMenu: null,

  events: {
    "click .page-menu-button": "showPageMenu",
    "click .add-element-button": "showAddElementMenu",
    "click .page-select": "pageSelect",
    "click .user-element": "selectElement",
  },

  initialize: function () {
    this.model.fetch({
      success: this._setupPage.bind(this)
    });
  },

  _setupPage: function () {
    this.model.ensurePage();
    this.currentPage = this.model.pages().where({ ord: 0 })[0];
    this.renderSite();
    this.addElementMenu = new ClixrIo.Views.AddElementMenu({
      $functionButtons: this.$('.function-buttons'),
      siteView: this,
      collection: this.model.pages(),
      model: this.currentPage
    });
    this._renderElements('.user-page-elements', this.currentPage.elements());
  },

  swapCurrentPageElements: function () {
    this.subviews['user-page-elements'].forEach(function(subview) {
      this.remove();
    });
    this.subviews['user-page-elements'] = this.subviews['new-user-page-elements'];
    this.subviews['new-user-page-elements'] = [];
    $('.user-page-elements').remove();
    $('.new-user-page-elements').removeClass('new-user-page-elements')
      .addClass('user-page-elements');
  },

  switchInOut: function (newPage) {
    this.swapCurrentPageElements();
    this.currentPage = newPage;
    $('.user-page-elements').css('display', 'block');
  },

  fadeInOut: function (newPage) {

  },

  blurInOut: function (newPage) {

  },

  transition: {
    '': "switchInOut",
    'Fade': "fadeInOut",
    'Blur': "blurInOut"
  },

  pageSelect: function (event) {
    var $pageBox = $('.page-select');
    var $selected = $(event.target);
    if (!$pageBox.hasClass('expanded-menu')) {
      $pageBox.addClass('expanded-menu');
    } else {
      if ($selected.prop('tagName') === 'LI') this.selectPage($selected.index());
      $pageBox.removeClass('expanded-menu');
    }
  },

  selectPage: function (pageIndex) {
    var newPage = this.model.pages().at(pageIndex)
    if (newPage === this.currentPage) return;
    var $newPage = $('<div class=".new-user-page-elements">');
    $newPage.css({
      display: 'none',
      position: 'absolute'
    });
    $('.user-page-gridlines').append($newPage);
    this._renderElements('new-user-page-elements', newPage.elements());
    this[this.transition[this.model.get('transition')]](newPage)
  },

  collapseMenus: function () {
    // iterate and collapse each menu
  },

  selectElement: function(event) {
    var newView = this.findView($(event.currentTarget));
    var intersectors = this._findIntersectors(newView.$el, '.user-element');
    newView.intersectingViews = _(this.findViews(intersectors)).sortBy(function(view) {
      return parseInt(view.$el.css('z-index'))
    }).reverse();
    this.selectView(newView);
  },

  findViews: function($els) {
    return $els.map(function($el) {
      return this.findView($el);
    }.bind(this));
  },

  findView: function($el) {
    var allViews = this.subviews('.user-page-elements')
      .concat(this.subviews('.user-site-elements'));
    return _(allViews).find(function(subview) {
      return subview.$el.is($el);
    });
  },

  selectView: function(view) {
    if (this.selectedView && this.selectedView !== view) {
      this.selectedView.deselect();
    }
    view.select();
    this.selectedView = view;
  },

  renderSite: function () {
    var content = this.template({
      site: this.model,
      currentPage: this.currentPage
    });
    this.$el.html(content);
    this._renderElements('.user-site-elements', this.model.elements());
    return this;
  },

  _renderElements: function (selector, elements) {
    _(elements).each(function (element) {
      var elementView = new this.elementViews[element.get('type')]({
        siteView: this
      });
      this.addSubview(selector, elementView);
    });
  },

  elementViews: {
    'Box': ClixrIo.Views.Box,
    'Horizontal Line': ClixrIo.Views.HorizontalLine,
    'Text': ClixrIo.Views.Text,
    'Menu': ClixrIo.Views.Menu,
    'Image': ClixrIo.Views.Image,
    'Button': ClixrIo.Views.Button
  },

  showPageMenu: function (event) {
    if (this.pageMenu.openable) {
      this.pageMenu.$el.addClass("expanded-menu");
    }
  },

  showAddElementMenu: function (event) {
    if(!$(event.target).hasClass("fa-close")) {
      this.addElementMenu.$el.addClass("expanded-menu");
    }
  },

  _swapMenu: function (newMenu) {
    if (this.currentMenu) {
      this.currentMenu.remove();
    }
    this.currentMenu = newMenu;
  },

  _findIntersectors: function($target, intersectorsSelector) {  // copied from StackOverflow, because why not
    var intersectors = [];

    var tAxis = $target.offset();
    var t_x = [tAxis.left, tAxis.left + $target.outerWidth()];
    var t_y = [tAxis.top, tAxis.top + $target.outerHeight()];

    $(intersectorsSelector).each(function() {
      var $this = $(this);
      var thisPos = $this.offset();
      var i_x = [thisPos.left, thisPos.left + $this.outerWidth()]
      var i_y = [thisPos.top, thisPos.top + $this.outerHeight()];

      if ( t_x[0] < i_x[1] && t_x[1] > i_x[0] &&
         t_y[0] < i_y[1] && t_y[1] > i_y[0]) {
        intersectors.push($this);
      }
    });
    return intersectors;
  }
});
