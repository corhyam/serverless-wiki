/*初始化auth0 lock，关联点击事件并把jwt保存到本地存储中，然后把它包含到每次请求的authorization标头中*/
window.userController = {
  data: {
    auth0Lock: null,
    config: null
  },
  uiElements: {
    loginButton: null,
    logoutButton: null,
    profileButton: null,
    profileNameLabel: null,
    profileImage: null
  },
  init(config) {
    {
      const { uiElements } = this;
      uiElements.loginButton = $("#auth0-login");
      uiElements.logoutButton = $("#auth0-logout");
      uiElements.profileButton = $("#user-profile");
      uiElements.profileNameLabel = $("#profilename");
      uiElements.profileImage = $("#profilepicture");
    }

    {
      const { data } = this;
      data.config = config;
      data.auth0Lock = new Auth0Lock(
          config.auth0.clientId,
          config.auth0.domain
      );
    }

    {
      const accessToken = localStorage.getItem("userToken");
      if (accessToken) {
        this.configureAuthenticatedRequests();
        this.data.auth0Lock.getUserInfo(accessToken, (error, profile) => {
          if (error) return alert("Auth0 error: " + error.message);
          this.showUserAuthenticationDetails(profile);
        });
      }
    }

    this.wireEvents();
  },
  /*  init: function(config) {       这个语法不对 弃用了好像 一直报错
      var that = this;
      this.uiElements.loginButton = $('#auth0-login');
      this.uiElements.logoutButton = $('#auth0-logout');
      this.uiElements.profileButton = $('#user-profile');
      this.uiElements.profileNameLabel = $('#profilename');
      this.uiElements.profileImage = $('#profilepicture');
      this.data.config = config;  /!*config.js里面配置auth0客户端的id以及domain*!/
      this.data.auth0Lock = new Auth0Lock(config.auth0.clientId, config.auth0.domain);

      var idToken = localStorage.getItem('userToken');
      if (idToken) {
        this.configureAuthenticatedRequests();
        this.data.auth0Lock.getProfile(idToken, function(err, profile) { //如果用户令牌已存在，可以从auth0中获取用户信息
          if (err) {
            return alert('There was an error getting the profile: ' + err.message);
          }
          that.showUserAuthenticationDetails(profile);
        });
      }
      this.wireEvents();
    },*/

  configureAuthenticatedRequests() {
    $.ajaxSetup({
      beforeSend(xhr) {
        xhr.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("userToken")
        );
      }
    });
  },
  /*  configureAuthenticatedRequests: function() {//将令牌包含到每次请求的Authorization标头中
      $.ajaxSetup({
        'beforeSend': function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
        }
      });
    },*/
  showUserAuthenticationDetails(profile) {
    const showAuthenticationElements = !!profile;

    if (showAuthenticationElements) {
      const { profileNameLabel, profileImage } = this.uiElements;
      profileNameLabel.text(profile.nickname);
      profileImage.attr("src", profile.picture);
    }

    {
      const { loginButton, logoutButton, profileButton } = this.uiElements;
      loginButton.toggle(!showAuthenticationElements);
      logoutButton.toggle(showAuthenticationElements);
      profileButton.toggle(showAuthenticationElements);
    }
  },

  wireEvents() {
    const { auth0Lock, config } = this.data;

    auth0Lock.on("authenticated", ({ accessToken }) =>
        auth0Lock.getUserInfo(accessToken, (error, profile) => {
          auth0Lock.hide();
          if (error) return alert("Auth0 error:" + error);

          localStorage.setItem("userToken", accessToken);//将jwt令牌保存到浏览器的localStorage中
          this.configureAuthenticatedRequests();
          this.showUserAuthenticationDetails(profile);
        })
    );

    {
      const { loginButton, logoutButton, profileButton } = this.uiElements;

/*      loginButton.click(() =>
          auth0Lock.show({ auth: { params: { scope: "openid profile" } } })//auth0 lock界面
      );*/
      loginButton.click(() =>
          {
            auth0Lock.show({ auth: {
                params: {
                  responseType: 'id_token token',//改成id token了现在
                  scope: 'openid profile'
                }
              } });
          }
      );

      logoutButton.click(() => {
        localStorage.removeItem("userToken");//click移除令牌
        localStorage.removeItem('accessToken');

        logoutButton.hide();//隐藏logout
        profileButton.hide();//隐藏profile
        loginButton.show();//显示login
        auth0Lock.logout({ returnTo: "http://127.0.0.1:8100" });
      });

      profileButton.click(() => {  //show profile点击事件处理
        const url = config.apiBaseUrl + "/user-profile";
        $.get(url, data => {

          alert(JSON.stringify(data));//

          $("#user-profile-raw-json").text(JSON.stringify(data, null, 2));
          $("#user-profile-modal").modal();

        });
      });
    }
  }
};

/*
 showUserAuthenticationDetails: function(profile) {
   var showAuthenticationElements = !!profile;

   if (showAuthenticationElements) {
     this.uiElements.profileNameLabel.text(profile.nickname);
     this.uiElements.profileImage.attr('src', profile.picture);
   }

   this.uiElements.loginButton.toggle(!showAuthenticationElements);
   this.uiElements.logoutButton.toggle(showAuthenticationElements);
   this.uiElements.profileButton.toggle(showAuthenticationElements);
 },
 wireEvents: function() {
   var that = this;

   this.uiElements.loginButton.click(function(e) {
     var params = {
       authParams: {
         scope: 'openid email user_metadata picture'
       }
     };

     that.data.auth0Lock.show(params, function(err, profile, token) {//auth0 lock界面
       if (err) {
         // Error callback
         alert('There was an error');
       } else {
         // Save the JWT token.
         localStorage.setItem('userToken', token); //将jwt令牌保存到浏览器的localStorage中
         that.configureAuthenticatedRequests();
         that.showUserAuthenticationDetails(profile);
       }
     });
   });

   this.uiElements.logoutButton.click(function(e) {
     localStorage.removeItem('userToken');  //click移除令牌

     that.uiElements.logoutButton.hide();//隐藏logout按钮
     that.uiElements.profileButton.hide();
     that.uiElements.loginButton.show();//显示login
   });

   this.uiElements.profileButton.click(function(e) {
     var url = that.data.config.apiBaseUrl + '/user-profile';

     $.get(url, function(data, status) {
       $('#user-profile-raw-json').text(JSON.stringify(data, null, 2));
       $('#user-profile-modal').modal();
     })
   });
 }
}
*/