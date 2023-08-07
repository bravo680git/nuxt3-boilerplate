<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { PASSWORD_MAX_LENGTH, USERNAME_MAX_LENGTH } from '../utils/constants';

definePageMeta({ layout: 'custom' });

const { $api, $i18n } = useNuxtApp();
const { setToken } = useAuthStore();
const { t } = useI18n({ useScope: 'local' });
const callApi = useApi();
useHead({
  title: 'Login',
});

const formData = reactive({ username: '', password: '' });
const wordLimit = reactive({
  username: USERNAME_MAX_LENGTH,
  password: PASSWORD_MAX_LENGTH,
});
const errors: AnyObject = ref();

const login = async () => {
  errors.value = {};
  callApi(() => $api.auth.login(formData))
    .then((res) => {
      const result = res.data;
      setToken(result.token);
    })
    .catch((err) => {
      if (err.message === 'validate') {
        errors.value = err.validate_error;
      } else {
        errors.value = {
          msg: err.message,
        };
      }
    });
};
</script>

<template lang="pug">
#login-page
  .row
    .col.col-sm-12.col-lg-5.position-relative
      #form-login.animate__animated.animate__fadeInLeft.delay07
        form(v-on:keyup.enter="login")
          #logo.animate__animated.animate__fadeInDown
            p.text-center.mb-4.mt-2 {{ t('welcome') }}
          .label.text-center {{ t('login') }}
          .form-group.mb-1
            label.mb-1.text-capitalize {{ t('username') }}
            div.input-block
              img(src="../assets/icons/user.svg", alt="User Icon")
              input.form-control.px-10(
                name="username" 
                :maxlength="wordLimit.username" 
                v-model="formData.username" 
                :placeholder="t('enter_username')"
                )
              div.word-limit(v-text="(formData.username.length + '/' + wordLimit.username)")
            small.text-danger(v-if="errors && errors.username") {{ $i18n.t(errors.username) }}

          .form-group
            label.text-capitalize {{ t('password') }}
            div.input-block
              img(src="../assets/icons/lock.svg", alt="Lock Icon")
              input.form-control.px-10(
                type="password" 
                :maxlength="wordLimit.password" 
                name="password" v-model="formData.password" 
                :placeholder="t('enter_password')"
                )
              div.word-limit(v-text="(formData.password.length + '/' + wordLimit.password)")
            small.text-danger(
              v-if="errors && (errors.password || errors.msg)"
              ) {{ errors.password ? $i18n.t(errors.password) : t(errors.msg) }}

          .form-group.position-relative
            button.btn-submit(type="button" @click="login") {{ t('login') }}
    .col-md-7.hidden-sm-and-down
      .row
        div.col-sm-12
          div.welcome-block
            p.text-welcome.animate__animated.animate__fadeInRight.delay05 {{ t('text_welcome') }}
          div.col-lg-7
            .image.text-left.animate__animated.animate__fadeInRight.delay05
              img.img-fluid(src="../assets/images/login-bg.png", alt="Login")

</template>

<style lang="scss" scoped>
@import './../assets/sass/login.sass';
</style>

<i18n lang="json">
{
  "vi": {
    "about": "About",
    "username": "Tài khoản",
    "password": "Mật khẩu",
    "login": "Đăng nhập",
    "loginSSO": "Đăng nhập SSO",
    "welcome": "Chào mừng",
    "enter_username": "Vui lòng nhập tài khoản",
    "enter_password": "Vui lòng nhập mật khẩu",
    "text_welcome": "A System Wiki, Blog for employees",
    "text_sub_welcome": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "username_or_password_incorrect": "Tài khoản hoặc mật khẩu sai",
    "expired": "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"
  },
  "en": {
    "about": "About",
    "username": "Username",
    "password": "Password",
    "login": "Login",
    "loginSSO": "Login with SSO",
    "welcome": "Welcome",
    "enter_username": "Please enter username",
    "enter_password": "Please enter password",
    "text_welcome": "A System Wiki, Blog for employees",
    "text_sub_welcome": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "username_or_password_incorrect": "Username or password are incorrect",
    "expired": "Your session is expired, please login again"
  },
  "jp": {
    "about": "に関しては",
    "username": "ユーザー名",
    "password": "パスワード",
    "login": "ログイン",
    "loginSSO": "ログイン SSO",
    "welcome": "ようこそ",
    "enter_username": "ユーザー名を入力してください",
    "enter_password": "パスワードを入力してください",
    "text_welcome": "A System Wiki, Blog for employees",
    "text_sub_welcome": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "username_or_password_incorrect": "ユーザー名またはパスワードが正しくありません",
    "expired": "セッションの有効期限が切れています。もう一度ログインしてください"
  }
}
</i18n>
