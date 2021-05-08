/* -------------------------------------------------
 * 検査ウィンドウに関するクラス
 --------------------------------------------------*/
class libraPlusUtil {
	/*-----------------------------------------
		コンストラクタ
	-------------------------------------------*/
	constructor() {
		this.url = window.location.href;
		this.diag_tbl = document.querySelector('#cmtTable');
		this.result = document.querySelectorAll('select[id^="result_"]');
		this.comment = document.querySelector('textarea[id^="comment"]');
		this.description = document.querySelector('textarea[id^="src_"]');
		this.srccode = document.querySelector('textarea[id^="updsrc_"]');
		this.save_survey_btn = document.querySelector('button[name="update"]');
		this.hash = {
			"0": "未判定",
			"1": "はい",
			"9": "はい(注記)",
			"2": "いいえ",
			"3": "なし"
		};
		this.tab_sp = "<bkmk:tab>";
		this.br_sp = "<bkmk:br>";
		this.data_tab_sp = "<bkmk:data:tab>";
		this.data_br_sp = "<bkmk:data:br>";
		this.status_page_url = "/libraplus/status/list/";
		this.url_select = document.querySelector('#select_urlno');
		this.owner_window = window.opener;
	}

	/*-----------------------------------------
		commonメソッド
	-------------------------------------------*/
	cursoled_obj() {
		return document.activeElement;
	}

	parent_tr(obj) {
		var parent = null;
		try { parent = obj.parentElement; } catch(e) { return obj; }
		if(obj.tagName.toString() == "TR")
			return obj;
		else
			return this.parent_tr(parent);
	}

	is_body(obj) {
		if(obj.tagName.toString() == "BODY")
			return true;
		else
			return false;
	}

	diag_ta_group_count() {
		return this.diag_tbl.querySelectorAll('textarea[id^="comment"]').length;
	}


	text_clean(str) {
		str=str.replace(/^ +/m,"");
		str=str.replace(/\t+/m,"");
		str=str.replace(/(\r\n|\r|\n)/g,""); 
		return str;
	}

	br_encode(str) {
		return str.replace(/(\r|\n|\r\n)/mg, this.br_sp);
	}

	br_decode(str) {
		return str.replace(new RegExp(this.br_sp, "mg"), "\r\n");
	}

	get_safe_value(val) {
		if(typeof val === "undefined")
			return "";
		else
			return val;
	}

	is_main_page() {
		var pat = new RegExp(/\/inspect\/start\/index\//);
		if(pat.test(this.url)) return true;
		else return false;
	}

	is_diag_page() {
		var pat = new RegExp(/\/inspect\/chkpoint\/list\//);
		if(pat.test(this.url)) return true;
		else return false;
	}
    
	event_ignite(obj, type) {
		var event = document.createEvent("HTMLEvents");
		event.initEvent(type, true, false);
		obj.dispatchEvent(event);
	}

	get_url_string(str) {
		var pt = new RegExp(/http.*\/\/.*/);
		if(pt.test(str)) {
			var mt = str.match(pt);
			return this.amp_decode(mt[0].toString());
		}
		return "";
	}

	amp_decode(str) {
		return str.replace(/(&amp;|%26)/, "&");
	}

	have_opener() {
		if(window.opener == null) return false;
		else return true;
	}

	save_survey() {
		this.save_survey_btn.click();
	}

	/*-----------------------------------------
		単一項目判定メソッド
	-------------------------------------------*/
	_single_result() {
		var parent = null;
		if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) {
			if(this.diag_ta_group_count() == 1)
				parent = document;
			else
				parent = this.diag_tbl.getElementsByTagName("tr")[1];
		} else {
			parent = this.parent_tr(this.cursoled_obj());
		}
		return parent.querySelectorAll('select[id^="result_"]');
	}

	_single_comment() {
		var parent = null;
		if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj()))
			parent = document;
		else
			parent = this.parent_tr(this.cursoled_obj());
		return parent.querySelector('textarea[id^="comment"]');
	}

	_single_description() {
		var parent = null;
		if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj()))
			parent = document;
		else
			parent = this.parent_tr(this.cursoled_obj());
		return parent.querySelector('textarea[id^="src_"]')
	}

	_single_srccode() {
		var parent = null;
		if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj()))
			parent = document;
		else
			parent = this.parent_tr(this.cursoled_obj());
		return parent.querySelector('textarea[id^="updsrc_"]')
	}

	get_survey_single() {
		var survey_str = "";
		var results = this._single_result();
		for(var i=0; i<results.length; i++) {
			var key = "";
			var opts = results[i].getElementsByTagName("option");
			var idx = results[i].selectedIndex;
			for(var j=0; j<opts.length; j++) {
				var opt = opts[j];
				if(j == idx) {
					key = opt.value;
					break;
				}
			}
			if(key != "")
				survey_str += this.hash[key];
			else
				survey_str += "";
			if(i != (results.length - 1))
				survey_str += "/";
		}
		return survey_str;
	}

	get_survey_key_single(key_val) {
		var ret_key = "";
		for(var key in this.hash) {
			var val = this.hash[key];
			if(key_val == val) {
				ret_key = key;
				break;
			}
		}
		return ret_key;
	}

	get_comment_single() {
		return this._single_comment().value;
	}

	get_description_single() {
		return this._single_description().value;
	}

	get_srccode_single() {
		return this._single_srccode().value;
	}

	set_survey_single(flag) {
		var flag_arr = flag.split(/\//mg);
		var results = this._single_result();		
		for(var i=0; i<results.length; i++) {
			var key = this.get_survey_key_single(flag_arr[i]);
			var opts = results[i].getElementsByTagName("option");
			for(var j=0; j<opts.length; j++) {
				var opt = opts[j];
				if(opt.value == key) {
					results[i].selectedIndex = j;
					break;
				}
			}
		}
	}

	set_comment_single(str) {
		this._single_comment().value = str;
	}

	set_description_single(str) {
		this._single_description().value = str;
	}

	set_srccode_single(str) {
		this._single_srccode().value = str;
	}

	set_survey_fill(flag) {
		var all_results = document.querySelectorAll('select[id^="result_"]');
		for(var i=0; i<all_results.length; i++) {
			var key = this.get_survey_key_single(flag);
			var opts = all_results[i].getElementsByTagName("option");
			for(var j=0; j<opts.length; j++) {
				var opt = opts[j];
				if(opt.value == key) {
					all_results[i].selectedIndex = j;
					break;
				}
			}
		}
	}

	set_comment_fill(str) {
		var all_comments = document.querySelectorAll('textarea[id^="comment"]');
		for(var i=0; i<all_comments.length; i++) {
			all_comments[i].value = str;
		}
	}

	set_description_fill(str) {
		var all_descriptions = document.querySelectorAll('textarea[id^="src_"]');
		for(var i=0; i<all_descriptions.length; i++) {
			all_descriptions[i].value = str;
		}
	}

	set_srccode_fill(str) {
		var all_srccodes = document.querySelectorAll('textarea[id^="updsrc_"]')
		for(var i=0; i<all_srccodes.length; i++) {
			all_srccodes[i].value = str;
		}
	}

	force_survey_ok() {
		this.set_survey_fill("はい");
		this.set_comment_fill("");
		this.set_srccode_fill("");
		this.save_survey();
	}
	
	force_survey_na() {
		this.set_survey_fill("なし");
		this.set_comment_fill("");
		this.set_srccode_fill("");
		this.save_survey();
	}

	/*-----------------------------------------
		単一項目コピー／貼り付けメソッド
	-------------------------------------------*/
	survey_single_copy() {
		var txt = "";
		var str_tech = "any";
		var str_sv_cp = "any";
		var str_sv = this.get_survey_single();
		var str_comment = this.br_encode(this.get_comment_single());
		var str_description = this.br_encode(this.get_description_single());
		var str_srccode = this.br_encode(this.get_srccode_single());
		txt = str_tech + this.tab_sp + str_sv + this.tab_sp + str_sv_cp + this.tab_sp + "who" + this.tab_sp;
		txt += str_comment + this.tab_sp + str_description + this.tab_sp + str_srccode;
		prompt("Ctrl+Cでコピーしてください。", txt);
	}

	survey_single_paste() {
		var src = prompt("コピーしたデータを貼り付けてください");
		src = src.trim();
		var arr = this.survey_single_data_bind(src);
		var sv = arr[0];
		this.set_survey_single(sv);
		this.set_comment_single(arr[2]);
		this.set_description_single(arr[3]);
		this.set_srccode_single(arr[4]);
	}

	survey_single_data_bind(data) {
		var arr = new Array();
		var str_sv = "";
		var str_sv_cp = "any";
		var str_comment = "";
		var str_description = "";
		var str_srccode = "";
		var tmp = data.split(this.tab_sp);
		if(tmp != null) {
			str_sv = tmp[1].toString().trim();
			if(str_sv_cp === "") str_sv_cp = "no";
			str_comment = this.br_decode(this.get_safe_value(tmp[4]));
			str_description = this.br_decode(this.get_safe_value(tmp[5]));
			str_srccode = this.br_decode(this.get_safe_value(tmp[6]));
			arr.push(str_sv);
			arr.push(str_sv_cp);
			arr.push(str_comment);
			arr.push(str_description);
			arr.push(str_srccode);
			return arr;
		} else {
			return null;
		}
	}

	/* ----------------------------------------
		全項目判定メソッド
	------------------------------------------*/
	_all_result(cell) {
		return cell.querySelector('select[id^="result_"]');
	}

	_all_comment(cell) {
		return cell.querySelector('textarea[id^="comment"]');
	}

	_all_description(cell) {
		return cell.querySelector('textarea[id^="src_"]')
	}

	_all_srccode(cell) {
		return cell.querySelector('textarea[id^="updsrc_"]')
	}

	_all_exists_ta(tr) {
		if(tr.querySelectorAll('textarea').length > 0) return true;
		else return false;
	}

	_all_get_text(cell) {
		var txt = cell.innerHTML;
		var pt = new RegExp(/^([^<].+?)(<)/);
		if(pt.test(txt)) {
			return txt.match(pt)[1];
		} else {
			return txt;
		}
	}

	_all_get_survey(cell) {
		var key = "";
		var obj = this._all_result(cell);
		var opts = obj.getElementsByTagName("option");
		var idx = obj.selectedIndex;
		for(var j=0; j<opts.length; j++) {
			var opt = opts[j];
			if(j == idx) {
				key = opt.value;
				break;
			}
		}
		return this.hash[key];
	}

	_all_get_comment(cell) {
		return this._all_comment(cell).value;
	}

	_all_get_description(cell) {
		return this._all_description(cell).value;
	}

	_all_get_srccode(cell) {
		return this._all_srccode(cell).value;
	}

	_all_set_survey(cell, flag) {
		var obj = this._all_result(cell);
		//単一判定メソッド群より流用
		var key = this.get_survey_key_single(flag);
		var opts = obj.getElementsByTagName("option");
		for(var j=0; j<opts.length; j++) {
			var opt = opts[j];
			if(opt.value == key) {
				obj.selectedIndex = j;
				break;
			}
		}
	}

	_all_set_comment(cell, str) {
		this._all_comment(cell).value = str;
	}

	_all_set_description(cell, str) {
		this._all_description(cell).value = str;
	}

	_all_set_srccode(cell, str) {
		this._all_srccode(cell).value = str;
	}

	/* ----------------------------------------
		全項目コピー／貼り付けメソッド
	------------------------------------------*/
	survey_all_copy() {
		var txt = "";
		var arr = this.get_data_survey_all();
		for(var i=0; i<arr.length; i++) {
			var row = arr[i];
			for(var j=0; j<row.length; j++) {
				txt += this.br_encode(row[j]);
				if(j != (row.length - 1)) txt += this.tab_sp;
			}
			if(i != (arr.length - 1)) txt += this.data_br_sp;
		}
		prompt("Ctrl+Cでコピーしてください。", txt);
	}

	survey_all_paste() {
		var data = prompt("コピーしたデータを貼り付けてください");
		data = data.trim();
		this.set_data_survey_all(data);
	}

	get_data_survey_all() {
		var data = new Array();
		var cnt = 0;
		var trs = this.diag_tbl.rows;
		for(var i=1; i<trs.length; i++) {
			var row = new Array();
			var tr = trs[i];
			for(var j=0; j<tr.cells.length; j++) {
				var cell = tr.cells[j];
				var cell_val = "";
				if(j==0 || j==1) {
					cell_val = this._all_get_text(cell);
				} else if(j==2) {
					cell_val = this._all_get_survey(cell);
				} else if(j==3) {
					if(this._all_exists_ta(cell)) {
						cnt++;
						cell_val += `<bkmk:data:rw${i-1}:cn${cnt}:start>`;
						cell_val += this._all_get_comment(cell);
						cell_val += this.data_tab_sp;
						cell_val += this._all_get_description(cell);
						cell_val += this.data_tab_sp;
						cell_val += this._all_get_srccode(cell);
						cell_val += `<bkmk:data:rw${i-1}:cn${cnt}:end>`;
					} else {
						cell_val += "empty cell";
					}
				}
				row.push(cell_val);
			}
			data[i-1] = row;
		}
		return data;
	}

	set_data_survey_all(data) {
		var trs = this.diag_tbl.rows;
		var arr = data.split(this.data_br_sp);
		for(var i=0; i<arr.length; i++) {
			var row = arr[i];
			var row_arr = row.split(this.tab_sp);
			var tr = trs[i+1];
			for(var j=0; j<=row_arr.length; j++) {
				var val = row_arr[j];
				var cell = tr.cells[j];
				if(j==2) {
					this._all_set_survey(cell, val);
				} else if(j==3) {
					if(this._all_exists_ta(tr)) {
						val = val.replace(/<bkmk:data:rw[0-9]+:cn[0-9]+:start>/, "");
						val = val.replace(/<bkmk:data:rw[0-9]+:cn[0-9]+:end>/, "");
						var ta_vals = val.split(this.data_tab_sp);
						for(var z=0; z<ta_vals.length; z++) {
							var ta_val = this.br_decode(ta_vals[z]);
							if(z==0) this._all_set_comment(cell, ta_val);
							else if(z==1) this._all_set_description(cell, ta_val);
							else if(z==2) this._all_set_srccode(cell, ta_val);
						}
					}

				}
			}
		}
	}

	/*-----------------------------------------
		ユーティリティ的機能のメソッド一式
	-------------------------------------------*/
	svpage_next() {
		var idx = this.url_select.selectedIndex;
		idx++;
		if(idx == this.url_select.options.length) {
			alert("これ以上進めません!");
			return;
		}
		this.url_select.selectedIndex = idx;
		this.event_ignite(this.url_select, "change");
	}

	svpage_prev() {
		var idx = this.url_select.selectedIndex;
		idx--;
		if(idx < 0) {
			alert("これ以上戻れません!");
			return;
		}
		this.url_select.selectedIndex = idx;
		this.event_ignite(this.url_select, "change");
	}

	svpage_open() {
		var burl = "";
		var select = null;
		if(this.have_opener())
			select = window.opener.document.querySelector('#select_urlno');
		else
			select = this.url_select;
		if(typeof select == "undefined" || select == null) {
			alert("この画面からは実行できません");
			return;
		}
		var opts = select.getElementsByTagName("option");
		var idx = select.selectedIndex;
		for(var i=0; i<opts.length; i++) {
			var op = opts[i];
			if(i == idx) {
				burl = op.text;
				break;
			}
		}
		burl = this.get_url_string(burl);
		window.open(burl, "_blank");
	}

}

//クラスのインスタンス
const util = new libraPlusUtil();

//JavaScript実行関数
const run_js = function() {
	var src = prompt("実行したいJavascriptコードを入力または貼り付けてください");
	eval("{" + src + "}");
};

//進捗管理行列色付ユーティリティの関数
const rep_view_util = function() {
	var status_tbl = document.getElementById("myTable");
	add_js = function() {
		if(document.querySelector("#libraps-status-page-util-addjs") != null) return;
		var scr = document.createElement("script");
		scr.id = "libraps-status-page-util-addjs";
		var scrtxt = "";
		scrtxt += 'function add_mark(num) {';
		scrtxt += 'var trs = document.getElementById("myTable").rows;';
		scrtxt += 'for(var i=0; i<trs.length; i++) {';
		scrtxt += 'if(i < 2) continue;';
		scrtxt += 'var tr = trs.item(i);';
		scrtxt += 'for(var j=0; j<tr.cells.length; j++) {';
		scrtxt += 'if(j < 2) continue;';
		scrtxt += 'var cls = tr.cells.item(j);';
		scrtxt += 'if(j == num) {';
		scrtxt += 'if(cls.getAttribute("style") === null) {';
		scrtxt += 'cls.setAttribute("style", "background:#FCB829");';
		scrtxt += '} else {';
		scrtxt += 'cls.removeAttribute("style");';
		scrtxt += '}';
		scrtxt += 'break;';
		scrtxt += '}';
		scrtxt += '}';
		scrtxt += '}';
		scrtxt += '}';

		scrtxt += 'function add_row_mark(num) {';
		scrtxt += 'var trs = document.getElementById("myTable").rows;';
		scrtxt += 'for(var i=2; i<trs.length; i++) {';
		scrtxt += 'var tr = trs.item(i);';
		scrtxt += 'for(var j=0; j<tr.cells.length; j++) {';
		scrtxt += 'var cls = tr.cells.item(j);';
		scrtxt += 'if(i == num) {';
		scrtxt += 'if(tr.getAttribute("style") === null) {';
		scrtxt += 'tr.setAttribute("style", "background:#FCB829");';
		scrtxt += '} else {';
		scrtxt += 'tr.removeAttribute("style");';
		scrtxt += '}';
		scrtxt += 'break;';
		scrtxt += '}';
		scrtxt += '}';
		scrtxt += '}';
		scrtxt += '}';
		scr.textContent = scrtxt;
		document.getElementsByTagName("body").item(0).appendChild(scr);
	}
	add_col_handle = function() {
			var trs = status_tbl.rows;
			var tr = trs.item(1);
			for(var j=0; j<tr.cells.length; j++) {
				var cls = tr.cells.item(j);
				var clstxt = cls.innerHTML;
				clstxt = '<a href="javascript:void(0)" onclick="add_mark(' + (j + 3) + ');return false;" style="text-decoration:none;">' + clstxt + "</a>";
				cls.outerHTML = `<th class="text-nowrap">`+clstxt+`</th>`;
			}
	}
	add_row_handle = function() {
		var trs = status_tbl.rows;
		for(var i=2; i<trs.length; i++) {
			var tr = trs.item(i);
			var cls = tr.cells.item(0);
			var clstxt = cls.innerHTML;
			clstxt = '<a href="javascript:void(0)" onclick="add_row_mark(' + (i) + ');return false;" style="text-decoration:none;">' + clstxt + "</a>";
			cls.outerHTML = `<th class="text-nowrap">`+clstxt+`</th>`;
		}
	}
	add_br_handle = function() {
		var trs = status_tbl.rows;
		var is_total_row = function(tr) {
			if(tr.cells[2].innerText.trim()==="合計") return true;
			else return false;
		};
		for(var i=2; i<trs.length; i++) {
			var tr = trs.item(i);
			if(is_total_row(tr)) continue;
			for(var j=3; j<(tr.cells.length - 1); j++) {
				var cls = tr.cells.item(j);
				var atgs = cls.getElementsByTagName("a");
				if(atgs.length < 1) continue;
				var atg = cls.getElementsByTagName("a")[0];
				var href = atg.getAttribute("href");
				var elm = document.createElement("span");
				elm.setAttribute("class", "badge badge-pill badge-dark ml-1");
				elm.innerHTML = `<i class="fas fa-share-square"></i>`;
				var inscr = `
					javascript:(function(){
						var this_w = window;
						var window_size = "left=" + this_w.outerWidth + ",width=" + this_w.outerHight;
						var window_option = ",menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes";
						window.open('${href}', "blank", "LibraPlus Status", window_size+window_option);
					})();`;
				elm.setAttribute("onclick", inscr);
				atg.parentElement.insertBefore(elm, atg.nextSibling);
			}
		}
	}
	add_js();
	add_col_handle();
	add_row_handle();
	add_br_handle();
};

//判定色付ユーティリティの関数
const sv_color_util = function() {
	var vmode = function() {
		var cr = location.href;
		if(new RegExp(/\/inspect\/chkpoint\/dsp\//).test(cr)) return "disp";
		else if(new RegExp(/\/status\/detail\//).test(cr)) return "status";
		else if(new RegExp(/\/inspect\/start\//).test(cr)) return "checkpoint"
	};
	if(vmode() === "disp") {
		var ds_tbl = document.getElementsByTagName("table")[0];
		var trs = ds_tbl.rows;
		for(var i=1; i<trs.length; i++) {
			var tr = trs.item(i);
			for(var j=0; j<tr.cells.length; j++) {
				var cls = tr.cells.item(j);
				var clstxt = cls.innerHTML.trim();
				var colorcode = "";
				switch(clstxt) {
					case "はい":
						colorcode = "#89FFFF";
						break;
					case "いいえ":
						colorcode = "#FFB3B3";
						break;
					case "なし":
						colorcode = "#DDDDDD";
						break;
					case "はい(注記)":
						colorcode = "#99FF99";
						break;
					default:
						colorcode = "#ffffff";
						break;
				}
				cls.setAttribute("style", "background:" + colorcode + ";");
			}
		}
	} else if(vmode() === "status") {
		var rs_tbl_pg = document.getElementById("tabs-page").getElementsByTagName("table")[0];
		var trs = rs_tbl_pg.rows;
		for(var i=1; i<trs.length; i++) {
			var tr = trs.item(i);
			for(var j=0; j<tr.cells.length; j++) {
				var cls = tr.cells.item(j);
				var clstxt = cls.innerHTML.trim();
				var colorcode = "";
				switch(clstxt) {
					case "はい":
						colorcode = "#89FFFF";
						break;
					case "いいえ":
						colorcode = "#FFB3B3";
						break;
					case "なし":
						colorcode = "#DDDDDD";
						break;
					case "はい(注記)":
						colorcode = "#99FF99";
						break;
					default:
						colorcode = "#ffffff";
						break;
				}
				cls.setAttribute("style", "background:" + colorcode + ";");
			}
		}
		var rs_tbl_chk = document.getElementById("tabs-chkpoint").getElementsByTagName("table")[0];
		var trs = rs_tbl_chk.rows;
		for(var i=1; i<trs.length; i++) {
			var tr = trs.item(i);
			for(var j=0; j<tr.cells.length; j++) {
				var cls = tr.cells.item(j);
				var clstxt = cls.innerHTML.trim();
				var colorcode = "";
				switch(clstxt) {
					case "はい":
						colorcode = "#89FFFF";
						break;
					case "いいえ":
						colorcode = "#FFB3B3";
						break;
					case "なし":
						colorcode = "#DDDDDD";
						break;
					case "はい(注記)":
						colorcode = "#99FF99";
						break;
					default:
						colorcode = "#ffffff";
						break;
				}
				cls.setAttribute("style", "background:" + colorcode + ";");
			}
		}
	} else if(vmode() === "checkpoint") {
		var checkpoint_tbl = document.getElementById("table-chkpoint");
		var trs = checkpoint_tbl.rows;
		for(var i=1; i<trs.length; i++) {
			var tr = trs.item(i);
			for(var j=2; j<tr.cells.length; j++) {
				var cls = tr.cells.item(j);
				switch(j) {
					case 2:
						cls.setAttribute("style", "background:#FCB829;");
						break;
					case 4:
						cls.setAttribute("style", "background:#89FFFF;");
						break;
					case 5:
						var clsnm = parseInt(cls.getElementsByTagName("span")[0].innerHTML.trim());
						if(clsnm > 0) {
							cls.setAttribute("style", "background:#FA474B;");
						} else {
							cls.setAttribute("style", "background:#FFB3B3;");
						}
						break;
					case 6:
						cls.setAttribute("style", "background:#DDDDDD;");
						break;
				}
			}
		}
	}
};

//W3Cバリデートレポートユーティリティ関数
const w3c_repo_util = function() {
	try {
		var str = "";
		var crurl = location.href;
		if(crurl.indexOf(".org/nu/") > 0) {
			var rep_wrapper = document.getElementById("results");
			var errcnt = 0;
			var linept = new RegExp(/(From|At)( line )([0-9]+?)(,)/);
			var inwrap = rep_wrapper.getElementsByTagName("ol")[0];
			var rows = inwrap.getElementsByTagName("li");
			for(var i=0; i<rows.length; i++) {
				var row = rows.item(i);
				var atr = row.getAttribute("class");
				if(atr === "error") {
					errcnt++;
					var emsg = row.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerText;
					var eline = row.getElementsByClassName("location")[0].getElementsByTagName("a")[0].innerText;
					var elinestr = "";
					if(linept.test(eline)) {
						elinestr = eline.match(linept)[3];
					}
					elinestr += "行目";
					var esrc = row.getElementsByClassName("extract")[0].getElementsByTagName("code")[0].innerText;
					str += elinestr + "\n" + emsg + "\n\n" + esrc + "\n\n\n";
				}
			}
		} else {
			var rep_wrapper = document.getElementById("error_loop");
			var errcnt = 0;
			var linept = new RegExp(/(Line )([0-9]+?)(,)/);
			var rows = rep_wrapper.getElementsByTagName("li");
			for(var i=0; i<rows.length; i++) {
				var row = rows.item(i);
				var atr = row.getAttribute("class");
				if(atr === "msg_err") {
					errcnt++;
					var eline = row.getElementsByTagName("em")[0].innerText;
					var elinestr = "";
					if(linept.test(eline)) {
						elinestr = eline.match(linept)[2];
					}
					elinestr += "行目";
					var emsg = row.getElementsByClassName("msg")[0].innerText;
					var esrc = row.getElementsByTagName("pre")[0].getElementsByTagName("code")[0].innerText;
					str += elinestr + "\n" + emsg + "\n\n" + esrc + "\n\n\n";
				}
			}
		}
		show_bkmk_dialog("presv-addon-w3c-ui", "w3c整形（W3Cバリデート結果整形表示）", str);
		function show_bkmk_dialog(id, title, str) {
			var divcss = 'font-family:\'メイリオ\',sans-serif;font-size:90%;padding:5px;position:absolute;top:0;left:0;background:#fff;z-index:2999;width:760px;height:390px;box-shadow: 2px 2px 4px gray;';
			var tacss = ' style=\'width:750px; height: 355px; border: none;\'';
			var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
			var panel_start = '<div style=\'padding:3px;background:#000;color:#fff;height:19px;\'><span style=\'float:left;\'><strong>' + title + '</strong></span><a style=\'float:right;\' onclick=\"' + btnfunc + '\">閉じる' + '</a></div><textarea' + tacss + '>';
			var panel_end = '</textarea>';
			var elm = document.createElement("div");
			elm.id = id;
			elm.style.cssText = divcss;
			elm.innerHTML = panel_start + str + panel_end;
			document.getElementsByTagName("body")[0].appendChild(elm);
			scrollTo(0, 0);
		}
	} catch(e) {
		alert("実行時エラーです。W3Cバリデータの結果ページでない、あるいはバリデータオプションでソースコード表示のチェックがOFFになっているかもしれません。");
	}
};

//単一検査画面機能拡張ユーティリティ関数
const sv_ui_tool = function() {
	var add_btn = document.querySelectorAll('a[id^="add_"]');
	var cp_btn = document.querySelectorAll('a[id^="src_copy_"]');
	var comment = document.querySelector('textarea[id^="comment_"]');
	var description = document.querySelector('textarea[id^="src_"]');
	var srccode = document.querySelector('textarea[id^="updsrc_"]');
	var disp_btn = document.querySelectorAll('button[id^="btn_dsp_"]');
	var src_label = document.querySelectorAll('label[for^="src_"]');
	var svpage_pat = new RegExp(/\/libraplus\/inspect\/chkpoint\//);

	if(!svpage_pat.test(location.href)) {
		alert("実行時エラーです。この機能は、単独検査入力画面（ページV、ソースコードV、検査箇所一覧Vなどで検知アイコンや検査ボタンをクリックして出てくる画面）のみで使用可能です。");
		return;
	}
	
	var get_count = function(element) {
		var pt = new RegExp(/(_)([0-9]+)/);
		var idx = element.getAttribute("id");
		if(!pt.test(idx)) return;
		var nm = parseInt(idx.match(pt)[2]);
		return nm;
	};
	var get_count_for = function(element) {
		var pt = new RegExp(/(_)([0-9]+)/);
		var idx = element.getAttribute("for");
		if(!pt.test(idx)) return;
		var nm = parseInt(idx.match(pt)[2]);
		return nm;
	};

	for(var i=0; i<add_btn.length; i++) {
		var el = add_btn[i];
		var btn = document.createElement("a");
		var idx = get_count(el);
		btn.setAttribute("id", `comment_clear_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
		var btn_scr = `
			(function(){
				document.querySelector('textarea[id^="comment_${idx}"]').value = "";
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, el.nextSibling);

		var sr_btn = document.querySelector(`#comment_clear_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">改行</span>`;
		btn.setAttribute("id", `comment_br_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="comment_${idx}"]');
				var sentence = src.value;
				var len = sentence.length;
				var pos = src.selectionStart;
				var before = sentence.substr(0, pos);
				var after = sentence.substr(pos, len);
				sentence = before + "\\r\\n" + after;
				src.value = sentence;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#comment_br_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-primary m-l-3">再検OK</span>`;
		btn.setAttribute("id", `svupd_ok_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="comment_${idx}"]');
				var today = new Date();
				var m = today.getMonth()+1;
				var d = today.getDate();
				var addtxt = m + '/' + d + ' 修正を確認\\r\\n' + '---' + '\\r\\n\\r\\n';
				var sentence = src.value;
				sentence = addtxt + sentence;
				src.value = sentence;
				var tr = src.parentElement.parentElement.parentElement.parentElement;
				var slc = tr.querySelector('select[id^="result_"]');
				slc.selectedIndex = 1;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#svupd_ok_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-primary m-l-3">差替適合</span>`;
		btn.setAttribute("id", `svrep_ok_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="comment_${idx}"]');
				var today = new Date();
				var m = today.getMonth()+1;
				var d = today.getDate();
				var addtxt = m + '/' + d + ' 適合に差替\\r\\n' + '---' + '\\r\\n\\r\\n';
				var sentence = src.value;
				sentence = addtxt + sentence;
				src.value = sentence;
				var tr = src.parentElement.parentElement.parentElement.parentElement;
				var slc = tr.querySelector('select[id^="result_"]');
				slc.selectedIndex = 1;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#svrep_ok_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-primary m-l-3">差替注記</span>`;
		btn.setAttribute("id", `svrep_ok2_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="comment_${idx}"]');
				var today = new Date();
				var m = today.getMonth()+1;
				var d = today.getDate();
				var addtxt = m + '/' + d + ' 適合(注記)に差替\\r\\n' + '---' + '\\r\\n\\r\\n';
				var sentence = src.value;
				sentence = addtxt + sentence;
				src.value = sentence;
				var tr = src.parentElement.parentElement.parentElement.parentElement;
				var slc = tr.querySelector('select[id^="result_"]');
				slc.selectedIndex = 2;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#svrep_ok2_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-primary m-l-3">差替(なし)</span>`;
		btn.setAttribute("id", `svrep_na_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="comment_${idx}"]');
				var src_ta = document.querySelector('textarea[id^="src_${idx}"]');
				var upd_ta = document.querySelector('textarea[id^="updsrc_${idx}"]');
				var src_ta_old = src_ta.value;
				var upd_ta_old = upd_ta.value;
				var today = new Date();
				var m = today.getMonth()+1;
				var d = today.getDate();
				var addtxt = m + '/' + d + ' 非適用に差替\\r\\n' + '---' + '\\r\\n\\r\\n';
				var sentence = src.value;
				sentence = addtxt + sentence;
				var tr = src.parentElement.parentElement.parentElement.parentElement;
				var slc = tr.querySelector('select[id^="result_"]');
				slc.selectedIndex = 4;
				src.value = sentence;
				src_ta.value = src_ta_old;
				upd_ta.value = upd_ta_old;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);
	}

	for(var i=0; i<src_label.length; i++) {
		var el = src_label[i];
		var btn = document.createElement("a");
		var idx = get_count_for(el);
		btn.setAttribute("id", `srccode_clear_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
		var btn_scr = `
			(function(){
				document.querySelector('textarea[id^="src_${idx}"]').value = "";
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, el.nextSibling);

		var sr_btn = document.querySelector(`#srccode_clear_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">改行</span>`;
		btn.setAttribute("id", `srccode_br_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="src_${idx}"]');
				var sentence = src.value;
				var len = sentence.length;
				var pos = src.selectionStart;
				var before = sentence.substr(0, pos);
				var after = sentence.substr(pos, len);
				sentence = before + "\\r\\n" + after;
				src.value = sentence;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);
	}

	for(var i=0; i<cp_btn.length; i++) {
		var el = cp_btn[i];
		var btn = document.createElement("a");
		var idx = get_count(el);
		btn.setAttribute("id", `updsrc_clear_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
		var btn_scr = `
			(function(){
				document.querySelector('textarea[id^="updsrc_${idx}"]').value = "";
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, el.nextSibling);

		var sr_btn = document.querySelector(`#updsrc_clear_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">改行</span>`;
		btn.setAttribute("id", `updsrc_br_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
				var sentence = src.value;
				var len = sentence.length;
				var pos = src.selectionStart;
				var before = sentence.substr(0, pos);
				var after = sentence.substr(pos, len);
				sentence = before + "\\r\\n" + after;
				src.value = sentence;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#updsrc_br_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">空alt化</span>`;
		btn.setAttribute("id", `alt_clear_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
				var srctxt = src.value;
				src.value = srctxt.replace(/alt=".+?"/mg, 'alt=""');
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#alt_clear_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">非リンク化</span>`;
		btn.setAttribute("id", `link_clear_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
				var srctxt = src.value;
				srctxt = srctxt.replace(/<a.*?>/mg, "").replace(/<\\/a>/mg, "");
				src.value = srctxt;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#link_clear_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">囲む(x要素)</span>`;
		btn.setAttribute("id", `tag_sand_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var tag = prompt("要素名(strong, span, em, ul, ol, li, dl, dt, dd, p, h, 未入力はstrong)");
				if(tag === null) return;
				if(tag=="") tag = "strong";
				var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
				var sentence = src.value;
				var len = sentence.length;
				var pos = src.selectionStart;
				var posen = src.selectionEnd;
				var body = sentence.substring(pos, posen);
				var before = sentence.substr(0, pos);
				var after = sentence.substr(posen, len);
				sentence = before + "<" + tag + ">" + body + "</" + tag + ">" + after;
				src.value = sentence;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#tag_sand_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">記述指示(x要素)</span>`;
		btn.setAttribute("id", `division_x_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var tag = prompt("要素名(ul, ol, dl, h, p, 未入力はul)");
				if(tag === null) return;
				if(tag=="") tag = "ul";
				var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
				var sentence = src.value;
				var len = sentence.length;
				var pos = src.selectionStart;
				var before = sentence.substr(0, pos);
				var after = sentence.substr(pos, len);
				sentence = before + tag + "要素で定義する。" + after;
				src.value = sentence;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

		sr_btn = document.querySelector(`#division_x_btn_${idx}`);
		btn = document.createElement("a");
		btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">削除指示(x要素)</span>`;
		btn.setAttribute("id", `delete_x_btn_${idx}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn_scr = `
			(function(){
				var tag = prompt("要素名(a, ul, ol, dl, h, p, この, 未入力はa)");
				if(tag === null) return;
				if(tag=="") tag = "a";
				var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
				var sentence = src.value;
				var len = sentence.length;
				var pos = src.selectionStart;
				var before = sentence.substr(0, pos);
				var after = sentence.substr(pos, len);
				sentence = before + tag + "要素を削除する。" + after;
				src.value = sentence;
			})();
		`;
		btn.setAttribute("onclick", btn_scr);
		el.parentElement.insertBefore(btn, sr_btn.nextSibling);

	}

	var actionBar = document.querySelectorAll("div.clearfix.mb-2.mt-2.chkpoint-btn");
	for(var i=0; i<actionBar.length; i++) {
		var action_r = actionBar[i];
		var close_b = action_r.querySelector("button:nth-child(2)");
		var btn = document.createElement("button");
		btn.setAttribute("id", `disp_sv_btn_${i}`);
		btn.setAttribute("href", `javascript:void(0)`);
		btn.setAttribute("class", "btn btn-outline-primary btn-sm ml-2");
		btn.innerHTML = `<i class="fas fa-search"></i>表示(登録済検査内容)</button>`;
		var b_src = `
			(function(){
				var crurl = location.href;
				var this_w = window;
				var nwurl = crurl.replace(new RegExp(/\\/libraplus\\/inspect\\/chkpoint\\/list\\//), "/libraplus/inspect/chkpoint/dsp/");
				var window_size = "left=" + this_w.outerWidth + ",width=" + this_w.outerHeight;
				var window_option = ",menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes";
				window.open(nwurl, "blank", window_size+window_option);
				this_w.close();
			})();
		`;
		btn.setAttribute("onclick", b_src);
		close_b.parentElement.insertBefore(btn, close_b.nextSibling);
	}

	try {
		for(var i=0; i<disp_btn.length; i++) {
			var el = disp_btn[i];
			el.click();
		}
	} catch(e) {}

};

//画面幅ユーティリティ関数
const view_size_util = function() {
	var svpage_pat = new RegExp(/\/libraplus\/inspect\/start\/index\//);
	var rspage_pat = new RegExp(/\/libraplus\/status\/list\//);
	var chkp_pat = new RegExp(/\/libraplus\/inspect\/chkpoint\/dsp\//);
	var rsrs_pat = new RegExp(/\/libraplus\/status\/detail\//);
	var cr_path = location.href;
	if(svpage_pat.test(cr_path)) {
		var view_el = document.querySelector("#tabs");
		var crwd = view_el.clientWidth;
		var step = 0;
		if(crwd < 800) step = 100;
		else if(crwd < 500) step = 50;
		else step = 200;
		var nwwd = crwd -= step;
		if(nwwd > 250) {
			view_el.setAttribute("style", `width:${nwwd}px!important;`);
		} else {
			view_el.removeAttribute("style");
		}
	} else if(rspage_pat.test(cr_path)) {
		var maxwd = screen.width;
		var crwd = window.outerWidth;
		var crht = window.outerHeight;
		var step = 200;
		var nwwd = crwd += step;
		if(nwwd >= maxwd) {
			window.resizeTo(1000, crht);
		} else {
			window.resizeTo(nwwd, crht);
		}
	} else if(chkp_pat.test(cr_path)) {
		var tbl = document.querySelector("table");
		var ths = tbl.querySelectorAll("th");
		var thclass = ths[1].getAttribute("class");
		ths[1].setAttribute("class", thclass.replace(" w-40", ""));
		var trs = tbl.querySelectorAll("tr");
		for(var i=1; i<trs.length; i++) {
			var tr = trs[i];
			var td = tr.querySelectorAll("td");
			td[1].setAttribute("class", "break-all");
			td[3].setAttribute("class", "break-all w-20");
		}
	} else if(rsrs_pat.test(cr_path)) {
		var tb1 = document.querySelector("#status-detail-page");
		var tb2 = document.querySelector("#tabs-chkpoint");
		var tbl_sizer = function(el) {
			var tds = el.querySelectorAll("td.col-md-6.break-all");
			for(var i=0; i<tds.length; i++) {
				var td = tds[i];
				var tdclass = td.getAttribute("class");
				td.setAttribute("class", tdclass.replace("col-md-6", ""));
			}
		};
		tbl_sizer(tb1);
		tbl_sizer(tb2);
	}
};

browser.runtime.onMessage.addListener((message) => {

	let cmd = message.command;

	switch(cmd) {
		case "browse":
			util.svpage_open();
			break;
		case "next":
			util.svpage_next();
			break;
		case "prev":
			util.svpage_prev();
			break;
		case "single-cp":
			util.survey_single_copy();
			break;
		case "single-ps":
			util.survey_single_paste();
			break;
		case "all-cp":
			util.survey_all_copy();
			break;
		case "all-ps":
			util.survey_all_paste();
			break;
		case "run-js":
			run_js();
			break;
		case "do-ok":
			util.force_survey_ok();
			break;
		case "do-na":
			util.force_survey_na();
			break;
		case "rep-view-util":
			rep_view_util();
			break;
		case "sv-color-util":
			sv_color_util();
			break;
		case "w3c-repo-util":
			w3c_repo_util();
			break;
		case "sv-ui-extend":
			sv_ui_tool();
			break;
		case "view-size-util":
			view_size_util();
			break;
	}
});