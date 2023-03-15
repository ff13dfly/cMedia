; (function (App) {
    var errCode={
        "NO_PRIVATE_ACCOUNT":{message:"No account",code:44},
    };

    var RPC=App.cache.getG("RPC");
    var avs={};         //放avatart的缓存的
    var cache={         //缓存评论、点赞、点踩数据的地方
        'comment':{},
        'fav':{},
        'tread':{},
        'me':{},
    };
    var locker_fav=false;
    var locker_tread=false;

    var self={
        comment:function(comment,anchor,block,title,ck){
            var app_name = App.cache.getG("name");
            var link=!title?'Commet':title;
            var raw={
                "title":`#[${link}](anchor://${anchor}/${block})#`,
                "content":comment,
            };
            var proto={"type":"data","format":"JSON","app":app_name};

            if(RPC.extra.comment){
                App.toast("Ready to write to chain","info",{"position":"bottom"});
                RPC.extra.comment(comment,anchor,block,(res)=>{
                    App.toast("","clean");
                    return ck && ck();
                });
            }else{
                RPC.extra.verify(function(pair){
                    RPC.common.write(pair,mine,raw,proto,function(res){
                        //console.log(res);
                        if(res.status.isInBlock){
                            return ck && ck();
                        }
                    });
                });
            }
        },
        clickFav:function(){
            if(locker_fav) return false;
            locker_fav=true;

            var sel=$(this);
            var data=JSON.parse(sel.attr('data'));
            
            self.checkReg(function(anonymous){
                if(anonymous){
                    locker_fav=false;
                    return false;
                } 
                var act=self.getRequest(data.anchor,data.block,true);

                var tpl=App.cache.getG("tpl");
                tpl.flipICON(data.anchor,data.block,act==='fav'?1:0,'fav');

                //console.log(`Ready to do fav action : ${JSON.stringify(data)} , me : ${JSON.stringify(act)}`);
                RPC.extra.auto('vSocial',act,data,(res)=>{
                    locker_fav=false;
                    if(res.success){
                        self.singleCounter(data.anchor,data.block,undefined,true);
                    }
                });
            });
        },
        clickTread:function(){
            if(locker_tread) return false;
            locker_tread=true;

            var sel=$(this);
            var data=JSON.parse(sel.attr('data'));
            self.checkReg(function(anonymous){
                if(anonymous){
                    locker_tread=false;
                    return false;
                } 
                var act=self.getRequest(data.anchor,data.block);

                var tpl=App.cache.getG("tpl");
                tpl.flipICON(data.anchor,data.block,act==='tread'?1:0,'tread');

                //console.log(`Ready to do fav action : ${JSON.stringify(data)} , me : ${JSON.stringify(act)}`);
                RPC.extra.auto('vSocial',act,data,(res)=>{
                    locker_tread=false;
                    if(res.success){
                        self.singleCounter(data.anchor,data.block,undefined,true);
                    }
                });
            });
        },
        getRequest:function(anchor,block,isFav){
            console.log(cache.me);
            var act=(!cache.me[anchor] || !cache.me[anchor][block])?[0,0,0,0]:cache.me[anchor][block];
            var index=isFav?0:2,related=index+1;
            if(act[index]===1){
                if(act[related]===0){
                    //这里取消点赞
                    return isFav?'unfav':'untread';
                }else{
                    return false;       
                }
            }else{
                if(act[related]===0){
                    //这里点赞
                    return isFav?'fav':'tread';
                }else{
                    return false;
                }
            }
        },
        getAvatar:function(ss58,ck){
            if(!avs[ss58]){
                var img = new Image();
                img.src = `https://robohash.org/${ss58}.png`;
                img.onload=function(ee){
                    avs[ss58]=img;
                    return ck && ck(avs[ss58]);
                };
                return true;
            }
            return ck && ck(avs[ss58]);
        },

        counter:function(list){
            //1.获取list的comments数量
            self.cmts(list,(res)=>{
                if(res && !res.error){
                    for(var k in res){
                        var arr=self.getAnchor(k);
                        var anchor=arr[0],block=arr[1];
                        if(!cache.comment[anchor])cache.comment[anchor]={};
                        cache.comment[anchor][block]=parseInt(res[k]);
                    }
                }
                //2.获取list的fav和tread数量
                self.favs(list,(rs)=>{
                    //console.log(rs);
                    if(rs && !rs.error){
                        for(var k in rs.count){
                            var arr=self.getAnchor(k);
                            var anchor=arr[0],block=arr[1];
                            if(!cache.fav[anchor])cache.fav[anchor]={};
                            if(!cache.tread[anchor])cache.tread[anchor]={};
                            var row=rs.count[k];
                            cache.fav[anchor][block]=row[0]-row[1];
                            cache.tread[anchor][block]=row[2]-row[3];
                        }

                        for(var kk in rs.me){
                            var tmp=self.getAnchor(kk);
                            var anc=tmp[0],bk=tmp[1];
                            if(!cache.me[anc])cache.me[anc]={};
                            cache.me[anc][bk]=rs.me[kk];
                        }
                    }
                    self.showCounter(list);
                    self.freshICONs();
                });
            });
        },
        freshICONs:()=>{
            var list=cache.me;
            var tpl=App.cache.getG("tpl");
            for(var anchor in list){
                for(var block in list[anchor]){
                    var row=list[anchor][block];
                    //console.log(row);
                    if(row[0]===1 && row[1]!==1){
                        //console.log('flip to unfav');
                        tpl.flipICON(anchor,block,1,'fav');
                    } 
                    if(row[2]===1 && row[3]!==1){
                        tpl.flipICON(anchor,block,1,'tread');
                        //console.log('flip to untread');
                    } 
                }
            }
        },
        cmts:(list,ck)=>{
            var svc='vSaying',fun='multi';
            RPC.extra.auto(svc,fun,{list:JSON.stringify(list)},(res)=>{
                //console.log(`Comments:${JSON.stringify(res)}`);
                if(!res || res.error) return ck && ck({error:'Failed to get comment counts.'});
                return ck && ck(res);
            });
        },
        favs:(list,ck)=>{
            var svc='vSocial',fun='favs';
            RPC.extra.auto(svc,fun,{list:JSON.stringify(list)},(res)=>{
                //console.log(`Favs:${JSON.stringify(res)}`);
                if(!res || res.error) return ck && ck({error:'Failed to get fav/tread counts.'});
                return ck && ck(res);
            });
        },
        showCounter:(list)=>{
            //console.log(`Here:${JSON.stringify(list)}`);
            var fun=self.singleCounter;
            for(var i=0;i<list.length;i++){
                var row=list[i];
                var anchor=row[0],block=row[1];
                fun(anchor,block);
            }
            return true;
        },
        singleCounter:(anchor,block,type,force)=>{
            if(!force) return self.render(anchor,block,type);
            self.cmt(anchor,block,()=>{
                self.fav(anchor,block,()=>{
                    self.render(anchor,block,type);
                });
            });
        },
        cmt:(anchor,block,ck)=>{
            var svc='vSaying',fun='count';
            RPC.extra.auto(svc,fun,{anchor:anchor,block:block},(res)=>{
                // FIXME 这里要处理res出错的情况，有可能vSaying服务没有被拉起来
                cache.comment[anchor][block]=res.count;
                return ck && ck();
            });
        },
        fav:(anchor,block,ck)=>{
            var svc='vSocial',fun='single';
            RPC.extra.auto(svc,fun,{anchor:anchor,block:block},(res)=>{
                // FIXME 这里要处理res出错的情况，有可能vSocial服务没有被拉起来
                var row=res.count;
                cache.fav[anchor][block]=row[0]-row[1];
                cache.tread[anchor][block]=row[2]-row[3];
                cache.me[anchor][block]=res.me;
                return ck && ck();
            });
        },

        render:(anchor,block,type)=>{
            var ts={comment:true,fav:true,tread:true};
            if(type===undefined){
                for(var k in ts){
                    var id=`.${self.getClass(anchor,block,k)}`;
                    var cn=(!cache[k][anchor] || !cache[k][anchor][block])?0:cache[k][anchor][block];
                    $(id).html(cn);
                }
            }else{
                if(!ts[type]) return false;
                var sel=`.${self.getClass(anchor,block,type)}`;
                var count=(!cache[type][anchor] || !cache[type][anchor][block])?0:cache[type][anchor][block];
                $(sel).html(count);
            }
        },

        checkReg:function(ck,at){
            if(!RPC.start.anonymous || !RPC.extra.reg) return ck && ck(false);
            if(at===undefined){
                RPC.extra.reg();
            }else{
                setTimeout(function(){
                    RPC.extra.reg();
                },at);
            }
            return ck && ck(true);
        },
        getClass:function(anchor,block,type){
            var pre=!type?'comment':type;
            return `${pre}_${anchor}_${block}`;
        },
        getAnchor:function(str){
            var arr=str.split('_');
            if(arr.length<2) return false;
            var block=parseInt(arr.pop());
            var anchor=arr.join('_');
            return [anchor,block];
        },
    };

    App.cache.setG("common",self);
    App.cache.setG("code",errCode);
})(cMedia);