(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2441d43a"],{"444d":function(t,a,e){"use strict";var i=e("c71c"),s=e.n(i);s.a},"58af":function(t,a,e){"use strict";var i=e("de75"),s=e.n(i);s.a},"5b81":function(t,a,e){"use strict";var i=e("f0a0"),s=e.n(i);s.a},"5cac":function(t,a,e){"use strict";var i=e("f282"),s=e.n(i);s.a},"89e2":function(t,a,e){},c71c:function(t,a,e){},c9d4:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"filter"},[e("TraceFilter",{on:{submit:t.submit}})],1),e("div",{staticClass:"jenkins"},[e("jenkins-info",{attrs:{"job-name":"trade.testhuamou.com"},on:{feedback:t.getJenkinsFeedback}})],1)]),t._l(t.codeData.detailList,function(t){return e("div",[e("git-code-viewer",{attrs:{data:t}})],1)})],2)},s=[],n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"git-code-viewer"},[e("va-card",{staticClass:"git-file",attrs:{title:t.data.newPath}},t._l(t.data.codeBlockList,function(t){return e("code-block",{attrs:{data:t}})}),1)],1)},o=[],r=e("8fb3"),c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"code-block"},t._l(t.data.lineList,function(t){return e("div",{staticClass:"code-line"},[e("code-line",{attrs:{data:t}})],1)}),0)},l=[],d=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"d-inline-flex"},[e("div",{staticClass:"xs1 d-inline-flex"},[e("div",{staticClass:"line-number old-line",style:t.autoColor(t.data,t.bTrue)},[t._v(t._s(t.showLine(!1)))]),e("div",{staticClass:"line-number",style:t.autoColor(t.data,t.bTrue)},[t._v(t._s(t.showLine(!0)))])]),e("div",{staticClass:"xs11 code",style:t.autoColor(t.data,t.bFalse)},[t._v(t._s(t.showCode()))])])},u=[],f=(e("a481"),{name:"codeLine",props:{data:Object},data:function(){return{bTrue:!0,bFalse:!1}},methods:{showLine:function(t){return this.data.locate?"...":t?"undefined"===typeof this.data?"":this.data.newLineNum:"undefined"===typeof this.data?"":this.data.oldLineNum},showCode:function(){return this.data.newAdd?"+ "+this.data.code.replace(/\s/g," "):this.data.newDelete?"- "+this.data.code.replace(/\s/g," "):this.data.origin?"  "+this.data.code.replace(/\s/g," "):this.data.locate?this.data.code.replace(/\s/g," "):void 0},autoColor:function(t,a){return t.origin?"background-color:"+(a?"rgba(0,0,0,0.05)":"white"):t.newAdd?"background-color: #DBFFDB":t.newDelete?"background-color: #FFD3D3":t.locate?"background-color: rgba(0,0,0,0.05); color:lightgrey":void 0}}}),m=f,v=(e("d670"),e("2877")),b=Object(v["a"])(m,d,u,!1,null,"48fea344",null),p=b.exports,h={name:"codeBlock",components:{CodeLine:p},props:{data:Object}},C=h,g=(e("5b81"),Object(v["a"])(C,c,l,!1,null,"2e4319fa",null)),k=g.exports,x={name:"gitCodeViewer",components:{CodeBlock:k,VaCard:r["a"]},props:{data:Object},data:function(){return{theData:this.data}}},w=x,V=(e("58af"),Object(v["a"])(w,n,o,!1,null,"2818e51a",null)),j=V.exports,D=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("va-card",{attrs:{id:"jenkins-info",title:"Jenkins Info"}},[e("div",{staticClass:"card-body-content"},[e("div",{staticClass:"va-row row"},[e("div",{staticClass:"jenkins-input-long"},[e("va-input",{attrs:{label:"任务名称"},model:{value:t.data.jobName,callback:function(a){t.$set(t.data,"jobName",a)},expression:"data.jobName"}})],1),e("div",{staticClass:"jenkins-input"},[e("va-input",{staticClass:"xs1",attrs:{label:"分支"},model:{value:t.data.branch,callback:function(a){t.$set(t.data,"branch",a)},expression:"data.branch"}})],1),e("div",{staticClass:"jenkins-input"},[e("va-input",{staticClass:"xs1",attrs:{label:"构建序号"},model:{value:t.data.lastSuccessfulBuild,callback:function(a){t.$set(t.data,"lastSuccessfulBuild",a)},expression:"data.lastSuccessfulBuild"}})],1)]),e("div",{staticClass:"va-row row"},[e("div",{staticClass:"jenkins-input-long"},[e("va-input",{staticClass:"xs2",attrs:{label:"当前最新已构建Git版本"},model:{value:t.data.gitVersion,callback:function(a){t.$set(t.data,"gitVersion",a)},expression:"data.gitVersion"}})],1),e("div",{staticClass:"jenkins-input"},[e("va-input",{staticClass:"xs2",attrs:{label:"构建者"},model:{value:t.data.builder,callback:function(a){t.$set(t.data,"builder",a)},expression:"data.builder"}})],1),e("div",{staticClass:"jenkins-input"},[e("va-input",{staticClass:"xs2",attrs:{label:"构建时间"},model:{value:t.showTime,callback:function(a){t.showTime=a},expression:"showTime"}})],1)])])])},_=[],I=e("7a71"),$=e("4360"),F={name:"JenkinsInfo",components:{VaInput:I["a"],VaCard:r["a"]},props:{jobName:{type:String,required:!0}},data:function(){return{data:"",timer:""}},watcher:{jobName:function(){this.getInfo()}},computed:{showTime:function(){return $["a"].getters.getShortFormatDate(this.data.buildTime)}},methods:{getInfo:function(){var t=this;this.$axios.post("/jenkins/getInfo",{jobName:this.jobName}).then(function(a){a.data.success&&(t.data=a.data.data,t.$emit("feedback",{data:t.data}))})}},created:function(){var t=this;this.getInfo(),this.timer=setInterval(function(){t.getInfo()},6e4)},destroyed:function(){clearInterval(this.timer)}},T=F,y=(e("444d"),Object(v["a"])(T,D,_,!1,null,"d188e594",null)),L=y.exports,B=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"trace-filter"}},[e("va-card",{attrs:{title:"Filter"}},[e("div",{staticClass:"card-body-content"},[e("div",{staticClass:"va-row row "},[e("div",{staticClass:"filter-text"},[t._v("增量代码:")]),e("va-input",{attrs:{label:"From Commit",placeholder:"必填，不包含输入版本"},model:{value:t.fromVersion,callback:function(a){t.fromVersion=a},expression:"fromVersion"}}),e("va-input",{staticClass:"version-input",attrs:{label:"To Commit",placeholder:"非必填，为空则默认为最新版本"},model:{value:t.toVersion,callback:function(a){t.toVersion=a},expression:"toVersion"}})],1),e("div",{staticClass:"row"},[e("div",{staticClass:"filter-text"},[t._v("测试追踪:")]),e("va-date-picker",{staticClass:"date-picker",attrs:{label:"from date",config:t.dateConfig},model:{value:t.fromDate,callback:function(a){t.fromDate=a},expression:"fromDate"}}),e("va-date-picker",{staticClass:"date-picker",attrs:{label:"to date",config:t.dateConfig},model:{value:t.toDate,callback:function(a){t.toDate=a},expression:"toDate"}}),e("va-input",{staticClass:"param-regex-input",attrs:{label:"Param Regex"},model:{value:t.paramRegex,callback:function(a){t.paramRegex=a},expression:"paramRegex"}}),e("va-button",{on:{click:t.submit}},[t._v("Submit")])],1)])])],1)},N=[],O=e("2e27"),J=e("42fb"),R=e("0932"),S={name:"TraceFilter",components:{VaCard:r["a"],VaButton:R["a"],VaDatePicker:J["a"],VaInput:I["a"],VaSelect:O["a"]},props:{},data:function(){return{fromVersion:"",toVersion:"",fromDate:"",toDate:"",paramRegex:"",commitList:[],dateConfig:{enableTime:!0}}},watch:{},methods:{submit:function(){""!==this.fromVersion?this.$emit("submit",{fromVersion:this.fromVersion,toVersion:this.toVersion,fromDate:this.fromDate,toDate:this.toDate,paramRegex:this.paramRegex}):this.$swal({type:"error",confirmButtonColor:"#4ae387",text:"请选择起始 From Commit"})}}},E=S,P=(e("eee7"),Object(v["a"])(E,B,N,!1,null,"3863f23a",null)),A=P.exports,G={name:"demo",components:{TraceFilter:A,JenkinsInfo:L,GitCodeViewer:j},data:function(){return{commitList:[],codeData:"",gitId:542,jenkinsInfo:""}},methods:{submit:function(t){var a=this,e=""===t.toVersion?this.jenkinsInfo.gitVersion:t.toVersion;e!==t.fromVersion?this.$axios.post("/git/getIncreasedCode",{gitId:this.gitId,fromVersion:t.fromVersion,toVersion:e}).then(function(t){a.codeData=t.data.data}):this.$swal({type:"error",confirmButtonColor:"#4ae387",text:"From Commit 不能与当前Jenkins最新版本一致，两者无差异"})},getJenkinsFeedback:function(t){this.jenkinsInfo=t.data}}},q=G,z=(e("5cac"),Object(v["a"])(q,i,s,!1,null,"23e3a636",null));a["default"]=z.exports},d042:function(t,a,e){},d670:function(t,a,e){"use strict";var i=e("d042"),s=e.n(i);s.a},de75:function(t,a,e){},eee7:function(t,a,e){"use strict";var i=e("89e2"),s=e.n(i);s.a},f0a0:function(t,a,e){},f282:function(t,a,e){}}]);
//# sourceMappingURL=chunk-2441d43a.3f804e6e.js.map