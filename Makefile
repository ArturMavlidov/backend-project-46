.PHONY: gendiff

gendiff:
	node bin/gendiff.js -h

.PHONY: lint

lint:
	npx eslint .
