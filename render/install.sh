curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs libcap2-bin chromium-browser libx11-xcb1 libxcomposite1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6
setcap 'cap_net_bind_service=+ep' /usr/bin/node
sudo ufw allow 80
echo "[Unit]
      Description=wow-gurt
      After=network.target
      StartLimitIntervalSec=0

      [Service]
      Type=simple
      Restart=always
      RestartSec=1
      User=wow-gurt
      ExecStart=/usr/bin/npm --prefix /home/wow-gurt/wow-gurt/render run prod-goerli

      [Install]
      WantedBy=multi-user.target" >> /etc/systemd/system/wow-gurt.service
