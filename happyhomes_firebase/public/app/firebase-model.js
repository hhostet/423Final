var FIREBASE_MODEL = (function() {
    // you need to input code here
    var db = firebase.firestore();
    var firebaseConfig = {
      apiKey: "AIzaSyC68C3bQ-yx9Pqm2uXa023wh6GPieF3Ups",
      authDomain: "happy-homes-b86f2.firebaseapp.com",
      databaseURL: "https://happy-homes-b86f2.firebaseio.com",
      projectId: "happy-homes-b86f2",
      storageBucket: "happy-homes-b86f2.appspot.com",
      messagingSenderId: "417423866664",
      appId: "1:417423866664:web:8313f1d761fa4db6f02e1d",
      measurementId: "G-YBF6KJCJGH"
    };

    function authStateObserver(user) {
      var user = firebase.auth().currentUser;
      if (user) {
        $('#user-name').removeAttr('hidden');
        $('#user-name').append(`    
        <div class="proHero">
              <h2>Welcome ${user.email} </h2>
              <br>
              <p class="heroTwoPara"> 
                  You are currently scheduled for a <b>Biweekly</b> clean on <b>Thursday Afternoons</b>.
              </p>
              <!-- <button id="proButton">Edit Preferences</button>
              <button id="proButton">View Preferences</button>
              <button id="proButton">Send a Message</button> -->
              <br>
              <p>Call or text <b>317-459-3535</b> for inquiries.</p>
            </div>
            <div class="homeBody">
              <div style="text-align: center" class="itemOne">
                  <h2>Love Our Work?</h2>
                  <h4>We Do Too!</h4>
                  <p class="soloutionP">
                      As a local business, we love to hear your support.
                  </p>
                  <button onclick="location.href = 'createReview.html';" id="proButton">Write a Review</button>
              </div>
              <div style="text-align: center" class="itemOne">
                  <h2>Have an Issue?</h2>
                  <h4>We are Dedicated to a Spotless Clean.</h4>
                  <p class="soloutionP">
                      If you aren’t satisfied let us know and we’ll be glad resolve your concerns!
                  </p>
                  <button  onclick="location.href = 'message.html';" id="proButton">Send a Message</button>
              </div>
          </div> 
          `);
        $('#signin-google').attr('hidden', true);
        $('#signout-google').removeAttr('hidden');
        $('#userProfile').removeAttr('hidden');
        $('#loginPage').attr('hidden', true);
      } else {
        console.log('no user');
        $('#user-name').attr('hidden', true);
        $('#user-name').empty(true);
        $('#signin-google').removeAttr('hidden');
        $('#signout-google').attr('hidden', true);
        $('#userProfile').attr('hidden', true);
        $('#loginPage').removeAttr('hidden');
      }
    }
  
    function initFirebaseAuth() {
      // Listen to auth state changes.
      firebase.auth().onAuthStateChanged(authStateObserver);
    }
  
    var _createAccount = function(email, pw, fName, lName, phone, sqFt, brNum, baNum, prefDay, unavaliableDay, timeOfDay, prefClean, specialServices) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pw)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ' ' + errorMessage);
        })
        .then(function(res) {
          return firebase
            .firestore()
            .collection('users')
            .doc(res.user.uid)
            .set({
              displayName: fName + ' ' + lName,
              email: email,
              phone: phone,
              timestamp:
              firebase.firestore.FieldValue.serverTimestamp(),
              homeInfo: {
                sqFt: sqFt,
                brNum: brNum,
                baNum: baNum
              },
              homePrefs: {
                prefDay: prefDay,
                unavaliableDay: unavaliableDay,
                timeOfDay: timeOfDay,
                prefClean: prefClean,
                specialServices: specialServices
              }
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
              $('.error').html(errorMessage);
              alert("Oops! There was an error creating your account, try looking over your sign up form and trying again.");
            })
        });
    };

    var _signIn= function(email, pw) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pw)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ' ' + errorMessage);
        })
        .then(function(uid) {
          console.log(uid);
        });    
    };
  
    var _signOut = function() {
      firebase.auth().signOut();
    };
  
    var _sendResetPassword = function(emailAddress) {
      let auth = firebase.auth();
      auth
        ._sendResetPassword(emailAddress)
        .then (function() {
          console.log('email sent');
        })
        .catch(function(error){
          console.log(error);
        });     
    };
  
    var _getAllData = function() {
      console.log("data works");
      var query = firebase
       .firestore() 
       .collection('users/') 
       .doc(res.user.uid)
       .orderBy('displayName') 
       .limit(12); // Start listening to the query. 
       query.onSnapshot(function(snapshot) {
         snapshot.docChanges()
         .forEach(function(doc) { 
            console.log(doc.id, " => ", doc.data());
         }); 
       }); 
     }

    var _revSubmit = function(revFName, revRev){
      console.log("review submitted to database!");
      firebase
      .firestore()
      .collection('reviews')
      .doc(revRev)
      .set({
        revFName: revFName,
        revRev: revRev
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $('.error').html(errorMessage);
      });
    }
  
    var _mesSubmit = function(mesFName, mesRev){
      console.log("review submitted to database!");
      firebase
      .firestore()
      .collection('messages')
      .doc(mesRev)
      .set({
        mesFName: mesFName,
        mesRev: mesRev
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $('.error').html(errorMessage);
      });
    }
  

    var _estSubmit = function(estFName, estLName, estEmail, estPNumber){
      console.log("estimate submitted to database!");
      firebase
      .firestore()
      .collection('estimates')
      .doc(estPNumber)
      .set({
        estFName: estFName,
        estLName: estLName,
        estEmail: estEmail,
        estPNumber: estPNumber
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        $('.error').html(errorMessage);
      });
    }

    var _getAllReviews = function(){
      console.log("Working init");
       firebase
        .firestore()
        .collection("reviews")
        .get()
        .then(snapshot =>{
          snapshot.forEach(doc => {
            var revFName = doc.data().revFName;
            var revRev = doc.data().revRev;
             $('#reviewView').append(`
             <p class="ReviewPara"> 
              <i>
                  "${revRev}"
              </i>
              <br>
            
                ${revFName}
              
            </p>
            
            `
            ); 
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          $('.error').html(errorMessage);
        });
    }

    var _getAllMessages = function(){
      console.log("Working init");
       firebase
        .firestore()
        .collection("messages")
        .get()
        .then(snapshot =>{
          snapshot.forEach(doc => {
            var mesFName = doc.data().mesFName;
            var mesRev = doc.data().mesRev;
             $('#messageView').append(`
             <p class="ReviewPara"> 
              <i>
                  "${mesRev}"
              </i>
              <br>
            
                ${mesFName}
                <button class="deleteMessage" id="${mesRev}" style="float:right"> <i style="font-size: 2em; color: tomato;" class="fas fa-window-close"></i> </button>
            </p>
           
            `
            ); 
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          $('.error').html(errorMessage);
        });
    }

    //estFName, estLName, estEmail, estPNumber
    var _getAllEstimates = function(){
      console.log("Working init Estimates");
       firebase
        .firestore()
        .collection("estimates")
        .get()
        .then(snapshot =>{
          snapshot.forEach(doc => {
            var estFName = doc.data().estFName;
            var estLName = doc.data().estLName;
            var estEmail = doc.data().estEmail;
            var estPNumber = doc.data().estPNumber;
             $('#estimateView').append(`
             <p class="estPara"> 
                  ${estFName} ${estLName}
                  <br>
                  ${estEmail}
                  <br>
                  ${estPNumber}
                  <button class="deleteEstimate" id="${estPNumber}" style="float:right"> <i style="font-size: 2em; color: tomato;" class="fas fa-window-close"></i> </button>
            </p>
            `
            ); 
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          $('.error').html(errorMessage);
        });
    }

    var _getAllUsers = function(res){
      var user = firebase.auth().currentUser;
      console.log("Working init Users");
       firebase
        .firestore()
        .collection("users")
        .get()
        .then(snapshot =>{
          snapshot.forEach(doc => {
            var displayName= doc.data().displayName;
            var email = doc.data().email;
            var phone = doc.data().phone;
            var sqFt = doc.data().sqFt;
            var brNum = doc.data().brNum;
            var baNum = doc.data().baNum;
            var prefDay = doc.data().homePrefs.prefDay;
            var unavaliableDay = doc.data().homePrefs.unavaliableDay;
            var timeOfDay = doc.data().homePrefs.timeOfDay;
            var prefClean = doc.data().homePrefs.prefClean;
            var specialServices = doc.data().homePrefs.specialServices;
             $('#userView').append(`
             <p class="estPara"> 
                  ${displayName}
                  <br>
                  ${email}
                  <br>
                  ${phone}
                  <button class="getUserData" id="modal-btn" style="float:right"> <i style="font-size: 2em; color: #4B4B4B;" class="fas fa-angle-right"></i> </button>
            </p>
            <div class="modal">
              <div class="modal-content">
                <span class="close-btn">&times;</span> 
                <div>
                  <h3>${displayName}</h3>
                  <h3>${phone}</h3>
                </div>
                <br>
                <div class="profileInfo">
                    <div class="profileMain">
                            <h4>Availability</h4>
                            <br>
                            <div>
                                <div class="profileTitle">Preferred Cleaning Days<hr></div>
                                <ul>
                                    <li style="float: left">
                                        ${prefDay}
                                    </li>
                                    <br>
                                </ul>
                            </div>
                            <br>
                            <div>
                                <div class="profileTitle">Preferred Time<hr></div>
                                <div>${timeOfDay}</div>
                            </div>
                            <br>
                            <div>
                                <div class="profileTitle">Unavaliable Cleaning Days<hr></div>
                                <ul style="float: left">
                                    <li style="float: left">
                                        ${unavaliableDay}
                                    </li>
                                    <br> 
                                </ul>
                            </div>
                    </div>
                    <!-- COL 3 Clean -->
                    <div class="profileClean">
                        <h4>Cleaning</h4>
                        <br>
                        <div>
                            <div class="profileTitle">Main Focus<hr></div>
                            <ul>
                                <li style="float: left">
                                    ${prefClean}
                                </li>
                                <br>
                            </ul>
                        </div>
                        <br>
                        <div>
                            <div class="profileTitle">Specality Services<hr></div>
                            <ul>
                                    <li style="float: left">
                                        ${specialServices}
                                    </li>
                                    <br>
                                </ul>
                        </div>
                    </div>
                          </div>
                        </div>

            `
            ); 
          });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          $('.error').html(errorMessage);
        });
    }

    var _deleteEstimate = function(estimateKey){
      firebase 
      .firestore()
      .collection("estimates/")
      .doc(estimateKey)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }

    var _deleteMessage = function(messageKey){
      firebase 
      .firestore()
      .collection("messages/")
      .doc(messageKey)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }

    initFirebaseAuth();
    return {
      signOut: _signOut,
      createAccount: _createAccount,
      signInWithEP: _signIn,
      sendResetPassword: _sendResetPassword,
      getAllData : _getAllData,
      revSubmit : _revSubmit,
      mesSubmit: _mesSubmit,
      estSubmit: _estSubmit,
      getAllReviews: _getAllReviews,
      getAllEstimates: _getAllEstimates,
      getAllMessages: _getAllMessages,
      deleteEstimate: _deleteEstimate,
      deleteMessage: _deleteMessage,
      getAllUsers: _getAllUsers
    };
  }) ();
  