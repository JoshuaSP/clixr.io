# Schema Information

## sites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user - 0 for templates)
title       | string    | not null
address     | string    |
thumbnail_url | string  |

## pages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
site_id     | integer   | not null, foreign key (references site)
name        | string    | not null
ord         | integer   | not null (0 for home page)

## elements
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
placeable_id     | integer   | not null, foreign key (polymorphic association references page or site)
placeable_type | string | not null, in: (page, site)
type        | string    | not null, in: (div, image, text, button, header, {media})
class       | string    |
container_id| integer   | foreign_key (references element)
height      | integer   | not null
width       | integer   |
top         | integer   |
left        | integer   |
z_index     | integer   |
resize_property | string    | default: "scale"
css         | text      |
color       | integer   | in: (1-30 {references computed properties of color pallette})
url         | string    |
content     | text      |

## color palettes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
site_id     | integer   | not null, foreign key (references site - 0 for templates)
color_1     | string    | not null
color_2     | string    | not null
color_3     | string    | not null
color_4     | string    | not null
color_5     | string    | not null
more_color_1| string    | not null
more_color_2| string    | not null
more_color_3| string    | not null
more_color_4| string    | not null
more_color_5| string    | not null

## font sets
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
site_id     | integer   | not null, foreign key (references site - 0 for templates)
h1_id       | integer   | not null, foreign key (references font)
h2_id       | integer   | not null, foreign key (references font)
h3_id       | integer   | not null, foreign key (references font)
h4_id       | integer   | not null, foreign key (references font)
h5_id       | integer   | not null, foreign key (references font)
body_large_id | integer   | not null, foreign key (references font)
body_normal_id| integer   | not null, foreign key (references font)

## fonts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
px          | integer   | not null
text-weight | string    |
color       | integer   | { references computed properties of color palette }

## backgrounds
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
site_id     | integer   | not null, foreign key (references site)
url         | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
