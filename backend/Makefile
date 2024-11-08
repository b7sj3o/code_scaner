.PHONY: run migrate migrates superuser

run:
	python manage.py runserver

run_https:
	python manage.py runsslserver --certificate cert.pem --key key.pem 0.0.0.0:8000

migrates:
	python manage.py makemigrations
	python manage.py migrate

migrate:
	python manage.py migrate

superuser:
	python manage.py createsuperuser