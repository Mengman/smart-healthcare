#!/bin/bash
BASE="$( cd "$( dirname "$0"  )" && pwd  )"
cd $BASE
NAME=$(ls *.war 2>/dev/null)
NAME=${NAME%.war}
ACTION=$1
APP_LOGS=${BASE}/logs
APP_PID=${BASE}/${NAME}.pid
CONFIG_ACTIVE=prod
SERVER_PORT=8080


SCOP_CENTER_SLICE=01
uploadDir=/data/demo_upload/files
export SCOP_CENTER_SLICE uploadDir

usage()
{
    echo " ${0} support command {start|stop|restart|status}"
    exit 1
}

[ $# -gt 0 ] || usage

running()
{
  if [ -f "$1" ]
  then
    local PID=$(cat "$1" 2>/dev/null) || return 1
    kill -0 "$PID" 2>/dev/null
    return
  fi
  rm -f "$1"
  return 1
}

if [ -z "$JAVA" ]
then
  JAVA=$(which java)
fi

if [ ! -d ${APP_LOGS} ]; then
  mkdir ${APP_LOGS}
fi

if [ -z "$JAVA" ]
then
  echo "Cannot find a Java JDK. Please set either set JAVA or put java (>=1.8) in your PATH." >&2
  exit 1
fi

JAVA_OPTIONS=("-Djava.io.tmpdir=/data/tmp" "-Duser.timezone=Asia/Shanghai")

CONFIG_OPTIONS=("--spring.profiles.active=$CONFIG_ACTIVE" "--server.port=$SERVER_PORT" "--logging.path=$APP_LOGS")

start() 
{
      echo -n "Starting $NAME: "
      if running ${APP_PID}
      then
        echo "Already Running $(< ${APP_PID})!"
        echo "$(ps -ef | grep ${NAME} | grep -E -v "grep|start|stop|status|restart")"
        exit 0
      fi
         nohup $JAVA ${JAVA_OPTIONS[*]} -jar ${NAME}.war ${CONFIG_OPTIONS[*]} > /dev/null &
         disown $!
         echo $! > "$APP_PID"

      TIMEOUT=30
      while ( ! running ${APP_PID} ); do
        if (( TIMEOUT-- == 0 )); then
           echo "failed"
           exit 1
        fi
        sleep 1
      done

      echo "is running pid=$(< ${APP_PID})"
      echo "$(ps -ef | grep ${NAME} | grep -E -v "grep|start|stop|status|restart")"
}
stop()
{
    echo -n "Stopping $NAME: "
    if [ ! -f "$APP_PID" ] ; then
        echo " not found $APP_PID"
        exit 0
    fi

      PID=$(cat "$APP_PID" 2>/dev/null)
      if [ -z "$PID" ] ; then
        echo " no pid id found in $APP_PID"
        exit 0
      fi
      kill "$PID" 2>/dev/null

      TIMEOUT=30
      while running ${APP_PID}; do
        if (( TIMEOUT-- == 0 )); then
          kill -KILL "$PID" 2>/dev/null
        fi
        sleep 1
      done

    rm -f "$APP_PID"
    echo "OK"
}
restart()
{
    echo "Restarting $NAME: "
    stop
    start
}
case "$ACTION" in
  start)
    start
    ;;

  stop)
    stop
    ;;

  restart)
    restart
    ;;

  status)
    echo -n "Status $NAME: "
    if running "$APP_PID"
    then
      echo "is running pid=$(< "$APP_PID")"
      echo "$(ps -ef | grep ${NAME} | grep -E -v "grep|start|stop|status|restart")"
      exit 0
    else
      echo "is not running"
      echo "$(ps -ef | grep ${NAME} | grep -E -v "grep|start|stop|status|restart")"
      exit 0
    fi
    exit 1
    ;;

  *)
    usage
    ;;
esac

exit 0
