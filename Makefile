PWD := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

build: Dockerfile
	docker build . -t front

run: Dockerfile
	docker run --rm -it -p "3000:3000" -p "35729:35729" -v "$(PWD):/app" front
