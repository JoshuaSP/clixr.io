ClixrIo.Views.SiteEdit = Backbone.CompositeView.extend({
  template: JST['editor/site'],

  currentMenu: null,

  events: {
    "click .function-buttons > div": "showMenu",
    "click .page-select": "pageSelect",
    "click .user-element": "selectElement",
    "click .site-save": "siteSave",
  },

  elementViews: {
    'Box': ClixrIo.Views.Box,
    'Horizontal Line': ClixrIo.Views.HorizontalLine,
    'Text': ClixrIo.Views.Text,
    'Menu': ClixrIo.Views.Menu,
    'Image': ClixrIo.Views.Image,
    'Button': ClixrIo.Views.Button
  },

  transition: {
    'None': "switchInOut",
    'Fade': "fadeInOut",
    'Blur': "blurInOut"
  },

  initialize: function () {
    this.model.fetch({
      success: this._setupPage.bind(this)
    });
  },

  keyCommand: function (event) {
    if (event.which === 8 && this.selectedView) {
      this.selectedView.deleteElement();
      event.preventDefault();
    }
  },

  _setupPage: function () {
    this.model.ensurePage();
    this.pages = this.model.pages();
    this._currentPage = this.pages.findWhere({ ord: 0 });
    this.renderSite();
    this.attachPages();
    this.listenTo(this.pages, "add", this.addPage);
    this.listenTo(this.pages, "remove", this.removePage);
    $('img').on('load', function (event) {
      $(event.target).fadeIn(500, function () {
        $(event.target).css('display', 'block');
      });
    });
    this.editSiteMenu = new ClixrIo.Views.EditSiteMenu({
      $functionButtons: this.$('.function-buttons'),
      siteView: this,
      pages: this.pages,
      site: this.model
    });
    this.addElementMenu = new ClixrIo.Views.AddElementMenu({
      $functionButtons: this.$('.function-buttons'),
      siteView: this,
      collection: this.pages,
      model: this.currentPage()
    });
    this.pageChangeMenu = new ClixrIo.Views.PageChangeMenu({
      selectPage: this.selectPage.bind(this),
      collection: this.pages,
      currentPage: this.currentPage.bind(this)
    });
  },

  //not destroying on server on save but we will deal with orphans on server

  attachPages: function () {
    this.pages.forEach(function(page) {
      page.$pageEl = $(this.pageSelector(page));
    }.bind(this));
  },

  removePage: function (page) {
    page.elements().forEach(function (element) {
      this.removeModelSubview(pageSelector(page), element);
    });
    $(pageSelector(page)).remove();
  },

  // the following is not the best solution and in an ideal world will be refactored...
  // but it's a big structural change, so I'm taking on the technical debt here:

  addPage: function (page) {
    var $newPage = $('<div class="user-page-elements" data-page-ord=' + page.get('ord') + '>');
    $('.user-page-gridlines').append($newPage);
    page.$pageEl = $newPage;
  },

  currentPage: function() {
    return this._currentPage;
  },

  changePageNameDisplay: function () {
    var $pageContainer = $('.page-select');
    $pageContainer.css('opacity', 0);
    setTimeout(function () {
      $pageContainer.css('opacity', 1);
      $('.current-page-name').html(this.currentPage().escape('title'));
    }.bind(this), 300);
  },

  siteSave: function () {
    if (this.selectedView) this.selectedView.deselect();
    this.model.save();
    console.log('saved');
  },

  switchInOut: function (newPage) {
    this.$currentPage().removeClass('current');
    this._currentPage = newPage;
    this.addElementMenu.model = this.currentPage();
    this.changePageNameDisplay();
    this.$currentPage().addClass('current');
  },

  fadeInOut: function (newPage) {
    this.$('.user-page-elements .user-element').css('opacity', 0);
    var $oldpage = this.$currentPage();
    this._currentPage = newPage;
    this.addElementMenu.model = this.currentPage();
    this.changePageNameDisplay();
    this.$currentPage().addClass('current');
    setTimeout(function () {
      $(this.currentPageSelector() + ' .user-element').css('opacity', '');
    }.bind(this), 0);
    setTimeout(function() {
      $oldpage.removeClass('current');
    }.bind(this), 600);
  },

  blurInOut: function (newPage) {
    this.$('.user-page-elements').css('-webkit-filter', 'blur(50px)');
    setTimeout(function() {
      this.$currentPage().removeClass('current');
      this._currentPage = newPage;
      this.addElementMenu.model = this.currentPage();
      this.changePageNameDisplay();
      this.$currentPage().addClass('current');
      setTimeout(function(){
        this.$('.user-page-elements').css('-webkit-filter', 'blur(0px)');
      }.bind(this), 4);
    }.bind(this), 400);
  },

  selectPage: function (pageIndex) {
    var newPage = this.pages.at(pageIndex);
    if (newPage === this.currentPage()) return;
    if (this.selectedView && !this.selectedView.global()) {
      this.selectedView.deselect();
      this.selectedView = null;
    }
    this[this.transition[this.model.get('transition')]](newPage);
  },

  $currentPage: function () {
    return $(this.currentPageSelector());
  },

  currentPageSelector: function () {
    return this.pageSelector(this.currentPage());
  },

  pageSelector: function (page) {
    return '.user-page-elements[data-page-ord=' + page.get('ord') + ']';
  },

  collapseMenus: function () {
    // iterate and collapse each menu
  },

  selectElement: function(event) {
    var newView = this.findView($(event.currentTarget));
    var pageIntersectors = this._findIntersectors(newView.$el,
      this.currentPageSelector() + ' .user-element');
    var siteIntersectors = this._findIntersectors(newView.$el,
      '.user-site-elements .user-element');
    var intersectors = pageIntersectors.concat(siteIntersectors);
    newView.intersectingViews = _(this.findViews(intersectors)).sortBy(function(view) {
      return parseInt(view.$el.css('z-index'));
    }).reverse();
    this.selectView(newView);
  },

  findViews: function($els) {
    return $els.map(function($el) {
      return this.findView($el);
    }.bind(this));
  },

  findView: function($el) {
    var allViews = this.subviews(this.currentPageSelector())
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
      currentPage: this.currentPage.bind(this)
    });
    this.$el.html(content);

    var backgroundCSS = $.parseJSON(this.model.get('background_css'));
    $('.user-site').css(backgroundCSS);
    var imageCoverCSS = $.parseJSON(this.model.get('image_cover_css'));
    $('.image-cover').css(imageCoverCSS);
    $('.image-cover').css('opacity', 1);
    if (backgroundCSS['background-image']) {
      var $userBG = $('.user-background-image');
      $userBG.attr('src', backgroundCSS['background-image'].replace(/url\(|\)/g, ''));
      $userBG.on('load', function (event) {
        setTimeout(function() {
          $('.image-cover').css('opacity', imageCoverCSS.opacity || 0); // returns 0 if imageCoverCSS.opacity is unedfined
        },0);
      });
    }
    this._renderElements('.user-site-elements', this.model.elements());
    this.pages.forEach(function(page) {
      this._renderElements(this.pageSelector(page), page.elements());
    }.bind(this));
    return this;
  },

  _renderElements: function (selector, elements) {
    elements.each(function (element) {
      var elementView = new this.elementViews[element.get('element_type')]({
        siteView: this,
        model: element,
        collection: this.pages
      });
      this.addSubview(selector, elementView);
    }.bind(this));
  },

  showMenu: function (event) {
    if(!$(event.target).hasClass("fa-close")) {
      $(event.currentTarget).addClass("expanded-menu");
      if (this.selectedView) this.selectedView.deselect();
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
      var i_x = [thisPos.left, thisPos.left + $this.outerWidth()];
      var i_y = [thisPos.top, thisPos.top + $this.outerHeight()];

      if ( t_x[0] < i_x[1] && t_x[1] > i_x[0] &&
         t_y[0] < i_y[1] && t_y[1] > i_y[0]) {
        intersectors.push($this);
      }
    });
    return intersectors;
  }
});
