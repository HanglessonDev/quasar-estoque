<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <h5>Me Page</h5>
      <p>Olá {{ user.user_metadata.name }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'MePage',
  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
