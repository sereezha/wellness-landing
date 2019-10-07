window.addEventListener('load', function() {

   const container = document.querySelector('.customers-container');
   const tablist = container.querySelector('[role=tablist]');
   const tabs = container.querySelectorAll('[role=tab]');
   const tabpanels = container.querySelectorAll('.customer-testis__testi');
   let activeTab = container.querySelector('[role=tab][aria-selected=true]');
   const header = document.querySelector('.header');
   const burgerBtn = header.querySelector('.burger-button');
   const mobileNav = header.querySelector('.mobile-nav');
   const mobileItems = mobileNav.querySelectorAll('.mobile-nav__item');
   const anchorLinks = document.querySelectorAll('[data-scroll="anchor"]')


   burgerBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      header.classList.toggle('active');
      mobileNav.classList.toggle('active');
   })

   anchorLinks.forEach(anchorLink => {
   anchorLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      const scrollToEl = document.querySelector(id);
      scrollToEl.scrollIntoView();
      if (window.innerWidth <= 650) {
         mobileNav.classList.remove('active');
         burgerBtn.classList.remove('active');
         header.classList.remove('active');
      }
   })
});

   tabs.forEach(function(tab) {
      tab.addEventListener('click', function(e) {
         setActiveTab(tab.getAttribute('aria-controls'));
      })

      tab.addEventListener('keyup', function(e) {
         switch (e.keyCode) {
            case 9:
               e.preventDefault();
               setActiveTab(tab.getAttribute('aria-controls'));
               break;

            default:
               return;
         }
      })

   })

   tablist.addEventListener('keyup', function(e) {
      switch (e.keyCode) {
         case 39:
            e.preventDefault();
            let next = [...tabs].indexOf(activeTab) + 1;
            next = next < tabs.length ? next : 0
            setActiveTab(tabs[next].getAttribute('aria-controls'));
            break;
         case 37:
            e.preventDefault();
            let previous = [...tabs].indexOf(activeTab) - 1;
            previous = previous >= 0 ? previous : tabs.length - 1
            setActiveTab(tabs[previous].getAttribute('aria-controls'));
            break;
         default:
            return;
      }
   })


   function setActiveTab(id) {
      tabs.forEach(function(tab) {
         if (tab.getAttribute('aria-controls') == id) {
            tab.setAttribute('aria-selected', "true");
            tab.focus();
            activeTab = tab;
         } else {
            tab.setAttribute('aria-selected', "false");
         }
      })

      tabpanels.forEach(function(tabpanel) {
         if (tabpanel.getAttribute('id') == id) {
            tabpanel.setAttribute('aria-expanded', "true");
            tabpanel.classList.add('active');
         } else {
            tabpanel.setAttribute('aria-expanded', "false");
            tabpanel.classList.remove('active');
         }
      })

   }


})
