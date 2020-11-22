var app =new Vue({
  el:'#app',
  data: {
    // GRAFICA APP (layout-desktop layout-contatti-mobile layout-chat-mobile)
    layoutApp: "layout-desktop",
    // MACROSEZIONE MAIN (start chat)
    schermataMaim: "chat",
    // SEZIONI (booleane)
    nav: false,
    contactsAlert: true,
    userInfo: true,
    contacts: true,
    chatInfo: true,
    // flags
    statoMain: ""
  },

  mounted: function () {
    this.$nextTick(function () {

      // GESTIONE STATI INIZIALI
      this.nav = false;
      this.schermataMaim = "start";
      app.statoMain = "start";

      if (document.documentElement.clientWidth <= 700) {
        app.mobileContacts();
      }

      // GESTIONE RESIZE
      // Mobile
      window.addEventListener('resize', function(){
        if (app.layoutApp !== "layout-chat-mobile") {
          app.mobileContacts();
        } else { //se sono in mobile e apro una chat
          app.showChat();
        }

      });

    })
  },

  methods: {

    mobileContacts: function () {
      if (document.documentElement.clientWidth <= 700 ) {
        app.layoutApp = "layout-contatti-mobile";
        app.schermataMaim = false;
        app.contactsAlert = false;
        app.nav = false;
      } else {
        app.layoutApp = "layout-desktop";
        app.schermataMaim = app.statoMain;
        app.contactsAlert = true;
        app.nav = false;
      }
    },

    showChat: function (){
      app.statoMain = "chat";
      // se clicco sui contatti
      if (document.documentElement.clientWidth > 700 ) {
        app.schermataMaim = "chat";
      } else {
        app.layoutApp = "layout-chat-mobile";
        app.nav = true;
        app.schermataMaim = "chat";
        app.contactsAlert = false;
        app.userInfo = false;
        app.contacts = false;
        app.chatInfo = false;
      }
      // Aggiungere la selezione della giusta chat
    }

  }


});
