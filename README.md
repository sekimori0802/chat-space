#chat-space DB設計

## groupsテーブル

 |Column|Type|Options|
 |------|----|-------|
 |name|string|null: false,|
 
### Association
- has_many :groups_users
- has_many :users, through: :guroups_users
- has_many :messages 

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

##usersテーブル

｜Colum|Tpye|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false,add_index,|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

##b messagesテーブル

|Column|Type|Options|
|talk|text||
|image|text||
|user_id|references|null: false, foreign_key: true|
|guroup_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


