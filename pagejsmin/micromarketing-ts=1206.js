﻿M.Page.MicroMarketingPage=M.createClass();M.extend(M.Page.MicroMarketingPage.prototype,{context:{},marketer_tpl:'<tr class="{{if status==2}}disable{{/if}}" tag="data" mid="${id}" type="${type}"><td>${createon}</td><td>${name}</td><td>${number}</td><td>${phone}</td><td>${commission}%</td><td>${cardcommission}%</td>'+'<td><a target="_blank" class="{{if status==2}}website{{/if}}" href="${url}">${url}</a></td>'+'<td>{{if is_mp==1}}已认证{{else}}未认证{{/if}}</td>'+'<td tag="op"><a href="#?" tag="edit">修改</a><a href="#?" tag="delete" class="ml10">删除</a>'+'<a href="#?" tag="stop" status="${status}" class="ml10">{{if status==1}}停用{{else}}启用{{/if}}</a></td></tr>',marketer_children_tpl:'<td>${createon}</td><td>${name}</td><td>${number}</td><td>${phone}</td><td>${commission}%</td><td>${cardcommission}%</td>'+'<td><a target="_blank" class="{{if status==2}}website{{/if}}" href="${url}">${url}</a></td>'+'<td><a href="#?" tag="edit" id="${id}">修改</a><a href="#?" tag="delete" class="ml10">删除</a>'+'<a href="#?" tag="stop" status="${status}" class="ml10">{{if status==1}}停用{{else}}启用{{/if}}</a></td>',tpl_page:'<li><a href="javascript:void(0);" tag="page" p="1">«</a></li>'
+'<li class="active"><a href="javascript:void(0);" title="">1</a></li>'
+'<li><a p="1" tag="page" href="javascript:void(0);">»</a></li>',init:function(){this.initDOM();this.initEvent();this.refreshMarketerList();},initDOM:function(){this.context.body=$(document.body);this.context.marketerlist=$("#marketerlist");this.context.waiteraccount=$("#waiteraccount");this.context.page=$("#pagelist");waiteraccount
this.context.loading=$("#loading");this.context.achievement=$("#achievement");this.context.achievementlist=$("#achievementlist");this.context.orderpage=$("#orderpage");this.context.orderloading=$("#orderloading");this.context.contactform=$("#contactform");this.context.otacontact=$("#otacontact");this.context.ordertype=$("#ordertype");this.context.datetype=$("#datetype");this.context.settleBtn=$("#settleBtn");this.context.cancelSettleBtn=$("#cancelSettleBtn");},initEvent:function(){this.context.body.bind("click",this.document_click.toEventHandler(this));this.context.marketerlist.bind("click",this.marketerlist_click.toEventHandler(this));this.context.waiteraccount.bind("click",this.waiteraccount_click.toEventHandler(this));this.context.page.bind("click",this.page_click.toEventHandler(this));this.context.orderpage.bind("click",this.orderpage_click.toEventHandler(this));this.context.achievement.bind("click",this.achievement_click.toEventHandler(this));this.context.achievementlist.bind("click",this.achievementlist_click.toEventHandler(this));this.context.achievementlist.find("input[name=fromdate]").datepicker({showOtherMonths:true,selectOtherMonths:true,onSelect:this.initdatepicker.toEventHandler(this)});this.context.achievementlist.find("input[name=enddate]").datepicker({showOtherMonths:true,selectOtherMonths:true});this.context.achievementlist.find("input[name=dateval]").bind("focus",this.dateval_focus.toEventHandler(this));this.context.otacontact.bind("click",this.otacontact_click.toEventHandler(this));this.context.settleBtn.bind('click',this.settleBtn_click.toEventHandler(this));this.context.cancelSettleBtn.bind('click',this.cancelSettleBtn_click.toEventHandler(this));},settleBtn_click:function(){var tpl=this.context.achievementlist.find("input[name=cb]:checked");if(tpl.length==0){alert("请选择订单！");return;}
M.Popup(this.context.settleStatePop,{"dragable":false,"hideclass":"modal fade","showclass":"modal sm fade deletemember in"},function(){}.toEventHandler(this));},cancelSettleBtn_click:function(){var tpl=this.context.achievementlist.find("input[name=cb]:checked");if(tpl.length==0){alert("请选择订单！");return;}
M.Popup(this.context.cancelSettleStatePop,{"dragable":false,"hideclass":"modal fade","showclass":"modal sm fade deletemember in"},function(){}.toEventHandler(this));},otacontact_click:function(){M.Popup(this.context.contactform,{"hideclass":"modal fade in modal-touch","showclass":"modal fade in modal-touch in"},function(){}.toEventHandler(this));},document_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");if(M.isEmpty(tag)||(tag!='dropdownlist'&&tag!='value')){this.context.body.children().find(".ip-dropdown:visible").hide();}
var box=ele.parents('div[tag=datebox]');if(box.length==0){var tpl=ele.parents("div.ui-corner-all");if(tpl.length==0){this.context.achievementlist.find("div[tag=dateval]").hide();}}},achievementlist_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t==='confirmdate'){this.confirmdate();}else if(t==='search'){this.getorderlist();}else if(t==='exportexcel'){this.exportorderexcel();}else if(t==='selectone'){this.selectone();}else if(t==='select_all'){this.selectall();}},selectone:function(){var checkedtpl=this.context.achievementlist.find("input[name=cb]:checked");var tpl=this.context.achievementlist.find("input[name=cb]");if(checkedtpl.length==tpl.length){this.context.achievementlist.find("input[name=select_all]").attr("checked",true);}else{this.context.achievementlist.find("input[name=select_all]").attr("checked",false);}},selectall:function(){var tpl=this.context.achievementlist.find("input[name=select_all]:checked");if(tpl.length>0){this.context.achievementlist.find("input[name=cb]").attr("checked",true);}else{this.context.achievementlist.find("input[name=cb]").attr("checked",false);}},confirmdate:function(){var fromdate=this.context.achievementlist.find("input[name=fromdate]").val();var enddate=this.context.achievementlist.find("input[name=enddate]").val();var fdate=M.timeformat(M.strtotime(fromdate),'n月/j日');var edate=M.timeformat(M.strtotime(enddate),'n月/j日');this.context.achievementlist.find("input[name=dateval]").val(fdate+' - '+edate);this.context.achievementlist.find("div[tag=dateval]").hide();},dateval_focus:function(){this.context.achievementlist.find("div[tag=dateval]").show();},exportorderexcel:function(){var datetype=M.getDroplistVal(this.context.achievementlist.find("div[t=datetype]"));var ordertype=this.context.ordertype.children('span').attr('value');var fromdate=this.context.achievementlist.find("input[name=fromdate]").val();var enddate=this.context.achievementlist.find("input[name=enddate]").val();var kw=this.context.achievementlist.find("input[name=kw]").val();window.location.href='/Market/exportorder?datetype='+datetype+'&fromdate='+fromdate+'&enddate='+enddate+'&kw='+kw+'&ordertype='+ordertype;},achievement_click:function(){this.context.achievement.parent().hide();this.context.achievementlist.show();this.initdroplist();this.initdatepicker();this.getorderlist();},initdatepicker:function(){var fromdate=this.context.achievementlist.find("input[name=fromdate]").val();this.context.achievementlist.find("input[name=enddate]").datepicker("option","minDate",fromdate);},initdroplist:function(){var tpl_datetype=this.context.achievementlist.find("div[t=datetype]");M.DropdownList(tpl_datetype,null,null);var ordertype=this.context.ordertype;M.DropdownList(ordertype,this.datetype_change.toEventHandler(this),null);},datetype_change:function(ele){var value=ele.attr('value');this.context.datetype.find("span[tag=value]").attr('value','orderdate');this.context.datetype.find("span[tag=value]").attr('value','orderdate').html('预订日期');if(value=='room'){this.context.achievementlist.find("div[t=datetype]").find('div[tag=option]').show();}else{this.context.achievementlist.find("div[t=datetype]").find('div[tag=option]').hide();this.context.achievementlist.find("div[t=datetype]").find('div[tag=option][value=orderdate]').show();}},page_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");var p=1;if(tag=='pageindex'){return false;}
if(tag=='pageprev'){p=ele.attr('p');if(p<1){return false;}}
if(tag=='pagenext'){var page_max=this.context.pagelist.attr('maxpage');p=ele.attr('p');if(M.isEmpty(p)||p>page_max){return false;}}
if(tag=='page'){p=ele.attr('p');}
this.refreshMarketerList(p);},orderpage_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");var p=1;if(tag=='pageindex'){return false;}
if(tag=='pageprev'){p=ele.attr('p');if(p<1){return false;}}
if(tag=='pagenext'){var page_max=this.context.pagelist.attr('maxpage');p=ele.attr('p');if(M.isEmpty(p)||p>page_max){return false;}}
if(tag=='page'){p=ele.attr('p');}
this.getorderlist(p);},refreshMarketerList:function(p){if(M.isEmpty(p)){this.context.loading.show();}
M._getjson("/microinn/getmarketerlist",{"p":p},this.getmarketerlist_finished.toEventHandler(this));},getmarketerlist_finished:function(d){if(d.status==='success'){this.context.marketerlist.find("tr[tag=data]").remove();this.context.marketerlist.find("tr[tag=nodata]").remove();if(!M.isEmpty(d.list)){var listtpl=$.tmpl(this.marketer_tpl,d.list);this.context.marketerlist.find("tr[tag=title]").after(listtpl);this.context.marketerlist.find('tr[type=2]').find('td[tag=op]').html('——');var pagetpl=this.handlepage(d.page);this.context.page.show().html(pagetpl);}else{this.context.marketerlist.find("tr[tag=title]").after('<tr tag="nodata"><td>暂无数据</td></tr>');}}
this.context.loading.hide();},handlepage:function(pages){var list=pages.pagelist;if(list.length==0)
return;var nextpage=pages.nextpage;var pageindex=pages.pageindex;var maxpage=pages.maxpage;var prepage=pages.prepage;var html='<li><a p="'+prepage+'" tag="page" href="javascript:void(0);">&laquo;</a></li>';for(var i=0;i<list.length;i++){var p=list[i];if(p.code==pageindex){html+='<li class="active"><a href="javascript:void(0);" title="">'+p.name+'</a></li>';}else{html+=' <li><a href="javascript:void(0);" tag="page" p="'+p.code+'" title="">'+p.name+'</a></li>'}}
if(maxpage>5){if(maxpage-pageindex>2){html+='<li><a href="javascript:void(0);">...</a></li>';html+='<li><a href="javascript:void(0);" tag="page" p="'+maxpage+'">'+maxpage+'</a></li>';}}
html+='<li><a href="javascript:void(0);" tag="page" p="'+nextpage+'">&raquo;</a></li>';return html;},marketerlist_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t==='addmarketer'){this.showaddmarketer();}else if(t==='edit'){this.showeditmarketer(ele);}else if(t==='delete'){this.deletemarketer(ele);}else if(t==='stop'){this.stopmarketer(ele);}},stopmarketer:function(ele){var status=ele.attr("status");if(status==1){if(!confirm("确定要停用吗？"))return;status=2;}else{status=1;}
var mid=ele.parents("tr").attr("mid");M._getjson("/microinn/switchmarketer",{"mid":mid,'status':status},this.switchmarketer_finished.toEventHandler(this),'',true);},switchmarketer_finished:function(d){if(d.status==='success'){var mid=d.req.mid;var status=d.req.status;var text='停用';if(status==2){text='启用';this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").addClass("disable");this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").find("a[target=_blank]").addClass("website");}else{alert('启用成功');this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").removeClass("disable");this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").find("a[target=_blank]").removeClass("website");}
this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").find("a[tag=stop]").attr("status",status).text(text);}else{alert(d.msg);}},deletemarketer:function(ele){if(!confirm("确定要删除吗？"))return;var mid=ele.parents("tr").attr("mid");M._getjson("/microinn/switchmarketer",{"mid":mid},this.delmarketer_finished.toEventHandler(this));},delmarketer_finished:function(d){if(d.status==='success'){var mid=d.req.mid;this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").remove();this.refreshMarketerList();}else{alert(d.msg);}},showeditmarketer:function(ele){var mid=ele.parents("tr").attr("mid");M._getjson("/microinn/getmarketerdetail",{"mid":mid},this.getmarketerdetail_finished.toEventHandler(this),'',true);},getmarketerdetail_finished:function(d){if(d.status=='success'){var data=d.data;this.context.waiteraccount.attr("mid",data.id);this.context.waiteraccount.find("h3").html('修改推广大使 <span style="padding:0;">（ * 为必填 ）</span>');this.context.waiteraccount.find("input[name=name]").val(data.name);this.context.waiteraccount.find("input[name=phone]").val(data.phone);this.context.waiteraccount.find("input[name=commission]").val(data.commission);this.context.waiteraccount.find("input[name=cardcommission]").val(data.cardcommission);this.context.waiteraccount.find("input[name=number]").val(data.number);this.context.waiteraccount.find("input[name=selfcommission]").removeAttr('checked');if(data.selfcommission==1){this.context.waiteraccount.find("input[name=selfcommission]").attr('checked','checked');}
M.Popup(this.context.waiteraccount,{"hideclass":"bootbox modal sm fade ui-draggable","showclass":"bootbox modal sm fade in ui-draggable"},function(){}.toEventHandler(this));}else{alert(d.msg);}},showaddmarketer:function(){this.context.waiteraccount.removeAttr("mid");this.context.waiteraccount.find("h3").html('添加推广大使 <span style="padding:0;">（ * 为必填 ）</span>');this.context.waiteraccount.find("input[name=name]").val('');this.context.waiteraccount.find("input[name=phone]").val('');this.context.waiteraccount.find("input[name=commission]").val('');this.context.waiteraccount.find("input[name=cardcommission]").val('');this.context.waiteraccount.find("input[name=number]").val('');M.Popup(this.context.waiteraccount,{"hideclass":"bootbox modal sm fade ui-draggable","showclass":"bootbox modal sm fade in ui-draggable"},function(){}.toEventHandler(this));},waiteraccount_click:function(e){var ele=M.EventEle(e);var tag=ele.attr('tag');if(tag==='save'){this.savemarketer();}},savemarketer:function(){var id=this.context.waiteraccount.attr("mid");var number=this.context.waiteraccount.find("input[name=number]").val();var name=this.context.waiteraccount.find("input[name=name]").val();if(M.isEmpty(name)){alert('姓名不能为空');return;}
var phone=this.context.waiteraccount.find("input[name=phone]").val();if(M.isEmpty(phone)){alert('手机不能为空');return;}
if(isNaN(phone)){alert('手机格式不正确');return;}
if(isNaN(number)){alert('编号格式不正确');return;}
var commission=this.context.waiteraccount.find("input[name=commission]").val();var cardcommission=this.context.waiteraccount.find("input[name=cardcommission]").val();var selfcommission='';if(this.context.waiteraccount.find("input[name=selfcommission]").attr('checked')){selfcommission='Y';}else{selfcommission='N';}
var data={'id':id,'number':number,'name':name,'phone':phone,'commission':commission,'cardcommission':cardcommission,'selfcommission':selfcommission};M._getjson("/microinn/savemarketer",data,this.savemarketer_finished.toEventHandler(this),'',true);},savemarketer_finished:function(d){if(d.status==='success'){var data=d.data;var id=d.req.id;if(!M.isEmpty(id)){var tpl=$.tmpl(this.marketer_children_tpl,data);this.context.marketerlist.find("tr[tag=data][mid="+id+"]").html(tpl);}else{var tpl=$.tmpl(this.marketer_tpl,data);this.context.marketerlist.find("tr[tag=nodata]").remove();this.context.marketerlist.find("tr[tag=title]").after(tpl);}
M.ClosePopup();this.refreshMarketerList();}else{alert(d.msg);}},destroy:function(){}});M.ready(function(){var micromarketing=new M.Page.MicroMarketingPage();return micromarketing;});