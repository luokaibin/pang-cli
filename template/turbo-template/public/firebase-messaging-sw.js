
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.3.0/dist/pouchdb.min.js')


const configDev = {
  apiKey: "AIzaSyB9ATSPEaf5An7LjaRYf7v1oYPdjngKB8o",
  authDomain: "kiki-message-dev.firebaseapp.com",
  databaseURL: "https://kiki-message-dev.firebaseio.com",
  projectId: "kiki-message-dev",
  storageBucket: "kiki-message-dev.appspot.com",
  messagingSenderId: "311695539840",
  appId: "1:311695539840:web:23eccaa54a2d288f363065",
  measurementId: "G-4QLJ9HJTHV"
};

const configBeta = {
  apiKey: 'AIzaSyAkNt4CWe2RANTzjS9NkM8q5vrPZXcrlkQ',
  authDomain: 'kiki-beta.firebaseapp.com',
  databaseURL: 'https://kiki-beta.firebaseio.com',
  projectId: 'kiki-beta',
  storageBucket: 'kiki-beta.appspot.com',
  messagingSenderId: '983830855482',
  appId: '1:983830855482:web:dbf16766eb95ee48f89a03',
  measurementId: 'G-X286KB4WVQ'
};

const configProd = {
  apiKey: 'AIzaSyDCjzMo4G31pzqcazwfgiV4OQx6J7BXq20',
  authDomain: 'kiki-message-prod.firebaseapp.com',
  databaseURL: 'https://kiki-message-prod.firebaseio.com',
  projectId: 'kiki-message-prod',
  storageBucket: 'kiki-message-prod.appspot.com',
  messagingSenderId: '389380007773',
  appId: '1:389380007773:web:d779671807612af620eab4',
  measurementId: 'G-8LRHTQ88BC'
};

const db = new PouchDB('kiki_bulletin')

const addData = async ({id, title, body, createTime, isRead}) => {
  try {
    const res = await db.put({
      _id: id,
      title,
      body,
      createTime,
      isRead
    })
    return res
  } catch (error) {
    console.log('error: ', error)
  }
}

let config = configDev
if(location.host.indexOf('kikitrade.com') !== -1){
  config = configProd
}


firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  addData({
    id: payload.collapseKey,
    title: payload.notification.title,
    body: payload.notification.body,
    createTime: payload.data['google.c.a.ts'],
    isRead: false
  })

  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/favicon.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);

  self.addEventListener('notificationclick', function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
    let id = ''
    try {
      if (payload.data.route === 'TopicDetail') {
        id = JSON.parse(payload.data.routeParams).item.id
        clients.openWindow('https://webbeta.kikitrade.com/zh-TC/post/' + id);
      }
    } catch (e) {
      clients.openWindow('https://webbeta.kikitrade.com')
    }
    
    console.log(event.notification)
  });

});
