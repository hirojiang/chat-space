json.name       @message.user.name
json.created_at @message.created_at.to_s(:default)
json.content    @message.content
json.image      @message.image.url
json.id         @message.id
