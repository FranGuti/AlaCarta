import subprocess
import sys

command = sys.argv[1] if len(sys.argv) >= 2 else 'dev'
use_insomnia = False if len(sys.argv) < 3 else True

backend = r"C:\Users\blabla\AlaCarta\backend"
frontend = r"C:\Users\blabla\AlaCarta\frontend"
alacarta = r"C:\Users\blabla\AlaCarta"
# switch insomnia for postman if needed
insomnia = r"C:\Users\blabla\AppData\Local\insomnia\Insomnia.exe"

run_server = f"npm run {command}"
code = "code ."

subprocess.Popen(["start", "powershell.exe", "-NoExit", "-Command", f"cd \"{backend}\"; {run_server}"], shell=True)
subprocess.Popen(["start", "powershell.exe", "-NoExit", "-Command", f"cd \"{frontend}\"; {run_server}"], shell=True)
subprocess.Popen(["start", "powershell.exe", "-NoExit", "-Command", f"cd \"{alacarta}\"; {code}"], shell=True)
# change the following line to use chrome or any other browser if you want to
subprocess.Popen(['C://Program Files (x86)//BraveSoftware//Brave-Browser//Application//brave.exe', 'http://localhost:3001/'])
if (use_insomnia):
    subprocess.Popen([insomnia])

print(f"\033[92mRunning servers for frontend and backend with command \033[94m{command}\033[0m...")
print("You may exit this terminal now...")

