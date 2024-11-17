from flask import Flask
from flask_cors import CORS  # Importa o CORS
from routes import init_routes

app = Flask(__name__)

# Aplica o CORS a toda a aplicação, certificando-se de incluir cabeçalhos necessários
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Inicializar rotas
init_routes(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
