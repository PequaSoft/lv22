    importScripts(
      'https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyCrnGv6B84MupbzLkLou8-3_SHW9J8pUME","authDomain":"notify1-951fa.firebaseapp.com","projectId":"notify1-951fa","storageBucket":"notify1-951fa.appspot.com","messagingSenderId":"1037685265768","appId":"1:1037685265768:web:43a5e79595c813833df2dd","databaseURL":"https:\u002F\u002FdatabaseName.firebaseio.com","measurementId":"G-9NEZ1H1Y09"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

    self.addEventListener('push', function (e) {
    data = e.data.json();
    var options = {
    body: data.notification.body,
    icon: data.notification.icon,
    vibrate: [100, 50, 100],
    data: {
    dateOfArrival: Date.now(),
    primaryKey: '2'
    },
    };
    e.waitUntil(
      self.registration.showNotification(data.notification.title, options)
    );
    });

    