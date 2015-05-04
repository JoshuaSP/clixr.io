# [clixr.io][clixr]

[clixr]: http://clixr.io

clixr.io is a web application built with Backbone.js, Ruby on Rails, jQuery-ui, and SASS.

## Features

With clixr, users can:

- create websites and publish them live to custom addresses of the form clixr.io/{custom_address}
- add, remove, rename, and reorder pages on the website
- create, drag, and resize boxes, images, buttons, horizontal lines, and images
- create text content, with selectable fonts, sizes and colors
- create menus linking to all current pages
- change color and style of boxes, buttons, and menus
- give buttons custom links to outside websites, internal pages, or email addresses
- give the website a background, with a tiling pattern or background image and overlay

In addition, clixr supports:
- autosaving
- a unique edit page address generated for each user
- a robust interface for handling overlapping items in the DOM, allowing users to reorder and select items that overlap the currently selected item
- fade or instant transitions between pages

## Features of the Code

User DOM elements in clixr are backed by backbone models which take care of saving and loading to the database via the Rails API. The default backbone `.save()` function is overwritten export all the relevant data from the DOM element.

Since each type of element shares functionality with the other types, there is an inheritance tree implemented with mixins for the element and element menu views.

One of my favorite features is the overlapping items menu. It is impemented using several different listeners. First, every element, on creation, subscribes to a global Z-index object, which gives each element methods to move itself in front of, or behind, any other given element, the calling of which will update the z-indexes on all other elements necessary to implement the change.

The overlapping items menu also employs listeners on the style and content of the currently selected element, as well as binding a recalculation of the overlaps to any drag or resize event, with the result that the menu updates in real-time to reflect all changes in the DOM.
