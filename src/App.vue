<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}

// onLaunch(async () => {
//   // 先尝试静默登录
//   const { code } = await wx.login()
//   const { token, isNew } = await post('/customer/silent', { code })

//   uni.setStorageSync('TOKEN', token)

//   if (isNew) {
//     // 没注册过
//     uni.reLaunch({ url: '/pages/register/index' })
//   } else {
//     // 已注册过
//     uni.reLaunch({ url: '/pages/index/index' })
//   }
// })

</script>

<style>
/*每个页面公共css */
</style>
