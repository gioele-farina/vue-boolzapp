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
    chatInfo: true
  },

  mounted: function () {
    this.$nextTick(function () {

      // GESTIONE STATI INIZIALI
      this.nav = false;
      // this.schermataMaim = "start";

      if (document.documentElement.clientWidth <= 700) {
        app.mobileContacts();
      }

      // GESTIONE RESIZE
      // Mobile
      window.addEventListener('resize', function(){
        app.mobileContacts();
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
        app.schermataMaim = "chat";
        app.contactsAlert = true;
        app.nav = false;
      }
    }
  }


});
