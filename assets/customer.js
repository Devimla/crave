const selectors = {
  customerAddresses: '[data-customer-addresses]',
  addressCountrySelect: '[data-address-country-select]',
  addressContainer: '[data-address]',
  toggleAddressButton: 'button[aria-expanded]',
  cancelAddressButton: 'button[type="reset"]',
  deleteAddressButton: 'button[data-confirm-message]',
};

const attributes = {
  expanded: 'aria-expanded',
  confirmMessage: 'data-confirm-message',
};

class CustomerAddresses {
  constructor() {
    this.elements = this._getElements();
    if (Object.keys(this.elements).length === 0) return;
    this._setupCountries();
    this._setupEventListeners();
  }

  _getElements() {
    const container = document.querySelector(selectors.customerAddresses);
    return container
      ? {
          container,
          addressContainer: container.querySelector(selectors.addressContainer),
          toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
          cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
          deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
          countrySelects: container.querySelectorAll(selectors.addressCountrySelect),
        }
      : {};
  }

  _setupCountries() {
    if (Shopify && Shopify.CountryProvinceSelector) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
        hideElement: 'AddressProvinceContainerNew',
      });
      this.elements.countrySelects.forEach((select) => {
        const formId = select.dataset.formId;
        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
          hideElement: `AddressProvinceContainer_${formId}`,
        });
      });
    }
  }

  _setupEventListeners() {
    this.elements.toggleButtons.forEach((element) => {
      element.addEventListener('click', this._handleAddEditButtonClick);
    });
    this.elements.cancelButtons.forEach((element) => {
      element.addEventListener('click', this._handleCancelButtonClick);
    });
    this.elements.deleteButtons.forEach((element) => {
      element.addEventListener('click', this._handleDeleteButtonClick);
    });
  }

  _toggleExpanded(target) {
    target.setAttribute(attributes.expanded, (target.getAttribute(attributes.expanded) === 'false').toString());
  }

  _handleAddEditButtonClick = ({ currentTarget }) => {
    // Section handling carousel initialization

{4:[function(t,n,e){

    const i=Math.round($("#topbar").outerHeight()+$("#navbar").outerHeight());

    function a(){

        document.querySelector(".carousel-item")&&$(".carousel-item img").each((function(t,n){

            $(n).attr("src",$(n).data("src")),

            $(n).attr("srcset",$(n).data("srcset"))

        }))

    }

    $(".carousel-fullscreen-fake-div").css("height",`calc(100vh - ${i}px)`),

    $(document).on("scroll",(function(){

        const t=$(".carousel.fullscreen .carousel-caption");

        "none"!=t.css("animation-name")&&setTimeout((function(){

            $(window).scrollTop()>0?t.css("opacity",0):t.css("opacity",1)

        }),750)

    })),

    $(window).on("load",(function(){a()})),

    $(".carousel").on("slide.bs.carousel",(function(t){a()})),

    window.animateCarouselProgressBars=function(){

        document.querySelector(".carousel-autoplay-progress-bar")&&$(".carousel-autoplay-progress-bar").each((function(t,n){

            const e=$(this);

            function i(){

                e.animate({width:"100%"},e.closest(".carousel").data("interval"),"linear")

            }

            i(),

            e.closest(".carousel").on("slide.bs.carousel",(function(t){

                e.stop().removeAttr("style"),

                i()

            }))

        }))

    },

    animateCarouselProgressBars(),

    document.addEventListener("shopify:section:load",(function(t){

        $(t.target).find(".carousel").length&&(a(),animateCarouselProgressBars())

    }))

},{}]


    this._toggleExpanded(currentTarget);
  };

  _handleCancelButtonClick = ({ currentTarget }) => {
    this._toggleExpanded(currentTarget.closest(selectors.addressContainer).querySelector(`[${attributes.expanded}]`));
  };

  _handleDeleteButtonClick = ({ currentTarget }) => {
    // eslint-disable-next-line no-alert
    if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
      Shopify.postLink(currentTarget.dataset.target, {
        parameters: { _method: 'delete' },
      });
    }
  };
}
