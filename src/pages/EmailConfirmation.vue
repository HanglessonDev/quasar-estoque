<template>
  <q-page padding>
    <h4>Obrigado por se registrar</h4>
    <p class="text-body1">Por favor confirme seu email: <strong>{{ $route.query.email }}</strong></p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage'
})
</script>
