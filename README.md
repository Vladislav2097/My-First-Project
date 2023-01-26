Проект "Вычислитель отличий"

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Vladislav2097/frontend-bootcamp-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Vladislav2097/frontend-bootcamp-project-46/actions)

[![hexlet-check](https://github.com/Vladislav2097/frontend-bootcamp-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Vladislav2097/frontend-bootcamp-project-46/actions/workflows/hexlet-check.yml)

[![Node CI](https://github.com/Vladislav2097/frontend-bootcamp-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Vladislav2097/frontend-bootcamp-project-46/actions/workflows/nodejs.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/73bc68a71431f2792551/maintainability)](https://codeclimate.com/github/Vladislav2097/frontend-bootcamp-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/73bc68a71431f2792551/test_coverage)](https://codeclimate.com/github/Vladislav2097/frontend-bootcamp-project-46/test_coverage)

Установить 
npm ci
npm link @hexlet/code

Запустить тесты
make test

Проект "Вычислитель отличий", находит отличия в двух разных файлах расширениями "js, yml, yaml" и выводит результат сравнения тремя возможными вариантами.

Работа проекта
 Форматер plain: gendiff -f plain file1.json file2.yml
 https://asciinema.org/a/xZE2TXbt3gOwmyDAbCOtEjPCc

 Форматер json: gendiff -f json file1.json file2.json
 https://asciinema.org/a/Gh5O4ey6pjBbTuLs7ciEatG6X

 Форматер stylish: gendiff file1.json file2.yml
 https://asciinema.org/a/Thdu2gcEGiheuwLglqtkkGtFY

// Пример работы пакета
https://asciinema.org/a/a6Req8qq0Sovul5VG6vXBTBlV