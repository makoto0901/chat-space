$(function() {
  function buildHTML(message){
    let imageUrl = (message.image) ?`<img class="lower-message__image" src="${message.image}">` : "";
    let html = `<div class="message">
                  <div class="upper-message">
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
