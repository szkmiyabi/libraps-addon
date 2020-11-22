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
			var key = this.get_survey_key(flag);
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

	diag_clean_single(flag) {
		switch(flag) {
			case "はい":
				this.set_comment_fill("");
				this.set_srccode_fill("");
				break;
			case "なし":
				this.set_comment_fill("");
				this.set_description_fill("");
				this.set_srccode_all_fill("");
				break;
		}
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
	run_js() {
		var src = prompt("コピーしたブックマークレットを貼り付けてください");
		eval("{" + src + "}");
	}

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

}

const util = new libraPlusUtil();

browser.runtime.onMessage.addListener((message) => {

    let cmd = message.command;

    switch(cmd) {
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
			util.run_js();
			break;
    }
});