(function () {
  if (!window.chatbase || window.chatbase("getState") !== "initialized") {
    window.chatbase = (...args) => {
      if (!window.chatbase.q) {
        window.chatbase.q = [];
      }
      window.chatbase.q.push(args);
    };

    window.chatbase("init", {
      chatbotId: "GgmbpV6yFcp5a1CMvA5I1"
    });
  }
})();
