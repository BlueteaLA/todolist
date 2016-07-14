$(function(){
	// 获取所操作的元素
	var $title=$(".header .main-header .title");
	var $msg=$(".header .main-header .msg");
	var $doing=$(".content .doing");
	var $done=$(".content .done");
	var $doingMsg=$(".content span").eq(0);
	var $doneMsg=$(".content span").eq(1);
	// $title.blur(function(){
	// 	if($title.val().length==0){
	// 		$msg.css({display:"block"})
	// 	}
	// })
	// $title.focus(function(){
	// 	$msg.css({display:"none"})
	// })


	// 本地存储
	var local=[];
	var num=0;
	
	// 当按下键盘时判断
	$(window).keydown(function(e){
		var ev=e||window.event;
		// 按下回车时
		if(ev.keyCode==13){
			// 内容不能为空
			if($title.val().length==0){
				// 提示框出现
				$msg.css({display:"block"});
				return;
			}else{
				// 提示框消失
				$msg.css({display:"none"});
				// 获取当前输入框中的内容
				var $things=$title.val();
				// 清空输入框
				$title.val("");
				


				// 本地存储
				var obj={};
				obj.num=num;
				obj.id="a"+num;
				obj.title=$things;
				obj.doing=true;
				obj.done=false;
				local.push(obj);
				num++;



				// 创建doing的li
				var str="<li id="+obj.id+"><input type='checkbox'><p contenteditable>"+$things+"</p><a href='javascript:;'>-</a></li>";
				// 将li插入页面中
				$doing.append(str);
				doingMsg();


				// 加入本地存储
				setstorage(local);
			}
		}
	})

	// 正在进行删除
	$(".doing").delegate("a","click",function(){
		var $ids=$(this).parent().attr("id");
		$ids=$ids.slice(-1);
		local.splice($ids,1);
		$(this).parent().remove();
		doingMsg();
		// 加入本地存储
		setstorage(local);
	})
	// 正在进行到已经完成
	$(".doing").delegate("input[type=checkbox]","click",function(){
		var $ids=$(this).parent().attr("id");
		$ids=$ids.slice(-1);
		for(var i=0;i<local.length;i++){
			if(local[i].num==$ids){
				local[i].doing=false;
				local[i].done=true;
			}
		}
		var done=$(this).parent();
		$done.append(done);
		doingMsg();
		doneMsg();
		// 加入本地存储
		setstorage(local);
	})
	// 正在进行内容修改
	$(".doing").delegate("p","click",change);


	// 已经完成删除
	$(".done").delegate("a","click",function(){
		var $ids=$(this).parent().attr("id");
		$ids=$ids.slice(-1);
		local.splice($ids,1);
		$(this).parent().remove();
		doneMsg();
		// 加入本地存储
		setstorage(local);
	})
	// 已经完成到正在进行
	$(".done").delegate("input[type=checkbox]","click",function(){
		var $ids=$(this).parent().attr("id");
		$ids=$ids.slice(-1);
		for(var i=0;i<local.length;i++){
			if(local[i].num==$ids){
				local[i].doing=true;
				local[i].done=false;
			}
		}
		var doing=$(this).parent();
		$doing.append(doing);
		doingMsg();
		doneMsg();
		// 加入本地存储
		setstorage(local);
	})
	// 已经完成内容修改
	$(".done").delegate("p","click",change);



	// 正在进行提示数量
	function doingMsg(){
		// 获取li的个数
		var $doingLis=$("li",$doing);
		// span标签修改个数
		$doingMsg.html($doingLis.length);
	}


	// 已经完成提示数量
	function doneMsg(){
		// 获取li的个数
		var $doneLis=$("li",$done);
		// span标签修改个数
		$doneMsg.html($doneLis.length);
	}


	// 修改内容
	function change(){
		var parent=$(this).parent();
		var oldVal=$(this).html();
		var input=$("<input>");
		input.val(oldVal);
		input.blur(function(){
			var newVal=$(this).val();
			var p=$("<p>");
			p.html(newVal);
			$(this).remove();
			parent.append(p);

			// local
			var $ids=parent.attr("id");
			$ids=$ids.slice(-1);
			for(var i=0;i<local.length;i++){
				if(local[i].num==$ids){
					local[i].title=newVal;
				}
			}
		})
		$(this).remove();
		parent.append(input);
		console.log(local)

		// 加入本地存储
		setstorage(local);
	}
	


	function setstorage(local){
		localStorage.setItem("message",JSON.stringify(local));
	}
	
	// function getData(){}
	// var ll=localStorage.getItem("message")
	// alert(typeof ll)
	// var jx=eval("("+ll+")")
	// console.log(jx)





	var ll=JSON.parse(localStorage.getItem("message"))
	console.log(ll)

})