;(function(App){
    if(!App) return false;
    var config={
        name:'write',
        prefix:"w",
        max:120,
        cls:{
            entry:'',
            title:'',
            content:'',
            desc:'',
            anchor:'',
            add:'',
            len:'',
            upload:'',
            container:'',
            extend:'',
            error:'',
        },
    };
    
    var RPC = App.cache.getG("RPC");
    var app_name = App.cache.getG("name");
    var uploader = App.cache.getG("uploader");
    var errCode = App.cache.getG("code");

    var self={
        show:function(params){
            self.upload();
            self.bind();
            //App.toast("Testing...","info");
        },
        upload:function(){
            //var con='#upload_con';
            var cfg={
                container:config.cls.upload,
            };
            var agent={
                change:function(cache){
                    //console.log("changed");
                    //console.log(cache);
                },
            };
            uploader.init(cfg,agent);
        },
        bind:function(){
            var cls=config.cls;
            var sel=$("#" + cls.entry);

            sel.find('.'+cls.content).off('keyup').on('keyup',function(ev){
                var val=ev.target.value;
                sel.find('.'+cls.len).html(val.length);
            });

            sel.find('.'+cls.extend).off('click').on('click',function(){
                var con=sel.find('.'+cls.container);
                if(con.is(':visible')){
                    con.hide();
                }else{
                    con.show();
                }
            });

            $("#"+cls.add).off('click').on('click',function(){
                if(RPC.start.anonymous && RPC.extra.reg ){
                    return RPC.extra.reg();
                }
                
                var ctx=sel.find('.'+cls.content).val().trim();
                var anchor=sel.find('.'+cls.anchor).val().trim();
                if(!ctx) return sel.find('.'+cls.content).trigger('focus');
                if(!anchor) return sel.find('.'+cls.anchor).trigger('focus');
                
                self.disable(cls);
                RPC.common.search(anchor,function(res){
                    if(res!==false){
                        var acc=RPC.start.account;
                        
                        if(res.signer!==acc){
                            self.error(`Anchor is owned by ${App.tools.shorten(res.signer, 8)}`,3000);
                            self.enable(cls);
                            return sel.find('.'+cls.anchor).trigger('focus');
                        } 
                    }

                    var data=self.getInput(ctx);
                    self.toChain(anchor,data);
                });
            });
        },
        error:function(txt,at){
            var cls=config.cls;
            var sel=$("#" + cls.error);
            sel.html(txt);
            if(!txt) return true;
            setTimeout(function(){
                sel.html('');
            },at);
        },
        getInput:function(ctx){
            var cls=config.cls;
            var sel=$("#" + cls.entry);
            var raw={
                "content":ctx,
            };

            var desc=sel.find('.'+cls.desc).val().trim();
            if(!!desc) raw.desc=desc;

            var title=sel.find('.'+cls.title).val().trim();
            if(title) raw.title=title;

            var imgs=uploader.getResult();
            if(imgs.length!=0) raw.imgs=imgs;

            var proto={"type":"data","format":"JSON","app":app_name};
            return {raw:raw,protocol:proto};
        },
        toChain:function(anchor,data){
            var cls=config.cls;
            var len=self.calcLength(data.raw);
            RPC.extra.verify(len,function(pair){
                if(!pair){
                    self.enable(cls);
                    return App.toast("","clean");
                }

                if(pair.error){
                    if(pair.code && errCode.NO_PRIVATE_ACCOUNT && pair.code == errCode.NO_PRIVATE_ACCOUNT.code&& RPC.extra.reg){
                        self.enable(cls);
                        return RPC.extra.reg();
                    }
                    self.enable(cls);
                    return App.toast(pair.message,"info",{auto:true}); 
                }
                
                App.toast("Verify successful!","info");

                RPC.common.write(pair,anchor,data.raw,data.protocol,function(res){
                    App.toast("Ready to write to chain","info");
                    if(res.status.isInBlock){
                        App.toast("","clean");
                        setTimeout(() => {
                            self.clean(cls);
                            self.enable(cls);
                            App.back();
                        }, 100);
                    }
                });
            });
        },
        calcLength:function(raw){
            var len=0;
            for(var k in raw){
                if(k=="imgs"){
                    for(var i=0;i<raw[k].length;i++) len+=!raw[k][i]?0:raw[k][i].length;
                }else{
                    len+=!raw[k]?0:raw[k].length;
                }
            }
            return len;
        },
        clean:function(cls){
            var sel=$('#'+cls.entry);
            sel.find('.'+cls.content).val('');
            sel.find('.'+cls.anchor).val('');
            sel.find('.'+cls.desc).val('');
            sel.find('.'+cls.title).val('');
            sel.find('.'+cls.len).html(0);
            uploader.clean();
        },
        disable:function(cls){
            var sel=$('#'+cls.entry);
            $("#"+cls.add).attr("disabled","disabled");
            sel.find("."+cls.content).attr("disabled","disabled");
            sel.find("."+cls.anchor).attr("disabled","disabled");
            sel.find("."+cls.title).attr("disabled","disabled");
            sel.find("."+cls.desc).attr("disabled","disabled");
            uploader.disable();
        },
        enable:function(cls){
            var sel=$('#'+cls.entry);
            $("#"+cls.add).removeAttr("disabled");
            sel.find("."+cls.content).removeAttr("disabled");
            sel.find("."+cls.anchor).removeAttr("disabled");
            sel.find("."+cls.desc).removeAttr("disabled");
            sel.find("."+cls.title).removeAttr("disabled");
            uploader.enable();
        },
        struct: function () {
            var pre = config.prefix;
            var hash = App.tools.hash;
            for (var k in config.cls) {
                if (!config.cls[k]) config.cls[k] = pre + hash();
            }

            page.data.preload = self.template();
            return true;
        },
        template: function () {
            var css = self.getCSS();
            var dom = self.getDom();
            return `${css}<div id="${config.cls.entry}">${dom}</div>`;
        },
        getCSS:function(){
            var cls=config.cls;
            return `<style>
                #${cls.entry} .${cls.add}{width:100px;height:48px;background:#EFCCE9;opacity: 0.9;position:fixed;right:20px;bottom:25%;border-radius:24px;border:1px solid #EEFFFF;line-height:48px;text-align: center;}
                #${cls.entry} .${cls.container}{display:none;}
            </style>`;
        },
        getDom:function(){
            var cls=config.cls;
            return `<div class="row">
                <div class="col-12 gy-2">
                    <textarea class="form-control ${cls.content}" placeholder="Adding new content to anchor network..." rows="10"></textarea>   
                </div>
                <div class="col-12 gy-2"><span class="${cls.len}">0</span> / ${config.max}</div>
                <div class="col-6 gy-2">
                    <input type="text" class="form-control ${cls.anchor}" placeholder="Anchor name..." value="" >
                </div>
                <div class="col-6 gy-2 text-end">
                    <button class="btn btn-md btn-primary" id="${cls.add}">New Saying</button>
                </div>
                <div class="col-12 pb-3" id="${cls.error}"></div>
                <div class="col-12">
                    <button class="btn btn-md btn-default ${cls.extend}">Extend</button>
                </div>
                <div class="${cls.container}">
                    <div class="col-12 pt-2">
                        <input type="text" class="form-control ${cls.title}" placeholder="Title..." value="" >  
                    </div>
                    <div class="col-12 pt-2">
                        <textarea class="form-control ${cls.desc}" placeholder="Description..." rows="3"></textarea>   
                    </div>
                    <div class="col-12" id="${cls.upload}"></div>
                </div>
            </div>`;
        },
    };

    var page={
        "data":{
            "name":config.name,
            "title":"Add your content",     //default page title
            "params":{},
            "preload":"Loading...",
            "snap":"",
        },      
        "events":{
            "before":function(params,ck){
                App.cache.disableAgent();
                return ck && ck();
            },
            "loading":function(params,ck){
                self.show(params);
                return ck && ck();
            },
            "done":function(){
                var common = App.cache.getG("common");
                common.checkReg(function(anonymous){
                    if(anonymous) self.disable(config.cls);
                },300);
                // if(RPC.start.anonymous && RPC.extra.reg ){
                //     self.disable(config.cls);
                //     return setTimeout(function(){
                //         RPC.extra.reg();
                //     },300);
                // }
            },
            "after":function(params,ck){
                App.cache.enableAgent();
                return ck && ck();
            },
        },
    };
    self.struct();          //set component enviment
    App.page(config.name,page);
})(cMedia);