$(function(){
    //1.点击去注册账号
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //2.从layui 中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verity() 函数自定义校验规则
    form.verify({
        //s属性的值可以是数组,也可以是函数
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
        //校验两次密码是否一致的规则
        repwd : function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败,则return一个提示消息即可
            
            if($('#reg-pwd').val() !== value){
                return '两次密码不一致!'
            }
        }
    });

    //3.注册功能
    $('#form_reg').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data: {
                //data:$('#form_reg').serialize()
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val()
            },
            success:function(res){
                //注册失败校验
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                //注册成功提示
                layer.msg('注册成功,请登录!')
                //模拟人为点击
                $('#link_login').click()
                //清空表单,reset()是dom方法 所以用一个[0]来转换
                $('#form_reg')[0].reset();
            }
        })
    })

    //登录功能
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                //将登录成功得到的token字符串保存到localStroage
                localStorage.setItem('token',res.token)
                // console.log(res.token);
                location.href = '/index.html'
            }
        })
    })

})