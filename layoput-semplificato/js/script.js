var app =new Vue({
  el:'#app',
  data: {
    // FLAGS LAYOUT
    schermataMaim: "", //start o chat
    mobileView: "", //contatti-mobile o chat-mobile
    smiles: false,
    fullScreenAvatar: false,
    imgShowed: "",

    // flags
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
        ultimoAcceso: "22/11/2020 17:25",
        chat:
          [
            {
              messaggio : "",
              mittente: "msgCookie",
              data: "",
              showMenu: false
            },
            {
              messaggio : "Ho voluto citare Padeo Scoppia. L'arte non è acqua. Secondo me CapaPezza sbaglia.",
              mittente: "ricevuto",
              data: "19/11/2020 16:48",
              showMenu: false
            },
            {
              messaggio : "Grazie Luca!",
              mittente: "inviato",
              data: "19/11/2020 16:49",
              showMenu: false
            },
            {
              messaggio : "La fasta è rigorosamente fatta al luogo quella fresca.",
              mittente: "ricevuto",
              data: "19/11/2020 16:48",
              showMenu: false
            },
          ],
        attivo: false,
        ultimoRicevuto: {},
        visibile: true,
        inElenco: true
      },

      {
        nome: "Capa",
        cognome: "Rezza",
        avatar: "img/avatar_2.jpg",
        ultimoAcceso: "20/11/2020 23.52",
        chat:
          [
            {
              messaggio : "",
              mittente: "msgCookie",
              data: "",
              showMenu: false
            },
            {
              messaggio : "Ciao ho sentito il tuo disco. E' assolutamente ridicolo. Non mi scrivere mai più.",
              mittente: "ricevuto",
              data: "19/11/2020 16:48",
              showMenu: false
            },
            {
              messaggio : "Secondo me sei solo invidioso.",
              mittente: "inviato",
              data: "19/11/2020 16:49",
              showMenu: false
            },
            {
              messaggio : "Puzzi",
              mittente: "ricevuto",
              data: "19/11/2020 16:48",
              showMenu: false
            },
            {
              messaggio : "Hai ragione",
              mittente: "inviato",
              data: "19/11/2020 16:50",
              showMenu: false
            },
            {
              messaggio : ":(",
              mittente: "inviato",
              data: "19/11/2020 16:50",
              showMenu: false
            }
          ],
        attivo: false,
        ultimoRicevuto: {},
        visibile: true,
        inElenco: true
      },

      {
        nome: "Bruno",
        cognome: "Liegi Bastonliegi",
        avatar: "img/avatar_3.jpg",
        ultimoAcceso: "20/11/2020 23.52",
        chat:
          [
            {
              messaggio : "",
              mittente: "msgCookie",
              data: "",
              showMenu: false
            },
            {
              messaggio : "Hanno catturato Maccio, Alberto! Dobbiamo fare qualcosa!",
              mittente: "ricevuto",
              data: "19/11/2020 16:48",
              showMenu: false
            },
            {
              messaggio : "Ricevuto, chiamo la squadra",
              mittente: "inviato",
              data: "19/11/2020 16:49",
              showMenu: false
            },
            {
              messaggio : ";)",
              mittente: "ricevuto",
              data: "19/11/2020 16:55",
              showMenu: false
            },
            {
              messaggio : ";)",
              mittente: "inviato",
              data: "19/11/2020 16:56",
              showMenu: false
            }
          ],
        attivo: false,
        ultimoRicevuto: {},
        visibile: true,
        inElenco: true
      },

      {
        nome: "Jessico",
        cognome: "Calcetto",
        avatar: "img/avatar_4.jpg",
        ultimoAcceso: "24/11/2020 00.52",
        chat:
          [
            {
              messaggio : "",
              mittente: "msgCookie",
              data: "",
              showMenu: false
            }
          ],
        attivo: false,
        ultimoRicevuto: {},
        visibile: true,
        inElenco: false
      }

    ]

  },

  mounted: function () {
    this.$nextTick(function () {

      // GESTIONE STATI INIZIALI
      this.schermataMaim = "start";
      this.mobileView = "contatti-mobile";

      //Controllo quali sono gli ultimi messaggi ricevuti di ogni contatto
      // per calcolarmi l'ultimo accesso
      app.contatti.forEach((contatto, i) => {
        let soloRicevuti = contatto.chat.filter((messaggio) => {
          if (messaggio.mittente === "ricevuto") {
            return messaggio;
          }
        });
        if (soloRicevuti.length > 0) {
          contatto.ultimoRicevuto = soloRicevuti[soloRicevuti.length - 1];
        } else {
          contatto.ultimoRicevuto = ""; //per le chat vuote
        }
      });

      // per ogni contatto assegno a ultimoAcceso il valore di ultimoRicevuto.data
      app.contatti.forEach((contatto, i) => {
        contatto.ultimoAcceso = contatto.ultimoRicevuto.data;
      });


    })
  },

  methods: {
    // gestisce il layout della chat
    showChat: function (){
      app.schermataMaim = "chat";
    },

    showChatMobile: function (){
      app.mobileView = "chat-mobile";
      // tengo sempre scrollato in basso
      app.scrollInBasso();
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

      // avvio la chat direttamente dal fondo
      app.scrollInBasso();
    },

    mobileBackToContacts: function(){
      app.mobileView = "contatti-mobile";
      // setto su false attivo per tutti i contatti
      app.contatti.forEach((contatto, i) => {
        contatto.attivo = false;
      });
    },

    ottieniData: function() {

      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      let today = new Date();
      let dd = addZero(today.getDate());
      let mm = today.getMonth(); mm++ ; mm = addZero(mm);
      let yyyy = addZero(today.getFullYear());
      let hh = addZero(today.getHours());
      let minutes = addZero(today.getMinutes());
      let seconds = addZero(today.getSeconds());
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
          data: app.ottieniData(),
          showMenu: false
        };
        app.$set(app.utenteAttivo.chat, app.utenteAttivo.chat.length, messaggio);
        // pulisco il prompt
        app.messaggioInserito = "";

        // se il contatto della chat non era in elenco ce lo mette
        if (app.utenteAttivo.inElenco === false) {
          app.utenteAttivo.inElenco = true;
        }

        // avvio risposta automatica
        app.riceviRisposta();

        // tengo sempre scrollato in basso
        app.scrollInBasso();
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
          data: app.ottieniData(),
          showMenu: false
        };
        app.$set(utenteAttivoRisposta.chat, utenteAttivoRisposta.chat.length, messaggio);

        // Cambio data accesso utente attivo
        utenteAttivoRisposta.ultimoAcceso = app.ottieniData();

        // tengo sempre scrollato in basso
        app.scrollInBasso();
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
    },

    showMenu: function(index){
      app.utenteAttivo.chat[index].showMenu = true;
    },

    closeMenu: function(){
      app.contatti.forEach((contatto, i) => {
        contatto.chat.forEach((message, i) => {
          message.showMenu = false;
        });
      });
    },

    scrollInBasso: function() {
      setTimeout(function(){
        let chat = document.getElementById("chat");
        chat.scrollTop = chat.scrollHeight;
      }, 1);
    },

    showSmiles: function(){
      this.smiles = !(this.smiles);
    },

    mostraAvatar: function () {
      this.fullScreenAvatar = true;
      this.imgShowed = this.utenteAttivo.avatar;
    },

    mostraMyAvatar:  function () {
      this.fullScreenAvatar = true;
      this.imgShowed = this.meInfo.avatar;
    },

    closeDisplayAvatar:  function () {
      this.fullScreenAvatar = false;
      this.imgShowed = "";
    }

  }
});
