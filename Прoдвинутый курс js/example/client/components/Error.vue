<template>
  <div class="error-block">
    <p class="error-msg">
      {{ text }}
    </p>
  </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: 'Что-то пошло не так.'
            }
        }
    }
</script>
