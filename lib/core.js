//basic cApp framework, you can use it easily.
//you can load lib on cApp protocol keyword "lib"

//TODO:框架的执行逻辑和功能需要详细注释

;(function(agent,con,error){
    //check basic input
    if(error!=null) console.log(`Error:${JSON.stringify(error)}`);
    if(!con) console.log('No container to run cApp.');
    if(!agent) console.log('No way to interact with anchor network.');

    //cMedia basic config
    var config={
        app:'cMedia',           // name of cApp, will set to windows
        instance:"freeSaying",  // name of instance, filter target anchor data
        setting:"freeConfig",   // instance setting, used to load data or config
        default:"index",        // default page
        prefix:'i',
        cls:{
            entry:"",
            mask:"",
            toast:"",
            locker:"",          //lock lay to prevent all events
            nav:"",
            title:"",
            back:"",
            body:"",
            loading:"",
            hloading:"",
        },
        toast:{
            at:1000,
            base:56,
        },
        animate:{
            interval:500,
        },
    };

    //galobal cache;
    var pages={};       //loaded pages
    var G={
        queue:[],       // page stack
        RPC:null,       // RPC call function   
        container:'',   // entry container id
        name:'',        // App name, used to filter anchors.    
        device:null,    // device 
        locker:false,   // lock the page status
        agent:{
            enable:true,
            header:null,
            footer:null,
            fresh:null,
        },
        funs:{
            setG:function(k,v,check){
                if(check){
                    if(G[k]===undefined || k==='funs') return false;
                }
                G[k]=v;
                return true;
            },
            getG:function(k){
                return (G[k]===undefined || k==='funs')?null:G[k];
            },
            delG:function(k){
                if(G[k]===undefined || k==='funs') return false;
                delete G[k];
                return true;
            },

            enableAgent:function(){G.agent.enable=true;},
            disableAgent:function(){G.agent.enable=false;},
            setAgent:function(name,fun){
                if(!name || G.agent[name]===undefined) return false;
                G.agent[name]=fun;
            },
            clearAgent:function(name){
                if(name===undefined){
                    for(var k in G.agent)G.agent[k]=null;
                }
                if(!name || !G.agent[name]) return false;
                G.agent[name]=null;
            },
        },
    };

    var tools={
        // convet txt anchor link to page link (can be decode by core.js)
        // @param txt string    //may include anchor link, like  [anchor testme](anchor://testme/244)
        // @param ext object    //extend object needed in page link, like {"page":"view","class":"text-info"}
        convert:function(txt, ext){
            // search preg : from "[" end by ")"
            var arr = txt.match(/\[.*?\)/g);                
            if(arr===null || arr.length===0) return txt;
            var map = {},format=tools.format;
            for (var i = 0; i < arr.length; i++) {
                var row = arr[i];
                map[row] = format(row, ext);
            }

            for (var k in map) {
                txt = txt.replaceAll(k, map[k]);
            }
            return txt;
        },
        
        // format single anchor link to page link (can be decode by core.js)
        // @param txt string    //may include anchor link, like  [anchor testme](anchor://testme/244)
        // @param ext object    //extend object needed in page link, like {"page":"view","class":"text-info"}
        format:function(txt, ext) {
            var arr = txt.split("](anchor://");
            var last = arr.pop(),first = arr.pop();
            var an = last.substr(0, last.length - 1).split("/");
            var name = first.substr(1, first.length);
            var details = {
                anchor: an[0],
                block: an[1] !== undefined ? parseInt(an[1]) : 0,
            };

            var more = "";
            if (ext != undefined) {
                for (var k in ext)more += `${k}="${ext[k]}" `;
            }
            return `<span ${more} data='${JSON.stringify(details)}'>${name}</span>`;
        },
        time:function(stamp){
            var p = parseInt(Date.parse(new Date())) - parseInt(stamp);
            if (p > 86400000){
                var dt=new Date(stamp);
                return dt.toLocaleDateString();
            }
            if (p > 3600000){
                var n=Math.floor(p / 3600000);
                return n + (n==1?" hour ago":" hours ago");
            } 
            if (p > 60000){
                var m= Math.floor(p / 60000);
                return m+(m==1?" minute ago":" mins ago");
            }
            return Math.floor(p * 0.001) + "s ago";
        },
        summary:function(str){  //对字符串进行概要提取
            
        },
        wrap:function(str){return str.replace(/\n/g,"<br />");},
        hash:function(n) { return Math.random().toString(36).substr(n != undefined ? n : 6); },
        shorten:function(address,n){if (n === undefined) n = 10;return address.substr(0, n) + '...' + address.substr(address.length - n, n);},
        decor:function(str,n){
            n=!n?4:n;
            if(str.length < n+n) return str;
            return str.substr(0, n) + '...' + str.substr(str.length - n, n);
        },
        tailor:function(str,len,s){
            var nlen=!len?30:len;
            var suffix=!s?'...':s;
			if(str.length<nlen) return str;
			return str.substring(0,nlen)+suffix;
		},
    };

    var self={
        //core.js entry, create cApp basic structure
        struct:function(){
            //1.save RPC call object
            G.funs.setG("RPC",agent,true);
            G.funs.setG("container",con,true);
            G.funs.setG("name",config.instance,true);
            G.funs.setG("setting",config.setting);

            //2.auto create dom class and id
            if(!config.entry) self.clsAutoset(config.prefix);

            //3.struct css and dom
            var framework=self.getDom();
            var w=$(window).width(),cmap = self.getCSS({width:w});
            $("#"+con).html(cmap+framework);   
            
            //4.check app container size and offset,listening scroll event
            $(window).off("scroll").on("scroll",self.scroll).trigger("scroll");
        },

        scroll:function(){
            var cls=config.cls;
            self.device(cls.entry);
            if(G.locker || !G.agent.enable) return false;

            var dv=G.device;
            if(dv.height===dv.doc) return false;
            var sel=$('#'+cls.entry).find('.'+cls.body);

            if(dv.height===(dv.doc+dv.top)){
                if(G.agent.footer!==null){
                    G.locker=true;
                    
                    sel.append(`<div class="${cls.loading}">Loading...</div>`);
                    var delta=$(document).height()-dv.doc;
                    setTimeout(function(){
                        G.agent.footer(function(added){
                            sel.find('.'+cls.loading).remove();
                            var x=dv.doc-dv.height-delta+(!added?-1:100);    //根据加载结果进行滚动
                            window.scrollTo(0,x);
                            G.locker=false;
                        });
                    },1500);
                }
            }

            if(dv.top===0){
                if(G.agent.header!==null){
                    G.locker=true;
                    sel.prepend(`<div class="${cls.hloading}">Loading...</div>`);
                    setTimeout(function(){
                        G.agent.header(function(){
                            sel.find('.'+cls.hloading).remove();
                            G.locker=false;
                        });
                    },1500); 
                }
            }
        },
        
        //core function : load target page
        // @param name string       //page component name
        // @param params object     //params will been sent to instance page
        // @param skip boolean      //skip history queue
        goto:function(name,params,skip){
            if(!pages[name]) return false;

            //1.cache current container dom as history snap. It can be use by back function
            if(G.queue.length>0 && !skip){
                G.queue[G.queue.length-1].snap=self.getCurDom();
            }

            //2.prepare the target page data
            var row=pages[name];
            var cache=$.extend({},row.data);
            cache.params=params;                    //set params
            if(!skip) G.queue.push(cache);          //put page on history queue;
            var act=!(G.queue.length===1 || skip);  //wether animation
            
            //3.show instance page
            var events=row.events;
            var cfg={
                skip:skip,         //no preload and animate
                animate:act,       //wether animate
                overwrite:true,     //overwrite template after animate
            };
            if(!events.before) return self.showPage(params,cache,events,cfg);

            events.before(params,function(dt){
                if(dt!==undefined){
                    if(dt.overwrite!==undefined) cfg.overwrite=dt.overwrite;
                    self.decodeBefore(dt);
                }
                self.showPage(params,cache,events,cfg);
            });
        },
        
        showPage:function(params,cache,events,cfg){
            if(cfg.skip) return self.bind();

            cache.preload=self.preload(cache);
            self.animateLoad(cache,function(){
                if(events.loading) events.loading(params,function(){
                    if(events.done) events.done();
                });
            },cfg);
        },
        preload:function(data){
            var res={head:'',body:''},cls=config.cls;
            var dom=$("#"+cls.entry).html();
            var sel=$(dom).clone();
            sel.find('.'+cls.title).html(data.title);
            if(G.queue.length>1) sel.find('.'+cls.back).show();

            res.head=sel.prop("outerHTML");
            res.body=data.preload;
            return res;
        },
        decodeBefore:function(fmt){
            //depend on fmt, can stop loading page
        },
        back:function(){
            $(this).attr("disabled","disabled");
            if(G.queue.length===0) return false;

            var cur=G.queue.pop(),atom=G.queue[G.queue.length-1];
            var evs=pages[cur.name].events;
            if(!evs.after){
                self.animateBack(atom.snap,function(){
                    if(G.queue.length===1) self.hideBack();
                    $(this).removeAttr("disabled");
                    self.goto(atom.name,atom.params,true);
                });
            }else{
                evs.after((!atom || !atom.params)?{}:atom.params,function(){
                    self.animateBack(atom.snap,function(){
                        if(G.queue.length===1) self.hideBack();
                        $(this).removeAttr("disabled");
                        self.goto(atom.name,atom.params,true);
                    });
                });
            }
        },
        // TODO 这里需要增加对启动其他cApp的支持
        bind:function(){
            var cls=config.cls;
            $("#"+G.container).find('span').off('click').on('click',function(){
                var sel=$(this),page=sel.attr("page");
                if(!page) return false;     //skip normal span
                var params=JSON.parse(sel.attr("data"));
                self.goto(page,params);
            });

            $("#"+G.container).find('.'+cls.back).off('click').on('click',self.back);
            if(G.agent.fresh) G.agent.fresh();
        },

        //TODO:处理图像适配屏幕，支持在内容里使用html标签。后继处理点击后开图像浏览器。稳定后，放到bind里
        images:function(){

        },

        animateBack:function(dom,ck){
            var cls=config.cls;
            var cur=$("#"+cls.entry).html();    //1.get current container dom
            $("#"+cls.entry).html(dom);         //2.set history snap to container.
            if(G.queue.length===1)self.hideBack();

            //3.set mask position and set current dom to it.
            var dv=G.device;
            var cmap={
                left:(dv.left+dv.back.left)+"px",
            };
            var at=config.animate.interval;
            var ani={left:(dv.screen+dv.back.left)+'px'};
            $("#"+cls.mask).html(cur).css(cmap).show().animate(ani,at,'',function(){
                $("#"+cls.mask).hide();
                return ck && ck();
            });
        },

        animateLoad:function(cache,ck,cfg){
            var cls=config.cls;
            if(!cfg.animate){
                self.pageAuto(cache,cfg);
                return ck && ck();
            }
            
            var dv=G.device;
            var cmap={
                left:(dv.screen+dv.back.left)+"px",
            };
            var at=config.animate.interval;
            var ani={left:(dv.screen-dv.width+dv.back.left)+'px'};
            var dom=`${cache.preload.head}<div class="${cls.body}">${cache.preload.body}</div>`;
            $("#"+cls.mask).html(dom).css(cmap).show().animate(ani,at,'',function(){
                self.pageAuto(cache,cfg);
                return ck && ck();
            });
        },
        pageAuto:function(cache,cfg){
            var cls=config.cls;
            var sel=$("#"+cls.entry);
            if(G.queue.length>1) self.showBack();
            sel.find('.'+cls.title).html(cache.title);
            sel.find('.'+cls.back).off('click').on('click',self.back);
            sel.find('.'+cls.body).html(cache.preload.body);
            if(cfg.animate) $("#"+cls.mask).hide();
        },
        toast:function(txt,type,cfg,ck){
            var cls=config.cls;
            var dom='',sel=$("#"+cls.toast);

            var base=config.toast.base;
            if(cfg && cfg.position && G.device!=null){
                //console.log(JSON.stringify(G.device));
                switch (cfg.position) {
                    case 'top':
                        sel.css({top:base+'px'});
                        break;
                    case 'middle':
                        sel.css({top:(G.device.height*0.35+base)+'px'});
                        break;
                    case 'bottom':
                        sel.css({top:(G.device.height*0.65+base)+'px'});
                        break;
                    default:
                        sel.css({top:base+'px'});
                        break;
                }
            }else{
                sel.css({top:base+'px'});
            }

            switch (type) {
                case 'info':
                    dom=`<div class="col-12 text-center">${txt}</div>`;
                    sel.html(dom).show();
                    break;

                case 'clean':
                    sel.html('').hide();
                    break;

                default:
                    dom=`<div class="col-12 text-center">${txt}</div>`;
                    sel.html(dom).show();
                    break;
            }

            if(cfg && cfg.auto){
                setTimeout(() => {
                    self.toast("","clean",{"position":"top"});
                }, cfg.at?cfg.at:config.toast.at);
            }
        },
        getCurDom:function(){
            var cls=config.cls;
            var con=G.funs.getG("container");
            return $("#"+con).find("#"+cls.entry).html();
        },
        statusBack:function(){
            var cls=config.cls;
            return $("#"+cls.entry).find('.'+cls.back).is(":hidden");
        },
        hideBack:function(){
            var cls=config.cls;
            $("#"+cls.entry).find('.'+cls.back).hide();
        },
        showBack:function(){
            var cls=config.cls;
            $("#"+cls.entry).find('.'+cls.back).show();
        },
        title:function(txt){
            var cls=config.cls;
            $("#"+cls.entry).find("."+cls.title).html(txt);
        },
        error:function(txt){
            console.log(txt);
        },
        clsAutoset:function(pre){
            var hash=tools.hash;
            for(var k in config.cls){
                if(!config.cls[k])config.cls[k]=pre+hash();
            }
            return true;
        },
        device:function(con){
            var cls=config.cls;
            var sel=$("#"+con),w=sel.width(),h=$(window).height();
            var offset=sel.offset(),top=$(document).scrollTop(),back=sel.find('.'+cls.back).offset();
            G.device={
                width:w,
                height:h,
                doc:$(document).height(),
                top:offset.top-top,
                left:offset.left,
                screen:$(window).width(),
                back:back,
            };
            return true;
        },
        /***********CSS and DOM functions***********/
        getCSS:function(obj){
            var cls=config.cls;
            return `<style>
                #${cls.entry}{width:${obj.width}px;height:100%;background:#FFFFFF;padding-bottom:40px;}
                #${cls.entry} .${cls.body} {margin-top:45px;height:100%;width:100%;background:#FFFFFF;}
                #${cls.entry} .${cls.nav} {color:#222222;background:#EEEEEE;height:45px;position:fixed;top:0px;left:0px;width:100%;z-index:98;}
                .${cls.nav} .row {background:#EEEEEE;height:45px;font-size:18px;}
                .${cls.back}{color:#222222;}  
                #${cls.mask} {display:none;position:fixed;z-index:99;background:#FFFFFF;width:100%;height:100%;top:0px;}
                #${cls.mask} .${cls.body} {margin-top:0px;height:100%;width:100%;background:#FFFFFF;}
                #${cls.toast}{font-weight:400;opacity:0.8;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);padding:5px 10px 5px 10px;display:none;position:fixed;margin:0 10% 0 10%;top:56px;width:75%;line-height:30px;border-radius:10px;background:#DDEEDD;z-index:999;}
                #${cls.entry} .${cls.loading} {padding-bottom:15px;text-align:center;}
                #${cls.entry} .${cls.hloading} {padding:15px 0px 15px 0px;text-align:center;}
            </style>`;
        },
        getDom:function(){
            var cls=config.cls;
            return `
            <div id="${cls.toast}"></div>
            <div class="row" id="${cls.entry}">
                <div class="col-12 ${cls.nav}">
                    <div class="row pt-2">
                        <div class="col-2"><p class="${cls.back}"> < </p></div>
                        <div class="col-8 text-center ${cls.title}"></div>
                        <div class="col-2"></div>
                    </div>
                </div>
                <div class="col-12 ${cls.body}"></div>
            </div>
            <div class="row" id="${cls.mask}"></div>
            `;
        },
    };

    var exports={
        cache:G.funs,                       //Global cache entry
        tools:tools,                        //Global untils
        fresh:self.bind,                    //auto decode anchor link
        back:self.back,                     //history back function
        title:self.title,                   //set title
        toast:self.toast,                   //show toast function
        page:function(name,pg){             //reg page to core
            pages[name]=$.extend({},pg);    //need to clone.
            if(name===config.default){      //load default page
                self.hideBack();
                self.goto(name,{});
            }
        }
    };
    window[config.app]=exports;
    self.struct();
})(agent,con,error);