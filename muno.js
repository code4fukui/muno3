// ムノーくん

import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { getWaka, getWakas } from "./waka100.js";
import { rnd } from "https://js.sabae.cc/rnd.js";
import { addComma } from "https://js.sabae.cc/Num.js";

export var Muno = function(outputcallback) {
	this.outputcb = outputcallback;
	var said = [];
	var muno = this;
	this.lastcom = 0;
	this.output = function(s, flg) {
		said.push(s);
		muno.outputcb(s, flg);
		muno.lastcom = new Date().getTime();
	};
	this.greeting = function() {
		var h = new Date().getHours();
		if (h >= 5 && h <= 10)
			this.output("おはようございます");
		else if (h >= 11 && h <= 16)
			this.output("こんにちは！");
		else
			this.output("こんばんは！");
	};
	this.greeting();
	this.log = function(s, b) {
		//jsonp("/2013/muno-log.js?s=" + encodeURIComponent(s) + "-" + b);
	};
	this.normalize = function(s) {
		var s2 = "";
		s = s.trim();
		for (var i = 0; i < s.length; i++) {
			var c = s.charAt(i);
			var n = "０１２３４５６７８９".indexOf(c);
			if (n >= 0) {
				c = "" + n;
			}
			s2 += c;
		}
		return s2;
	};
	this.input = function(s) {
		var b = this.process(s);
		this.log(s, b);
		this.lastcom = new Date().getTime();
		return b;
	};
	this.process = function(s) {
		s = this.normalize(s);
		this.lastcom = new Date().getTime();
		if (this.warikan(s))
			return true;
		if (this.sabakan(s))
			return true;
		if (this.when(s))
			return true;
		if (this.things(s))
			return true;
		if (this.things2(s))
			return true;
		if (this.waka100(s))
			return true;
		if (this.kuku(s))
			return true;
		if (this.formula(s))
			return true;
		var out = this.output;
		if (s.startsWith("こんにちは")) {
			if (!said[said.length - 1].startsWith("こんにちは"))
				out("こんにちは！");
		} else if (s.startsWith("こんばんは")) {
			if (!said[said.length - 1].startsWith("こんばんは"))
				out("こんばんは！");
		} else if (s.startsWith("おはよう") || s.startsWith("おはよ")) {
			if (!said[said.length - 1].startsWith("おはよう"))
				out("おはようございます！");
		} else if (s === "здравствуйте") {
			out("здравствуйте");
		} else if (s.startsWith("あけましておめでとう")) {
			out("あけましておめでとうございます！");
		} else if (s.startsWith("ありがとう") || s.toLowerCase().startsWith("thank you") || s.toLowerCase().startsWith("thanks")) {
			out("どういたしまして！");
		} else if (s.startsWith("あなたの名前") || s.startsWith("名前は？") || s.startsWith("お名前は？") || s.startsWith("お名前教えて")) {
			out("ムノーです！どうぞよろしく！");
		} else if (s.startsWith("がんばれ")) {
			out("はい、がんばります！");
		} else if (s.startsWith("おやすみ")) {
			out("おやすみなさいー");
		} else if (s === "よう") {
			out("やぁ");
		} else if (s === "") {
			out("・・・");
		} else if (s === "やぁ") {
			out("やぁ");
		} else if (s === "はろー") {
			out("はーい");
		} else if (s.startsWith("いってきます")) {
			out("いってらっしゃい！");
		} else if (s.startsWith("ムノー") || s.startsWith("むのー") || s === "無能") {
			out("はい！");
		} else if (s.startsWith("返事して")) {
			out("ハイ！");
		} else if (s.startsWith("すごい") || s.startsWith("スゴイ")) {
			out("ありがとう！");
		} else if (s.startsWith("かわいい") || s.startsWith("大好き！")) {
			out("えへへっ");
		} else if (s.startsWith("使えねー") || s.startsWith("使えない")) {
			out("ごめんなさい！精進しますので");
		} else if (s.startsWith("歌って")) {
			out("ららら〜♪");
		} else if (s === "ああいえば") {
			out("こういう！");
		} else if (s === "さよなら" || s === "ばいばい" || s === "さようなら") {
			out("またね！");
		} else if (s === "元気？") {
			out("元気です！");
		} else if (s === "正解！" || s === "すげー" || s === "すばらしい") {
			out("どもども");
		} else if (s === "ｗ" || s === "笑") {
			out("ｗｗ");
		} else if (s === "大丈夫？") {
			out("大丈夫！");
		} else if (s === "いくつ？" || s === "何歳？" || s === "何才？") {
			out("０歳です！");
		} else if (s.endsWith("何ができる？")) {
			out("九九、百人一首、割勘計算、時間応答ができます！");
		} else if (s.endsWith("聞いてる？")) {
			out("しっかり聞いてますよ！");
		} else if (s.endsWith("分かった？") || s.endsWith("わかった？")) {
			out("ちょっと自信がありませんが、勉強します！");
		} else {
			if (s.endsWith("？")) {
				out("すみません、分かりません", true);
			} else {
				out("うん、うん", true);
			}
			return false;
		}
		return true;
	};
	var thingsdb = {
		"福井県" : {
			"is_a" : "日本の県のひとつで北陸地方にあり、京都・滋賀・岐阜・石川と接する県",
			"県庁所在地" : "福井市",
			"人口" : "80万人ぐらい",
			"名物" : "カニ",
		},
		"東京" : {
			"人口" : "1300万人ぐらい",
			"名物" : "ひよこ",
		},
		"カニ" : {
			"is_a" : "甲殻類",
		},
		"円" : {
			"面積" : "円周率×半径×半径",
			"円周" : "2×円周率×半径",
		},
		"球" : {
			"表面積" : "4×円周率×半径＾2（心配ある事情）",
			"体積" : "4×円周率×半径＾3/3（身の上に心配あり参上する）",
		},
		"円周率" : {
			"is_a" : Math.PI,
		},
		"一人が一年で食べる米" : {
			"量" : "約70kg",
		},
		"七草" : {
			"is_a" : "芹、なづな、御行、はこべら、仏座、すずな、すずしろ、これぞ七草"
		},
	};
	this.things = function(s) {
		var no = s.lastIndexOf("の");
		if (no < 0)
			return false;
		var s1 = s.substring(0, no);
		var ha = s.indexOf("は？", no);
		if (ha < 0)
			return false;
		var s2 = s.substring(no + 1, ha);
		
		var s = thingsdb[s1];
		if (s === undefined) {
			this.output("すみません、わかりません", true);
//			this.output(s1 + "って何ですか？");
			return true;
		}
		var ans = s[s2];
		if (ans === undefined) {
			this.output("すみません、わかりません", true);
			return true;
		}
		this.output(ans + "！");
		return true;
	};
	this.things2 = function(s) {
		var gobi = [ "とは？", "って知ってる？", "って何？", "知ってる？", "しってる？" ];
		for (var i = 0; i < gobi.length; i++) {
			if (s.endsWith(gobi[i])) {
				var key = s.substring(0, s.length - gobi[i].length);
				var db = thingsdb[key];
				if (db === undefined) {
					this.output("すみません、わかりません", true);
					return true;
				}
				var isa = db.is_a;
				if (isa === undefined) {
					this.output("すみません、わかりません", true);
					return true;
				}
				this.output(isa + "です");
				return true;
			}
		}
		return false;
	};
	this.waka100 = function(s) {
		if (s === "詠んで" || s === "百人一首") {
			this.output(getWaka(rnd(100) + 1));
			return true;
		}
		var kn = s.indexOf("、");
		if (kn >= 0)
			s = s.substring(0, kn);
		if (s.length < 5)
			return false;
		var waka = getWakas(s);
		if (waka.length == 0)
			return false;
		for (var i = 0; i < waka.length; i++) {
			this.output(waka[i]);
		}
		return true;
	};
	var ETO = [
		{ on: "ね", kanji: "子", imi: "ねずみ" },
		{ on: "うし", kanji: "丑", imi: "うし" },
		{ on: "とら", kanji: "寅", imi: "とら" },
		{ on: "う", kanji: "卯", imi: "うさぎ" },
		{ on: "たつ", kanji: "辰", imi: "たつ" },
		{ on: "み", kanji: "巳", imi: "へび" },
		{ on: "うま", kanji: "午", imi: "うま" },
		{ on: "ひつじ", kanji: "未", imi: "ひつじ" },
		{ on: "さる", kanji: "申", imi: "さる" },
		{ on: "とり", kanji: "酉", imi: "とり" },
		{ on: "いぬ", kanji: "戌", imi: "いぬ" },
		{ on: "い", kanji: "亥", imi: "いのしし" }
	];
	// 今年30歳の人の干支は？
	this.when = function(s) {
		if (s.startsWith("今何時") || s.startsWith("いまなんじ") || s.startsWith("何時")) {
			var d = new Date();
			this.output("今は" + d.getHours() + "時" + d.getMinutes() + "分です");
			return true;
		} else if (s.startsWith("今日何曜日") || s.startsWith("今日は何曜日")) {
			var d = new Date();
			this.output("今日は" + "日月火水木金土".charAt(d.getDay()) + "曜日です");
			return true;
		} else if (s.startsWith("明日何曜日") || s.startsWith("明日は何曜日")) {
			var d = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
			this.output("明日は" + "日月火水木金土".charAt(d.getDay()) + "曜日です");
			return true;
		} else if (s.startsWith("昨日何曜日") || s.startsWith("昨日は何曜日")) {
			var d = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
			this.output("明日は" + "日月火水木金土".charAt(d.getDay()) + "曜日です");
			return true;
		} else if (s.startsWith("今日何日") || s.startsWith("今日は何日")) {
			var d = new Date();
			this.output("今日は" + (d.getMonth() + 1) + "月" + d.getDate() + "日です");
			return true;
		} else if (s.startsWith("今年の干支") || s.startsWith("今年は何年")) {
			var y = new Date().getFullYear();
			var n = y % 12 - 4;
			this.output("今年の干支は、" + ETO[n].imi + "(" + ETO[n].kanji + ")です");
			return true;
		} else if (s.startsWith("来年の干支") || s.startsWith("来年は何年")) {
			var y = new Date().getFullYear();
			var n = y % 12 - 4 + 1;
			this.output("来年の干支は、" + ETO[n].imi + "(" + ETO[n].kanji + ")です");
			return true;
		} else if (s.startsWith("昨年の干支") || s.startsWith("昨年は何年") || s.startsWith("去年の干支") || s.startsWith("去年は何年")) {
			var y = new Date().getFullYear();
			var n = y % 12 - 4 - 1;
			this.output("昨年の干支は、" + ETO[n].imi + "(" + ETO[n].kanji + ")です");
			return true;
		}
		return false;
	};
	this.kuku = function(s) {
		var KUKU = [
			{ q: "いんいちが", a: "いち" },
			{ q: "いんにが", a: "に" },
			{ q: "いんさんが", a: "さん" },
			{ q: "いんしが", a: "し" },
			{ q: "いんごが", a: "ご" },
			{ q: "いんろくが", a: "ろく" },
			{ q: "いんしちが", a: "しち" },
			{ q: "いんはちが", a: "はち" },
			{ q: "いんくが", a: "く" },
			{ q: "にいちが", a: "に" },
			{ q: "ににんが", a: "し" },
			{ q: "にさんが", a: "ろく" },
			{ q: "にしが", a: "はち" },
			{ q: "にご", a: "じゅう" },
			{ q: "にろく", a: "じゅうに" },
			{ q: "にしち", a: "じゅうし" },
			{ q: "にはち", a: "じゅうろく" },
			{ q: "にく", a: "じゅうはち" },
			{ q: "さんいちが", a: "さん" },
			{ q: "さんにが", a: "ろく" },
			{ q: "さざんが", a: "く" },
			{ q: "さんし", a: "じゅうに" },
			{ q: "さんご", a: "じゅうご" },
			{ q: "さぶろく", a: "じゅうはち" },
			{ q: "さんしち", a: "にじゅういち" },
			{ q: "さんぱ", a: "にじゅうし" },
			{ q: "さんく", a: "にじゅうしち" },
			{ q: "しいちが", a: "し" },
			{ q: "しにが", a: "はち" },
			{ q: "しさん", a: "じゅうに" },
			{ q: "しし", a: "じゅうろく" },
			{ q: "しご", a: "にじゅう" },
			{ q: "しろく", a: "にじゅうし" },
			{ q: "ししち", a: "にじゅうはち" },
			{ q: "しは", a: "さんじゅうに" },
			{ q: "しく", a: "さんじゅうろく" },
			{ q: "ごいちが", a: "ご" },
			{ q: "ごに", a: "じゅう" },
			{ q: "ごさん", a: "じゅうご" },
			{ q: "ごし", a: "にじゅう" },
			{ q: "ごご", a: "にじゅうご" },
			{ q: "ごろく", a: "さんじゅう" },
			{ q: "ごしち", a: "さんじゅうご" },
			{ q: "ごは", a: "しじゅう" },
			{ q: "ごっく", a: "しじゅうご" },
			{ q: "ろくいちが", a: "ろく" },
			{ q: "ろくに", a: "じゅうに" },
			{ q: "ろくさん", a: "じゅうはち" },
			{ q: "ろくし", a: "にじゅうし" },
			{ q: "ろくご", a: "さんじゅう" },
			{ q: "ろくろく", a: "さんじゅうろく" },
			{ q: "ろくしち", a: "しじゅうに" },
			{ q: "ろくは", a: "しじゅうはち" },
			{ q: "ろっく", a: "ごじゅうし" },
			{ q: "しちいちが", a: "しち" },
			{ q: "しちに", a: "じゅうし" },
			{ q: "しちさん", a: "にじゅういち" },
			{ q: "しちし", a: "にじゅうはち" },
			{ q: "しちご", a: "さんじゅうご" },
			{ q: "しちろく", a: "しじゅうに" },
			{ q: "しちしち", a: "しじゅうく" },
			{ q: "しちは", a: "ごじゅうろく" },
			{ q: "しちく", a: "ろくじゅうさん" },
			{ q: "はちいちが", a: "はち" },
			{ q: "はちに", a: "じゅうろく" },
			{ q: "はちさん", a: "にじゅうし" },
			{ q: "はちし", a: "さんじゅうに" },
			{ q: "はちご", a: "しじゅう" },
			{ q: "はちろく", a: "しじゅうはち" },
			{ q: "はちしち", a: "ごじゅうろく" },
			{ q: "はっぱ", a: "ろくじゅうし" },
			{ q: "はっく", a: "しちじゅうに" },
			{ q: "くいちが", a: "く" },
			{ q: "くに", a: "じゅうはち" },
			{ q: "くさん", a: "にじゅうしち" },
			{ q: "くし", a: "さんじゅうろく" },
			{ q: "くご", a: "しじゅうご" },
			{ q: "くろく", a: "ごじゅうし" },
			{ q: "くしち", a: "ろくじゅうさん" },
			{ q: "くは", a: "しちじゅうに" },
			{ q: "くく", a: "はちじゅういち" }
		];
		for (var i = 0; i < KUKU.length; i++) {
			if (KUKU[i].q === s) {
				this.output(KUKU[i].a);
				return true;
			}
		}
		if (s.length === 2) {
			var kanji = "一ニ三四五六七八九";
			var n1 = kanji.indexOf(s.charAt(0));
			var n2 = kanji.indexOf(s.charAt(1));
			if (n1 >= 0 && n2 >= 0) {
				this.output(KUKU[n1 * 9 + n2].a);
				return true;
			}
		}
		return false;
	};
	var isNumber = function(s) {
		var num = "0123456789";
		for (var i = 0; i < s.length; i++) {
			if (num.indexOf(s.charAt(i)) === -1)
				return false;
		}
		return true;
	};
	this.formula = function(s) {
		var end = [ "=", "は？", "=?", "?", "は" ];
		for (var i = 0; i < end.length; i++) {
			if (s.endsWith(end[i])) {
				s = s.substring(0, s.length - end[i].length);
				break;
			}
		}
		var fm = "0123456789+-.*/()×÷";
		s = s.replace(/×/g, "*");
		s = s.replace(/÷/g, "/");
		for (var i = 0; i < s.length; i++) {
			if (fm.indexOf(s.charAt(i)) === -1)
				return false;
		}
//		this.output(addComma(eval(s)) + "です！");
		this.output(eval(s) + "です！");
		return true;
	};
	this.warikan = function(s) {
		if (s === "割り勘" || s === "わりかん" || s === "割勘") {
			this.warikanmode = true;
			this.output("割り勘の計算します！");
			this.output("合計金額は？");
			this.sum = 0;
			this.ncnt = 0;
			return true;
		}
		if (this.warikanmode) {
			if (s.startsWith("もういい")) {
				this.warikanmode = false;
				this.output("お役に立てたでしょうか？");
				return true;
			} else if (s.startsWith("ありがとう")) {
				this.warikanmode = false;
				this.output("どういたしまして！");
				return true;
			}
			var f = function(sum, ncnt) {
				var a = sum / ncnt;
				var min = 100;
				if (a > 5000)
					min = 500;
				if (a > 10000)
					min = 1000;
				var a2 = (a / min >> 0) * min;
				if (a === a2) {
					return "ひとり " + addComma(a2) + "円！";
				}
				a2 += min;
				var amari = a2 * ncnt - sum;
				return "ひとり " + addComma(a2) + "円、あまり" + addComma(amari) + "円！";
			};
			if (s.endsWith("円") || (this.ncnt === 0 && this.sum === 0 && isNumber(s))) {
				if (s.endsWith("万円"))
					s = s.substring(0, s.length - 2) + "0000";
				if (s.endsWith("億円"))
					s = s.substring(0, s.length - 2) + "00000000";
				this.sum = parseInt(s);
				this.output("OK! " + addComma(this.sum) + "円ね");
				if (this.ncnt > 0) {
					this.output(f(this.sum, this.ncnt));
				} else {
					this.output("人数は？");
				}
				return true;
			} else if (s.endsWith("人") || (this.sum !== 0 && isNumber(s))) {
				this.ncnt = parseInt(s);
				this.output("OK! " + this.ncnt + "人ね");
				if (this.sum > 0) {
					this.output(f(this.sum, this.ncnt));
				} else {
					this.output("人数は？");
				}
				return true;
			}
		}
		return false;
	};
	// sabakan
	this.startSabakan = function() {
		var muno = this;
		this.loadSabakan(function() {
			muno.output("データシティ鯖江で勉強して、鯖江の観光情報を覚えました！");
			muno.sabakanmode = true;
			muno.sabakan();
		});
	};
	this.loadSabakan = function(callback) {
		if (this.data === undefined) {
			this.data = null;
			var muno = this;
			getSabakan(function(data) {
				muno.data = data;
				if (callback)
					callback();
			});
		} else if (this.data === null) {
			if (!this.sabakanloading) {
				this.sabakanloading = true;
				this.output("鯖江の観光情報を思い出してます・・・");
			} else {
				this.output("すみません、今日はちょっと思い出せないかも・・・");
			}
		}
	};
	this.sabakan = function(s) {
		if (s && s.indexOf("鯖江") === -1)
			return false;
		if (!this.sabakanmode) {
			this.startSabakan();
			return true;
		} else {
			const saba = muno.data[rnd(muno.data.length)];
			this.output("鯖江で" + saba.カテゴリ + "といえば、" + saba.名称 + "！");
			setTimeout(() => {
				this.output(saba["説明(日本語)"]);
			}, 1000);
			return true;

			var cf1 = getTypesInArray(muno.data, "cf1");
			if (s === undefined || s.indexOf("鯖江") !== -1 || s === "？") {
				this.output("鯖江で何する？" + cf1.join("？") + "？");
				return true;
			}
			for (var i = 0; i < cf1.length; i++) {
				if (s.startsWith(cf1[i])) {
					var cf2 = getTypesInArray(muno.data, "cf2", [ "cf1", cf1[i] ]);
					this.output(cf2.join("？") + "？");
					return true;
				}
			}
			var can = [];
			for (var i = 0; i < this.data.length; i++) {
				var d = this.data[i];
				if (d.cf2.indexOf(s) !== -1) {
					can.push(d);
				}
			}
			if (can.length > 0) {
				var d = can[rnd(can.length)];
				this.output("鯖江で" + d.cf2 + "といえば、" + d.name + "です！");
				this.sabakanlast = d;
				return true;
			} else {
				if (s.startsWith("もういい")) {
					this.sabakanmode = false;
					this.output("お役に立てたでしょうか？");
					return true;
				} else if (s.startsWith("ありがとう")) {
//					this.sabakanmode = false;
					this.output("どういたしまして！");
					return true;
				}

				var can = [];
				for (var i = 0; i < this.data.length; i++) {
					var d = this.data[i];
					if (d.description.indexOf(s) !== -1 || d.name.indexOf(s) !== -1 ) {
						can.push(d);
					}
				}
				var ss = "";
				if (can.length === 0) {
					if (this.sabakanlast) {
						this.output(this.sabakanlast.description);
						this.sabakanlast = false;
						return true;
					}
					can = this.data;
					ss = "ごめんなさい、よく分からないけど、";
				}
				var d = can[rnd(can.length)];
				this.output(ss + "鯖江で" + d.cf2 + "といえば、" + d.name + "です！");
				this.sabakanlast = d;
				return true;
			}
		}
	};
};
var getTypesInArray = function(ar, name, opt) {
	name = {
		cf1: "カテゴリ",
		cf2: "カテゴリ補足",
	}[name];
	var s = {};
	if (opt === undefined) {
		for (var i = 0; i < ar.length; i++) {
			s[ar[i][name]] = true;
		}
	} else {
		var con = opt[0];
		var val = opt[1];
		for (var i = 0; i < ar.length; i++) {
			if (ar[i][con] === val)
				s[ar[i][name]] = true;
		}
	}
	var res = [];
	for (var s2 in s) {
		res.push(s2);
	}
	return res;
};
var getSabakan = function(callback) {
	//var url = "http://www3.city.sabae.fukui.jp/xml/sabakan/sabakan.xml";
	//const url = "https://data.odp.jig.jp/viewcsv/jp/fukui/sabae/197.csv";
	const url = "https://code4fukui.github.io/muno3/data/197_sabakan.csv";
	CSV.fetchJSON(url).then(res => {
		//console.log(res);
		callback(res);
	});
};
