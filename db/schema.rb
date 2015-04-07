# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150407225221) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "elements", force: :cascade do |t|
    t.integer  "placeable_id",    null: false
    t.string   "placeable_type",  null: false
    t.string   "type",            null: false
    t.string   "class"
    t.integer  "container_id"
    t.integer  "height"
    t.integer  "width"
    t.integer  "top"
    t.integer  "left"
    t.integer  "z_index"
    t.string   "resize_property"
    t.text     "css"
    t.string   "url"
    t.text     "content"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "pages", force: :cascade do |t|
    t.integer  "site_id"
    t.string   "title"
    t.integer  "ord"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "pages", ["site_id"], name: "index_pages_on_site_id", using: :btree

  create_table "sites", force: :cascade do |t|
    t.integer  "user_id",           default: 0, null: false
    t.string   "name",                          null: false
    t.string   "published_address"
    t.string   "thumbnail_url"
    t.string   "background_url"
    t.string   "body_class"
    t.string   "body_css"
    t.string   "transition"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "sites", ["published_address"], name: "index_sites_on_published_address", using: :btree
  add_index "sites", ["user_id"], name: "index_sites_on_user_id", using: :btree

  add_foreign_key "pages", "sites"
end
