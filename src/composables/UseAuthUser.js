import { ref } from 'vue'
import useSupabase from 'boot/supabase'

const user = ref(null)
const useAuthUser = () => {
  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    return user
  }

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider
    })
    if (error) throw error
    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  /**
   * Registra um novo usuário.
   *
   * @param {Object} data - Os dados do usuário a serem registrados.
   * @param {string} data.email - O endereço de e-mail do usuário.
   * @param {string} data.password - A senha do usuário.
   * @return {Promise<Object>} Um objeto contendo os dados do usuário registrado.
   */
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: meta,
          redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
        }
      }
    )
    console.log(meta)
    if (error) throw error
    return user
  }

  /**
   * Updates the user data asynchronously.
   *
   * @param {Object} data - The data to update the user with.
   * @return {Object} The updated user object.
   */
  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  const sendPasswordResetEmail = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.updateUser({ password: newPassword }
    )

    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword
  }
}

export default useAuthUser
