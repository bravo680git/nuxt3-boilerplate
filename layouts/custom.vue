<script type="ts" setup>
import Loading from '@/components/LoadingComponent.vue'

definePageMeta({ layout: 'custom' })
</script>

<template lang="pug">
#main-content-custom.container-fluid
  slot
Loading
</template>
