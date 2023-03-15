#创建文件夹并把源码拷贝过来
path="/Users/fuzhongqiang/Desktop/autoPublish"
folder="cSaying"
target="/Users/fuzhongqiang/Desktop/www/"$folder
config="/Users/fuzhongqiang/Desktop/www/$folder/saying_gulp.js"

cd $path
rm -rf $path/$folder
mkdir $folder

cp -r $target/* $folder/
cp $config $path/$folder/gulpfile.js

#使用拷贝的方式，安装gulp
#需要现在上级目录下安装一次
cd $path
mkdir $path/$folder/node_modules
cp -r node_modules/* $folder/node_modules

#进入构建目录，执行gulpfile
cd $folder
gulp
cp cSaying.min.js ../
rm -rf $path/$folder