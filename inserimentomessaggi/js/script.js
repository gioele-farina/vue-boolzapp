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
    utenteAttivo: "",

    messaggioInserito: "",
    cerca: "",

    // DATI
    meInfo: {
      avatar: "img/avatar_io.jpg",
      ultimoAcceso: "Ora",
      nome: "Alberto",
      cognome: "Gian Giangela"
    },

    contatti: [
      {
        nome: "Luca",
        cognome: "Giurato",
        avatar: "img/avatar_1.jpg",
        ultimoAcceso: "22/11/20 17:25",
        chat:
          [
            {
              messaggio : "",
              mittente: "msgCookie",
              data: ""
            },
            {
              messaggio : "Ho voluto citare Padeo Scoppia. L'arte non è acqua. Secondo me CapaPezza sbaglia.",
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
        attivo: false,
        ultimoRicevuto: {},
        visibile: true
      },

      {
        nome: "Capa",
        cognome: "Rezza",
        avatar: "img/avatar_2.jpg",
        ultimoAcceso: "20/11/20 23.52",
        chat:
          [
            {
              messaggio : "",
              mittente: "msgCookie",
              data: ""
            },
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
        attivo: false,
        ultimoRicevuto: {},
        visibile: true
      },

      {
        nome: "Bruno",
        cognome: "Liegi Bastonliegi",
        avatar: "img/avatar_3.jpg",
        ultimoAcceso: "20/11/20 23.52",
        chat:
          [
            {
              messaggio : "",
              mittente: "msgCookie",
              data: ""
            },
            {
              messaggio : "Hanno catturato Maccio, Alberto! Dobbiamo fare qualcosa!",
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
              data: "19/11/20 16:55"
            },
            {
              messaggio : ";)",
              mittente: "inviato",
              data: "19/11/20 16:56"
            }
          ],
        attivo: false,
        ultimoRicevuto: {},
        visibile: true
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

      //Controllo quali sono gli ultimi messaggi ricevuti di ogni contatto
      // per calcolarmi l'ultimo accesso
      app.contatti.forEach((contatto, i) => {
        let soloRicevuti = contatto.chat.filter((messaggio) => {
          if (messaggio.mittente === "ricevuto") {
            return messaggio;
          }
        });
        contatto.ultimoRicevuto = soloRicevuti[soloRicevuti.length - 1];
      });

      // per ogni contatto assegno a ultimoAcceso il valore di ultimoRicevuto.data
      app.contatti.forEach((contatto, i) => {
        contatto.ultimoAcceso = contatto.ultimoRicevuto.data;
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

    // gestisce il layout della chat
    showChat: function (){
      app.statoMain = "chat";
      // se clicco sui contatti
      if (document.documentElement.clientWidth <= 700 ) {
        app.layoutChatMobile();
      } else {
        app.layoutDesktop();
      }

    },

    // seleziona la chat corrente
    selectChat: function(indiceContatto){
      app.utenteAttivo = app.contatti[indiceContatto];
      // setto su false attivo per tutti i contatti
      app.contatti.forEach((contatto, i) => {
        contatto.attivo = false;
      });
      // setto su true attivo per il contatto corrente
      app.utenteAttivo.attivo = true;
    },

    mobileBackToContacts: function(){
      app.layoutMobileContacts();
      // setto su false attivo per tutti i contatti
      app.contatti.forEach((contatto, i) => {
        contatto.attivo = false;
      });
    },

    ottieniData: function() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth(); mm++;
      let yyyy = today.getFullYear();
      let hh = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();
      let dataEstesa = `${dd}/${mm}/${yyyy} ${hh}:${minutes}`;
      return dataEstesa;
    },

    scrivi: function(){
      if (app.messaggioInserito !== "") {
        // inserisco il nuovo messaggio
        let messaggio =
        {
          messaggio: app.messaggioInserito,
          mittente: "inviato",
          data: app.ottieniData()
        };
        app.$set(app.utenteAttivo.chat, app.utenteAttivo.chat.length, messaggio);
        // pulisco il prompt
        app.messaggioInserito = "";

        // avvio risposta automatica
        app.riceviRisposta();
      }
    },

    riceviRisposta: function(){
      let utenteAttivoRisposta = app.utenteAttivo;
      let testo;
      // Luca Giurato risposta
      if (utenteAttivoRisposta.cognome === "Giurato") {
        let ripostaRandom = Math.floor(Math.random() * 10) + 1;
        switch(ripostaRandom) {
          case 1:
            testo = "A pra foco!";
            break;
          case 2:
            testo = "A parole siamo tutti bravi";
            break;
          case 3:
            testo = "Buona fine di inizio settimana";
              break;
          case 4:
            testo = "Date una demaglia a quest'uomo";
            break;
          case 5:
            testo = "Ciancio alle bande";
            break;
          case 6:
            testo = "Buongiollo";
            break;
          case 7:
            testo = "Ghiazze della caiezza";
              break;
          case 8:
            testo = "Benvenuti a tutte le amiche telespettatrici e agli amici telespettatroci";
            break;
          case 9:
            testo = "C'è qualquadra che non cosa";
            break;
          case 10:
            testo = "Un saloroso caluto a tutti!";
            break;
        }
      } else {
        testo = "ok";
      }

      let attesa = Math.floor(Math.random() * 6) + 1;
      utenteAttivoRisposta.ultimoAcceso = `${utenteAttivoRisposta.nome} sta scrivendo...`
      setTimeout(function(){
        // Genero e inserisco il messaggio
        let messaggio =
        {
          messaggio: testo,
          mittente: "ricevuto",
          data: app.ottieniData()
        };
        app.$set(utenteAttivoRisposta.chat, utenteAttivoRisposta.chat.length, messaggio);

        // Cambio data accesso utente attivo
        utenteAttivoRisposta.ultimoAcceso = app.ottieniData();
      }, attesa*1000);
    },

    cercaFunction: function(){
      // per ogni contatti cerca nel nome e nel cognome se è contenuta la substringa
      app.contatti.forEach((contatto, i) => {
        let stringa = app.cerca;
        let nome = `${contatto.nome} ${contatto.cognome}`
        // rendo tutto lowercase per il controllo
        stringa = stringa.toLowerCase();
        nome = nome.toLowerCase();

        if (nome.includes(stringa)) {
          contatto.visibile = true;
        } else {
          contatto.visibile = false;
        }
      });
    },

    deleteMessage: function(index){
      app.$delete(app.utenteAttivo.chat, index);
    }

  }


});
