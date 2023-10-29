<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handlerRegister"
      >
      <p class="col-12 text-h5 text-center">Criar conta</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input v-model="form.name" type="text" label="Nome" lazy-rules :rules="requiredRules" />
        <q-input v-model="form.email" type="text" label="Email" lazy-rules :rules="emailRules" />
        <q-input v-model="form.password" type="text" label="Password" lazy-rules :rules="passwordRules" />
        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn type="submit" class="full-width" color="primary" label="Criar conta" />
          <q-btn :to="{ name: 'login' }" class="full-width" color="accent" label="Voltar" outline />
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
  name: 'RegisterPage',

  setup () {
    const router = useRouter()

    const { register } = useAuthUser()
    const { isEmail, isPassword, isRequired } = useValidations()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handlerRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Cadastro realizado com sucesso!')
        router.push({ name: 'email-confirmation', query: { email: form.value.email } })
      } catch (error) {
        notifyError(error.message)
      }
    }

    // Validations
    const emailRules = [
      (val) => (isEmail(val) && val.length > 0) || 'Email inválido'
    ]

    const passwordRules = [
      (val) => (isPassword(val)) || 'A senha deve ter no mínimo 6 caracteres'
    ]

    const requiredRules = [
      (val) => (isRequired(val)) || 'Este campo é obrigatório'
    ]

    return {
      form,
      handlerRegister,
      emailRules,
      passwordRules,
      requiredRules
    }
  }
})
</script>
