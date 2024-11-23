from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"


@app.route("/template1")
def layer1_template():
    return render_template('layer1_template.html')

@app.route("/template2")
def layer2_template():
    return render_template('layer2_template.html')

@app.route("/template3")
def layer3_template():
    return render_template('layer3_template.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
