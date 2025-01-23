<h1>Instructions to Run the Application</h1>
<ol>
    <li>
        <strong>Clone the Repository</strong>
        <pre><code>git clone https://github.com/b7sj3o/code_scaner.git</code></pre>
    </li>
    <li>
        <strong>Create and Activate Virtual Environment</strong>
        <pre><code>python3 -m venv .venv</code></pre>
        <small> # For Linux/MacOS</small>
        <pre><code>source .venv/bin/activate</code></pre>
        <small> # For Windows</small>
        <pre><code>.venv\Scripts\activate</code></pre>
    </li>
    <li>
        <strong>Install Dependencies</strong>
        <pre>
<code>pip install -r requirements.txt</code>
        </pre>
    </li>
    <li>
        <strong>Generate SSL Certificate (if not already generated)</strong>
        <ul style="list-style-type: numerical;">
            <li>Download <code>mkcert</code> (a tool for generating trusted development certificates).</li>
            <p>Refer to the official documentation here: <a href="https://github.com/FiloSottile/mkcert" target="_blank">mkcert GitHub</a></p>
            <li>Create a local Certificate Authority (CA):
                <pre><code>mkcert -install</code></pre>
            </li>
            <li>Generate a certificate and key for <code>localhost</code>:
                <pre><code>mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1</code></pre>
                <p>Alternatively, use <code>0.0.0.0</code> if required:
                <pre><code>mkcert -cert-file cert.pem -key-file key.pem localhost 0.0.0.0</code></pre>
                </p>
            </li>
            <li>Copy the generated <code>cert.pem</code> and <code>key.pem</code> files to the root of your Django project, at the same level as <code>manage.py</code>.</li>
        </ul>
    </li>
    <li>
        <strong>Prepare Backend</strong>
        <ul style="list-style-type: numerical;">
            <li>Open the first terminal.</li>
            <li>Activate the virtual environment.</li>
            <li>Run the backend using one of the following options:</li>
            <ul>
                <li>If <code>make</code> is installed:
                    <pre><code>make rbh</code></pre>
                </li>
                <li>If <code>make</code> is not installed, run:
                    <pre>
<code>python backend/manage.py runsslserver --certificate backend/cert.pem --key backend/key.pem 0.0.0.0:8000</code>
                    </pre>
                </li>
            </ul>
        </ul>
    </li>
    <li>
        <strong>Prepare Frontend</strong>
        <ul style="list-style-type: numerical;">
            <li>Open the second terminal.</li>
            <li>Navigate to the frontend directory:
                <pre><code>cd frontend</code></pre>
            </li>
            <li>Start the frontend server:
                <pre><code>npm start</code></pre>
            </li>
        </ul>
    </li>
    <li>
        <strong>Version Requirements</strong>
        <ul>
            <li>Python version: <code>3.10.11</code></li>
            <li>npm version: <code>10.9.0+</code></li>
        </ul>
    </li>
</ol>
<p>After following these steps, the application should be running successfully on your local machine!</p>
