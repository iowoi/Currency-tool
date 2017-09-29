<script>
        API_HOST = "//api.kvbgc.com/";
        //API_HOST = "http://test.quotealarm.kvbgc.com/";
		
		SymbolA_default = "AUD";
		SymbolB_default = "CNH";
		
		$(function () {
			var ParamInfo = GetUrlParam();
			if (typeof(ParamInfo.Source) != "undefined") {
				switch (ParamInfo.Source) {
					case "cnHERALD":
						SymbolA_default = "NZD";
						SymbolB_default = "CNH";
						break;
						
					default:
						break;
				}
			}
		});
		
		
		$(function () {
            setInterval(RefreshSymbolInfo, 1000 * 60);
        });
		
        $(function () {
            var $select = $("#DataInfo_SymbolA");

            $select.change(function () {
                var $this = $(this);
                CreateSymbolB($$GV("DataInfo_SymbolA"));
            });
        });

        $(function () {
            var $select = $("#DataInfo_SymbolB");

            $select.change(function () {
                var $this = $(this);
                var SymbolA = $$GV("DataInfo_SymbolA");
                var SymbolB = $$GV("DataInfo_SymbolB");
                var Symbol = SymbolA + SymbolB;
                var Mid = parseFloat(GetObjectInfo(SymbolInfo, "Symbol", Symbol, "Mid"));
                var Bid = parseFloat(GetObjectInfo(SymbolInfo, "Symbol", Symbol, "Bid"));
                var Ask = parseFloat(GetObjectInfo(SymbolInfo, "Symbol", Symbol, "Ask"));
                var Digits = parseFloat(GetObjectInfo(SymbolInfo, "Symbol", Symbol, "Digits"));

                $$SV("DataInfo_SymbolB_Price", Mid.toFixed(Digits));
                $$SV("DataInfo_NoticePrice", Mid.toFixed(Digits));

                $$SV("DataInfo_Symbol", $$GV("DataInfo_SymbolA") + $$GV("DataInfo_SymbolB"));
            });
        });

        $(function () {

            SYS_ValidCode = NewGuid().Left(8);
            GetValidCode();

            SymbolInfo = [];
            LoadSymboInfo();
        });

        function GetValidCode() {
            var ApiHost = API_HOST;
            var ApiPath = "api/ValidCode/Get";
            var ApiUrl = ApiHost + ApiPath;

            $.ajax({
                url: ApiUrl
                , jsonp: "callback"
                , dataType: "jsonp"
                , data: {}
                , success: function (info) {
                    SYS_ValidCode = "" + info.returnValue.ValidCode;
                    ShowValidCode(SYS_ValidCode);
                }
            });
        }

        function ShowValidCode(ValidCode) {
            var ApiHost = API_HOST;
            var ApiPath = "api/ValidCode/Image?ValidCode={ValidCode}";
            var ApiUrl = ApiHost + ApiPath;
            var $img = $("#img_ValidCode");

            ApiUrl = ApiUrl.rp("{ValidCode}", encodeURIComponent(base64.encode(ValidCode)));
            $img.attr("src", ApiUrl);
        }

		function RefreshSymbolInfo() {
            var ApiHost = API_HOST;
            var ApiPath = "/api/RealTimePrice/List";
            var ApiUrl = ApiHost + ApiPath;

            $.ajax({
                url: ApiUrl
                , dataType: "jsonp"
                , jsonp: "callback"
                , data: {}
                , success: function (info) {
                    if (info.code != "0") {
                        alert(info.message);
                        return (false);
                    }

                    SymbolInfo = info.returnValue.list;

                    for (var i = 0; i < SymbolInfo.length; i++) {
                        var info = SymbolInfo[i];
                        var Mid = (info.Bid + info.Ask) / 2;
                        var Bid = Mid - (info.Spread / 2);
                        var Ask = Mid + (info.Spread / 2);

                        Mid = Math.floor(Mid * Math.pow(10, info.Digits));
                        Mid = Mid / Math.pow(10, info.Digits);
                        Mid = Mid.toFixed(info.Digits);

                        Bid = Math.floor(Bid * Math.pow(10, info.Digits));
                        Bid = Bid / Math.pow(10, info.Digits);
                        Bid = Bid.toFixed(info.Digits);

                        Ask = Math.floor(Ask * Math.pow(10, info.Digits));
                        Ask = Ask / Math.pow(10, info.Digits);
                        Ask = Ask.toFixed(info.Digits);

                        info.Mid = Mid;
                        info.Bid = Bid;
                        info.Ask = Ask;
                    }
                }
            });
        }

        function LoadSymboInfo() {
            var ApiHost = API_HOST;
            var ApiPath = "/api/RealTimePrice/List";
            var ApiUrl = ApiHost + ApiPath;

            $.ajax({
                url: ApiUrl
                , dataType: "jsonp"
                , jsonp: "callback"
                , data: {}
                , success: LoadSymboInfo_finish
            });
        }

        function LoadSymboInfo_finish(info) {
            var dt_data = new DataTable();

            if (info.code != "0") {
                alert(info.message);
                return (false);
            }

            SymbolInfo = info.returnValue.list;

            for (var i = 0; i < SymbolInfo.length; i++) {
                var info = SymbolInfo[i];
                var Mid = (info.Bid + info.Ask) / 2;
                var Bid = Mid - (info.Spread / 2);
                var Ask = Mid + (info.Spread / 2);

                Mid = Math.floor(Mid * Math.pow(10, info.Digits));
                Mid = Mid / Math.pow(10, info.Digits);

                Bid = Math.floor(Bid * Math.pow(10, info.Digits));
                Bid = Bid / Math.pow(10, info.Digits);

                Ask = Math.floor(Ask * Math.pow(10, info.Digits));
                Ask = Ask / Math.pow(10, info.Digits);

                info.Mid = Mid;
                info.Bid = Bid;
                info.Ask = Ask;
            }

            //dt_data.ImportJsonArray(SymbolInfo);
            //$("#result").html(dt_data.ShowDataGrid());

            CreateSymbolA();
        }

        function CreateSymbolA() {
            var $select = $("#DataInfo_SymbolA");
			
            SymbolList = new Array();
            
            $select.html("");
            for (var i = 0; i < SymbolInfo.length; i++) {
                var info = SymbolInfo[i];
                var SymbolA = info["SymbolA"];
                var NameA = info["NameA"];

                if (SymbolList.indexOf(SymbolA) == -1) {
                    SymbolList.push(SymbolA);

                    $select.append("<option value=\"" + SymbolA + "\">" + SymbolA + "</option>");
                }
            }
			
			if (SymbolA_default != "") {
				$$SV("DataInfo_SymbolA", SymbolA_default);
				SymbolA_default = "";
			}
			
            $select.change();
        }

        function CreateSymbolB(Symbol) {
            var $select = $("#DataInfo_SymbolB");
            var list = FindObject(SymbolInfo, "SymbolA", Symbol);
            SymbolList = new Array();
            
            $select.html("");
            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                var SymbolB = info["SymbolB"];
                var NameB = info["NameB"];

                if (SymbolList.indexOf(SymbolB) == -1) {
                    SymbolList.push(SymbolB);

                    $select.append("<option value=\"" + SymbolB + "\">" + SymbolB + "</option>");
                }
            }
			
			if (SymbolB_default != "") {
				$$SV("DataInfo_SymbolB", SymbolB_default);
				SymbolB_default = "";
			}
			
            $select.change();
        }
    </script>
    <script>
        function SetObjectInfo(list, IndexName, IndexValue, DataName, DataValue) {
            var result = new Array();

            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                var value = "" + info[IndexName];

                if (value.toLowerCase() == IndexValue.toLowerCase()) {
                    info[DataName] = DataValue;
                }
            }
        }

        function GetObjectInfo(list, IndexName, IndexValue, DataName) {
            var result = new Array();

            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                var value = "" + info[IndexName];

                if (value.toLowerCase() == IndexValue.toLowerCase()) {
                    return (info[DataName]);
                }
            }

            return ("");
        }
    </script>
    <script>
        $(function () {
            var $btn = $("#btnSubmit");

            $btn.click(btnSubmit);
        });

        function btnSubmit() {
            var ApiHost = API_HOST;
            var ApiPath = "/api/QuoteAlarm/New";
            var ApiUrl = ApiHost + ApiPath;
            var FormData = {};

            $$SV("DataInfo_Symbol", $$GV("DataInfo_SymbolA") + $$GV("DataInfo_SymbolB"));

            FormData = GetFormData();
            console.log(FormData);

            if (CheckRequired() == false) {
                return (false);
            }

            if (CheckFormat() == false) {
                return (false);
            }

            if ($$GV("DataInfo_ValidCode") != SYS_ValidCode) {
                alert("验证码错误");
                return (false);
            }

            if ($$GV("DataInfo_SymbolB_Price") == $$GV("DataInfo_NoticePrice")) {
                alert("期望汇率与目前汇率价格相同");
                return (false);
            }

            if (confirm("是否确定?") == false) {
                return (false);
            }

            GetValidCode();
            $$SV("DataInfo_ValidCode", "");

            $.ajax({
                url: ApiUrl
                , dataType: "jsonp"
                , jsonp: "callback"
                , data: {
                    "Email": FormData.Email
                    , "Symbol": FormData.Symbol
                    , "DATA": base64.encode(JSON.stringify(FormData))
                }
                , success: btnSubmit_finish
            });
        }

        function btnSubmit_finish(info) {
            console.log(info);

            if (info.code != "0") {
                alert(info.message);
                return (false);
            }

            SendToCRM();
            alert("我们已经收到您的汇率提醒需求");
            window.location.href = "QR.html";
        }

        function CheckRequired() {
            var $data = $(".Required");
            var flg_success = true;

            $data.each(function () {
                var $this = $(this);
                var ElementName = $this.attr("Name");
                var ElementValue = $$GV(ElementName);
                var DataName = $this.attr("DataName");
                var DataTitle = $this.attr("DataTitle");

                if (ElementValue == "") {
                    //$this.css("border-color", "red");
                    $this.parent().addClass("has-error");
                    alert(DataTitle + "，尚未填寫");
                    flg_success = false;
                    return (false);
                }
                else {
                    //$this.css("border-color", "");
                    $this.parent().removeClass("has-error");
                }
            });

            return (flg_success);
        }

        function CheckFormat() {
            var $data = $(".CheckFormat");
            var flg_success = true;

            $data.each(function () {
                var $this = $(this);
                var ElementName = $this.attr("Name");
                var ElementValue = $$GV(ElementName);
                var DataName = $this.attr("DataName");
                var DataTitle = $this.attr("DataTitle");
                var FormatType = $this.attr("FormatType");

                switch (FormatType) {
                    case "Email":
                        if (IsEmail(ElementValue) == false) {
                            flg_success = false;
                            //$this.css("border-color", "red");
                            $this.parent().addClass("has-error");
                            alert(DataTitle + "，格式错误");
                            return (false);
                        }
                        else {
                            //$this.css("border-color", "");
                            $this.parent().removeClass("has-error");
                        }
                        break;

                    case "Float":
                        if (isFloat(ElementValue) == false) {
                            flg_success = false;
                            //$this.css("border-color", "red");
                            $this.parent().addClass("has-error");
                            alert(DataTitle + "，格式错误");
                            return (false);
                        }
                        else {
                            //$this.css("border-color", "");
                            $this.parent().removeClass("has-error");
                        }
                        break;
                }
            });

            return (flg_success);
        }

        function GetFormData() {
            var $data = $(".RequestData");
            var FormData = {}

            $data.each(function () {
                var $this = $(this);
                var ElementName = $this.attr("Name");
                var ElementValue = $$GV(ElementName);
                var DataName = $this.attr("DataName");

                FormData[DataName] = ElementValue;
            });

            return (FormData);
        }

        function isInt(val) {
            var intRegex = /^-?\d+$/;
            if (!intRegex.test(val))
                return false;

            var intVal = parseInt(val, 10);
            return parseFloat(val) == intVal && !isNaN(intVal);
        }

        function isFloat(val) {
            var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
            if (!floatRegex.test(val))
                return false;

            val = parseFloat(val);
            if (isNaN(val))
                return false;
            return true;
        }

        function SendToCRM() {
            var ApiHost = API_HOST;
            var ApiPath = "/api/QuoteAlarm/ToCRM";
            var ApiUrl = ApiHost + ApiPath;
            var info = {};
            var CityInfo = { "CN": "1", "NZ": "2", "SYD": "3", "MEL": "4", "JP": "5", "HK": "6", "CA": "7" };
            var PromotionArea = CityInfo[$$GV("DataInfo_City")];
			var ParamInfo = GetUrlParam();
            var ThisSource = "3";
            var ThisMedium = "";

            if (typeof (ParamInfo.Source) != "undefined") {
                var SourceId = GetObjectInfo(SourceList, "Name", ParamInfo.Source, "Value");

                if (SourceId != "")
                    ThisSource = SourceId;
            }

            if (typeof (ParamInfo.Medium) != "undefined") {
                ThisMedium = ParamInfo.Medium;
            }

            info["Name"] = $$GV("DataInfo_Name");
            info["Phone"] = "--";
            info["Email"] = $$GV("DataInfo_Email");
            info["Campaign"] = "5";   //2017ForexRate
            info["Source"] = ThisSource;    //
            info["Subject"] = "5";   //2017ForexRate
            info["Category"] = "200000";
            info["Medium"] = ThisMedium;
            info["Content"] = "";
            info["IPAddress"] = "";
            info["Country"] = "China";
            info["IPCountry"] = "";
            info["IPRegion"] = "";
            info["IsSubscriptionEmail"] = "0";
            info["OpenAccount"] = "2";
            info["CRMType"] = "2";
            info["PromotionArea"] = PromotionArea;
            info["Remark1"] = $$GV("DataInfo_Symbol");
            info["Remark2"] = $$GV("DataInfo_SymbolB_Price");
            info["Remark3"] = $$GV("DataInfo_NoticePrice");
            info["Remark4"] = "";
            info["Remark5"] = "";
            info["City"] = $$GV("DataInfo_City");
            info["LanguageSelect"] = "1";
            info["CompanyName"] = "2017ForexRate";

            $.ajax({
                url: ApiUrl
                , dataType: "jsonp"
                , jsonp: "callback"
                , data: {
                    "Email": $$GV("DatInfo_Email")
                    , "Name": $$GV("DatInfo_Name")
                    , "DATA": base64.encode(JSON.stringify(info))
                }
                , success: SendToCRM_finish
            });
        }

        function SendToCRM_finish(info) {
            console.log(info);
        }
    </script>

    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?6ceb5301aab2eaba00f698baa51c812f";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
	
	<script>
        SourceList = [{ "Name": "WeChat", "Value": "1" }, { "Name": "Event", "Value": "2" }, { "Name": "Unknown", "Value": "3" }, { "Name": "EDM", "Value": "4" }, { "Name": "InboundCall", "Value": "5" }, { "Name": "Walk-In", "Value": "6" }, { "Name": "RPReferral", "Value": "7" }, { "Name": "SalesNetwork", "Value": "8" }, { "Name": "PurchasedLeads", "Value": "9" }, { "Name": "PrintAd", "Value": "10" }, { "Name": "Outdoor", "Value": "11" }, { "Name": "BSEM", "Value": "12" }, { "Name": "GSEM", "Value": "13" }, { "Name": "GAdword", "Value": "14" }, { "Name": "SEO", "Value": "15" }, { "Name": "SkyKiwi", "Value": "16" }, { "Name": "ABC", "Value": "17" }, { "Name": "SydneyToday", "Value": "18" }, { "Name": "MelToday", "Value": "19" }, { "Name": "KVB", "Value": "20" }, { "Name": "zjNZ", "Value": "21" }, { "Name": "AFN", "Value": "22" }, { "Name": "AUdichan", "Value": "23" }, { "Name": "FM906", "Value": "24" }, { "Name": "cnHERALD", "Value": "25" }, { "Name": "Fweekly", "Value": "26" }];
        CampaignList = [{ "Name": "201603IEBE", "Value": "1" }, { "Name": "201605SYDFuDan", "Value": "2" }, { "Name": "201607AUForum", "Value": "3" }, { "Name": "201703IEBE", "Value": "4" }, { "Name": "2017ForexRate", "Value": "5" }];
        SubjectList = [{ "Name": "201603IEBE", "Value": "1" }, { "Name": "201605SYDFuDan", "Value": "2" }, { "Name": "201607AUForum", "Value": "3" }, { "Name": "201703IEBE", "Value": "4" }, { "Name": "2017ForexRate", "Value": "5" }];
    </script>
