﻿﻿M.Page.MicroMarketingresult=M.createClass();M.extend(M.Page.MicroMarketingresult.prototype,{context:{},orderlist_tpl:'<tr tag="data"><td><input type="checkbox" id="${id}" tag="selectone" name="cb"/> </td><td>${name}</td><td>${number}</td><td>${phone}</td><td tag="is_mp" value="${is_mp}">{{if is_mp==1}}已认证{{else}}未认证{{/if}}</td><td>${typename}</td><td>${createon}</td>'+'<td>${orderinfo}</td><td>${totalprice}</td><td tag="price" value="${commission}">${commission}</td><td>{{if belongbillid==0}}无{{else}}${ordernums}{{/if}}</td><td><i class="settle-status ${accountingclass}"></i>${accountingstatus}</td></tr>',tpl_page:'<li><a href="javascript:void(0);" tag="page" p="1">«</a></li>'
+'<li class="active"><a href="javascript:void(0);" title="">1</a></li>'
+'<li><a p="1" tag="page" href="javascript:void(0);">»</a></li>',init:function(){this.initDOM();this.initEvent();this.getorderlist();this.initdroplist();this.initdatepicker();},initDOM:function(){this.context.body=$(document.body);this.context.page=$("#pagelist");this.context.loading=$("#loading");this.context.achievementlist=$("#achievementlist");this.context.orderpage=$("#orderpage");this.context.orderloading=$("#orderloading");this.context.contactform=$("#contactform");this.context.otacontact=$("#otacontact");this.context.ordertype=$("#ordertype");this.context.datetype=$("#datetype");this.context.settleBtn=$("#settleBtn");this.context.applyBtn=$("#applyBtn");this.context.cancelSettleBtn=$("#cancelSettleBtn");this.context.settleStatePop=$("#settleStatePop");this.context.cancelSettleStatePop=$("#cancelSettleStatePop");this.context.applyBtnSettleStatePop=$("#applySettleStatePop");},initEvent:function(){this.context.body.bind("click",this.document_click.toEventHandler(this));this.context.page.bind("click",this.page_click.toEventHandler(this));this.context.orderpage.bind("click",this.orderpage_click.toEventHandler(this));this.context.achievementlist.bind("click",this.achievementlist_click.toEventHandler(this));this.context.achievementlist.find("input[name=fromdate]").datepicker({showOtherMonths:true,selectOtherMonths:true,onSelect:this.initdatepicker.toEventHandler(this)});this.context.achievementlist.find("input[name=enddate]").datepicker({showOtherMonths:true,selectOtherMonths:true});this.context.achievementlist.find("input[name=dateval]").bind("focus",this.dateval_focus.toEventHandler(this));this.context.otacontact.bind("click",this.otacontact_click.toEventHandler(this));this.context.applyBtn.bind('click',this.applyBtn_click.toEventHandler(this));this.context.settleBtn.bind('click',this.settleBtn_click.toEventHandler(this));this.context.cancelSettleBtn.bind('click',this.cancelSettleBtn_click.toEventHandler(this));this.context.settleStatePop.bind('click',this.settleStatePop_click.toEventHandler(this));this.context.cancelSettleStatePop.bind('click',this.cancelSettleStatePop_click.toEventHandler(this));this.context.applyBtnSettleStatePop.bind('click',this.applySettleStatePop_click.toEventHandler(this));},settleBtn_click:function(){var tpl=this.context.achievementlist.find("input[name=cb]:checked");if(tpl.length==0){alert("请选择订单！");return;}
M.Popup(this.context.settleStatePop,{"dragable":false,"hideclass":"modal fade","showclass":"modal sm fade deletemember in"},function(){}.toEventHandler(this));},applyBtn_click:function(){var tpl=this.context.achievementlist.find("input[name=cb]:checked");if(tpl.length==0){alert("请选择订单！");return;}
var each_mp=false;tpl.each(function(){var is_mp=$(this).parent().parent().find('td[tag=is_mp]').attr('value');if(is_mp!=0){each_mp=true;return false;}});if(each_mp===false){alert('没有一个大使是认证过的');return;}
M.Popup(this.context.applyBtnSettleStatePop,{"dragable":false,"hideclass":"modal fade","showclass":"modal sm fade deletemember in"},function(){}.toEventHandler(this));},applySettleStatePop_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");if(tag=='save'){var tpl=this.context.achievementlist.find("input[name=cb]:checked");var idstr=comm='';tpl.each(function(){var is_mp=$(this).parent().parent().find('td[tag=is_mp]').attr('value');var id=$(this).attr("id");if(is_mp!=0){idstr+=comm+id;comm=',';}});var data={"id":idstr};M._getjson("/Market/applySettle",data,this.applysettle_finished.toEventHandler(this));}else if(tag=='cancel'){M.ClosePopup();}},applysettle_finished:function(d){if(d.status=='success'){M.ClosePopup();this.context.achievementlist.show();this.getorderlist();}else{alert(d.msg);}},settleStatePop_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");if(tag=='save'){var tpl=this.context.achievementlist.find("input[name=cb]:checked");var idstr=comm='';tpl.each(function(){var id=$(this).attr("id");idstr+=comm+id;comm=',';});var data={"id":idstr};M._getjson("/Market/settle",data,this.savesettle_finished.toEventHandler(this));}else if(tag=='cancel'){M.ClosePopup();}},cancelSettleStatePop_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");if(tag=='save'){var tpl=this.context.achievementlist.find("input[name=cb]:checked");var idstr=comm='';tpl.each(function(){var id=$(this).attr("id");idstr+=comm+id;comm=',';});var data={"id":idstr};M._getjson("/Market/cancelSettle",data,this.cancelsettle_finished.toEventHandler(this));}else if(tag=='cancel'){M.ClosePopup();}},cancelSettleBtn_click:function(){var tpl=this.context.achievementlist.find("input[name=cb]:checked");if(tpl.length==0){alert("请选择订单！");return;}
M.Popup(this.context.cancelSettleStatePop,{"dragable":false,"hideclass":"modal fade","showclass":"modal sm fade deletemember in"},function(){}.toEventHandler(this));},savesettle_finished:function(d){if(d.status=='success'){M.ClosePopup();this.context.achievementlist.show();this.getorderlist();}},cancelsettle_finished:function(d){if(d.status=='success'){M.ClosePopup();this.context.achievementlist.show();this.getorderlist();}else{alert(d.msg);}},otacontact_click:function(){M.Popup(this.context.contactform,{"hideclass":"modal fade in modal-touch","showclass":"modal fade in modal-touch in"},function(){}.toEventHandler(this));},document_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");if(M.isEmpty(tag)||(tag!='dropdownlist'&&tag!='value')){this.context.body.children().find(".ip-dropdown:visible").hide();}
var box=ele.parents('div[tag=datebox]');if(box.length==0){var tpl=ele.parents("div.ui-corner-all");if(tpl.length==0){this.context.achievementlist.find("div[tag=dateval]").hide();}}},achievementlist_click:function(e){var ele=M.EventEle(e);var t=ele.attr("tag");if(t==='confirmdate'){this.confirmdate();}else if(t==='search'){this.getorderlist();}else if(t==='exportexcel'){this.exportorderexcel();}else if(t==='selectone'){this.selectone();}else if(t==='select_all'){this.selectall();}},selectone:function(){var checkedtpl=this.context.achievementlist.find("input[name=cb]:checked");var tpl=this.context.achievementlist.find("input[name=cb]");var allprice=0;checkedtpl.each(function(){var price=$(this).parent().parent().find('td[tag=price]').attr('value');price=parseInt(price*1000);allprice+=price;});$('#checkednum').html(checkedtpl.length);$('#checkedprice').html(allprice/1000);if(checkedtpl.length==tpl.length){this.context.achievementlist.find("input[name=select_all]").attr("checked",true);}else{this.context.achievementlist.find("input[name=select_all]").attr("checked",false);}},selectall:function(){var tpl=this.context.achievementlist.find("input[name=select_all]:checked");if(tpl.length>0){this.context.achievementlist.find("input[name=cb]").attr("checked",true);}else{this.context.achievementlist.find("input[name=cb]").attr("checked",false);}
var checkedtpl=this.context.achievementlist.find("input[name=cb]:checked");var allprice=0;checkedtpl.each(function(){var price=$(this).parent().parent().find('td[tag=price]').attr('value');price=parseInt(price*1000);allprice+=price;});$('#checkednum').html(checkedtpl.length);$('#checkedprice').html(allprice/1000);},confirmdate:function(){var fromdate=this.context.achievementlist.find("input[name=fromdate]").val();var enddate=this.context.achievementlist.find("input[name=enddate]").val();var fdate=M.timeformat(M.strtotime(fromdate),'n月/j日');var edate=M.timeformat(M.strtotime(enddate),'n月/j日');this.context.achievementlist.find("input[name=dateval]").val(fdate+' - '+edate);this.context.achievementlist.find("div[tag=dateval]").hide();},dateval_focus:function(){this.context.achievementlist.find("div[tag=dateval]").show();},exportorderexcel:function(){var datetype=M.getDroplistVal(this.context.achievementlist.find("div[t=datetype]"));var ordertype=this.context.ordertype.children('span').attr('value');var fromdate=this.context.achievementlist.find("input[name=fromdate]").val();var enddate=this.context.achievementlist.find("input[name=enddate]").val();var kw=this.context.achievementlist.find("input[name=kw]").val();window.location.href='/Market/exportorder?datetype='+datetype+'&fromdate='+fromdate+'&enddate='+enddate+'&kw='+kw+'&ordertype='+ordertype;},getorderlist:function(p){$('#checkedprice').html(0);$('#checkednum').html(0);if(M.isEmpty(p)){this.context.orderloading.show();}
var datetype=M.getDroplistVal(this.context.achievementlist.find("div[t=datetype]"));var ordertype=this.context.ordertype.children('span').attr('value');var fromdate=this.context.achievementlist.find("input[name=fromdate]").val();var enddate=this.context.achievementlist.find("input[name=enddate]").val();var kw=this.context.achievementlist.find("input[name=kw]").val();var data={"p":p,"datetype":datetype,"fromdate":fromdate,"enddate":enddate,"kw":kw,'ordertype':ordertype};M._getjson("/Market/getorderlist",data,this.getorderlist_finished.toEventHandler(this));},getorderlist_finished:function(d){if(d.status==='success'){this.context.achievementlist.find("tr[tag=data]").remove();this.context.achievementlist.find("tr[tag=nodata]").remove();if(!M.isEmpty(d.orderlist)){this.context.achievementlist.find("strong[tag=total]").html(d.total);this.context.achievementlist.find("strong[tag=totalprofits]").html(d.commissiontotal);this.context.achievementlist.find("input[name=select_all]").attr("checked",false);var listtpl=$.tmpl(this.orderlist_tpl,d.orderlist);this.context.achievementlist.find("tr[tag=title]").after(listtpl);var pagetpl=this.handlepage(d.pagedata);this.context.orderpage.html(pagetpl);}else{this.context.achievementlist.find("strong[tag=total]").html(d.total);this.context.achievementlist.find("strong[tag=totalprofits]").html(d.commissiontotal);this.context.achievementlist.find("strong[tag=totalprofits]").html(d.totalprofits);this.context.achievementlist.find("tr[tag=title]").after('<tr tag="nodata"><td>暂无数据</td></tr>');}}
this.context.orderloading.hide();},initdatepicker:function(){var fromdate=this.context.achievementlist.find("input[name=fromdate]").val();var enddate=this.context.achievementlist.find("input[name=enddate]").val();},initdroplist:function(){var tpl_datetype=this.context.achievementlist.find("div[t=datetype]");M.DropdownList(tpl_datetype,null,null);var ordertype=this.context.ordertype;M.DropdownList(ordertype,this.datetype_change.toEventHandler(this),null);},datetype_change:function(ele){var value=ele.attr('value');this.context.datetype.find("span[tag=value]").attr('value','orderdate');this.context.datetype.find("span[tag=value]").attr('value','orderdate').html('预订日期');if(value=='room'){this.context.achievementlist.find("div[t=datetype]").find('div[tag=option]').show();}else{this.context.achievementlist.find("div[t=datetype]").find('div[tag=option]').hide();this.context.achievementlist.find("div[t=datetype]").find('div[tag=option][value=orderdate]').show();}},page_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");var p=1;if(tag=='pageindex'){return false;}
if(tag=='pageprev'){p=ele.attr('p');if(p<1){return false;}}
if(tag=='pagenext'){var page_max=this.context.pagelist.attr('maxpage');p=ele.attr('p');if(M.isEmpty(p)||p>page_max){return false;}}
if(tag=='page'){p=ele.attr('p');}
this.refreshMarketerList(p);},orderpage_click:function(e){var ele=M.EventEle(e);var tag=ele.attr("tag");var p=1;if(tag=='pageindex'){return false;}
if(tag=='pageprev'){p=ele.attr('p');if(p<1){return false;}}
if(tag=='pagenext'){var page_max=this.context.pagelist.attr('maxpage');p=ele.attr('p');if(M.isEmpty(p)||p>page_max){return false;}}
if(tag=='page'){p=ele.attr('p');}
this.getorderlist(p);},handlepage:function(pages){var list=pages.pagelist;if(list.length==0)
return;var nextpage=pages.nextpage;var pageindex=pages.pageindex;var maxpage=pages.maxpage;var prepage=pages.prepage;var html='<li><a p="'+prepage+'" tag="page" href="javascript:void(0);">&laquo;</a></li>';for(var i=0;i<list.length;i++){var p=list[i];if(p.code==pageindex){html+='<li class="active"><a href="javascript:void(0);" title="">'+p.name+'</a></li>';}else{html+=' <li><a href="javascript:void(0);" tag="page" p="'+p.code+'" title="">'+p.name+'</a></li>'}}
if(maxpage>5){if(maxpage-pageindex>2){html+='<li><a href="javascript:void(0);">...</a></li>';html+='<li><a href="javascript:void(0);" tag="page" p="'+maxpage+'">'+maxpage+'</a></li>';}}
html+='<li><a href="javascript:void(0);" tag="page" p="'+nextpage+'">&raquo;</a></li>';return html;},stopmarketer:function(ele){var status=ele.attr("status");if(status==1){if(!confirm("确定要停用吗？"))return;status=2;}else{status=1;}
var mid=ele.parents("tr").attr("mid");M._getjson("/microinn/switchmarketer",{"mid":mid,'status':status},this.switchmarketer_finished.toEventHandler(this),'',true);},switchmarketer_finished:function(d){if(d.status==='success'){var mid=d.req.mid;var status=d.req.status;var text='停用';if(status==2){text='启用';this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").addClass("disable");this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").find("a[target=_blank]").addClass("website");}else{alert('启用成功');this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").removeClass("disable");this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").find("a[target=_blank]").removeClass("website");}
this.context.marketerlist.find("tr[tag=data][mid="+mid+"]").find("a[tag=stop]").attr("status",status).text(text);}else{alert(d.msg);}},showeditmarketer:function(ele){var mid=ele.parents("tr").attr("mid");M._getjson("/microinn/getmarketerdetail",{"mid":mid},this.getmarketerdetail_finished.toEventHandler(this),'',true);},getmarketerdetail_finished:function(d){if(d.status=='success'){var data=d.data;this.context.waiteraccount.attr("mid",data.id);this.context.waiteraccount.find("h3").html('修改推广大使 <span style="padding:0;">（ * 为必填 ）</span>');this.context.waiteraccount.find("input[name=name]").val(data.name);this.context.waiteraccount.find("input[name=phone]").val(data.phone);this.context.waiteraccount.find("input[name=commission]").val(data.commission);this.context.waiteraccount.find("input[name=cardcommission]").val(data.cardcommission);this.context.waiteraccount.find("input[name=number]").val(data.number);this.context.waiteraccount.find("input[name=selfcommission]").removeAttr('checked');if(data.selfcommission==1){this.context.waiteraccount.find("input[name=selfcommission]").attr('checked','checked');}
M.Popup(this.context.waiteraccount,{"hideclass":"bootbox modal sm fade ui-draggable","showclass":"bootbox modal sm fade in ui-draggable"},function(){}.toEventHandler(this));}else{alert(d.msg);}},});M.ready(function(){var MicroMarketingresult=new M.Page.MicroMarketingresult();return MicroMarketingresult;});