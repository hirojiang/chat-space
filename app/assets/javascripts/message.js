$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var image = ""
    if(message.image != null) {
      image = `<img src= ${message.image} class= 'message__content__image' >`
    }
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__top">
                    <div class="message__userName">
                      ${message.name}
                    </div>
                    <div class="message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__content">
                    <p class="message__content__text">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.chatMain__middle').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.submit__btn').prop('disabled', false);
    })
    .fail(function() {
      alert('error');
    })
  })

  $(function(){
    function buildMESSAGE(new_message){
      var image = ""
    if(new_message.image != null) {
      image = `<img src= ${new_message.image} class= 'message__content__image' >`
    }
      var message_list = $('.messages');
      var html = `<div class="message" data-id="${new_message.id}">
                  <div class="message__top">
                    <div class="message__userName">
                      ${new_message.name}
                    </div>
                    <div class="message__date">
                      ${new_message.created_at}
                    </div>
                  </div>
                  <div class="message__content">
                    <p class="message__content__text">
                      ${new_message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
      message_list.append(html);
    }

    $(function(){
      setInterval(update, 5000);
    });

    function update(){
      var message_id = $('.message:last').data('id');
      if (location.pathname.match(/\/groups\/\d+\/messages/)){
        $.ajax({
          url: location.href,
          type: 'GET',
          data: {id: message_id},
          dataType: 'json'
        })
        .always(function(data){
          if (data.length !== 0){
          data.forEach(function(data){
            buildMESSAGE(data);
          });
          $('.chatMain__middle').animate({scrollTop: $('.messages')[0].scrollHeight});
        }
        })
      }
    }
  });
});
