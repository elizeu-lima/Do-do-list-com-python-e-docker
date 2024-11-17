# Base image
FROM python:3.9-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas o código da aplicação
COPY ./app /app/app

# Copia o arquivo requirements.txt
COPY requirements.txt /app

# Instala as dependências
RUN pip install --no-cache-dir -r /app/requirements.txt

# Expõe a porta da aplicação
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["python", "app/main.py"]
