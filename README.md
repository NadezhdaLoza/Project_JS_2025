### Project_JS_2025

Веб-сервис для управления доверенностями и справочниками организаций, товаров и физических лиц. Реализован по архитектурному паттерну MVC (Model-View-Controller) с разделением слоев: Routes -> Controllers -> Services -> Repositories.

## Технологии

- Backend: Python 3.x, Flask, Flask-CORS
- Database: MongoDB (PyMongo driver)
- Architecture: Layered Architecture (Controllers, Services, Repositories, Utils)
- Testing: Postman

## Архитектура проекта

Проект разделен на логические слои для обеспечения слабой связанности кода:

1.  Routes (`routes/`): Определение эндпоинтов API и регистрация Blueprint'ов.
2.  Controllers (`controllers/`): Обработка HTTP-запросов, валидация входных данных и формирование ответов (JSON).
3.  Services (`services/`): Бизнес-логика приложения, оркестрация операций между репозиториями.
4.  Repositories (`repositories/`): Работа с базой данных (CRUD операции через PyMongo).
5.  Utils (`utils/`): Вспомогательные модули (подключение к БД, обработчик ошибок, JSON-энкодер для ObjectId/datetime).

## Установка и запуск

### Предварительные требования

- Установленный Python 3.8+
- Запущенный локальный сервер MongoDB (порт 27017)

### Шаги запуска

1.  Клонируйте репозиторий:

    ```bash
    git clone ...
    cd ...
    ```

2.  Создайте и активируйте виртуальное окружение:

    ```bash
    python -m venv venv
    # Windows:
    venv\Scripts\activate
    # Linux/Mac:
    source venv/bin/activate
    ```

3.  Установите зависимости:

    ```bash
    pip install flask pymongo flask-cors
    ```

4.  Запустите сервер:
    ```bash
    python main.py
    ```

Сервер будет доступен по адресу: `http://127.0.0.1:5000`

## Тестирование API

Для проверки работы эндпоинтов используйте Postman или curl. Примеры запросов:

- Получить список должностей: `GET /api/positions`
- Создать новую должность: `POST /api/positions` (Body: JSON `{"title": "Director"}`)
- Получить все доверенности: `GET /api/proxies`

## Frontend (Vue.js + Vuex + Bootstrap 5)

### Технологии

- Framework: Vue.js 3.x (Composition API / Options API)
- State Management: Vuex 4
- Routing: Vue Router 4 (History Mode)
- UI Framework: Bootstrap 5
- HTTP Client: Axios
- Linting: ESLint + Prettier

### Архитектура

- Views (`views/`): Страницы приложения (Home, Proxies, Positions и т.д.).
- Components (`components/`): Переиспользуемые UI-элементы (таблицы, формы, модальные окна).
- Store (`store/`): Централизованное хранилище состояния (actions, mutations, getters) и интеграция с API.
- Router (`router/`): Маршрутизация между страницами.

### Установка и запуск

1.  Перейдите в директорию frontend:

    ```bash
    cd frontend
    ```

2.  Установите зависимости:

    ```bash
    npm install
    ```

3.  Запустите dev-сервер:
    ```bash
    npm run serve
    ```

Приложение будет доступно по адресу: `http://localhost:8080`
