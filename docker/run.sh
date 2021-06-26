printf '\n### Docker build of pg-admin-mongo-producer started...\n'
cd ../
cd ./producer
docker build . -t pg-rabbit-mongo-producer
printf '\n### Docker build of pg-admin-mongo-producer ended...\n'
cd ../

printf '\n### Docker build of pg-admin-mongo-consumer started...\n'
cd ./consumer
docker build . -t pg-rabbit-mongo-consumer
printf '\n### Docker build of pg-admin-mongo-consumer ended...\n'
cd ../

printf '\n### Starting docker-compose of containers...\n'
cd ./docker
docker-compose up
printf '\n### Application has successfully started!'