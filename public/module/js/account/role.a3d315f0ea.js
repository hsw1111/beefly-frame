webpackJsonp([42],{290:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(122),r=a(l),u=n(123),i=a(u),s=n(124),o=a(s),d=n(125),c=a(d),f=n(126),m=a(f),h=n(0),p=a(h),y=n(127),b=a(y),v=n(79),k=n(342),w=a(k),S=function(e){function t(e){(0,i.default)(this,t);var n=(0,c.default)(this,(t.__proto__||(0,r.default)(t)).call(this,e));return n.state={columns:[{title:"用户编号",data:"id"},{title:"角色名称",data:"name"},{title:"创建时间",data:"createTime",render:v.dtUtils.renderDateTime},{title:"角色说明",data:"description"},{title:"操作",render:n.renderActions}],modalShow:!1,inputs:[],query:{keywords:""}},b.default.openDetails=n.openDetails.bind(n),n}return(0,m.default)(t,e),(0,o.default)(t,[{key:"renderActions",value:function(e,t,n){return'<button value="菜单权限" class="btn btn-xs btn-danger" onclick="beefly.openDetails(\''+n.userId+"')\">菜单权限</button>"}},{key:"render",value:function(){var e=this,t=this.state,n=t.columns,a=t.query,l=t.modalShow;return p.default.createElement(v.Content,null,p.default.createElement(v.Box,{theme:"query"},p.default.createElement(v.Form,{inline:!0},p.default.createElement(v.Input,{ref:function(t){return e.keywords=t},placeholder:"角色名称",label:"关键字"}),p.default.createElement(v.Button,{btnTheme:"primary",btnSize:"sm",iconClass:"search",onClick:this.search.bind(this)},"查询")),p.default.createElement(v.DataTable,{columns:n,url:w.default.mifengSystem+"role!queryPage.do",query:a})),p.default.createElement(v.Modal,{show:l,backdrop:!1},p.default.createElement(v.Map,{width:"100%",height:"400"})))}},{key:"search",value:function(){var e={keywords:this.keywords.value};this.setState({query:e})}},{key:"openDetails",value:function(e){this.setState({modalShow:!0})}},{key:"signIn",value:function(){var e=this.state.inputs;e.push({num:e.length}),this.setState({inputs:e})}}]),t}(p.default.Component);t.default=S},342:function(e,t,n){"use strict";var a={name:"production",dir:"official",mifengSystem:"http://59.110.29.195:8088/mifeng/system/"};e.exports=a}});