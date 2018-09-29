#!/bin/bash -ex

testCommand="$1"
extraArgs="$2"

export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)

find_container_id() {
  echo $(docker ps \
    --filter "status=running" \
    --filter "label=project-name=kafkajs-lz4" \
    --filter "label=com.docker.compose.service=kafka" \
    --no-trunc \
    -q)
}

quit() {
  docker-compose down --remove-orphans
  exit 1
}

if [ -z ${DO_NOT_STOP} ]; then
  trap quit ERR
fi

NO_LOGS=1 $PWD/scripts/dockerComposeUp.sh

sleep 1
containerId="$(find_container_id)"

docker exec \
  ${containerId} \
  bash -c "JMX_PORT=9998 /opt/kafka/bin/kafka-topics.sh --zookeeper zk:2181 --list 2> /dev/null"

sleep 5

eval "${testCommand} ${extraArgs}"
TEST_EXIT=$?
echo

if [ -z ${DO_NOT_STOP} ]; then
  docker-compose down --remove-orphans
fi

exit ${TEST_EXIT}
