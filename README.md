#calendar vacations


## How to setup

```
# clone repo
git clone https://github.com/Space647/calendarVacations.git

# go to directory
cd calendarVacations

# install dependencies
npm install

# run app
gulp
```

###app structure
```
├───build
│   ├───img
│   ├───script
│   └───style
└───src
    ├───img
    ├───script
    │   ├───components
    │   ├───routes
    │   └───utils
    └───style
    ```
### requirements
```
Календарь отпусков

Приложение состоит из 2 частей:

•         Таблица, состоящая из списка сотрудников (Фамилия Имя), их должностей, дат начала и конца отпуска
        ◦          Список должен быть отсортирован по датам начала отпуска и по фамилиям, должна быть возможность сортировки по этим полям
        ◦          Предстоящий отпуск, прошедший и действующий в данный момент должны визуально отличаться.
        ◦          Предстоящий отпуск можно отредактировать (только даты) или удалить запись полностью
•         Форма для добавления отпуска сотрудника. При добавлении необходимо обязательно указать сотрудника и даты, реализация - произвольная

Приложение должно отвечать следующим бизнес требованиям:
•         максимальное количество дней отпуска в году - 24 календарных дня
•         минимальный непрерывный период отпуска - 2 календарных дня
•         максимальный непрерывный период отпуска - 15 календарных дней
•         минимальный период между периодами отпуска равен размеру первого отпуска (если сотрудник был в отпуске 10 дней, в последующие 10 дней он не может брать отпуск)
•         в отпуске имеют право находиться не более 50% сотрудников одной должности (если в компании 5 бухгалтеров, одновременно в отпуске может быть не более 2)

Дополнительная задача, не обязательная для выполнения. При наступлении даты начала отпуска, приложение должно изменить визуальное отображение записи (без перезагрузки страницы), аналогичное должно быть реализовано для завершившегося отпуска.

Техническая часть:
•         Реализация на языке JavaScript, использование фреймворков и библиотек по желанию
•         Исходные файлы должны быть размещены в github
•         Желательно использовать localStorage для хранения данных
```
