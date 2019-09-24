$(document).on('turbolinks:load', function(){
  var user_list = $("#result-id");
  function appendUser(user){
  var html = `<div class="chat-group-user clearfix">
              <div class="chat-group-user ">
               <p class="chat-group-user__name">${user.name}</p>
               <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
               </div>
             </div>`
    user_list.append(html);
  }
  function appendErrMsgToHTML(miss){
     var html = `<div class="chat-group-user clearfix">
                  <div class="chat-group-user ">
                    <p class="chat-group-user__name">${miss}</p>
                  </div>
                </div>`
     user_list.append(html);
  }
  var group_list = $("#add-group");
    function appendGroups(name,id){
     var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                 </div> `
     group_list.append(html);
    }

 $("#result").on("keyup", function() {
   var input = $("#result").val();
   $.ajax({
    type: 'GET',
    url:  '/users',
    data: { keyword: input },
    dataType: 'json'
 })

 .done(function(users){
  $(".chat__user-search-field chat-group-form__input").empty();
  if (users.length!== 0) {
    users.forEach(function(user)
      {appendUser(user);
      });
    }
  else {
     appendErrMsgToHTML("一致する名前はありません");
      }
   })
  .fail(function(){ 
    alert('エラー');
  });
});
  $(document).on("click",".chat-group-user__btn--add", function(){
    $(".chat-group-user__name").val();
    var id   = $(this).data("user-id")
    var name = $(this).data("user-name")
    appendGroups(name,id);
    $(this).parent().remove()
    });
  $(document).on("click",".chat-group-user__btn--remove",function(){
    $(this).parent().remove()
  });
});



