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
  init: function(config) {
    var that = this;

    this.uiElements.loginButton = $('#auth0-login');
    this.uiElements.logoutButton = $('#auth0-logout');
    this.uiElements.profileButton = $('#user-profile');
    this.uiElements.profileNameLabel = $('#profilename');
    this.uiElements.profileImage = $('#profilepicture');

    this.data.config = config;  /*config.js里面配置auth0客户端的id以及domain*/
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
  },
  configureAuthenticatedRequests: function() {//将令牌包含到每次请求的Authorization标头中
    $.ajaxSetup({
      'beforeSend': function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
      }
    });
  },
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
