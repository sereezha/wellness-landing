window.addEventListener('load', function() {

   let container = document.querySelector('.customers-container');
   let tablist = container.querySelector('[role=tablist]');
   let tabs = container.querySelectorAll('[role=tab]');
   let tabpanels = container.querySelectorAll('.customer-testis__testi');
   let activeTab = container.querySelector('[role=tab][aria-selected=true]');

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
