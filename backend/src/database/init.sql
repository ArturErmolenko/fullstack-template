-- Ініціалізація бази даних mate_db
-- Цей скрипт виконується при першому запуску контейнера PostgreSQL
-- TypeORM створить таблицю автоматично через synchronize
-- Цей скрипт тільки вставляє тестові дані після створення таблиці

-- Вставка тестових даних (виконається після того, як TypeORM створить таблицю)
-- Використовуємо DO блок для безпечної вставки
DO $$
BEGIN
    -- Перевіряємо, чи існує таблиця users
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        -- Вставляємо дані тільки якщо їх ще немає
        INSERT INTO users (name, email) VALUES
            ('Іван Іванов', 'ivan@example.com'),
            ('Марія Петрова', 'maria@example.com'),
            ('Олексій Сидоров', 'alex@example.com')
        ON CONFLICT (email) DO NOTHING;
    END IF;
END $$;
