var app =new Vue({
  el:'#app',
  data: {
    // GRAFICA APP (layout-desktop layout-contatti-mobile layout-chat-mobile)
    layoutApp: "layout-desktop",
    // MACROSEZIONE MAIN (start chat)
    schermataMaim: "chat",
    // SEZIONI (booleane)
    nav: true,
    contactsAlert: true,
    userInfo: true,
    contacts: true,
    chatInfo: true
  },

  mounted: function () {
    this.$nextTick(function () {
      this.nav = false;
      // this.schermataMaim = "start";
    })
  },

  methods: {

  }
});
