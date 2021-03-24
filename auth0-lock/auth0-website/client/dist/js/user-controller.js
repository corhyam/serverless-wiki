/*初始化auth0 lock，关联点击事件并把jwt保存到本地存储中，然后把它包含到每次请求的authorization标头中*/
var userController = {
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

    this.data.config = config;//config.js里面配置auth0客户端的id以及domain
    this.data.auth0Lock = new Auth0Lock(config.auth0.clientId, config.auth0.domain);

    this.data.auth0Lock.on("authenticated", function(authResult) {

      console.log("authResult: " + JSON.stringify(authResult));

      //使用authResult中的令牌调用getUserinfo
      this.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          //Error回滚报错
          alert('There was an error getting user info');
        } else {

          console.log('saving user token');

          localStorage.setItem('accessToken', authResult.accessToken);///将jwt令牌保存到浏览器的localStorage中
          localStorage.setItem('idToken', authResult.idToken);
          that.configureAuthenticatedRequests();
          that.showUserAuthenticationDetails(profile);
        }
      });
    });

    var accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.configureAuthenticatedRequests();//将令牌包含到每次请求的Authorization标头中 访问令牌
      this.data.auth0Lock.getUserInfo(accessToken, function(err, profile) {//如果用户令牌已存在，可以从auth0中获取用户信息
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
        }
        that.showUserAuthenticationDetails(profile);
      });
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
  configureAuthenticatedRequests: function() {//令牌整在authorization里
    $.ajaxSetup({
      'beforeSend': function(xhr) {//XMLHttpRequest 创建ajax请求
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('idToken'));
        xhr.setRequestHeader('AccessToken', localStorage.getItem('accessToken'));
      }
    });
  },
  showUserAuthenticationDetails: function(profile) {//展示信息
    var showAuthenticationElements = !!profile;

    if (showAuthenticationElements) {
      this.uiElements.profileNameLabel.text(profile.nickname);
      this.uiElements.profileImage.attr('src', profile.picture);//设值
    }

    this.uiElements.loginButton.toggle(!showAuthenticationElements);//jqurey toggle元素可见则隐藏元素
    this.uiElements.logoutButton.toggle(showAuthenticationElements);
    this.uiElements.profileButton.toggle(showAuthenticationElements);
  },
  wireEvents: function() {
    var that = this;

    this.uiElements.loginButton.click(function(e) {//user-profile点击事件
      var params = {
        authParams: {
          scope: 'openid email user_metadata picture'//作用域
        }
      };

      that.data.auth0Lock.show(params);//show界面
    });

    this.uiElements.logoutButton.click(function(e) {
      localStorage.removeItem('accessToken');//remove
      //隐藏和展示按钮
      that.uiElements.logoutButton.hide();
      that.uiElements.profileButton.hide();
      that.uiElements.loginButton.show();
    });

    //点击事件
    this.uiElements.profileButton.click(function(e) {
      var url = that.data.config.apiBaseUrl + '/user-profile';

      $.get(url, function(data, status) {

        alert(JSON.stringify(data));

        $('#user-profile-raw-json').text(JSON.stringify(data, null, 2));
        $('#user-profile-modal').modal();
      })
    });
  }
}