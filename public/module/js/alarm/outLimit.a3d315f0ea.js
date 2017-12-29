webpackJsonp([23],{301:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(122),l=r(n),i=a(123),s=r(i),o=a(124),u=r(o),d=a(125),c=r(d),p=a(126),h=r(p),f=a(0),m=r(f),y=a(127),S=r(y),b=a(79),M=a(342),k=r(M),g=a(341),w=function(e){function t(e){(0,s.default)(this,t);var a=(0,c.default)(this,(t.__proto__||(0,l.default)(t)).call(this,e));return a.state={columns:[{title:"车辆ID",data:"code"},{title:"是否离线",data:"isOnline"},{title:"上报时间",data:"beginTime",render:b.dtUtils.renderDateTime},{title:"车辆位置",data:"gpsStr"},{title:"目前状态",data:"inLimit"},{title:"剩余电量",data:"buttery"},{title:"处理状态",data:"handleProgress",render:function(e){return b.dtUtils.renderMap(e,g.batteryTreatmentState)}},{title:"操作",render:a.renderActions}],modalShow:!1,inputs:[],query:{handleProgress:"1",startTime:"",endTime:"",cityCode:"",businessState:"",keywords:""}},S.default.openDetails=a.openDetails.bind(a),a}return(0,h.default)(t,e),(0,u.default)(t,[{key:"renderActions",value:function(e,t,a){var r=[{text:"查看详情",onclick:"beefly.showMsg('"+a.userId+"')"},{text:"添加备注",onclick:"beefly.showMsg('"+a.userId+"')"},{text:"处理完成",onclick:"beefly.showMsg('"+a.userId+"')"},{text:"鸣笛",onclick:"beefly.showMsg('"+a.userId+"')"}];return b.dtUtils.renderActions(r,"dropdown")}},{key:"render",value:function(){var e=this,t=this.state,a=t.columns,r=t.query,n=t.modalShow;return m.default.createElement(b.Content,null,m.default.createElement(b.Box,{theme:"query"},m.default.createElement(b.Form,{inline:!0},m.default.createElement(b.Select,{ref:function(t){return e._handleProgress=t},label:"处理进度",options:g.batteryTreatmentState,wholeOption:{text:"未处理",value:"1"}}),m.default.createElement(b.CitySelect,{ref:function(t){return e._citySelect=t},label:"城市区域"}),m.default.createElement(b.DateRange,{ref:function(t){return e._dateRange=t},label:"注册时间"}),m.default.createElement(b.SelectInput,{ref:function(t){return e._selectInput=t},label:"车辆运营状态",selectOptions:g.alarmBikeState,placeholder:"车辆编号"}),m.default.createElement(b.Button,{btnTheme:"primary",btnSize:"sm",iconClass:"search",onClick:this.search.bind(this)},"查询")),m.default.createElement(b.DataTable,{columns:a,url:k.default.mifengSystem+"operBikePolice!outLimit.do",query:r})),m.default.createElement(b.Modal,{show:n,backdrop:!1},m.default.createElement(b.Map,{width:"100%",height:"400"})))}},{key:"search",value:function(){var e={handleProgress:this._handleProgress.value,startTime:this._dateRange.startDate,endTime:this._dateRange.endDate,cityCode:this._citySelect.cityCode,businessState:this._selectInput.selectValue,keywords:this._selectInput.inputValue};this.setState({query:e})}},{key:"openDetails",value:function(e){this.setState({modalShow:!0})}},{key:"signIn",value:function(){var e=this.state.inputs;e.push({num:e.length}),this.setState({inputs:e})}}]),t}(m.default.Component);t.default=w},341:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.orderFlowMap={0:"人工结束",1:"未取车",2:"已取车",3:"已结束",4:"已取消",9:"开锁中",10:"开锁失败"},t.orderTypeMap={0:"扫码",1:"预约"},t.partnerStateMap={0:"未充值",1:"正常",2:"已退出"},t.cashWithdrawalMap={0:"APP转账提现",1:"线下转账提现"},t.typeMap={11:"退出成功",12:"提现成功"},t.cashPledgeStateMap={0:"已支付",1:"已扣款",2:"提现中",3:"已提现"},t.paymentChannelMap={0:"支付宝",1:"微信"},t.withdrawalTypeMap={0:"App自动提现",1:"后台审核App提现",2:"后台转账提现",3:"App转账提现"},t.withdrawalStateMap={0:"提现中",1:"已提现",2:"提现失败"},t.bikeStateMap={0:"",1:"未入库",2:"库存中",3:"待上线",4:"待出租",5:"已预定",6:"已出租",7:"维护中",8:"返修中",9:"已报废",10:"已下线",11:"已暂时丢失",12:"欠压下线",14:"寻车中"},t.bikeOnlineStateMap={0:"离线",1:"在线"},t.bikeMotorLockStateMap={0:"停止",1:"运转"},t.bikeButteryStateMap={0:"未通电",1:"通电"},t.loadButteryStateMap={0:"否",1:"是"},t.batteryStateMap={0:"",1:"未入库",2:"待充电",3:"已充满",4:"领用中",5:"使用中",6:"回收中",7:"维修中",8:"已报废",9:"已暂时丢失"},t.batteryOnlineStateMap={0:"离线",1:"在线"},t.userStateMap={1:"黑名单用户",2:"VIP用户",3:"仅注册用户",4:"缴纳押金用户",5:"已退押金"},t.userDishonestyStateMap={0:"正常",1:"失信"},t.batteryTreatmentState={1:"未处理",2:"正在处理",3:"已发送地勤处理",4:"地勤处理中",5:"地勤已处理",6:"处理完成"},t.alarmBikeState={1:"运营中",2:"非运营中"},t.feedbackRole={1:"系统",2:"用户"},t.userSearchTypeMap={mobile:"手机号",userId:"用户ID",name:"用户名"},t.orderTimeMap={1:"下单时间",2:"结束时间"},t.orderSearchTypeMap={bikeCode:"车牌号",mobile:"手机号",orderId:"订单ID",name:"用户名"},t.cashPledgeSearchTypeMap={mobile:"手机号",name:"姓名",userId:"用户ID",sysTransNo:"商户订单号"},t.withDrawalSearchTypeMap={mobile:"手机号",name:"姓名",userId:"用户ID"},t.reportType={1:"车辆没电",2:"无法启动",3:"开锁失败",4:"续航不准确",5:"加速故障",6:"刹车故障",7:"鸣笛故障",8:"车灯故障",9:"脚蹬损坏",10:"车身有损伤",11:"车头损坏",12:"其它"},t.bikePoliceReasonMap={0:"无",1:"电量过低",2:"断电",3:"未启动有平移",4:"海拔过高",5:"翻倒"}},342:function(e,t,a){"use strict";var r={name:"production",dir:"official",mifengSystem:"http://59.110.29.195:8088/mifeng/system/"};e.exports=r}});