webpackJsonp([16],{314:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(122),l=n(r),i=a(123),d=n(i),s=a(124),u=n(s),p=a(125),o=n(p),c=a(126),h=n(c),f=a(0),m=n(f),y=a(127),w=n(y),M=a(79),S=a(342),b=n(S),T=a(341),_=function(e){function t(e){(0,d.default)(this,t);var a=(0,o.default)(this,(t.__proto__||(0,l.default)(t)).call(this,e));return a.state={columns:[{title:"提现编号",data:"applyId"},{title:"押金编号",data:"transId"},{title:"用户姓名",data:"userName"},{title:"手机号码",data:"userMobile"},{title:"充值时间",data:"tradeTime",render:M.dtUtils.renderDateTime},{title:"提现时间",data:"applyTime",render:M.dtUtils.renderDateTime},{title:"提现方式",data:"applyType",render:function(e){return M.dtUtils.renderMap(e,T.withdrawalTypeMap)}},{title:"提现状态",data:"dealState",render:function(e){return M.dtUtils.renderMap(e,T.withdrawalStateMap)}},{title:"提现途径",data:"applyChannel",render:function(e){return M.dtUtils.renderMap(e,T.paymentChannelMap)}},{title:"操作",render:a.renderActions}],modalShow:!1,inputs:[],query:{applyChannel:"",applyType:"",state:"",beginTime:"",endTime:"",keywords:"",conditionFlag:""}},w.default.openDetails=a.openDetails.bind(a),a}return(0,h.default)(t,e),(0,u.default)(t,[{key:"renderActions",value:function(e,t,a){var n=[{text:"详情",onclick:"beefly.showMsg('"+a.userId+"')"}];return M.dtUtils.renderActions(n)}},{key:"render",value:function(){var e=this,t=this.state,a=t.columns,n=t.query,r=t.modalShow;return m.default.createElement(M.Content,null,m.default.createElement(M.Box,{theme:"query"},m.default.createElement(M.Form,{inline:!0},m.default.createElement(M.Select,{ref:function(t){return e._withdrawalsType=t},label:"提现方式",options:T.withdrawalTypeMap,whole:!0}),m.default.createElement(M.Select,{ref:function(t){return e._cashwithdrawals=t},label:"提现途径",options:T.paymentChannelMap,whole:!0}),m.default.createElement(M.Select,{ref:function(t){return e._withdrawalsStatus=t},label:"提现状态",options:T.withdrawalStateMap,whole:!0}),m.default.createElement(M.DateRange,{ref:function(t){return e._dateRange=t},label:"时间选择"}),m.default.createElement(M.SelectInput,{ref:function(t){return e._selectInput=t},label:"模糊搜索",selectOptions:T.withDrawalSearchTypeMap}),m.default.createElement(M.Button,{icon:"search",onClick:this.search.bind(this)},"查询")),m.default.createElement("div",null,n.userStatusValue),m.default.createElement(M.DataTable,{columns:a,url:b.default.mifengSystem+"transaction!getWithdrawalsDepositList.do",query:n})),m.default.createElement(M.Modal,{show:r,backdrop:!1},m.default.createElement(M.Map,{width:"100%",height:"400"})))}},{key:"search",value:function(){var e={applyChannel:this._cashwithdrawals.value,applyType:this._withdrawalsType.value,state:this._withdrawalsStatus.value,beginTime:this._dateRange.startDate,endTime:this._dateRange.endDate,keywords:this._selectInput.inputValue,conditionFlag:this._selectInput.selectValue};this.setState({query:e})}},{key:"openDetails",value:function(e){this.setState({modalShow:!0})}},{key:"signIn",value:function(){var e=this.state.inputs;e.push({num:e.length}),this.setState({inputs:e})}}]),t}(m.default.Component);t.default=_},341:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.orderFlowMap={0:"人工结束",1:"未取车",2:"已取车",3:"已结束",4:"已取消",9:"开锁中",10:"开锁失败"},t.orderTypeMap={0:"扫码",1:"预约"},t.partnerStateMap={0:"未充值",1:"正常",2:"已退出"},t.cashWithdrawalMap={0:"APP转账提现",1:"线下转账提现"},t.typeMap={11:"退出成功",12:"提现成功"},t.cashPledgeStateMap={0:"已支付",1:"已扣款",2:"提现中",3:"已提现"},t.paymentChannelMap={0:"支付宝",1:"微信"},t.withdrawalTypeMap={0:"App自动提现",1:"后台审核App提现",2:"后台转账提现",3:"App转账提现"},t.withdrawalStateMap={0:"提现中",1:"已提现",2:"提现失败"},t.bikeStateMap={0:"",1:"未入库",2:"库存中",3:"待上线",4:"待出租",5:"已预定",6:"已出租",7:"维护中",8:"返修中",9:"已报废",10:"已下线",11:"已暂时丢失",12:"欠压下线",14:"寻车中"},t.bikeOnlineStateMap={0:"离线",1:"在线"},t.bikeMotorLockStateMap={0:"停止",1:"运转"},t.bikeButteryStateMap={0:"未通电",1:"通电"},t.loadButteryStateMap={0:"否",1:"是"},t.batteryStateMap={0:"",1:"未入库",2:"待充电",3:"已充满",4:"领用中",5:"使用中",6:"回收中",7:"维修中",8:"已报废",9:"已暂时丢失"},t.batteryOnlineStateMap={0:"离线",1:"在线"},t.userStateMap={1:"黑名单用户",2:"VIP用户",3:"仅注册用户",4:"缴纳押金用户",5:"已退押金"},t.userDishonestyStateMap={0:"正常",1:"失信"},t.batteryTreatmentState={1:"未处理",2:"正在处理",3:"已发送地勤处理",4:"地勤处理中",5:"地勤已处理",6:"处理完成"},t.alarmBikeState={1:"运营中",2:"非运营中"},t.feedbackRole={1:"系统",2:"用户"},t.userSearchTypeMap={mobile:"手机号",userId:"用户ID",name:"用户名"},t.orderTimeMap={1:"下单时间",2:"结束时间"},t.orderSearchTypeMap={bikeCode:"车牌号",mobile:"手机号",orderId:"订单ID",name:"用户名"},t.cashPledgeSearchTypeMap={mobile:"手机号",name:"姓名",userId:"用户ID",sysTransNo:"商户订单号"},t.withDrawalSearchTypeMap={mobile:"手机号",name:"姓名",userId:"用户ID"},t.reportType={1:"车辆没电",2:"无法启动",3:"开锁失败",4:"续航不准确",5:"加速故障",6:"刹车故障",7:"鸣笛故障",8:"车灯故障",9:"脚蹬损坏",10:"车身有损伤",11:"车头损坏",12:"其它"},t.bikePoliceReasonMap={0:"无",1:"电量过低",2:"断电",3:"未启动有平移",4:"海拔过高",5:"翻倒"}},342:function(e,t,a){"use strict";var n={name:"production",dir:"official",mifengSystem:"http://59.110.29.195:8088/mifeng/system/"};e.exports=n}});