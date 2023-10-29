<template>
  <q-page padding>

    <q-form
      class="row justify-center"
      @submit.prevent="handlerLogin"
      >
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="form.email" type="text" label="Email" lazy-rules :rules="emailRules" />
        <q-input v-model="form.password" type="text" label="Password" lazy-rules :rules="passwordRules" />
        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn type="submit" class="full-width" color="primary" label="Entrar" />
          <q-btn :to="{ name: 'register' }" class="full-width" color="accent" label="Resgistrar" outline />
          <q-btn :to="{ name: 'forgot-password' }" class="full-width" color="accent" label="Esqueci a senha" size="md" flat />
        </div>
      </div>
    </q-form>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import useValidations from 'src/composables/UseValidations'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const router = useRouter()

    const { login } = useAuthUser()
    const { isEmail, isPassword } = useValidations()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    const handlerLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login realizado com sucesso!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
        console.log(error)
      }
    }

    // Validações do formulário
    const emailRules = [
      (val) => (isEmail(val) && val.length > 0) || 'Email inválido'
    ]

    const passwordRules = [
      (val) => (isPassword(val)) || 'A senha deve ter no mínimo 6 caracteres'
    ]

    return {
      form,
      handlerLogin,
      emailRules,
      passwordRules
    }
  }
})
</script>
