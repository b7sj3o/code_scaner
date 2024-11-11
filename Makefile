.PHONY: run migrate migrates superuser

run_backend:
	python backend/manage.py runserver

run_backend_https:
	python backend/manage.py runsslserver --certificate backend/cert.pem --key backend/key.pem 0.0.0.0:8000

migrates:
	python backend/manage.py makemigrations
	python backend/manage.py migrate

migrate:
	python backend/manage.py migrate

superuser:
	python backend/manage.py createsuperuser