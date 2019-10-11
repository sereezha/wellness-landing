window.addEventListener('load', function() {

   const container = document.querySelector('.customers-container');
   const tablist = container.querySelector('[role=tablist]');
   const tabs = container.querySelectorAll('[role=tab]');
   const tabpanels = container.querySelectorAll('.customer-testis__testi');
   let activeTab = container.querySelector('[role=tab][aria-selected=true]');
   const heroTitle = document.querySelector('.hero__title');
   const heroDescr = document.querySelector('.hero__descr');
   const heroBtn = document.querySelector('.hero__btn');
   const heroBtnAfter = CSSRulePlugin.getRule(".hero__btn::before");
   const header = document.querySelector('.header');
   const headerLogo = header.querySelector('.header__logo');
   const headerNavItem = header.querySelectorAll('.header-nav__item');
   const burgerBtn = header.querySelector('.burger-button');
   const mobileNav = header.querySelector('.mobile-nav');
   const mobileItems = mobileNav.querySelectorAll('.mobile-nav__item');
   const anchorLinks = document.querySelectorAll('[data-scroll="anchor"]');
   const overlay = document.querySelector('.overlay');
   const overlayText = document.querySelector('.overlay__text');
   const body = document.body;

   burgerBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      header.classList.toggle('active');
      mobileNav.classList.toggle('active');
   })

   anchorLinks.forEach(anchorLink => {
      anchorLink.addEventListener('click', function(e) {
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

   // timelinelite

   const tl = new TimelineMax();

   console.log(heroBtnAfter)



   tl
      .set(heroBtnAfter, { cssRule: { top: '0', left: '0', opacity: 0 } })
      .to(overlayText, 1.5, { y: '-100px', autoAlpha: 0, ease: Expo.easeInOut })
      .to(overlay, 1, { y: '-100%', ease: Expo.easeInOut }, '-=0.7')
      .fromTo(headerLogo, 0.7, { x: '-20px', autoAlpha: 0 }, { x: '0px', autoAlpha: 1 })
      .staggerFromTo(headerNavItem, 0.7, { autoAlpha: 0, y: '30px' }, { autoAlpha: 1, y: '0' }, 0.08, '-=0.3')
      .fromTo(heroTitle, 0.8, { y: '40px', autoAlpha: 0 }, { y: '0px', autoAlpha: 1 }, '-=0.8')
      .fromTo(heroDescr, 0.8, { y: '40px', autoAlpha: 0 }, { y: '0px', autoAlpha: 1 }, '-=0.6')
      .fromTo(heroBtn, 0.8, { top: '40px', autoAlpha: 0 }, { top: '0px', autoAlpha: 1 }, '-=0.4')
      .to(heroBtnAfter, 0.5, { cssRule: { top: '10px', left: '10px', opacity: 1 } })
      .set(body, { className: '-=no-scroll' })


})
