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
    statoMain: "",

    // DATI
    meInfo: {
      avatar: "img/avatar_io.jpg",
      ultimoAcceso: "Ora", //poi prendo il dato da funzione data
      nome: "Alberto",
      cognome: "Gian Giangela"
    },

    contatti: [
      {
        idUnivoco: "000000", //forse non mi serve
        nome: "Capa",
        cognome: "Rezza",
        avatar: "img/avatar_1.jpg",
        ultimoAcceso: "20/11/20 23.52",
        chat:
          [
            {
              messaggio : "Ciao ho sentito il tuo disco. E' assolutamente ridicolo. Non mi scrivere mai più.",
              mittente: "ricevuto",
              data: "19/11/20 16:48"
            },
            {
              messaggio : "Secondo me sei solo invidioso.",
              mittente: "inviato",
              data: "19/11/20 16:49"
            },
            {
              messaggio : "Puzzi",
              mittente: "ricevuto",
              data: "19/11/20 16:48"
            },
            {
              messaggio : "Hai ragione",
              mittente: "inviato",
              data: "19/11/20 16:50"
            },
            {
              messaggio : ":(",
              mittente: "inviato",
              data: "19/11/20 16:50"
            }
          ],
        attivo: false
      },

      {
        idUnivoco: "000000", //forse non mi serve
        nome: "Luca",
        cognome: "Giurato",
        avatar: "img/avatar_2.jpg",
        ultimoAcceso: "22/11/20 17:25",
        chat:
          [
            {
              messaggio : "“Ho voluto citare Padeo Scoppia. L'arte non è acqua. Secondo me CapaPezza sbaglia.",
              mittente: "ricevuto",
              data: "19/11/20 16:48"
            },
            {
              messaggio : "Grazie Luca!",
              mittente: "inviato",
              data: "19/11/20 16:49"
            },
            {
              messaggio : "La fasta è rigorosamente fatta al luogo quella fresca.",
              mittente: "ricevuto",
              data: "19/11/20 16:48"
            },
          ],
        attivo: false
      },

      {
        idUnivoco: "000000", //forse non mi serve
        nome: "Bruno",
        cognome: " Liegi Bastonliegi",
        avatar: "img/avatar_2.jpg",
        ultimoAcceso: "20/11/20 23.52",
        chat:
          [
            {
              messaggio : "Hanno catturato Maggio, Alberto! Dobbiamo fare qualcosa!",
              mittente: "ricevuto",
              data: "19/11/20 16:48"
            },
            {
              messaggio : "Ricevuto, chiamo la squadra",
              mittente: "inviato",
              data: "19/11/20 16:49"
            },
            {
              messaggio : ";)",
              mittente: "ricevuto",
              data: "19/11/20 16:48"
            },
            {
              messaggio : ";)",
              mittente: "inviato",
              data: "19/11/20 16:50"
            }
          ],
        attivo: false
      }

    ]

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
