// window.onload=function(){
	var title=document.querySelector(".header .main-header .title");
	var msg=document.querySelector(".header .main-header .msg");
	var doing=document.querySelector(".content .doing");
	var done=document.querySelector(".content .done");
	var doingMsg=document.querySelectorAll(".content span")[0];
	var doneMsg=document.querySelectorAll(".content span")[1];
	var clear=document.querySelector(".footer a");

	reload();

	// 清除本地存储
	clear.onclick=function(){
		clearData();
		reload();
	}

	// 当按下键盘时判断
	document.onkeydown=function(e){
		var ev=e||window.event;
		if(ev.keyCode==13){
			// 内容不能为空
			if(title.value.length==0){
				// 提示框出现
				msg.style.display="block";
				return;
			}
			// 提示框消失
			msg.style.display="none";
			// 获取当前输入框中的内容
			var things=title.value;
			// 清空输入框
			title.value="";
			// 本地存储
			var local=getData();
			local.push({
				title:things,
				status:false
			})
			saveData(local)
			reload();
		}
	}

	function getData(){
		return JSON.parse(localStorage.getItem("todos"))||[];
	}

	function saveData(data){
		localStorage.setItem("todos",JSON.stringify(data));
	}

	function clearData(){
		localStorage.clear();
	}

	function reload(){
		var local=getData();
		var doingList="";
		var doneList="";
		var doingNum=0;
		var doneNum=0;
		for(var i=0;i<local.length;i++){
			if(local[i].status==false){
				// 正在进行
				doingList+="<li><input type='checkbox' onclick=changeStatus("+i+",true)><p contenteditable onblur=changeText("+i+",this.innerHTML)>"+local[i].title+"</p><a href='javascript:;' onclick=del("+i+")>-</a></li>";
				doingNum++;
			}else if(local[i].status==true){
				// 已经完成
				doneList+="<li><input type='checkbox' onclick=changeStatus("+i+",false) checked><p contenteditable onblur=changeText("+i+",this.innerHTML)>"+local[i].title+"</p><a href='javascript:;' onclick=del("+i+")>-</a></li>";
				doneNum++;
			}
		}
		doing.innerHTML=doingList;
		doingMsg.innerHTML=doingNum;
		done.innerHTML=doneList;
		doneMsg.innerHTML=doneNum;
	}

	function changeStatus(i,sta){
		var local=getData();
		local[i].status=sta;
		saveData(local);
		reload();
	}

	function changeText(i,text){
		var local=getData();
		local[i].title=text;
		saveData(local);
	}

	function del(i){
		var local=getData();
		// local[i].status=sta;
		local.splice(i,1);
		saveData(local);
		reload();
	}
// }