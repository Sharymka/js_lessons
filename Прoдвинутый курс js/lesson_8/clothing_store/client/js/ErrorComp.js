export default Vue.component("error", {
  props: {
    text: {
      type: String,
      default: "Что-то пошло не так(",
    },
  },

  template: `
    <div class="error-block">
      <p class="error-msg">
        {{ text }}
      </p>
    </div>
    `,
});
