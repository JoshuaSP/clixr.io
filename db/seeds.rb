# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Site.create!({
   user_id: 0,
   title: "Blank Site",
   background_url:
    "http://www.beingdevelopers.com/wp-content/uploads/2014/04/html-background-1716x700_c.jpg"
})

Page.create!([{
  site_id: 1,
  title: "Page 1",
  ord: 0
}, {
  site_id: 1,
  title: "Second Page",
  ord: 1
}, {
  site_id: 1,
  title: "Page C",
  ord: 2
}, {
  site_id: 1,
  title: "IVeme Page",
  ord: 3
}])
