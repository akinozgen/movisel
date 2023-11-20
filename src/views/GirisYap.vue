  <template>
  <div class="container">
    <h1 class="page-title">Giriş Yap</h1>

    <form @submit.prevent="login" class="form">
      <div class="form-group">
        <label>E-Posta</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="form-group">
        <label>Parola</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="form-group">
        <button type="submit" v-bind:class="{ loading: inProgress }">
          Giriş Yap
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import AuthStore from "@/stores/AuthStore";
import SupaBase from "@/stores/SupaBase";
import router from "@/router";
import { ref } from "@vue/reactivity";

const email = ref("");
const password = ref("");
const inProgress = ref(false);

async function login() {
      inProgress.value = true;
      if (AuthStore.state.isLoggedIn) return router.push('/');

      const { error, user } = await SupaBase.state.supabase.auth.signIn({
        email: email.value,
        password: password.value
      });

      if (error) {
        inProgress.value = false;
        return alert(error.message);
      }

      AuthStore.commit('login', user);

      inProgress.value = false;
      email.value = '';
      password.value = '';
      await router.push('/');
    }
</script>

<style scoped>

</style>