#!/bin/bash
#プログラム名
APP_NAME=edi-file-create-tool.jar

#入力パラメーター提示
usage() {
    echo "Usage: sh 実行スクリプト.sh [start|stop|restart|status]"
    exit 1
}

#チェックプロセス実行するかとうか
is_exist(){
  pid=`ps -ef|grep $APP_NAME|grep -v grep|awk '{print $2}' `
  #存在しなければ1をリターン，以外0
  if [ -z "${pid}" ]; then
   return 1
  else
    return 0
  fi
}

#起動方法
start(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} is already running. pid=${pid} ."
  else
    nohup java -jar $APP_NAME > /dev/null 2>&1 &
	fi
}

#停止方法
stop(){
  is_exist
  if [ $? -eq "0" ]; then
    kill -9 $pid
  else
    echo "${APP_NAME} is not running"
  fi  
}

#実行状態を出力
status(){
  is_exist
  if [ $? -eq "0" ]; then
    echo "${APP_NAME} is running. Pid is ${pid}"
  else
    echo "${APP_NAME} is NOT running."
  fi
}

#リスタート
restart(){
  stop
  start
}

#入力パラメーターによると、実行方法を選び
case "$1" in
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "status")
    status
    ;;
  "restart")
    restart
    ;;
  *)
    usage
    ;;
esac