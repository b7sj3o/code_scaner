.PHONY: run migrate migrates superuser

rb:
	python backend/manage.py runserver

rbh:
	python backend/manage.py runsslserver --certificate backend/cert.pem --key backend/key.pem 0.0.0.0:8000

migrates:
	python backend/manage.py makemigrations
	python backend/manage.py migrate

migrate:
	python backend/manage.py migrate

superuser:
	python backend/manage.py createsuperuser