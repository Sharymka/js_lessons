const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  data: {
    userSearch: "",
    showError: false,
  },

  mounted() {
    this.$refs.products.$on("add-product", (product) => {
      this.$refs.cart.addProduct(product);
    });
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.error(error);
          this.showError = true;
        });
    },
    postJson(url, data) {
      this.showError = false;

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          this.showError = true;
        });
    },
    putJson(url, data) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
          this.showError = true;
        });
    },
    deleteJson(url) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
          this.showError = true;
        });
    },
  },
  template: `
  <div>
  <header class="header">
  <div class="wrap header-wrap">
    <div class="header-col-1">
      <a class="logo" href="index.html">
        <svg
          width="44"
          height="38"
          viewBox="0 0 44 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect width="44" height="38" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlink:href="#image0_128_53"
                transform="scale(0.0227273 0.0263158)"
              />
            </pattern>
            <image
              id="image0_128_53"
              width="44"
              height="38"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </a>
      <filter-el @search ="data => $refs.products.filter(data)"> </filter-el>
    </div>
    <nav class="header-col-2">
      <ul class="header-nav">
        <li class="header-nav-item">
        <button type="submit" class="burger">
        <svg
          width="32"
          height="23"
          viewBox="0 0 32 23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <linearGradient class="grad--linear-1">
            <stop offset="0%" stop-color="#f96bd9" class="stop-1" />
            <stop offset="50%" stop-color="#f5ae96" class="stop-2" />
            <stop offset="100%" stop-color="#79e0e5" class="stop-3" />
          </linearGradient>
          <path
            d="M0 23V20.31H32V23H0ZM0 12.76V10.07H32V12.76H0ZM0 2.69V0H32V2.69H0Z"
          />
        </svg>
      </button>
        </li>
        <li class="header-nav-item mobile-display">
          <a href="registration.html" target="_blank">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              xmlns="http://www.w3.org/2000/svg"
            >
              <linearGradient class="grad--linear-1">
                <stop offset="0%" stop-color="#f96bd9" class="stop-1" />
                <stop offset="50%" stop-color="#f5ae96" class="stop-2" />
                <stop offset="100%" stop-color="#79e0e5" class="stop-3" />
              </linearGradient>
              <path
                d="M14.5 19.937C19 19.937 22.656 15.464 22.656 9.968C22.656 4.472 19 0 14.5 0C13.3631 0.0217413 12.2463 0.303398 11.2351 0.823397C10.2239 1.34339 9.34507 2.08794 8.66602 3C7.12663 4.99573 6.30819 7.45381 6.34399 9.974C6.34399 15.465 10 19.937 14.5 19.937ZM14.5 1.813C18 1.813 20.844 5.472 20.844 9.969C20.844 14.466 17.998 18.125 14.5 18.125C11.002 18.125 8.15603 14.465 8.15503 9.969C8.15403 5.473 11 1.813 14.5 1.813ZM20.844 18.125C20.6036 18.125 20.373 18.2205 20.203 18.3905C20.033 18.5605 19.9375 18.7911 19.9375 19.0315C19.9375 19.2719 20.033 19.5025 20.203 19.6725C20.373 19.8425 20.6036 19.938 20.844 19.938C22.526 19.9399 24.1386 20.6088 25.3279 21.7982C26.5172 22.9875 27.1861 24.6 27.188 26.282C27.1875 26.5221 27.0918 26.7523 26.922 26.9221C26.7522 27.0918 26.5221 27.1875 26.282 27.188H2.71997C2.47985 27.1875 2.24975 27.0918 2.07996 26.9221C1.91016 26.7523 1.81449 26.5221 1.81396 26.282C1.81608 24.6001 2.48517 22.9877 3.67444 21.7985C4.86371 20.6092 6.47608 19.9401 8.15796 19.938C8.39824 19.938 8.62868 19.8425 8.79858 19.6726C8.96849 19.5027 9.06396 19.2723 9.06396 19.032C9.06396 18.7917 8.96849 18.5613 8.79858 18.3914C8.62868 18.2215 8.39824 18.126 8.15796 18.126C5.99541 18.1279 3.92201 18.9875 2.39258 20.5164C0.863144 22.0453 0.00264777 24.1185 0 26.281C0.000794067 27.0019 0.287502 27.693 0.797241 28.2027C1.30698 28.7125 1.99811 28.9992 2.71899 29H26.282C27.0027 28.9989 27.6936 28.7121 28.2031 28.2024C28.7126 27.6927 28.9992 27.0017 29 26.281C28.9974 24.1187 28.1372 22.0457 26.6083 20.5168C25.0793 18.9878 23.0063 18.1276 20.844 18.125Z"
              />
            </svg>
          </a>
        </li>
        <cart ref="cart" />
      </ul>
    </nav>
    <nav class="main-nav">
      <div class="main-nav-box">
        <button class="main-nav-close">
          <svg
            width="12"
            height="12"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
              fill="#6F6E6E"
            />
          </svg>
        </button>
        <p class="main-nav-title">MENU</p>
        <ul class="main-nav-list">
          <li class="main-nav-item">
            <a href="catalog.html" class="main-nav-link pink">MAN</a>
            <ul class="summenu-list">
              <li class="summenu-item">
                <a href="product.html" class="summenu-link"
                  >Accessories</a
                >
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">Bags</a>
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">Denim</a>
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">T-Shirts</a>
              </li>
            </ul>
          </li>
          <li class="main-nav-item">
            <a href="catalog.html" class="main-nav-link pink">WOMAN</a>
            <ul class="summenu-list">
              <li class="summenu-item">
                <a href="product.html" class="summenu-link"
                  >Accessories</a
                >
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link"
                  >Jackets & Coats</a
                >
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">Polos</a>
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">T-Shirts</a>
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">Shirts</a>
              </li>
            </ul>
          </li>
          <li class="main-nav-item">
            <a href="catalog.html" class="main-nav-link pink">KIDS</a>
            <ul class="summenu-list">
              <li class="summenu-item">
                <a href="product.html" class="summenu-link"
                  >Accessories</a
                >
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link"
                  >Jackets & Coats</a
                >
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">Polos</a>
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">T-Shirts</a>
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">Shirts</a>
              </li>
              <li class="summenu-item">
                <a href="product.html" class="summenu-link">Bags</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</header>
<div class="footer-bottom">
  <main class="main">
    <section class="breadcrumbs">
      <div class="wrap breadcrumbs-wrap">
        <div class="breadcrumbs-col-1">
          <h1 class="font-24-400 pink">NEW ARRIVALS</h1>
        </div>
        <nav class="breadcrumbs-col-2">
          <ul class="breadcrumbs-list">
            <li class="breadcrumbs-link">
              <a
                class="breadcrumbs-text"
                href="index.html"
                target="_blank"
                >HOME</a
              >
            </li>
            <li class="breadcrumbs-link">
              <a class="breadcrumbs-text" href="#"> MEN</a>
            </li>
            <li class="breadcrumbs-link">
              <a class="pink breadcrumbs-text-bold" href="#"
                >NEW ARRIVALS</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <div class="catalog wrap">
      <h2 class="visually-hidden">каталог товаров</h2>
      <div class="catalog-filter">
        <div class="filter-col-1">
          <details class="filter">
            <summary class="filter-title">
              <span class="title-invisible">FILTER</span>&nbsp;<svg
                height="10"
                viewBox="0 0 15 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z"
                />
              </svg>
            </summary>
            <div class="filter-drop">
              <details class="sub-filter" open>
                <summary class="filter-subtitle">CATEGORY</summary>
                <ul class="categories-list grey-1">
                  <li class="categories-item">
                    <a href="#" class="categories-link">Accessories</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Bags</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Denim</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Hoodies & Sweatshirts</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Jackets & Coats</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Polos</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Shirts</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Shoes</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Sweaters & Knits</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">T-Shirts</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Tanks</a>
                  </li>
                </ul>
              </details>
              <details class="sub-filter">
                <summary class="filter-subtitle">BRAND</summary>
                <ul class="categories-list">
                  <li class="categories-item">
                    <a href="#" class="categories-link">Accessories</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Bags</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Denim</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Hoodies & Sweatshirts</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Jackets & Coats</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Polos</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Shirts</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Shoes</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Sweaters & Knits</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">T-Shirts</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Tanks</a>
                  </li>
                </ul>
              </details>
              <details class="sub-filter">
                <summary class="filter-subtitle">DESIGNER</summary>
                <ul class="categories-list">
                  <li class="categories-item">
                    <a href="#" class="categories-link">Accessories</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Bags</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Denim</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Hoodies & Sweatshirts</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Jackets & Coats</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Polos</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Shirts</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Shoes</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link"
                      >Sweaters & Knits</a
                    >
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">T-Shirts</a>
                  </li>
                  <li class="categories-item">
                    <a href="#" class="categories-link">Tanks</a>
                  </li>
                </ul>
              </details>
            </div>
          </details>
        </div>
        <ul class="filter-col-2">
          <li class="filter-list">
            <details class="filter-list-box">
              <summary class="filter-list-title">
                TRENDING NOW
                <svg
                  class="arrow-down"
                  width="11"
                  height="6"
                  viewBox="0 0 11 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81724 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                  />
                </svg>
              </summary>
              <ul class="filter-list-drop">
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                    checked
                  />content
                </li>
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                  />content
                </li>
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                  />content
                </li>
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                  />content
                </li>
              </ul>
            </details>
          </li>
          <li class="filter-list">
            <details class="filter-list-box">
              <summary class="filter-list-title">
                SIZE
                <svg
                  class="arrow-down"
                  width="11"
                  height="6"
                  viewBox="0 0 11 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81724 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                  />
                </svg>
              </summary>
              <ul class="filter-list-drop">
                <li class="filter-list-drop-size">
                  <input type="radio" name="size" value="xs" checked />XS
                </li>
                <li class="filter-list-drop-size">
                  <input type="radio" name="size" value="s" />S
                </li>
                <li class="filter-list-drop-size">
                  <input type="radio" name="size" value="m" />M
                </li>
                <li class="filter-list-drop-size">
                  <input type="radio" name="size" value="l" />L
                </li>
              </ul>
            </details>
          </li>
          <li class="filter-list">
            <details class="filter-list-box">
              <summary class="filter-list-title">
                PRICE
                <svg
                  class="arrow-down"
                  width="11"
                  height="6"
                  viewBox="0 0 11 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81724 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z"
                  />
                </svg>
              </summary>
              <ul class="filter-list-drop">
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                    checked
                  />content
                </li>
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                  />content
                </li>
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                  />content
                </li>
                <li class="filter-list-drop-size">
                  <input
                    type="radio"
                    name="content"
                    value="content"
                  />content
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <products ref="products" />
      <error v-if="showError" />
      <nav class="pagination-nav">
        <ul class="pagination-list">
          <li class="pagination-link">
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z"
              />
            </svg>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">1</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">2</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">3</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">4</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">5</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">6 </a>&nbsp;
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">7</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">8</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">9</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">10</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">11</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">12</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">13</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">14</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">15</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">16</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">17</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">18</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">19</a>
          </li>
          <li class="pagination-link">
            <a target="_blank" href="#">20</a>
          </li>
          <li class="pagination-link">
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.994995 12L5.995 7L0.994995 2L1.995 0L8.995 7L1.995 14L0.994995 12Z"
              />
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  </main>
  <section class="benefits">
    <div class="wrap benefits-block">
      <h2 class="visually-hidden">преимущества товаров</h2>
      <div class="benefits-section img-pos img-1">
        <div class="benefits-text">
          <h3 class="benefits-title">Free Delivery</h3>
          <p class="benefits-desc">
            Worldwide delivery on all. Authorit tively morph
            next-generation innov tion with extensive models.
          </p>
        </div>
      </div>
      <div class="benefits-section img-pos img-2">
        <div class="benefits-text">
          <h3 class="benefits-title">Sales & discounts</h3>
          <p class="benefits-desc">
            Worldwide delivery on all. Authorit tively morph
            next-generation innov tion with extensive models.
          </p>
        </div>
      </div>
      <div class="benefits-section img-pos img-3">
        <div class="benefits-text">
          <h3 class="benefits-title">Quality assurance</h3>
          <p class="benefits-desc">
            Worldwide delivery on all. Authorit tively morph
            next-generation innov tion with extensive models.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="feedback">
    <div class="wrap feedback-wrap">
      <h2 class="visually-hidden">обратная связь</h2>
      <article class="feedback-quote">
        <h3 class="visually-hidden">отзывы</h3>
        <div class="quote-img">
          <img src="images/quote.png" alt="quote-author" />
        </div>
        <p class="quote-text">
          “Vestibulum quis porttitor dui! Quisque viverra nunc mi,
          <span class="italic">a pulvinar purus condimentum“</span>
        </p>
      </article>
      <article class="feedback-subscribe">
        <h3 class="visually-hidden">subscribe</h3>
        <form action="#">
          <h3 class="feedback-title">
            SUBSCRIBE <br />
            <span>FOR OUR NEWLETTER AND PROMOTION</span>
          </h3>
          <input
            class="feedback-input"
            type="email"
            minlength="3"
            maxlength="25"
            placeholder="Enter Your Email"
            required
          />
          <button class="feedback-submit" type="submit">Subscribe</button>
        </form>
      </article>
    </div>
  </section>
</div>
<footer class="footer">
  <div class="wrap footer-wrap">
    <h2 class="visually-hidden">подвал</h2>
    <div class="footer-col-1">
      <h3>&copy; 2021 Brand All Rights Reserved.</h3>
    </div>
    <ul class="footer-col-2">
      <li class="icon-block">
        <a class="icon" href="https://www.facebook.com" target="_blank">
          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.08836 8.28L8.50686 5.61602H5.89022V3.88729C5.89022 3.15847 6.25574 2.44806 7.42765 2.44806H8.61722V0.179975C8.61722 0.179975 7.53772 0 6.50561 0C4.35073 0 2.9422 1.27593 2.9422 3.5857V5.61602H0.546875V8.28H2.9422V14.72H5.89022V8.28H8.08836Z"
            />
          </svg>
        </a>
      </li>
      <li class="icon-block">
        <a class="icon" href="https://www.instagram.com" target="_blank">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.13897 3.68159C6.02383 3.68159 4.31774 5.38491 4.31774 7.49663C4.31774 9.60835 6.02383 11.3117 8.13897 11.3117C10.2541 11.3117 11.9602 9.60835 11.9602 7.49663C11.9602 5.38491 10.2541 3.68159 8.13897 3.68159ZM8.13897 9.9769C6.77211 9.9769 5.65467 8.8646 5.65467 7.49663C5.65467 6.12866 6.76878 5.01636 8.13897 5.01636C9.50915 5.01636 10.6233 6.12866 10.6233 7.49663C10.6233 8.8646 9.50583 9.9769 8.13897 9.9769ZM13.0078 3.52554C13.0078 4.02026 12.6087 4.41538 12.1165 4.41538C11.621 4.41538 11.2252 4.01694 11.2252 3.52554C11.2252 3.03413 11.6243 2.63569 12.1165 2.63569C12.6087 2.63569 13.0078 3.03413 13.0078 3.52554ZM15.5386 4.42866C15.4821 3.23667 15.2094 2.18081 14.3347 1.31089C13.4634 0.440967 12.4058 0.168701 11.2119 0.108936C9.9814 0.039209 6.29321 0.039209 5.0627 0.108936C3.8721 0.165381 2.81453 0.437646 1.93987 1.30757C1.06522 2.17749 0.795836 3.23335 0.735973 4.42534C0.666134 5.65386 0.666134 9.33608 0.735973 10.5646C0.79251 11.7566 1.06522 12.8124 1.93987 13.6824C2.81453 14.5523 3.86878 14.8246 5.0627 14.8843C6.29321 14.9541 9.9814 14.9541 11.2119 14.8843C12.4058 14.8279 13.4634 14.5556 14.3347 13.6824C15.2061 12.8124 15.4788 11.7566 15.5386 10.5646C15.6085 9.33608 15.6085 5.65718 15.5386 4.42866ZM13.949 11.8828C13.6895 12.5335 13.1874 13.0349 12.5322 13.2972C11.5511 13.6857 9.22314 13.596 8.13897 13.596C7.05479 13.596 4.72348 13.6824 3.74573 13.2972C3.09389 13.0382 2.59171 12.5369 2.32898 11.8828C1.93987 10.9033 2.02967 8.57905 2.02967 7.49663C2.02967 6.41421 1.9432 4.08667 2.32898 3.1105C2.58838 2.45972 3.09056 1.95835 3.74573 1.69604C4.7268 1.30757 7.05479 1.39722 8.13897 1.39722C9.22314 1.39722 11.5545 1.31089 12.5322 1.69604C13.184 1.95503 13.6862 2.4564 13.949 3.1105C14.3381 4.08999 14.2483 6.41421 14.2483 7.49663C14.2483 8.57905 14.3381 10.9066 13.949 11.8828Z"
            />
          </svg>
        </a>
      </li>
      <li class="icon-block">
        <a
          class="icon"
          href="https://www.pinterest.pt/pointinterest"
          target="_blank"
        >
          <svg
            width="13"
            height="16"
            viewBox="0 0 13 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.74032 0.203125C3.55564 0.203125 0.408203 2.34063 0.408203 5.8C0.408203 8 1.63738 9.25 2.38233 9.25C2.68963 9.25 2.86655 8.3875 2.86655 8.14375C2.86655 7.85313 2.13091 7.23438 2.13091 6.025C2.13091 3.5125 4.03055 1.73125 6.4889 1.73125C8.60271 1.73125 10.1671 2.94062 10.1671 5.1625C10.1671 6.82187 9.50597 9.93437 7.36422 9.93437C6.59133 9.93437 5.93018 9.37187 5.93018 8.56563C5.93018 7.38438 6.74963 6.24062 6.74963 5.02187C6.74963 2.95312 3.835 3.32812 3.835 5.82812C3.835 6.35313 3.90018 6.93437 4.13298 7.4125C3.70463 9.26875 2.82931 12.0344 2.82931 13.9469C2.82931 14.5375 2.91311 15.1188 2.96899 15.7094C3.07452 15.8281 3.02175 15.8156 3.18316 15.7563C4.74757 13.6 4.69169 13.1781 5.3994 10.3562C5.78119 11.0875 6.76826 11.4812 7.55046 11.4812C10.8469 11.4812 12.3275 8.24688 12.3275 5.33125C12.3275 2.22813 9.66427 0.203125 6.74032 0.203125Z"
            />
          </svg>
        </a>
      </li>
      <li class="icon-block">
        <a class="icon" href="https://twitter.com" target="_blank">
          <svg
            width="17"
            height="14"
            viewBox="0 0 17 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.417 3.74052C14.427 3.88264 14.427 4.0248 14.427 4.16692C14.427 8.50192 11.1498 13.4969 5.15986 13.4969C3.31448 13.4969 1.60022 12.9588 0.158203 12.0248C0.420396 12.0552 0.67247 12.0654 0.944752 12.0654C2.46741 12.0654 3.8691 11.5476 4.98843 10.6644C3.5565 10.6339 2.3565 9.68977 1.94305 8.39027C2.14475 8.4207 2.34642 8.44102 2.5582 8.44102C2.85063 8.44102 3.14308 8.40039 3.41533 8.32936C1.92291 8.02477 0.803551 6.70498 0.803551 5.11108V5.07048C1.23715 5.31414 1.74139 5.46642 2.2758 5.4867C1.39849 4.89786 0.823727 3.8928 0.823727 2.75573C0.823727 2.14661 0.985041 1.58823 1.26741 1.10092C2.87077 3.09077 5.28086 4.39023 7.98334 4.53239C7.93293 4.28873 7.90266 4.03495 7.90266 3.78114C7.90266 1.97402 9.35477 0.501953 11.1598 0.501953C12.0976 0.501953 12.9446 0.897891 13.5396 1.53748C14.2757 1.39536 14.9816 1.12123 15.6068 0.745609C15.3648 1.50705 14.8505 2.14664 14.1749 2.5527C14.8304 2.48167 15.4657 2.29889 16.0505 2.04511C15.6069 2.69483 15.0522 3.27348 14.417 3.74052Z"
            />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</footer>
</div>
  `,
});
