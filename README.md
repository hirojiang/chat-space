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


<!-- DB Design -->

## Users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :group_users
- has_many :group_users

## group_users table

|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messages table

|Column|Type|Options|
|------|----|-------|
|content|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group