$(function() {
  // 失敗時に更新処理をやめるよう値を保持
  var interval = setInterval(messeageUpdate, 5000);
  function buildHTML(message){
    let imageUrl = (message.image) ?`<img class="lower-message__image" src="${message.image}">` : "";
    let html = `<div class="message">
                  <div class="upper-message" message-id="${message.id}">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                  </div>
                    ${imageUrl}
                </div>`
    return html;
  }

  function messeageUpdate(){
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      let messageId = $(".message").last().attr('message-id');
      $.ajax({
        url: location.href,
        type:'GET',
        dataType: 'json',
        data: {id: messageId}
      })
      .done(function(data){
        let id = $('.message').data('messageId');
        let insertHTML = "";
        data.forEach(function(message){
          insertHTML += buildHTML(message);
        });
        if (insertHTML !== "") {
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function() {
        alert("自動更新に失敗しました");
        clearInterval(interval);
      })
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
      $('.form__send').prop('disabled', false);
    })
  })
});
