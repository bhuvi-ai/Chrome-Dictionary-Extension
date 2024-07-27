

# Import necessary modules
from flask import Flask, request, jsonify, make_response
import mysql.connector
from flask_cors import CORS
from flask import Flask, render_template
import traceback

# Initialize Flask app
app = Flask(__name__)

# Allow CORS for all domains
CORS(app)


db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'ai_dictionary',
}   
@app.route('/getDefinitions', methods=['OPTIONS', 'POST'])



def get_definitions():
    if request.method == 'OPTIONS':
        # Respond to preflight requests
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    # Create a MySQL connection
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)  # Use dictionary cursor for clearer result

    try:
        data = request.json
        words = data.get('words', [])

        definitions = {}

        
        for word in words:
            query = f"SELECT word, definition FROM dict_v1 WHERE  word = '{word}'"
            cursor.execute(query)
            results = cursor.fetchall()

            if results:
                for result in results:
                    definitions[result['word']] = result['definition']
            else:
                definitions[word] = 'Definition not found'


        print('Received words:', words)
        print('Resulting definitions:', definitions)

        # Return definitions as JSON response
        response = jsonify(definitions)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        cursor.close()
        connection.close()

@app.route('/get_Definitions', methods=['OPTIONS', 'POST'])
def get_definition():
    if request.method == 'OPTIONS':
        # Respond to preflight requests
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    # Create a MySQL connection
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)  # Use dictionary cursor for clearer result

    try:
        data = request.json
        words = data.get('words', [])

        definitions = {}

        
        for word in words:
            query = f"SELECT word, definition FROM dict_v1 WHERE word LIKE '%{word}%'"
            cursor.execute(query)
            results = cursor.fetchall()

            if results:
                for result in results:
                    definitions[result['word']] = result['definition']
            else:
                definitions[word] = 'Definition not found'

        # Add definition 
        entered_phrase = ' '.join(words)
        entered_query = f"SELECT word, definition FROM dict_v1 WHERE word LIKE '%{entered_phrase}%'"
        cursor.execute(entered_query)
        entered_result = cursor.fetchall()

        if entered_result:
            for result in entered_result:
                definitions[result['word']] = result['definition']
        else:
            definitions[entered_phrase] = 'Definition not found for entered phrase'

        print('Received words:', words)
        print('Resulting definitions:', definitions)

        # Return definitions as JSON response
        response = jsonify(definitions)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        print('Error:', e)
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        cursor.close()
        connection.close()

@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
