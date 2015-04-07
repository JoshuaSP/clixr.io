# [clixr.io][heroku]

[heroku]: http://clixr.herokupapp.com

## Minimum Viable Product

clixr.io is a drag-and-drop webpage editor inspired by wix.com. Users can:

- add elements:
  - [ ] boxes
  - [ ] text
  - [ ] images
    - [ ] enter URL
    - [ ] load from hard drive
  - [ ] horizontal menus
  - [ ] horizontal lines
  - [ ] buttons
- [ ] have a header
- [ ] move elements on the page
- [ ] contain elements in divs (will move with div)
- [ ] resize elements
- open a edit menu of an element which allows:
  - [ ] deleting the element
  - [ ] bringing the element forward and backward
  - [ ] choosing which of a stack of elements to edit
  - [ ] choosing to put an element on every page of the site
  - customizing properties of the element:
    - for images
      - [ ] choose whether to crop or scale for images
      - [ ] switch images
    - for text
      - [ ] edit text
      - [ ] choose link target of inline links (link menu)
    - for buttons
      - [ ] choose link target
      - [ ] choose button style (3 preset styles)
    - for menus
      - [ ] choose menu style (3 preset styles)
    - for buttons, menus, boxes, lines, header, footer
      - [ ] choose color
- [ ] link menu can select a page on the site, external website, or email
- [ ] menus will link to just the site's pages
- [ ] create multiple pages
  - [ ] reorder pages
  - [ ] rename pages
  - [ ] delete pages
- [ ] create CSS transitions (swipe/fade) between pages
- [ ] preview the site
- [ ] choose from a set of preset templates to edit
- [ ] see a cool spinner as the editor loads
- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Save their work on a site
- [ ] Publish the site live


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1:  (~1-2 days) - Starting Up, Edit View, Menu Basics

  We will start by creating the page/site edit view, the core of the app.  We will create all necessary rails models and controllers as well as basic Backbone Models and Collections (to be refined later).

  We will create the basic edit bar header, left-side edit buttons and icons. We will create skeleton versions of the `SiteView` and `PageView` (without reference to elements yet).

  Architecturally, there will be no router.  Because Pages and Sites can both contain elements, there will be a lot of functionality mixed in to the two. They will maintain listeners on their collections, so changes in the models can be reflected in the DOM.

  Objects will be added by passing the element collections down to the menu views, which will then perform their actions. Objects will default to being created on the page.

  We will also create an abstract `MenuView` class, of which all menus will be subclasses. We will create a skeleton `AddElementMenu` to test menu code, as well as the basic CSS and design for menus.

  Menu will have an `addMenuItems()` method which will iterate through a passed in `menuItems` option, which will be a list of key-value pairs of menu item names and functions, and it will create them and add listeners.

  We will get menus appearing on the page, and we will then push to Heroku and make sure it all works.

[Details][phase-one]

### Phase 2:  (~1-2 days) Adding Elements, Drag and Drop, Resize

  Today we will work on getting things on the page. We will create an abstract ElementView class, of which all element views will be subclasses. We will create skeletons of all the subclasses.

  Today we will work on getting the add element functionality to work. This means getting the SiteView, PageView, and ElementView all operational. We will create one subclass of ElementView, div. We will work on adding basic add, drag-and-drop, and resize functionality to div using interactjs.

[Details][phase-two]

### Phase 3: (~1-2 days) Adding More Fancy Elements

  Today we will work on adding text, images, buttons, horizontal lines, and menus to the page. We will create an image load modal. We will make sure images resize properly.

[Details][phase-three]

### Phase 4: (~2 days) Edit Menu

  Today we will create the edit menu functionality. We will create an EditMenuView subclass of MenuView to encapsulate all the common edit menu functionality. We will create a populateMenu() function which will take in a hash of menu items and their functions, set up `<li>`s, and attach event handlers using `delegateEvents()`.

  We will create link target menus, button and menu style menus, and create some preset CSS classes for users to style their buttons and menus.

[Details][phase-four]

### Phase 5: (~1-2 days) Site Menu/Pages

  We will implement the SiteMenu, as well as the dropdown selector for selecting the page.  This will use the composite view functions of the site to swap pages, using CSS transitions.

  We will be able to add, remove, rename, and delete pages from the Page menu, and we will make sure to remove the page references from all menus/buttons on delete.

  For MVP, we will put site background image/color in this menu.

  We will also be able to change the site name and site address.

[Details][phase-five]

### Phase 6 (~2-3 days) Getting Sites Live, Seeing Index of Sites

  We will implement save of sites created in edit view, including thumbnail creation.

  We will implement live preview of sites created in the edit view. This will be a different rails route, and will use a backbone router for navigation within the site, making backbone routes dynamically based on the titles of the sites pages.

  We will create a backbone router and new views for site/page/element to simply display the elements and give them their proper live functionality. Mainly this means enabling certain CSS properties and link functionality.

  We will create CSS swipe/fade transitions between pages in the router, based on the site transition property.

  We will implement user authentication and the sites index view, where a user can see his/her own saved sites (if logged in) as well as templates provided by clixr. The sites will be served in a 4x4 gallery, displaying the site thumbnail, and on hover will provide buttons to edit or visit the site.

  We will implement that users must be logged in to save or publish sites (but not to preview).

  We will put a great spinner on the loading of the edit view.

  We will then implement the "live site" functionality, using code in `routes.rb` which will dynamically load all published sites under `clixr.io/:published_address/`.

[Details][phase-six]

### Phase 7 (~2 days) Make Websites!

  Using clixr.io and cute kitten pictures on the internet, we will make some absurd and fun templates that show off clixr's features. We will doubtless run into plenty of bugs in this process as well as possibly a feature or two we really feel like we need to build.


### Bonus Features (TBD)

- [ ] Undo and and redo
- set default design properties
  - [ ] choose color palettes
    - [ ] color palettes should self-create sets of colors based on a few user-suggested colors
  - [ ] choose default fonts
  - [ ] set a background image for the site
- [ ] gridlines
- [ ] snap to objects
- [ ] copy/paste, key commands
- [ ] add galleries
- [ ] add media: video (youtube, vimeo) or soundcloud
- [ ] add vertical menus
- [ ] add vertical lines
- [ ] add strips
- [ ] Choose color palettes with lavish-like color palette creator
- [ ] add ability to stage versions of the site, so an in-process-version and a live version exists

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
