$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
  var img = (message.image.url !== null) ? `<img src = "${message.image.url}">` : "";  
  var html = `<div class="message" data-message-id = "${message.id}"> 
               <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.user_name}
                </div>
                <div class="upper-message__date">
                   ${message.created_at}
                </div> 
              </div>
               <div class="lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>

                ${img}


                </div>
             </div>`
             return html;
    }  
    var reloadMessages = function() {
      var message_group_url = window.location.href
      if (message_group_url.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message-id");
      
      }
        $.ajax ({
        url: "api/messages",
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(messages){   
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          if(message.id > last_message_id){
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      })
      })
      .fail(function() {
        alert('エラー。');
      });
    }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
   })
   .done(function(data){
    var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val(''); 
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
   .fail(function(){
      alert('エラー。');
  })
  .always(function(){
    $('.form__submit').prop('disabled', false); 
  })
  })
  setInterval(reloadMessages, 5000);

  });
