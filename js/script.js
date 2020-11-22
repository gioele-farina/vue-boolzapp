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
    // STATI DEL LAYOUT
    layoutMobileContacts: function(){
      app.layoutApp = "layout-contatti-mobile";
      app.schermataMaim = false;
      app.contactsAlert = false;
      app.nav = false;

      app.userInfo = true;
      app.contacts = true;
      app.chatInfo = false;

    },

    layoutChatMobile: function(){
      app.layoutApp = "layout-chat-mobile";
      app.nav = true;
      app.schermataMaim = "chat";
      app.contactsAlert = false;
      app.userInfo = false;
      app.contacts = false;
      app.chatInfo = false;
    },

    layoutDesktop: function(){
      app.layoutApp = "layout-desktop";
      app.schermataMaim = app.statoMain;
      app.contactsAlert = true;
      app.nav = false;
      app.userInfo = true;
      app.contacts = true;
      app.chatInfo = true;
    },

    // AZIONI SUL LAYOUT
    mobileContacts: function () {
      // Mostra versione mobile se necessario o ritorna a come prima
      if (document.documentElement.clientWidth <= 700 ) {
        app.layoutMobileContacts();
      } else {
        app.layoutDesktop();
      }
    },

    showChat: function (){
      app.statoMain = "chat";
      // se clicco sui contatti
      if (document.documentElement.clientWidth <= 700 ) {
        app.layoutChatMobile();
      } else {
        app.layoutDesktop();
      }

      // Aggiungere la selezione della giusta chat
    },

    mobileBackToContacts: function(){
      app.layoutMobileContacts();
    }

  }


});
