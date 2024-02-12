
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Hello',
  setup() {
    const { t } = useI18n() // use as global scope
    return { t }
  }
})
</script>
<template>
  <div class="about">
    <h1>About this API</h1>
    <p>{{ $t('hello') }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    margin-top: 74px;
    min-height: 100vh;
    /* display: flex; */
    align-items: center;
  }
}
</style>
