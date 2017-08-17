
//点击提交

$('#myform button').click(function(e){
	var username=$('#username ').val(); //用户名
	var password=$('#password ').val(); //密码
	var email=$('#email ').val(); //邮箱

	$.ajax({
		url:'/register',
		type:'post',
		data:{
			username,
			password,
			email
		},
		success:function(data){
			if(data=='ok'){
				alert('注册成功，请尽快邮箱激活');
			}
		}
	});

});