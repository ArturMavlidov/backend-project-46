.PHONY: gendiff

gendiff:
	node bin/gendiff.js -h

.PHONY: lint

lint:
	npx eslint .

.PHONY: test

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
