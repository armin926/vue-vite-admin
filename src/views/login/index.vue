<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { validatePassword } from './rules'
import { useUserStoreExternal } from '@/store/modules/user'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from '@/hooks/useI18n'
import LangSelect from '@/components/LangSelect/index.vue'

const { t } = useI18n()
// 数据源
const loginForm = ref<LoginFormModule>({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', message: t('login.usernameRule') }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword() }]
})
// 处理密码框文本显示状态
const passwordType = ref<string>('password')
const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
// 登录
const loading = ref<boolean>(false)
const loginFormRef = ref<FormInstance>()
const userStore = useUserStoreExternal()
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fileds) => {
    if (valid) {
      loading.value = true
      userStore
        .login(loginForm.value)
        .then(() => {
          loading.value = false
          //TODO 登录后的操作
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        })
    } else {
      console.log('error submit!', fileds)
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{ t('login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="t('login.username')"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :placeholder="t('login.password')"
          name="password"
          :type="passwordType"
        />
        <span class="show-pwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin(loginFormRef)"
        >{{ t('login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="t('login.desc')"></div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper {
        background-color: transparent;
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
      }

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: none;
}
</style>
