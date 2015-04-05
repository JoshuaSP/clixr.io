# clixr.io

<!-- [Heroku link][heroku]

[heroku]: link_goes_here -->

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
- [ ] preview the site
- [ ] choose from a set of preset templates to edit
- [ ] see a cool spinner as the editor loads
- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Save their work on a site
- [ ] Publish the site live (on a clixr.io subdomain?)


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1:  (~1 day)


[Details][phase-one]

### Phase 2:  (~2 days)

[Details][phase-two]


### Bonus Features (TBD)

- [ ] Undo and and redo
- set default design properties
  - [ ] choose color palettes
    - [ ] color palettes should self-create sets of colors based on a few user-suggested colors
  - [ ] choose default fonts
  - [ ] set a background image for the site
- [ ] gridlines
- [ ] snap to objects
- [ ] create CSS transitions (swipe/fade) between pages
- [ ] media/video
- [ ] add vertical menus
- [ ] copy/paste, key commands
- [ ] Choose color palettes with lavish-like color palette creator

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
