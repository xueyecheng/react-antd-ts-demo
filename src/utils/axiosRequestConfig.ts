const config={
    //登录校验
    doLoginConfig:{
        method:'post',
        url:'/user/login'
    },
    //登录状态验证
    loginStateConfig:{
        method:'get',
        url:'/user/loginState'
    },
    //退出登录
    loginOutConfig:{
        method:'get',
        url:'/user/loginOut'
    }
}

export default config