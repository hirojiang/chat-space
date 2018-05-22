$(function() {
  function buildHTML(message) {
    var image = ""
    if(message.image != null) {
      image = `<img src= ${message.image} class= 'message__content__image' >`
    }
    var html = `<div class="message">
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
});
