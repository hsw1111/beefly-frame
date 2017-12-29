webpackJsonp([34],{332:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(122),n=r(i),l=a(123),d=r(l),o=a(124),p=r(o),u=a(125),s=r(u),c=a(126),h=r(c),m=a(0),f=r(m),M=a(79),b=a(341),y=function(e){function t(e){(0,d.default)(this,t);var a=(0,s.default)(this,(t.__proto__||(0,n.default)(t)).call(this,e));return a.state={columns:[{title:"用户编号",data:"partnerUserInfoId",width:"8%"},{title:"姓名",data:"partnerName",width:"8%"},{title:"手机号码",data:"mobile",width:"10%"},{title:"生效时间",data:"effectiveTime",width:"18%",render:M.dtUtils.renderDateTime},{title:"退出时间",data:"endTime",width:"18%",render:M.dtUtils.renderDateTime},{title:"持续天数(天)",data:"money",width:"10%"},{title:"退出返还金额(元)",data:"money",width:"10%"},{title:"提现方式",data:"cashWithdrawal",width:"10%",render:function(e){return M.dtUtils.renderMap(e,b.cashWithdrawalMap)}},{title:"提现状态",data:"type",width:"10%",render:function(e){return M.dtUtils.renderMap(e,b.typeMap)}}]},a}return(0,h.default)(t,e),(0,p.default)(t,[{key:"render",value:function(){var e=this,t=this.state.columns;return f.default.createElement(M.Box,{theme:"query"},f.default.createElement(M.Form,{inline:!0},f.default.createElement(M.Input,{ref:function(t){return e.mobile=t},placeholder:"手机号",label:"手机号"}),f.default.createElement(M.Input,{label:"姓名",placeholder:"姓名"}),f.default.createElement(M.Button,{btnTheme:"primary",btnSize:"sm",iconClass:"search",onClick:this.search.bind(this)},"查询")),f.default.createElement(M.DataTable,{ref:function(t){return e.dataTable=t},columns:t,ajax:this.ajax.bind(this)}))}},{key:"ajax",value:function(e,t){var a=this.mobile.value;M.dtUtils.query("partnerManager!withdrawWithdrawalsPage.do",{conditionFlag:"mobile",keywords:a,partnerState:"",startTime:"",endTime:""},e,t)}},{key:"search",value:function(){this.dataTable.refresh()}}]),t}(f.default.Component);t.default=y},341:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.orderFlowMap={0:"人工结束",1:"未取车",2:"已取车",3:"已结束",4:"已取消",9:"开锁中",10:"开锁失败"},t.orderTypeMap={0:"扫码",1:"预约"},t.partnerStateMap={0:"未充值",1:"正常",2:"已退出"},t.cashWithdrawalMap={0:"APP转账提现",1:"线下转账提现"},t.typeMap={11:"退出成功",12:"提现成功"},t.cashPledgeStateMap={0:"已支付",1:"已扣款",2:"提现中",3:"已提现"},t.paymentChannelMap={0:"支付宝",1:"微信"},t.withdrawalTypeMap={0:"App自动提现",1:"后台审核App提现",2:"后台转账提现",3:"App转账提现"},t.withdrawalStateMap={0:"提现中",1:"已提现",2:"提现失败"},t.bikeStateMap={0:"",1:"未入库",2:"库存中",3:"待上线",4:"待出租",5:"已预定",6:"已出租",7:"维护中",8:"返修中",9:"已报废",10:"已下线",11:"已暂时丢失",12:"欠压下线",14:"寻车中"},t.bikeOnlineStateMap={0:"离线",1:"在线"},t.bikeMotorLockStateMap={0:"停止",1:"运转"},t.bikeButteryStateMap={0:"未通电",1:"通电"},t.loadButteryStateMap={0:"否",1:"是"},t.batteryStateMap={0:"",1:"未入库",2:"待充电",3:"已充满",4:"领用中",5:"使用中",6:"回收中",7:"维修中",8:"已报废",9:"已暂时丢失"},t.batteryOnlineStateMap={0:"离线",1:"在线"},t.userStateMap={1:"黑名单用户",2:"VIP用户",3:"仅注册用户",4:"缴纳押金用户",5:"已退押金"},t.userDishonestyStateMap={0:"正常",1:"失信"},t.batteryTreatmentState={1:"未处理",2:"正在处理",3:"已发送地勤处理",4:"地勤处理中",5:"地勤已处理",6:"处理完成"},t.alarmBikeState={1:"运营中",2:"非运营中"},t.feedbackRole={1:"系统",2:"用户"},t.userSearchTypeMap={mobile:"手机号",userId:"用户ID",name:"用户名"},t.orderTimeMap={1:"下单时间",2:"结束时间"},t.orderSearchTypeMap={bikeCode:"车牌号",mobile:"手机号",orderId:"订单ID",name:"用户名"},t.cashPledgeSearchTypeMap={mobile:"手机号",name:"姓名",userId:"用户ID",sysTransNo:"商户订单号"},t.withDrawalSearchTypeMap={mobile:"手机号",name:"姓名",userId:"用户ID"},t.reportType={1:"车辆没电",2:"无法启动",3:"开锁失败",4:"续航不准确",5:"加速故障",6:"刹车故障",7:"鸣笛故障",8:"车灯故障",9:"脚蹬损坏",10:"车身有损伤",11:"车头损坏",12:"其它"},t.bikePoliceReasonMap={0:"无",1:"电量过低",2:"断电",3:"未启动有平移",4:"海拔过高",5:"翻倒"}}});