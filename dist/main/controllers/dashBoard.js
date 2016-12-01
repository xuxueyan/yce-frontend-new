define(["echarts"],function(e){return function($scope,$http,atomicNotifyService){var t={orgId:localStorage.orgId},a=yce.api.dashBoard.resourceList($http,t);$scope.complete=0,utils.responseHandler(a,function(t){0==t.code?($scope.resourceDom=JSON.parse(t.data),$scope.complete++):atomicNotifyService.error("获取资源失败!",2e3),$scope.$on("resourceFinished",function(){angular.forEach($scope.resourceDom,function(t,a,o){e.init(document.getElementById("resourceDom"+t.dcId)).setOption({backgroundColor:"#fff",title:{text:t.dcName,left:"center",top:20,textStyle:{fontSize:16}},color:["#FFCC99","#B0E0E6","#D2691E","#6495ED"],tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",left:5,top:10,data:["CPU已用","CPU未用","内存已用","内存未用"]},series:[{name:"内存使用率",type:"pie",selectedMode:"single",radius:[0,"25%"],labelLine:{normal:{length:3,length2:3}},data:[{value:t.mem.used,name:"内存已用"},{value:t.mem.total-t.mem.used,name:"内存未用"}]},{name:"CPU使用率",type:"pie",radius:["50%","60%"],data:[{value:t.cpu.used,name:"CPU已用"},{value:t.cpu.total-t.cpu.used,name:"CPU未用"}]}]})})})});var o=yce.api.dashBoard.applymentList($http,t);utils.responseHandler(o,function(t){0==t.code?($scope.applyDom=JSON.parse(t.data),$scope.complete++):atomicNotifyService.error("获取应用失败",2e3),$scope.$on("applyFinished",function(){angular.forEach($scope.applyDom,function(t,a){var o=t.deploymentName,r=[],n=[],i=[];angular.forEach(t.podName,function(e){e=e.substring(e.length-5),r.push(e),n.push({source:e,target:o})}),r.push(o),angular.forEach(r,function(e,t,a){t==a.length-1?i.push({name:e,itemStyle:{normal:{color:"#D2691E"}}}):i.push({name:e,itemStyle:{normal:{color:"#6495ED"}}})}),e.init(document.getElementById("applyDom"+a)).setOption({backgroundColor:"#fff",title:{text:t.dcName,left:10,top:20,textStyle:{fontSize:16}},series:[{type:"graph",roam:"move",draggable:!0,symbolSize:20,layout:"force",force:{repulsion:500},label:{normal:{show:!0,position:"top"}},data:i,links:n,lineStyle:{normal:{opacity:.9,width:2,curveness:0}}}]})})})});var r=yce.api.dashBoard.handleList($http,t);utils.responseHandler(r,function(t){if(0==t.code){var a=JSON.parse(t.data);$scope.complete++,e.init(document.getElementById("handleDom")).setOption({backgroundColor:"#fff",title:{text:"操作",x:"center",top:20,textStyle:{fontSize:16}},color:["#616eb7","#31b0d5","#FFC107","#4CAF50","#f44336"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{orient:"vertical",left:10,top:10,data:["发布","扩容","滚动升级","回滚","删除"]},grid:{width:"600px",height:"300px",left:"17%",containLabel:!0},xAxis:[{type:"category",data:a.date}],yAxis:[{type:"value"}],series:[{name:"发布",type:"bar",barWidth:5,data:a.statistics.online},{name:"扩容",type:"bar",barWidth:5,data:a.statistics.scale},{name:"滚动升级",type:"bar",barWidth:5,data:a.statistics.rollingupgrade},{name:"回滚",type:"bar",barWidth:5,data:a.statistics.rollback},{name:"删除",type:"bar",barWidth:5,data:a.statistics.delete}]})}else atomicNotifyService.error("获取操作失败",2e3)})}});