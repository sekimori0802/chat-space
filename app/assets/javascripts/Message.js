$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
  var img = message.image != null  ?  `"${ message.image}"` : "";  
  var html = `<div class="message" message-id = "${message.id}"> 
              <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.name}
             </div>
             <div class="upper-message__date">
                ${message.created_at}
             </div> 
             </div>
             <div class="lower-message">
             <p class="lower-message__content">
                ${message.content}
             </p>
             <img class="lower-message__image" src=${img}>
             </div>
             </div>`
             return html;
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
      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }

    })
   .fail(function(){
      alert('エラー。');
  })
  .always(function(data){
    $('.form__submit').prop('disabled', false); 
    
  })
})
}) 


