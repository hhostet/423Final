
new fullpage('#fullpage', {
  licenseKey: 'YOUR KEY HERE',
  sectionsColor: ['white', 'white', 'white', 'white'],
  anchors:['createUser', 'createHome', 'createTimes', 'createPrefs'],
	navigation: false,
});

document.addEventListener('aos:in', ({ detail }) => {
  console.log('animated in', detail);
});

document.addEventListener('aos:out', ({ detail }) => {
  console.log('animated out', detail);
});


AOS.init({
  duration:700,
  ease: "linear",
});

$('option').mousedown(function(e) {
  e.preventDefault();
  var originalScrollTop = $(this).parent().scrollTop();
  console.log(originalScrollTop);
  $(this).prop('selected', $(this).prop('selected') ? false : true);
  var self = this;
  $(this).parent().focus();
  setTimeout(function() {
      $(self).parent().scrollTop(originalScrollTop);
  }, 0);
  
  return false;
});

function addListeners() {
     $('nav a').click(function(e) {
      let btnID = e.currentTarget.id;
  
      if (btnID == 'siSubmit') {
        // This is for when you sign in with email password
        //   You would probably display the form here We are not doing anything with it now
        console.log('email');
      }
  
      if (btnID == 'suSubmit') {
        //   this is for google signin
        FIREBASE_MODEL.signinWithGoogle();
      }
  
      if (btnID == 'signout-google') {
        //   this is for google signin
        FIREBASE_MODEL.signOut();
      }

      if (btnID == "fpw") {
        FIREBASE_MODEL.sendResetPassword('hannahhostetter1@gmail.com');
      }

      if (btnID == "revSubmit") {

        FIREBASE_MODEL.revSubmit();
      }

      if (btnID == "estSubmit") {

        FIREBASE_MODEL.estSubmit();
      } 

    });
  

    //Sign Up User Click Listener
    $('#suSubmit').click(function(e) {
      console.log("user added");
      e.preventDefault();
      let fName = $('#sufName').val();
      let lName = $('#sulName').val();
      let phone = $('#suPhone').val();
      let email = $('#suEmail').val();
      let pw = $('#suPassword').val();
      let sqFt = $("#suSqFt").val();
      let brNum = $("#suBrNum").val();
      let baNum = $("#suBaNum").val();
      let prefDay = $('#prefDay').val();
      let unavaliableDay = $('#unavaliableDay').val();
      let timeOfDay = $('#timeOfDay').val();
      let prefClean = $('#prefClean').val();
      let specialServices = $('#specialServices').val();

      FIREBASE_MODEL.createAccount(email, pw, fName, lName, phone, sqFt, brNum, baNum, prefDay, unavaliableDay, timeOfDay, prefClean, specialServices);
      
      setTimeout(function(res) {
        window.location.href = 'login.html';
      }, 1200);
    });

    //review submit
    $('#revSubmit').click(function(e) {
      console.log("review added");
      e.preventDefault();
      let revFName = $('#revFName').val();
      let revRev = $('#revRev').val();

      FIREBASE_MODEL.revSubmit(revFName, revRev);
  
      setTimeout(function(res) {
            window.location.href = 'reviewConfirm.html';
      }, 1000);
  
    });
  
    $('#mesSubmit').click(function(e) {
      console.log("review added");
      e.preventDefault();
      let mesFName = $('#mesFName').val();
      let mesRev = $('#mesRev').val();

      FIREBASE_MODEL.mesSubmit(mesFName, mesRev);
  
      setTimeout(function(res) {
            window.location.href = 'reviewConfirm.html';
      }, 1000);
  
    });

    //estimate submit
    $('#estSubmit').click(function(e) {
      console.log("estimate added");
      e.preventDefault();
      let estFName = $('#estFName').val();
      let estLName = $('#estLName').val();
      let estEmail = $('#estEmail').val();
      let estPNumber = $('#estPNumber').val();
      FIREBASE_MODEL.estSubmit(estFName, estLName, estEmail, estPNumber);
  
      setTimeout(function(res) {
            window.location.href = 'estimateConfirm.html';
      }, 1200);
  
    });

    //sign in with email and passowrd submit
    $('#siSubmit').click(function(e) {
      e.preventDefault();
      let email = $('#siEmail').val();
      let pw = $('#siPassword').val();
  
      FIREBASE_MODEL.signInWithEP(email, pw);
    }); 

    $("#estimateView").on('click', '.deleteEstimate', function(e){
      console.log("delete clicked");
      var estimateKey = e.currentTarget.id;
 
       FIREBASE_MODEL.deleteEstimate(estimateKey);

       setTimeout(function(res) {
        window.location.reload(true); 
        alert("Estimate has been deleted");
  }, 1000);     
    });

    $("#messageView").on('click', '.deleteMessage', function(e){
      console.log("delete clicked");
      var messageKey = e.currentTarget.id;
 
       FIREBASE_MODEL.deleteMessage(messageKey);

       setTimeout(function(res) {
        window.location.reload(true); 
        alert("Message has been deleted");
  }, 1000);     
    });

    $("#userView").on('click', '.deleteUser', function(e){
      console.log("Delete user clicked");
      var userKey = e.currentTarget.id;
 
       FIREBASE_MODEL.deleteUser(userKey);

       setTimeout(function(res) {
        window.location.reload(true); 
        alert("user has been deleted");
    }, 1000);     
    });

    //Admin view user specs
    $("#userView").on('click', '.getUserData', function(e){
      console.log("clicked");
      let modalBtn = document.getElementById("modal-btn")
      let modal = document.querySelector(".modal")
      let closeBtn = document.querySelector(".close-btn")
    
      modalBtn.onclick = function(){
        modal.style.display = "block"
      }
      closeBtn.onclick = function(){
        modal.style.display = "none"
      }
      window.onclick = function(e){
        if(e.target == modal){
          modal.style.display = "none"
        }
      }
    });
  }

  FIREBASE_MODEL.getAllReviews();
  FIREBASE_MODEL.getAllEstimates();
  FIREBASE_MODEL.getAllUsers();
  FIREBASE_MODEL.getAllMessages();

  function initApp() {
    // add the data portion here or set up listeners
    addListeners();
  };
  
  $(document).ready(function() {
    initApp();
  });
  