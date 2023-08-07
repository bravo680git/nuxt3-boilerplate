<script setup type="ts">
import Loading from '../components/LoadingComponent.vue'
import HeaderComponent from './templates/default/header.vue'
import FooterComponent from './templates/default/footer.vue'

definePageMeta({ layout: 'default' })
</script>

<template lang="pug">
#layout_default
  v-app
    v-layout
        #sidebar
          SidebarComponent
        #wrapper-content
          HeaderComponent
          slot
        #footer
          FooterComponent
  Loading
  alert
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap')
html
  font-family: "Open Sans"

:root
  ::-webkit-scrollbar
    width: 6px
    height: 6px
  ::-webkit-scrollbar-track
      background-color: transparent
  ::-webkit-scrollbar-thumb
      background-color: rgba(0,0,0,0.2)
      border-radius: 999px
</style>
