<script lang="ts" setup>
const error = useError();
const { t } = useI18n({ useScope: 'local' });
const status = computed(() =>
  (error.value as { statusCode: number })?.statusCode === 404 ? 404 : 500
);

const handleError = () => {
  if (status.value === 404) {
    location.href = '/';
  } else {
    location.reload();
  }
};
</script>

<template lang="pug">
.d-flex.flex-column.justify-center.h-screen.gap-4
    .d-flex.justify-center
        img.mw-100(src="/images/404.png")
    .d-flex.align-center.flex-column
        .text-h6.font-weight-bold.text-uppercase {{ t(status + "Title") }}
        .text {{ t(status + "Desc") }}
        v-btn.mt-3(color="black" @click="handleError") {{ t(status + "Btn") }}
</template>

<i18n lang="json">
{
  "en": {
    "404Title": "404 - Page not found",
    "404Desc": "The page you are looking is not existed",
    "500Title": "500 - Internal server error",
    "500Desc": "Something went wrong, try reload this page or contact to administrator",
    "404Btn": "Go to home",
    "500Btn": "Reload page"
  },
  "vi": {
    "404Title": "404 - Không tìm thấy trang",
    "404Desc": "Trang bạn đang tìm kiếm không tồn tại",
    "500Title": "500 - Lỗi máy chủ",
    "500Desc": "Có lỗi xảy ra, vui lòng tải lại trang hoặc liên hệ quản trị viên",
    "404Btn": "Trở về trang chủ",
    "500Btn": "Tải lại trang"
  },
  "jp": {
    "404Title": "404 - ページが見つかりません",
    "404Desc": "探しているページは存在しません",
    "500Title": "500 - 内部サーバーエラー",
    "500Desc": "問題が発生しました。このページを再読み込みするか、管理者に問い合わせてください。",
    "404Btn": "家に帰る",
    "500Btn": "ページをリロードする"
  }
}
</i18n>
