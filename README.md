# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|INT|null: false, unique: true|
|user_name|VARCHAR|null: false|
|user_mail|VARCHAR|null: false|
|user_password|VARCHAR|null: false|

### Association
- has_many :groups, through :members
- has_many :members
- has_many :messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|REFERENCES|null:false, foreign_key: true|
|group_id|REFERENCES|null:false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|INT|null:false, unique: true|
|group_name|VARCHAR|null:false|

### Association
- has_many :users, through :members
- has_many :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|messeage_id|INT|null:false, unique: true|
|user_id|INT|null:false|
|group_id|INT|null:false|
|messeage_text|TEXT|null:false|
|image_url|VARCHAR|null:true|

### Association
- belongs_to :user
- belongs_to :group
