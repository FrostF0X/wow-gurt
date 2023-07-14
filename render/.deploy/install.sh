curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs libcap2-bin chromium-browser libx11-xcb1 libxcomposite1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6
useradd wow-gurt:wow-gurt
useradd wow-gurt
groupadd wow-gurt
su wow-gurt
mkdir wow-gurt
mkdir /home/wow-gurt
chown wow-gurt:wow-gurt /home/wow-gurt/
su wow-gurt
su wow-gurt/
su wow-gurt
cp ~/.ssh/id_rsa /home/wow-gurt/.ssh/id_rsa
chown wow-gurt:wow-gurt /home/wow-gurt/.ssh/id_rsa
setcap 'cap_net_bind_service=+ep' /usr/bin/node
sudo ufw allow 80
