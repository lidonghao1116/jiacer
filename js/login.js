(() => {
  $('#login-btn').click(() => {
    // console.log('hhaha');
    $(".login-box div input").trigger('blur');
    if ($('.prompt').length > 0) return;
    //调取数据
    getJSON();
  })
  function getJSON() {
    let data = {
      account: $("#account").val(),
      password: $("#password").val(),
      code: $("#security-code").val()
    };
    fetch('test.json', {
      method: 'POST',
      mode: 'same-origin', // same-origin|no-cors（默认）|cors
      credentials: 'include', // omit（默认，不带cookie）|same-origin(同源带cookie)|include(总是带cookie)
      headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
        'Content-Type': 'application/x-www-form-urlencoded' // default: 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(data=>console.log(data)).catch(function (error) {
      console.log('Request failed', error);
    });
  }


  const [regNum, regCode] = [/^[0-9]*$/, /^[A-Za-z0-9]+$/];
  //input失去焦点
  $(".login-box div input").blur(function () {
    let [self, name]= [$(this), $(this).attr("name")];
    switch (name) {
      case "account":
        self.val() == "" ? onError('*请填写账号', self) : onSuccess(self);
        break;
      case "security-code":
        self.val() == "" ? onError('*请填图片验证码', self) : (!regCode.test(self.val())) ?
                onError('*验证码不正确', self) : onSuccess(self);
        break;
      case "password":
        self.val() == "" ? onError('*请填写密码', self) : onSuccess(self);
        break;
      default:
        break;
    }
  });
  //验证错误
  function onError(msg, self) {
    if (self.nextAll().hasClass('prompt')) {
      self.nextAll('.prompt').text(msg);
      return;
    }
    self.parent().append(`<span class='prompt'>${msg}</span>`);
  }

  //验证成功
  function onSuccess(self) {
    self.nextAll('.prompt').remove();
  }
})()