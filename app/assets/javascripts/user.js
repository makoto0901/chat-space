$(function(){
  var search_list = $("#user-search-result");
  var add_user = $("#chat-group-users");
  function appendUser(user) {
    let html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user.name }</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${user.name}">追加</a>
    </div>`
      search_list.append(html);
      }
  function appendNoUser(user) {
    let html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${ user }</p>
    </div>`
    search_list.append(html);
    }
  function appendAddUser(id, name){
    let html =`
    <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${ id }'>
        <p class='chat-group-user__name'>${ name }</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    add_user.append(html);
    }
  $("#user-search-field").on("keyup", function(){
    let input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      });
    });
    $("#user-search-result").on('click','.chat-group-user__btn--add',function(){
      let user_id = $(this).attr('data-user-id');
      let user_name = $(this).attr('data-user-name');
      appendAddUser(user_id,user_name);
      $(this).parent().remove();
    });
    $("#chat-group-users").on('click', '.js-remove-btn', function(){
      $(this).parent().remove();
    });
});
