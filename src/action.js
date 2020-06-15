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
        this.status_page_url = "/libraplus/status/list/";
        this.url_select = document.querySelector('#select_urlno');

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

	m_result() {
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

	m_comment() {
		var parent = null;
		if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj()))
			parent = document;
		else
			parent = this.parent_tr(this.cursoled_obj());
		return parent.querySelector('textarea[id^="comment"]');
	}

	m_description() {
		var parent = null;
		if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj()))
			parent = document;
		else
			parent = this.parent_tr(this.cursoled_obj());
		return parent.querySelector('textarea[id^="src_"]')
	}

	m_srccode() {
		var parent = null;
		if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj()))
			parent = document;
		else
			parent = this.parent_tr(this.cursoled_obj());
		return parent.querySelector('textarea[id^="updsrc_"]')
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

	/*-----------------------------------------
		判定ダイアログメソッド一式
	-------------------------------------------*/
	get_survey() {
		var survey_str = "";
		var results = this.m_result();
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

	get_survey_key(key_val) {
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

	get_comment() {
		return this.m_comment().value;
	}

	get_description() {
		return this.m_description().value;
	}

	get_srccode() {
		return this.m_srccode().value;
	}

	set_survey(flag) {
		var flag_arr = flag.split(/\//mg);
		var results = this.m_result();		
		for(var i=0; i<results.length; i++) {
			var key = this.get_survey_key(flag_arr[i]);
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

	set_comment(str) {
		this.m_comment().value = str;
	}

	set_description(str) {
		this.m_description().value = str;
	}

	set_srccode(str) {
		this.m_srccode().value = str;
	}

	save_survey() {
		this.save_survey_btn.click();
	}

	set_survey_all(flag) {
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

	set_comment_all(str) {
		var all_comments = document.querySelectorAll('textarea[id^="comment"]');
		for(var i=0; i<all_comments.length; i++) {
			all_comments[i].value = str;
		}
	}

	set_description_all(str) {
		var all_descriptions = document.querySelectorAll('textarea[id^="src_"]');
		for(var i=0; i<all_descriptions.length; i++) {
			all_descriptions[i].value = str;
		}
	}

	set_srccode_all(str) {
		var all_srccodes = document.querySelectorAll('textarea[id^="updsrc_"]')
		for(var i=0; i<all_srccodes.length; i++) {
			all_srccodes[i].value = str;
		}
	}

	diag_clean(flag) {
		switch(flag) {
			case "はい":
				this.set_comment_all("");
				this.set_srccode_all("");
				break;
			case "なし":
				this.set_comment_all("");
				this.set_description_all("");
				this.set_srccode_all("");
				break;
		}
	}

	/*-----------------------------------------
		判定ダイアログ拡張メソッド一式
	-------------------------------------------*/
	survey_OK() {
		this.set_survey_all("はい");
		this.diag_clean("はい");
	}

	survey_OK2() {
		this.set_survey_all("はい(注記)");
	}

	survey_NA() {
		this.set_survey_all("なし");
		this.diag_clean("なし");
	}

	survey_copy() {
		var txt = "";
		var str_tech = "any";
		var str_sv_cp = "any";
		var str_sv = this.get_survey();
		var str_comment = this.br_encode(this.get_comment());
		var str_description = this.br_encode(this.get_description());
		var str_srccode = this.br_encode(this.get_srccode());
		txt = str_tech + this.tab_sp + str_sv + this.tab_sp + str_sv_cp + this.tab_sp + "who" + this.tab_sp;
		txt += str_comment + this.tab_sp + str_description + this.tab_sp + str_srccode;
		prompt("Ctrl+Cでコピーしてください。", txt);
	}

	survey_paste() {
		var src = prompt("コピーしたデータを貼り付けてください");
		src = src.trim();
		var arr = this.survey_paste_data_bind(src);
		var sv = arr[0];
		this.set_survey(sv);
		this.set_comment(arr[2]);
		this.set_description(arr[3]);
		this.set_srccode(arr[4]);
	}

	survey_paste_bkmk() {
		var src = prompt("コピーしたデータを貼り付けてください");
		src = src.trim();
		var arr = this.survey_paste_data_bind(src);
		var sv = arr[0];
		this.set_survey(sv);
		this.set_comment(arr[2]);
		this.set_description(arr[3]);
		this.set_srccode(arr[4]);
	}

	survey_paste_data_bind(data) {
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
	
	bookmarklet() {
		var src = prompt("コピーしたブックマークレットを貼り付けてください");
		eval(src);
	}
    
    status_page() {
        window.open(this.status_page_url, "_blank");
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
        case "svok":
			util.survey_OK();
			util.save_survey();
            break;
        case "svna":
			util.survey_NA();
			util.save_survey();
            break;
        case "copy":
            util.survey_copy();
            break;
        case "paste":
            util.survey_paste();
			break;
		case "bookmarklet":
			util.bookmarklet();
			break;
        case "status":
            util.status_page();
			break;
    }
});