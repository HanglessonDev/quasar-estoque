<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handlerPasswordReset"
      >
      <p class="col-12 text-h5 text-center">Redefinir senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="password" type="text" label="Nova Senha" lazy-rules :rules="passwordRules" />
        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn type="submit" class="full-width" color="primary" label="Redefinir" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter, useRoute } from 'vue-router'
import useValidations from 'src/composables/UseValidations'

export default defineComponent({
  name: 'ResetPasswordPage',

  setup () {
    const { resetPassword } = useAuthUser()
    const { isPassword } = useValidations()

    const router = useRouter()

    const route = useRoute()
    const token = route.query.token

    const password = ref('')

    const handlerPasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        router.push({ name: 'login' })
      } catch (error) {
        alert(error.message)
      }
    }

    // Validations
    const passwordRules = [
      (val) => (isPassword(val)) || 'A senha deve ter no mínimo 6 caracteres'
    ]

    return {
      password,
      handlerPasswordReset,
      passwordRules
    }
  }
})
</script>
