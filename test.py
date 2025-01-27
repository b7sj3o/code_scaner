import os
import sqlite3
import psycopg2
from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData, Table

load_dotenv()

DB_NAME = os.getenv("DB_NAME", "db.sqlite3")
DB_USER = os.getenv("DB_USER", "")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "")
DB_PORT = os.getenv("DB_PORT", "")

# Підключення до SQLite
sqlite_conn = sqlite3.connect("backend/db.sqlite3")

# Підключення до PostgreSQL
pg_conn = psycopg2.connect(
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT,
)

# Таблиці, які потрібно скопіювати
tables_to_copy = [
    "api_product",
    "api_productsale",
]


for table_name in tables_to_copy:
    # Отримуємо дані з SQLite
    sqlite_cursor = sqlite_conn.cursor()

    sqlite_cursor.execute(f"SELECT * FROM {table_name}")
    rows = sqlite_cursor.fetchall()

    # Отримуємо назви колонок
    column_names = [description[0] for description in sqlite_cursor.description]
    columns = ", ".join(column_names)

    # Формуємо SQL для вставки даних у PostgreSQL
    placeholders = ", ".join(["%s"] * len(column_names))
    insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

    with pg_conn.cursor() as pg_cursor:
        pg_cursor.executemany(insert_query, rows)
        pg_conn.commit()

# Закриваємо з'єднання
sqlite_conn.close()
pg_conn.close()
