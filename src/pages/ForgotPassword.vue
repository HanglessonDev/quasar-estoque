<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handlerForgotPassword"
      >
      <p class="col-12 text-h5 text-center">Esqueci minha senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="email" type="text" label="Email" lazy-rules :rules="emailRules" />
        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn type="submit" class="full-width" color="primary" label="Enviar email de recuperação" />
          <q-btn :to="{ name: 'login' }" class="full-width" color="accent" label="Voltar" outline />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useValidations from 'src/composables/UseValidations'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ForgotPasswordPage',
  setup () {
    const { sendPasswordResetEmail } = useAuthUser()
    const { isEmail } = useValidations()
    const { notifySuccess, notifyError } = useNotify()
    const router = useRouter()
    const email = ref('')

    const handlerForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        notifySuccess('Email de recuperação enviado')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    // Validations
    const emailRules = [
      (val) => (isEmail(val) && val.length > 0) || 'Email inválido'
    ]

    return {
      email,
      handlerForgotPassword,
      emailRules
    }
  }
})
</script>
