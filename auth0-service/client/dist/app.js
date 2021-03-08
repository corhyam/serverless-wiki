/* global window document localStorage fetch alert */

// Fill in with your values
const AUTH0_CLIENT_ID = 'o1EOkablAkt1UrOvkvALQCW4xVrHJ4hv';
const AUTH0_DOMAIN = 'corhyam.jp.auth0.com';
const AUTH0_CALLBACK_URL = 'corhyam.xyz'  //window.location.href;
const PUBLIC_ENDPOINT = 'https://p9f8ud460c.execute-api.us-east-1.amazonaws.com/dev/api/public';
const PRIVATE_ENDPOINT = 'https://p9f8ud460c.execute-api.us-east-1.amazonaws.com/dev/api/private';


// initialize auth0 lock
const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN); // create object

const jwtToken = localStorage.getItem('userToken');
if (jwtToken) {
  document.getElementById('btn-login').style.display = 'none';
  document.getElementById('btn-logout').style.display = 'inline';
  const profile = JSON.parse(localStorage.getItem('profile'));
  document.getElementById('nick').textContent = profile.nickname;
}

// Handle login
document.getElementById('btn-login').addEventListener('click', () => {
  lock.show((err, profile, token) => {                    // lock.show 方法将调出 Auth0 的登录页面
    if (err) {
      // Error callback
      console.error('Something went wrong: ', err);
      alert('Something went wrong, check the Console errors');
    } else {
      // Success callback
      console.log(token);

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      localStorage.setItem('profile', JSON.stringify(profile));

      document.getElementById('btn-login').style.display = 'none';
      document.getElementById('btn-logout').style.display = 'flex';
      document.getElementById('nick').textContent = profile.nickname;
    }
  });
});

// Handle logout
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('profile');
  document.getElementById('btn-login').style.display = 'flex';
  document.getElementById('btn-logout').style.display = 'none';
  document.getElementById('nick').textContent = '';
});

// Handle public api call
document.getElementById('btn-public').addEventListener('click', () => {
  // call public API
  const getdata = fetch(PUBLIC_ENDPOINT, {
    method: 'GET',
    cache: 'no-store',
  });

  getdata.then((response) => {
    response.json().then((data) => {
      console.log('Message:', data);
      document.getElementById('message').textContent = '';
      document.getElementById('message').textContent = data.message;
    });
  });
});

// Handle private api call
document.getElementById('btn-private').addEventListener('click', () => {
  // Call private API with JWT in header
  const token = localStorage.getItem('userToken');
  if (!token) {
    document.getElementById('message').textContent = '';
    document.getElementById('message').textContent = 'You must login to call this protected endpoint!';
    return false;
  }
  const getdata = fetch(PRIVATE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`, //借口认证方式，token必须使用 Bearer Token（Token 令牌） 方式，使用该方式头部会多一个 authorization
    },
    method: 'GET',
    cache: 'no-store',
  });

  getdata.then((response) => {
    response.json().then((data) => {
      console.log('Token:', data);
      document.getElementById('message').textContent = '';
      document.getElementById('message').textContent = data.message;
    });
  });
  // bc linting...
  return false;
});
