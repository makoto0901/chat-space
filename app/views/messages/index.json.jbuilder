json.array! @new_messages do |message|
  json.content  message.content
  json.id  message.id
  json.name  message.user.name
  json.image  message.image.url
  json.date  message.created_at.to_s
end
