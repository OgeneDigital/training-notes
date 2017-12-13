var blogLoader = (function () {
  return {
    init: function () {
      blogLoader.attach();
    },

    attach: function () {
      var loader = document.querySelector('.load-more');
      if (loader) {
        loader.addEventListener('click', blogLoader.load);
      }
    },

    load: function (event) {
      try {
        fetch(event.target.href)
          .then(response => response.text())
          .then(response => Promise.resolve(response.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "" )))
          .then(response => {
            var results = document.createElement('div');
            results.innerHTML = response;

            var foundPosts = results.querySelector('.posts');
            var currentPosts = document.querySelector('.posts');
            if (foundPosts && currentPosts) {
              currentPosts.innerHTML += foundPosts.innerHTML;
            }

            event.target.parentNode.removeChild(event.target)
            trigger = results.querySelector('.load-more');
            if (trigger) {
              document.querySelector('.loader').appendChild(trigger);
              blogLoader.attach();
            }

            history.pushState({}, '', event.target.href);
          })
        event.preventDefault();
      } catch(e) {}
    }
  }
})()
blogLoader.init();
