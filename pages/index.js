; (function (App) {
    if (!App) return false;
    var config = {
        name: "index",
        cache:App.cache.getG("setting"),      //cache anchor
        prefix: "i",
        max:10,                     //history max length
        cls: {
            entry: '',          
            add:'',             //add button class
            tags:'',
        },
        page:{
            count:1,
            step:20,
            max:0,
        }
    };


    var his=[];
    var RPC = App.cache.getG("RPC");
    var tpl=App.cache.getG("tpl");
    var icons=App.cache.getG("icons");
    var common=App.cache.getG("common");

    var self = {
        entry:function(){
            App.toast("Loading recommand anchors","info");
            self.showHistory();
            self.listening();

            //App.cache.setAgent('header',self.header);
            App.cache.setAgent('footer',self.footer);
        },
        listening: function () {
            if(RPC.ready){
                self.subscribe();
            }else{
                RPC.setQueue(self.subscribe);
            }            
        },
        subscribe:function(){
            RPC.common.subscribe(function(list) {
                if (!list || list.length == 0) return false;

                var name = App.cache.getG("name"),ls=[];
                for (var i = 0; i < list.length; i++){
                    var row = list[i];
                    if (row.protocol && row.protocol.type === "data" && row.protocol.app === name) {
                        if(!self.isCmt(row)) ls.push(row);
                    }
                }
                
                if(ls.length!==0){
                    App.toast("New subcribe ...","info");
                    setTimeout(function(){
                        App.toast("","clean");
                        for (var i = 0; i < ls.length; i++) {
                            var row = ls[i];
                            var cmts=[[row.name,row.block]];
                            self.pushHistory(row);
                            self.decode(row);
                            self.auto(cmts);
                        }
                    },1500);
                }
            });
        },
        header:function(ck){
            //console.log('Header, ready to do something.');
            return ck && ck(true);
        },
        footer:function(ck){
            //console.log('Footer, ready to do something.');
            var cfg=config.page;
            self.pageData(cfg.count,cfg.step,{},function(list){
                if(!list) return ck && ck(false);
                var decode=self.decode;
                var cmts=[];
                for(var i=0;i<list.length;i++){
                    var row=list[i];
                    decode(row,true);
                    cmts.push([row.name,row.block]);
                }
                self.auto(cmts);
                cfg.count++;
                return ck && ck(true);
            });
        },
        pageData:function(page,step,more,ck){
            RPC.extra.auto('vMix','list',{page:page,step:step},(list)=>{
                if(!list) return ck && ck(false);
                if(list.error) return ck && ck({error:list.error});
                RPC.extra.auto('vHistory','multi',{list:JSON.stringify(list)},(res)=>{
                    if(!res) return ck && ck(false);
                    if(res.error) return  ck && ck({error:res.error});
                    var arr=[];
                    for(var i=0;i<res.length;i++){
                        var row=res[i];
                        if(!row) continue;
                        arr.push(row);
                    }
                    return ck && ck(arr);
                });
            });
        },
        isCmt:function(row){
            if(row.protocol && row.protocol.cat && row.protocol.cat=="comment") return true;
            if(/[0-9a-fA-F]{32}/.test(row.name)) return true;
            return false;
        },
        showHistory:function(){
            var decode=self.decode,cmts=[];
            self.cacheHistory(function(){
                for(var i=his.length-1;i>=0;i--){
                    cmts.push([his[i].name,his[i].block]);
                    decode(his[i]);
                } 
                self.auto(cmts);
            });
        },
        cacheHistory:function(ck){
            if(his.length!==0) return ck && ck();
            self.getLatest(config.cache,function(list){
                for(var i=0;i<list.length;i++){
                    if(list[i].empty) continue;
                    his.push(list[i]);
                }
                return ck && ck();
            });
        },
        
        getLatest:function(anchor,ck){
            RPC.common.search(anchor,function(res){
                if(res.empty) return ck && ck([]);
                if(!res.raw || !res.raw.recommend)return ck && ck([]);
                var ans=res.raw.recommend;
                RPC.common.multi(ans,function(list){
                    return ck && ck(list);
                });

                if(res.raw.tags)self.renderTags(res.raw.tags);
            });
        },
        renderTags:function(list){
            var dom='';
            for(var i=0;i<list.length;i++){
                var row=list[i];
                console.log(row);
                dom+=`<li></li>`;
            }
            var cls=config.cls;
            $("#"+cls.tags).html(dom);
            App.fresh();
        },
        pushHistory:function(row){
            if(his.length>=config.max){
                his.shift();
                return this.pushHistory(row);
            }
            his.push(row);
        },
        
        decode: function (row,footer) {
            if(!row.stamp) row.stamp=Date.now()-1001;
            if(!row.owner) row.owner=row.signer;
            var dom=tpl.row(row,'basic');
            if(footer){
                $("#" + config.cls.entry).append(dom);
            }else{
                $("#" + config.cls.entry).prepend(dom);
            }
        },
        auto:function(cmts){
            //console.log(`List:${JSON.stringify(cmts)}`);
            App.toast("","clean");
            //common.freshCount(cmts);
            common.counter(cmts);
            App.fresh();        //fresh page to bind action 
        },
        bind:function(){

        },
        struct: function () {
            var pre=config.prefix;  
            var hash = App.tools.hash;
            for (var k in config.cls) {
                if (!config.cls[k]) config.cls[k] = pre + hash();
            }
            page.data.preload=self.template();
            return true;       
        },
        template:function(){
            var css=self.getCSS();
            var add=self.getAdd();
            var cls=config.cls;
            return `${css}<div id="${cls.tags}"></div><div id="${cls.entry}">${add}</div>`;
        },
        getCSS:function(){
            var cls=config.cls;
            var more=tpl.theme('basic',cls.entry);
            return `<style>${more}
                #${cls.entry}{padding-bottom:10px;}
                #${cls.entry} .${cls.add}{width:100px;height:48px;background:#F4F4F4;opacity: 0.9;position:fixed;right:20px;bottom:25%;border-radius:24px;border:2px solid #EF8889;line-height:48px;text-align: center;box-shadow: 3px 3px 3px #EF8889;}
                #${cls.entry} .${cls.add} img{opacity: 0.8;}
            </style>`;
        },
        getAdd:function(){
            var cls=config.cls;
            return `<div class="${cls.add}">
                <span page="write" data="{}">
                <img style="width:36px;height:36px;margin-bottom:5px;margin-left:5px;opacity: 0.4;" src="${icons.write}">
                </span>
            </div>`;
        },
    };

    var page = {
        "data": {
            "name": config.name,
            "title": "freeSaying",
            "params": {},
            "preload": "",
            "snap": "",
        },
        "events": {
            "before": function (params, ck) {
                var result={code:1,message:"successful"};
                //App.toast("testing","info");
                return ck && ck(result);
            },
            "loading": function (params, ck) {
                //console.log(`History:${JSON.stringify(his)},Params:${JSON.stringify(params)}`);
                self.entry();
                return ck && ck();
            },
            "done":function(){},
            "after": function (params, ck) {
                //App.cache.clearAgent();
                return ck && ck();
            },
        },
    };
    self.struct();          //set component enviment
    App.page(config.name, page);
})(cMedia);