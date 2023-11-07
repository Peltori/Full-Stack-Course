# Julkaisen Harj8 tehtävä 3 Fullstack sovelluksen raspilleni

### ubuntu repojen päivitys ja Tarvittavien pakettien asennus
#### asennetaan apache sekä nodejs

    sudo apt install apache
    sudo apt install nodejs

![](/Kuvat/Harj8_teht3_install.png)

![](/Kuvat/Harj8_teht3_install2.png)

#### npm pakettia ei tarvitse asentaa koska se on tuossa jo mukana

### Kopioidaan server ja ui kansiot /var/www/nodejs kansioon jonka loin aiemmin

   sudo cp -rv server/ /var/www/nodejs
   sudo cp -rv ui/ /var/www/nodejs

![](/Kuvat/Harj8_teht3_kopio.png)

![](/Kuvat/Harj8_teht3_kopio2.png)

### Asetetaan oikeuksia

    sudo chmod 755 /var/www/nodejs/

![](/Kuvat/Harj8_teht3_oikeudet.png)

### Asennetaan myös PM2

    sudo npm install -g pm2

![](/Kuvat/Harj8_teht3_install3.png)

### Käynnistetään Nodejs

    sudo pm2 start index.js

![](/Kuvat/Harj8_teht3_kaynnistys.png)

### Aktivoidaan ja konffataan Apachen proxy moduuli

    sudo a2enmod proxy
    sudo a2enmod proxy_http

![](/Kuvat/Harj8_teht3_apache.png)

### Luodaan tiedosto ja määritetään kuunneltavat portit

    sudo nano/etc/apache2/sites-available/nodeapp.conf

![](/Kuvat/Harj8_teht3_apache2.png)

![](/Kuvat/Harj8_teht3_apache3.png)

![](/Kuvat/Harj8_teht3_apache4.png)

### Otetaan palvelin käyttöön

    sudo a2ensite nodeapp.conf
    sudo service apache2 restart

### Sitten vielä muutin paikkaa mistä apache katsoo html tiedostoja seuraavasti

    sudo /etc/apache2/sites-available/000-default.conf

![](/Kuvat/Harj8_teht3_apache4.png)<br>
Tämä siis toimii ainoastaan vain lokaalisti eikä muualta pääse tähän kiinni, koska<br>
cors estää pääsyn muualta vaikka avasinkin vaadittavat portit ym


### Tässä vielä toiminnallisuus omalla sisäisellä ip osoitteella

![](/Kuvat/Harj8_teht3_toiminnallisuus.png)

![](/Kuvat/Harj8_teht3_toiminnallisuus2.png)

![](/Kuvat/Harj8_teht3_toiminnallisuus3.png)

![](/Kuvat/Harj8_teht3_toiminnallisuus4.png)