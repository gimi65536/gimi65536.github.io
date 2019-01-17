// https://blog.csdn.net/a258831020/article/details/46988887
String.prototype.format = function(args){
	var result = this;
	if(arguments.length > 0){	
		if(arguments.length == 1 && typeof(args) == "object"){
			for(var key in args){
				if(args[key] != undefined){
					var reg = new RegExp("\\{" + key + "\\}", "g");
					result = result.replace(reg, args[key]);
				}
			}
		}else{
			for(var i = 0;i < arguments.length; i++){
				if(arguments[i] != undefined){
					var reg = new RegExp("\\{" + i + "\\}", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
}

var template = "https://host.cc.ntu.edu.tw/activities/placeApplyDetail.aspx?From=placeApply.aspx&Place_ID={place}&Act_ID={event}&Start=18:00&End=21:30&Date={date}";

var place_map = {103: '2', 104: '9', 202: '3'};

var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

var give_datestring = function(date){
	return "{0}/{1}/{2}".format(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}
var give_date8char = function(date){
	y = date.getUTCFullYear();
	m = date.getUTCMonth() + 1;
	d = date.getUTCDate();
	if(m < 10){
		m = "0{0}".format(m);
	}
	if(d < 10){
		d = "0{0}".format(d);
	}
	return "{0}{1}{2}".format(y, m, d);
}

var generate = function(event_ID, place_order, dates){
	var template_with_event = template.format({event: event_ID});
	for(var i = 0;i < dates.length;i++){
		var date = dates[i];
		var date_string = give_datestring(date);
		var date_8char = give_date8char(date);
		var template_with_event_date = template_with_event.format({date: date_string});
		var div_node = document.createElement("div");
		document.getElementById("list").appendChild(div_node);
		var h2_node = document.createElement("h2");
		h2_node.appendChild(document.createTextNode(date_string));
		h2_node.appendChild(document.createTextNode(" " + weekday[date.getUTCDay()]));
		div_node.appendChild(h2_node);
		for(var j = 0;j < place_order.length;j++){
			var place = place_order[j];
			var address = template_with_event_date.format({place: place_map[place]});
			div_node.appendChild(document.createTextNode(place + "教室"));
			div_node.appendChild(document.createTextNode(String.fromCharCode(160)));
			var a_node = document.createElement("a");
			a_node.setAttribute("href", address);
			a_node.appendChild(document.createTextNode("借場連結"));
			div_node.appendChild(a_node);
			div_node.appendChild(document.createTextNode(String.fromCharCode(160) + String.fromCharCode(160)));
			var button = document.createElement("button");
			var ID = "button{0}{1}".format(date_8char, place);
			button.setAttribute("id", ID);
			button.setAttribute("data-clipboard-text", address);
			button.appendChild(document.createTextNode("點擊複製網址"));
			div_node.appendChild(button);
			div_node.appendChild(document.createElement("br"));
			new ClipboardJS(button);
		}
	}
}

var test_generate = function(event_ID, place_order, dates){
	document.getElementById("testActID").value = event_ID;
	if(place_order.length > 0){
		document.getElementById("testPlaceID").value = place_map[place_order[0]];
	}
	if(dates.length > 0){
		document.getElementById("testYear").value = dates[0].getUTCFullYear();
		document.getElementById("testMonth").value = dates[0].getUTCMonth() + 1;
		document.getElementById("testDay").value = dates[0].getUTCDate();
	}
	new ClipboardJS(document.getElementById("testButton"), {
		text: function(trigger) {
			return template.format({
				place: document.getElementById("testPlaceID").value,
				event: document.getElementById("testActID").value,
				date: "{y}/{m}/{d}".format({
					y: document.getElementById("testYear").value,
					m: document.getElementById("testMonth").value,
					d: document.getElementById("testDay").value
				})
			});
		}
	});
}